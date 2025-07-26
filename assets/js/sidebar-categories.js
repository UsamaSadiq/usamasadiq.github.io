/**
 * Sidebar Categories Manager
 * Adds categories list to the sidebar dynamically
 */

class SidebarCategoriesManager {
    constructor() {
        // Prevent multiple instances
        if (window.sidebarCategoriesInstance) {
            return window.sidebarCategoriesInstance;
        }
        
        this.isInitialized = false;
        this.init();
        window.sidebarCategoriesInstance = this;
    }
    
    init() {
        // Prevent multiple initializations
        if (this.isInitialized) {
            return;
        }
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.addCategoriesToSidebar());
        } else {
            this.addCategoriesToSidebar();
        }
        
        this.isInitialized = true;
    }
    
    addCategoriesToSidebar() {
        // Use more specific selector to avoid conflicts
        const sidebar = document.querySelector('#sidebar .sidebar-bottom, #sidebar');
        
        // Only add if sidebar exists and categories not already present
        if (sidebar && !document.querySelector('#sidebar .sidebar-categories')) {
            this.fetchCategoriesData()
                .then(categories => {
                    if (categories.length > 0) {
                        const categoriesHTML = this.generateCategoriesHTML(categories);
                        
                        // Insert at the beginning of sidebar
                        if (sidebar.classList.contains('sidebar-bottom')) {
                            sidebar.insertAdjacentHTML('afterbegin', categoriesHTML);
                        } else {
                            // If no sidebar-bottom, insert at the end of sidebar
                            sidebar.insertAdjacentHTML('beforeend', categoriesHTML);
                        }
                    }
                })
                .catch(error => {
                    console.warn('Could not load categories for sidebar:', error);
                });
        }
    }
    
    async fetchCategoriesData() {
        // Use the categories data injected from Jekyll
        if (window.SITE_CATEGORIES && window.SITE_CATEGORIES.length > 0) {
            return window.SITE_CATEGORIES.slice(0, 8);
        }
        
        // Fallback: Try to get categories from meta tags (if available)
        const categoriesMeta = document.querySelector('meta[name="site-categories"]');
        if (categoriesMeta) {
            try {
                return JSON.parse(categoriesMeta.content);
            } catch (e) {
                console.warn('Could not parse categories meta data');
            }
        }
        
        // Try to extract from existing category links on the page
        const categoryLinks = document.querySelectorAll('a[href*="/categories/"]');
        const categories = new Map();
        
        categoryLinks.forEach(link => {
            const href = link.getAttribute('href');
            const match = href.match(/\/categories\/([^\/]+)\/?$/);
            if (match) {
                const categorySlug = match[1];
                const categoryName = categorySlug.replace(/-/g, ' ');
                const postCount = this.extractPostCount(link);
                
                if (!categories.has(categorySlug)) {
                    categories.set(categorySlug, {
                        name: this.capitalizeWords(categoryName),
                        slug: categorySlug,
                        count: postCount || 1
                    });
                }
            }
        });
        
        return Array.from(categories.values()).slice(0, 8);
    }
    
    extractPostCount(link) {
        // Try to find post count in the link text or nearby elements
        const text = link.textContent;
        const countMatch = text.match(/\((\d+)\)/);
        if (countMatch) {
            return parseInt(countMatch[1]);
        }
        
        // Check for count in nearby elements
        const parent = link.closest('.category-card, .category-item, .post-meta');
        if (parent) {
            const countElement = parent.querySelector('.post-count, .count');
            if (countElement) {
                const count = parseInt(countElement.textContent);
                if (!isNaN(count)) return count;
            }
        }
        
        return 1; // Default count
    }
    
    capitalizeWords(str) {
        return str.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
    }
    
    generateCategoriesHTML(categories) {
        const sortedCategories = categories.sort((a, b) => b.count - a.count);
        
        const categoriesItems = sortedCategories.map(category => `
            <a href="/categories/${category.slug}/" class="category-item">
                <span class="category-name">${category.name}</span>
                <span class="post-count">${category.count}</span>
            </a>
        `).join('');
        
        return `
            <div class="sidebar-categories">
                <h6 class="sidebar-heading">
                    <i class="fas fa-folder-open me-2"></i>Categories
                </h6>
                <div class="categories-list">
                    ${categoriesItems}
                </div>
            </div>
        `;
    }
}

// Auto-initialize when script loads, but only once
if (!window.sidebarCategoriesInitialized) {
    new SidebarCategoriesManager();
    window.sidebarCategoriesInitialized = true;
}

// Export for potential use in other scripts
window.SidebarCategoriesManager = SidebarCategoriesManager;
