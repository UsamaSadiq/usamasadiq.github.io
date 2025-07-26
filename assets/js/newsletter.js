/**
 * Newsletter Subscription Handler
 * Handles form submission, validation, and integration with email services
 */

class NewsletterManager {
    constructor() {
        this.form = document.getElementById('newsletter-form');
        this.emailInput = document.getElementById('newsletter-email');
        this.submitBtn = this.form?.querySelector('.newsletter-btn');
        this.btnText = this.form?.querySelector('.newsletter-btn-text');
        this.btnLoading = this.form?.querySelector('.newsletter-btn-loading');
        this.successMsg = document.getElementById('newsletter-success');
        this.errorMsg = document.getElementById('newsletter-error');
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.emailInput.addEventListener('input', this.clearMessages.bind(this));
        
        // Load existing subscription status
        this.checkSubscriptionStatus();
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const email = this.emailInput.value.trim();
        
        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address.');
            return;
        }
        
        // Check if already subscribed
        if (this.isAlreadySubscribed(email)) {
            this.showError('This email is already subscribed.');
            return;
        }
        
        this.setLoading(true);
        
        try {
            const success = await this.submitSubscription(email);
            
            if (success) {
                this.showSuccess();
                this.saveSubscriptionStatus(email);
                this.form.reset();
                
                // Track subscription event
                this.trackSubscription(email);
            } else {
                this.showError('Failed to subscribe. Please try again.');
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            this.showError('Something went wrong. Please try again later.');
        } finally {
            this.setLoading(false);
        }
    }
    
    async submitSubscription(email) {
        // Integration options (choose one based on your preference):
        
        // Option 1: Netlify Forms (if hosted on Netlify)
        if (this.isNetlify()) {
            return this.submitToNetlify(email);
        }
        
        // Option 2: Formspree (popular form service)
        if (this.hasFormspree()) {
            return this.submitToFormspree(email);
        }
        
        // Option 3: ConvertKit API (email marketing service)
        if (this.hasConvertKit()) {
            return this.submitToConvertKit(email);
        }
        
        // Option 4: Simple mailto fallback
        return this.submitViaMailto(email);
    }
    
