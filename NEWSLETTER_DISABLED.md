# Newsletter Feature - Temporarily Disabled

This document lists all the newsletter-related components that have been moved to the `_disabled` folder for later re-enablement.

## Disabled Files (moved to _disabled folder)

### 1. Newsletter Tab
- **File**: `_disabled/tabs/newsletter.md` (was `_tabs/newsletter.md`)
- **Description**: The main newsletter subscription page
- **To re-enable**: Move back to `_tabs/newsletter.md`

### 2. Newsletter Component
- **File**: `_disabled/includes/newsletter-signup.html` (was `_includes/newsletter-signup.html`)
- **Description**: The newsletter subscription form component
- **To re-enable**: Move back to `_includes/newsletter-signup.html`

### 3. Newsletter JavaScript
- **File**: `_disabled/assets/js/newsletter.js` (was `assets/js/newsletter.js`)
- **Description**: JavaScript functionality for newsletter subscription handling
- **To re-enable**: Move back to `assets/js/newsletter.js`

### 4. Newsletter Setup Documentation
- **File**: `_disabled/docs/NEWSLETTER_SETUP.md` (was `NEWSLETTER_SETUP.md`)
- **Description**: Documentation for configuring newsletter backends
- **To re-enable**: Move back to `NEWSLETTER_SETUP.md`

## Commented Out Code

### 1. Custom Scripts Include (`_includes/custom-scripts.html`)
```html
<!-- Newsletter Subscription - COMMENTED OUT FOR LATER USE -->
<!-- <script src="{{ '/assets/js/newsletter.js' | relative_url }}" defer></script> -->

<!-- Formspree Configuration - COMMENTED OUT FOR LATER USE -->
<!-- [entire newsletter configuration script block] -->
```

### 2. Site Configuration (`_config.yml`)
```yaml
# Newsletter Configuration (Environment Variables) - COMMENTED OUT FOR LATER USE
# Set FORMSPREE_ENDPOINT environment variable or configure below
# formspree_endpoint: # Will be populated from environment variable
# email: usama7274@gmail.com # Fallback email
# debug_mode: true # Set to false in production
```

## Re-enabling Newsletter Feature

To re-enable the newsletter functionality:

1. **Move disabled files back** (from `_disabled` folder):
   ```bash
   mv _disabled/tabs/newsletter.md _tabs/newsletter.md
   mv _disabled/includes/newsletter-signup.html _includes/newsletter-signup.html
   mv _disabled/assets/js/newsletter.js assets/js/newsletter.js
   mv _disabled/docs/NEWSLETTER_SETUP.md NEWSLETTER_SETUP.md
   ```

2. **Uncomment code in `_includes/custom-scripts.html`**:
   - Uncomment the newsletter script include
   - Uncomment the entire newsletter configuration script block

3. **Uncomment configuration in `_config.yml`**:
   - Uncomment the newsletter configuration section

4. **Configure backend** (if needed):
   - Set up Formspree, Netlify Forms, or other email service
   - Update configuration variables

5. **Test functionality**:
   - Check newsletter signup form
   - Verify email delivery
   - Test error handling

## Notes

- All newsletter functionality has been safely disabled without deleting any code
- The feature can be quickly re-enabled by following the steps above
- Documentation and setup files are preserved for reference
- No data or configuration has been lost

## Status

✅ Newsletter feature disabled successfully  
📝 All code preserved and documented  
🔄 Ready for easy re-enablement when needed
