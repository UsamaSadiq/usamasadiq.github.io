/**
 * Newsletter Subscription Handler
 * Simple form submission with success message
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
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const email = this.emailInput.value.trim();
        
        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address.');
            return;
        }
        
        // Show loading state briefly
        this.setLoading(true);
        
        // Show success message after a short delay
        setTimeout(() => {
            this.setLoading(false);
            this.showSuccess();
            this.form.reset();
        }, 800);
    }
    
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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
        if (this.successMsg && this.successMsg.querySelector('span')) {
            this.successMsg.querySelector('span').textContent = message;
            this.successMsg.style.display = 'flex';
            
            // Auto-hide after 5 seconds
            setTimeout(() => this.hideMessages(), 5000);
        }
    }
    
    showError(message) {
        this.hideMessages();
        if (this.errorMsg && this.errorMsg.querySelector('span')) {
            this.errorMsg.querySelector('span').textContent = message;
            this.errorMsg.style.display = 'flex';
            
            // Auto-hide after 5 seconds
            setTimeout(() => this.hideMessages(), 5000);
        }
    }
    
    hideMessages() {
        if (this.successMsg) this.successMsg.style.display = 'none';
        if (this.errorMsg) this.errorMsg.style.display = 'none';
    }
    
    clearMessages() {
        this.hideMessages();
    }
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
        
        // Show info message about manual process
        setTimeout(() => {
            this.showSuccess('Email client opened! Please send the subscription request email.');
        }, 500);
        
        window.open(mailtoLink);
        return true; // Return success to trigger the normal success flow
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
        if (this.successMsg && this.successMsg.querySelector('span')) {
            this.successMsg.querySelector('span').textContent = message;
            this.successMsg.style.display = 'flex';
            
            // Auto-hide after 5 seconds
            setTimeout(() => this.hideMessages(), 5000);
        } else {
            console.warn('Success message element not found');
        }
    }
    
    showError(message) {
        this.hideMessages();
        if (this.errorMsg && this.errorMsg.querySelector('span')) {
            this.errorMsg.querySelector('span').textContent = message;
            this.errorMsg.style.display = 'flex';
            
            // Auto-hide after 5 seconds
            setTimeout(() => this.hideMessages(), 5000);
        } else {
            console.warn('Error message element not found');
        }
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
    
    // Test function for verifying notifications (for development)
    testNotification(type = 'success') {
        if (type === 'success') {
            this.showSuccess('Test: Newsletter subscription successful!');
        } else {
            this.showError('Test: Something went wrong!');
        }
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
