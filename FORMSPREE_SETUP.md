# Secure Formspree Setup with Environment Variables

## Quick Setup (5 minutes)

### Step 1: Create Formspree Account
1. Go to https://formspree.io
2. Sign up with your email
3. Verify your email address

### Step 2: Create Newsletter Form
1. Click "New Form" in your dashboard
2. Name it: "Newsletter Subscription"
3. Copy the form endpoint (it will look like: `https://formspree.io/f/xoqgzvzw`)

### Step 3: Configure Environment Variables (Secure Method)

#### Option A: Local Development
1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Formspree endpoint:
   ```bash
   # .env.local
   FORMSPREE_ENDPOINT=https://formspree.io/f/your_actual_form_id
   SITE_EMAIL=your_email@gmail.com
   DEBUG_MODE=true
   ```

#### Option B: GitHub Actions/Deployment
1. In your GitHub repository, go to Settings → Secrets and Variables → Actions
2. Add these repository secrets:
   - `FORMSPREE_ENDPOINT`: `https://formspree.io/f/your_form_id`
   - `SITE_EMAIL`: `your_email@gmail.com`

### Step 4: Update GitHub Actions (for production)

Add environment variables to your GitHub Actions workflow:

```yaml
# .github/workflows/pages-deploy.yml
- name: Build site
  run: bundle exec jekyll b -d "_site${{ steps.pages.outputs.base_path }}"
  env:
    JEKYLL_ENV: production
    FORMSPREE_ENDPOINT: ${{ secrets.FORMSPREE_ENDPOINT }}
    SITE_EMAIL: ${{ secrets.SITE_EMAIL }}
    DEBUG_MODE: false
```

### Step 5: Test the Integration
1. Run locally: `bundle exec jekyll serve`
2. Check browser console for: "✓ Loaded formspree_endpoint: https://formspree.io/f/..."
3. Try subscribing with a test email
4. Check your Formspree dashboard for the submission

## Security Benefits

✅ **No Secrets in Code**: Formspree endpoint never committed to repository  
✅ **Environment Isolation**: Different endpoints for dev/staging/production  
✅ **Team Collaboration**: Each developer can use their own test endpoint  
✅ **Rotation Ready**: Easy to change endpoints without code changes  

## File Structure

```
├── .env.example          # Template for environment variables
├── .env.local           # Your local secrets (gitignored)
├── .gitignore           # Ensures .env.local stays private
├── _plugins/environment_loader.rb  # Loads env vars into Jekyll
└── _includes/custom-scripts.html   # Uses env vars securely
```

## How It Works

1. **Jekyll Plugin** loads environment variables from `.env.local`
2. **Template Engine** injects secure values: `{{ site.formspree_endpoint }}`
3. **JavaScript** receives the endpoint without exposing secrets
4. **Formspree** receives submissions securely

## Development vs Production

**Development** (`.env.local`):
```bash
FORMSPREE_ENDPOINT=https://formspree.io/f/test_form_id
DEBUG_MODE=true
```

**Production** (GitHub Secrets):
```bash
FORMSPREE_ENDPOINT=https://formspree.io/f/production_form_id  
DEBUG_MODE=false
```

## Troubleshooting

**Newsletter not working?**
- Check console for: "Formspree endpoint configured from environment"
- Verify `.env.local` exists and has correct format
- Ensure no trailing spaces in environment variables
- Check Formspree dashboard for form status

**Environment variables not loading?**
- Restart Jekyll server after changing `.env.local`
- Check `_plugins/environment_loader.rb` exists
- Verify Jekyll isn't running in safe mode (which disables plugins)

**Getting 403 errors?**
- Ensure the Formspree form is published
- Check that your domain is configured in Formspree settings

## Next Steps

1. ✅ **Secure Configuration**: Environment variables set up
2. 🔄 **Test Newsletter**: Try the signup form
3. 📊 **Monitor Submissions**: Check Formspree dashboard
4. 🚀 **Deploy**: Push to production with GitHub secrets
5. 🎯 **Next Enhancement**: Achievement Badges system

## Support

Need help? Check:
- [Formspree Documentation](https://help.formspree.io/)
- [Jekyll Environment Variables](https://jekyllrb.com/docs/configuration/environments/)
- Browser console for debug messages
