/**
 * Project Showcase Enhancements
 * Adds interactive features to the projects page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll to project links
    const projectLinks = document.querySelectorAll('a[href*="/projects/"]');
    projectLinks.forEach(link => {
        if (link.href.includes('/projects/flashmaster/')) {
            // Add external link indicator for live apps
            link.classList.add('external-project');
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Add launch icon if not already present
            if (!link.innerHTML.includes('🚀')) {
                link.innerHTML = link.innerHTML.replace('Launch Application', '🚀 Launch Application');
            }
        }
    });

    // Add copy-to-clipboard for project URLs
    const projectUrls = document.querySelectorAll('.project-url');
    projectUrls.forEach(url => {
        url.addEventListener('click', function(e) {
            e.preventDefault();
            navigator.clipboard.writeText(this.href).then(() => {
                // Show brief feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 1000);
            });
        });
    });

    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card, .highlight');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add keyboard navigation for project links
    document.addEventListener('keydown', function(e) {
        if (e.key === 'p' && e.ctrlKey) {
            e.preventDefault();
            const projectsTab = document.querySelector('a[href="/projects/"]');
            if (projectsTab) {
                window.location.href = '/projects/';
            }
        }
    });
});

// Project analytics (simple page view tracking)
if (window.location.pathname.includes('/projects/')) {
    console.log('Project page viewed:', window.location.pathname);
}
