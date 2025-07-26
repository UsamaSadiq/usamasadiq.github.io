/**
 * Advanced Contact Form Handler
 * Handles form submission, validation, and integration with email services
 */

class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = this.form?.querySelector('button[type="submit"]');
        this.btnText = this.form?.querySelector('.btn-text');
        this.btnLoading = this.form?.querySelector('.btn-loading');
        this.successMsg = document.getElementById('contact-success');
        this.errorMsg = document.getElementById('contact-error');
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Add real-time validation
        this.addFieldValidation();
        
        // Auto-save form data
        this.enableAutoSave();
        
        // Load saved form data
        this.loadSavedData();
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = this.getFormData();
        
        if (!this.validateForm(formData)) {
            this.showError('Please fill in all required fields correctly.');
            return;
        }
        
        this.setLoading(true);
        this.hideMessages();
        
        try {
            const success = await this.submitForm(formData);
            
            if (success) {
                this.showSuccess();
                this.clearSavedData();
                this.form.reset();
                
                // Track form submission
                this.trackSubmission(formData);
            } else {
                this.showError('Failed to send message. Please try again or email me directly.');
            }
        } catch (error) {
            console.error('Contact form submission error:', error);
            this.showError('Something went wrong. Please try again later or contact me directly.');
        } finally {
            this.setLoading(false);
        }
    }
    
    async submitForm(formData) {
        // Use the same Formspree endpoint as newsletter, but with different data
        const formspreeEndpoint = this.getFormspreeEndpoint();
        
        if (formspreeEndpoint) {
            return this.submitToFormspree(formData, formspreeEndpoint);
        }
        
        // Fallback to mailto
        return this.submitViaMailto(formData);
    }
    
    async submitToFormspree(formData, endpoint) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    subject: formData.subject,
                    message: formData.message,
                    _subject: `Contact Form: ${formData.subject} - ${formData.name}`,
                    _replyto: formData.email,
                    form_type: 'contact',
                    submitted_at: new Date().toISOString(),
                    page_url: window.location.href
                })
            });
            
            const data = await response.json();
            
            if (window.NEWSLETTER_CONFIG?.debug) {
                console.log('Contact form response:', { status: response.status, data });
            }
            
            return response.ok && !data.errors;
        } catch (error) {
            console.error('Formspree contact submission error:', error);
            return false;
        }
    }
    
    submitViaMailto(formData) {
        const subject = encodeURIComponent(`Contact Form: ${formData.subject} - ${formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Company: ${formData.company || 'Not specified'}\n` +
            `Subject: ${formData.subject}\n\n` +
            `Message:\n${formData.message}\n\n` +
            `---\n` +
            `Sent from: ${window.location.href}`
        );
        
        const fallbackEmail = window.NEWSLETTER_CONFIG?.fallbackEmail || 'usama7274@gmail.com';
        const mailtoLink = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
        
        window.open(mailtoLink);
        return true;
    }
    
    getFormData() {
        return {
            name: document.getElementById('contact-name').value.trim(),
            email: document.getElementById('contact-email').value.trim(),
            company: document.getElementById('contact-company').value.trim(),
            subject: document.getElementById('contact-subject').value,
            message: document.getElementById('contact-message').value.trim()
        };
    }
    
    validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.length < 2) {
            errors.push('Name must be at least 2 characters');
        }
        
        if (!data.email || !this.validateEmail(data.email)) {
            errors.push('Valid email is required');
        }
        
        if (!data.subject) {
            errors.push('Subject is required');
        }
        
        if (!data.message || data.message.length < 10) {
            errors.push('Message must be at least 10 characters');
        }
        
        if (errors.length > 0) {
            console.warn('Form validation errors:', errors);
            return false;
        }
        
        return true;
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    addFieldValidation() {
        const fields = ['contact-name', 'contact-email', 'contact-message'];
        
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => this.validateField(field));
                field.addEventListener('input', () => this.clearFieldError(field));
            }
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        switch (field.id) {
            case 'contact-name':
                isValid = value.length >= 2;
                errorMessage = 'Name must be at least 2 characters';
                break;
            case 'contact-email':
                isValid = this.validateEmail(value);
                errorMessage = 'Please enter a valid email address';
                break;
            case 'contact-message':
                isValid = value.length >= 10;
                errorMessage = 'Message must be at least 10 characters';
                break;
        }
        
        this.showFieldValidation(field, isValid, errorMessage);
    }
    
    showFieldValidation(field, isValid, errorMessage) {
        this.clearFieldError(field);
        
        if (!isValid) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            errorDiv.textContent = errorMessage;
            
            field.parentNode.appendChild(errorDiv);
        } else {
            field.classList.add('is-valid');
            field.classList.remove('is-invalid');
        }
    }
    
    clearFieldError(field) {
        field.classList.remove('is-invalid', 'is-valid');
        const errorDiv = field.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    enableAutoSave() {
        const fields = this.form.querySelectorAll('input, select, textarea');
        
        fields.forEach(field => {
            field.addEventListener('input', () => {
                const formData = this.getFormData();
                localStorage.setItem('contact_form_data', JSON.stringify(formData));
            });
        });
    }
    
    loadSavedData() {
        const savedData = localStorage.getItem('contact_form_data');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                document.getElementById('contact-name').value = data.name || '';
                document.getElementById('contact-email').value = data.email || '';
                document.getElementById('contact-company').value = data.company || '';
                document.getElementById('contact-subject').value = data.subject || '';
                document.getElementById('contact-message').value = data.message || '';
            } catch (error) {
                console.warn('Error loading saved form data:', error);
            }
        }
    }
    
    clearSavedData() {
        localStorage.removeItem('contact_form_data');
    }
    
    getFormspreeEndpoint() {
        return document.querySelector('meta[name="formspree-endpoint"]')?.content ||
               window.NEWSLETTER_CONFIG?.formspreeEndpoint ||
               null;
    }
    
    setLoading(loading) {
        if (loading) {
            this.btnText.style.display = 'none';
            this.btnLoading.classList.remove('d-none');
            this.btnLoading.style.display = 'inline';
            this.submitBtn.disabled = true;
        } else {
            this.btnText.style.display = 'inline';
            this.btnLoading.classList.add('d-none');
            this.btnLoading.style.display = 'none';
            this.submitBtn.disabled = false;
        }
    }
    
    showSuccess() {
        this.hideMessages();
        this.successMsg.classList.remove('d-none');
        
        // Auto-hide after 10 seconds
        setTimeout(() => this.hideMessages(), 10000);
    }
    
    showError(message) {
        this.hideMessages();
        this.errorMsg.querySelector('span').textContent = message;
        this.errorMsg.classList.remove('d-none');
        
        // Auto-hide after 8 seconds
        setTimeout(() => this.hideMessages(), 8000);
    }
    
    hideMessages() {
        this.successMsg.classList.add('d-none');
        this.errorMsg.classList.add('d-none');
    }
    
    trackSubmission(formData) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_form_submission', {
                'event_category': 'engagement',
                'event_label': formData.subject,
                'value': 1
            });
        }
        
        console.log('Contact form submitted:', formData.subject);
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ContactFormManager();
});

// Export for potential use in other scripts
window.ContactFormManager = ContactFormManager;