    async submitToNetlify(email) {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('form-name', 'newsletter-signup');
        
        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        });
        
        return response.ok;
    }
    
    async submitToFormspree(email) {
        // Get Formspree endpoint from environment or config
        const formspreeEndpoint = this.getFormspreeEndpoint();
        
        if (!formspreeEndpoint || formspreeEndpoint.includes('YOUR_FORM_ID')) {
            if (window.NEWSLETTER_CONFIG?.debug) {
                console.warn('Formspree endpoint not properly configured');
            }
            return false;
        }
        
        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    _subject: 'New Newsletter Subscription',
                    _replyto: email,
                    message: `New newsletter subscription from ${window.location.hostname}`,
                    source: 'Portfolio Website Newsletter',
                    subscribed_at: new Date().toISOString(),
                    page_url: window.location.href
                })
            });
            
            const data = await response.json();
            
            if (window.NEWSLETTER_CONFIG?.debug) {
                console.log('Formspree response:', { status: response.status, data });
            }
            
            return response.ok && !data.errors;
        } catch (error) {
            if (window.NEWSLETTER_CONFIG?.debug) {
                console.error('Formspree submission error:', error);
            }
            return false;
        }
    }
    
    async submitToConvertKit(email) {
        const convertKitAPI = 'https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe'; // Replace with your ConvertKit form ID
        const apiKey = 'YOUR_API_KEY'; // Replace with your ConvertKit API key
        
        const response = await fetch(convertKitAPI, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                api_key: apiKey,
                email: email
            })
        });
        
        return response.ok;
    }
    
    submitViaMailto(email) {
        // Fallback: Open email client with configured email
        const fallbackEmail = window.NEWSLETTER_CONFIG?.fallbackEmail || 'usama7274@gmail.com';
        const subject = encodeURIComponent('Newsletter Subscription Request');
        const body = encodeURIComponent(`Please add ${email} to the newsletter subscription list.\n\nSubscribed from: ${window.location.href}`);
        const mailtoLink = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
        
        window.open(mailtoLink);
        return true; // Assume success since we can't verify mailto
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isAlreadySubscribed(email) {
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        return subscribers.includes(email.toLowerCase());
    }
    
    saveSubscriptionStatus(email) {
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        subscribers.push(email.toLowerCase());
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    }
    
    checkSubscriptionStatus() {
        const currentEmail = localStorage.getItem('newsletter_current_email');
        if (currentEmail && this.isAlreadySubscribed(currentEmail)) {
            this.emailInput.value = currentEmail;
            this.showSuccess('You are already subscribed!');
            this.submitBtn.textContent = 'Subscribed ✓';
            this.submitBtn.disabled = true;
        }
    }
    
    setLoading(loading) {
        if (loading) {
            this.btnText.style.display = 'none';
            this.btnLoading.style.display = 'inline';
            this.submitBtn.disabled = true;
        } else {
            this.btnText.style.display = 'inline';
            this.btnLoading.style.display = 'none';
            this.submitBtn.disabled = false;
        }
    }
    
    showSuccess(message = 'Thanks for subscribing! Check your email to confirm.') {
        this.hideMessages();
        this.successMsg.querySelector('span').textContent = message;
        this.successMsg.style.display = 'flex';
        
        // Auto-hide after 5 seconds
        setTimeout(() => this.hideMessages(), 5000);
    }
    
    showError(message) {
        this.hideMessages();
        this.errorMsg.querySelector('span').textContent = message;
        this.errorMsg.style.display = 'flex';
        
        // Auto-hide after 5 seconds
        setTimeout(() => this.hideMessages(), 5000);
    }
    
    hideMessages() {
        this.successMsg.style.display = 'none';
        this.errorMsg.style.display = 'none';
    }
    
    clearMessages() {
        this.hideMessages();
    }
    
    trackSubscription(email) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_subscription', {
                'event_category': 'engagement',
                'event_label': 'newsletter',
                'value': 1
            });
        }
        
        // Console log for debugging
        console.log('Newsletter subscription:', email);
    }
    
    // Helper methods to detect available services
    isNetlify() {
        return window.location.hostname.includes('netlify') || 
               document.querySelector('form[data-netlify="true"]');
    }
    
    hasFormspree() {
        return this.getFormspreeEndpoint() !== null;
    }
    
    hasConvertKit() {
        return this.getConvertKitConfig() !== null;
    }
    
    getFormspreeEndpoint() {
        // Check for Formspree endpoint in various places (priority order)
        return document.querySelector('meta[name="formspree-endpoint"]')?.content ||
               window.NEWSLETTER_CONFIG?.formspreeEndpoint ||
               localStorage.getItem('formspree_endpoint') ||
               window.FORMSPREE_ENDPOINT ||
               null;
    }
    
    getConvertKitConfig() {
        const formId = document.querySelector('meta[name="convertkit-form-id"]')?.content ||
                      localStorage.getItem('convertkit_form_id') ||
                      window.CONVERTKIT_FORM_ID;
        
        const apiKey = document.querySelector('meta[name="convertkit-api-key"]')?.content ||
                      localStorage.getItem('convertkit_api_key') ||
                      window.CONVERTKIT_API_KEY;
        
        return formId && apiKey ? { formId, apiKey } : null;
    }
}

// Initialize newsletter functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize newsletter manager
    new NewsletterManager();
    
    // Add newsletter to sidebar if element exists
    const sidebar = document.querySelector('#sidebar .sidebar-bottom');
    if (sidebar && !document.querySelector('.newsletter-signup')) {
        sidebar.insertAdjacentHTML('beforeend', `
            <div class="newsletter-signup compact">
                {% include newsletter-signup.html %}
            </div>
        `);
    }
});

// Export for potential use in other scripts
window.NewsletterManager = NewsletterManager;
