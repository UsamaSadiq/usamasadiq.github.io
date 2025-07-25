---
layout: page
icon: fas fa-stream
order: 1
title: Categories
---

<style>
.categories-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}

.category-tree {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  margin-bottom: 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  background: var(--card-bg);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.category-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.category-header {
  padding: 20px;
  background: linear-gradient(135deg, var(--heading-color) 0%, var(--text-color) 100%);
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1.1em;
  transition: all 0.3s ease;
}

.category-header:hover {
  background: linear-gradient(135deg, var(--text-color) 0%, var(--heading-color) 100%);
}

.category-icon {
  font-size: 1.2em;
  margin-right: 10px;
}

.category-count {
  background: rgba(255,255,255,0.2);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85em;
  font-weight: 500;
}

.expand-icon {
  transition: transform 0.3s ease;
  font-size: 0.9em;
}

.category-item.expanded .expand-icon {
  transform: rotate(180deg);
}

.posts-container {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.3s ease;
  background: var(--card-bg);
}

.category-item.expanded .posts-container {
  max-height: 1000px;
  padding: 20px;
}

.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.post-item:last-child {
  border-bottom: none;
}

.post-item:hover {
  padding-left: 10px;
  background: var(--hover-bg, rgba(0,0,0,0.05));
}

.post-link {
  color: var(--text-color);
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
}

.post-link:hover {
  color: var(--link-color);
  text-decoration: none;
}

.post-date {
  color: var(--text-color-secondary);
  font-size: 0.85em;
  font-weight: 400;
}

.post-tags {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.post-tag {
  background: var(--tag-bg, #f0f0f0);
  color: var(--tag-color, #666);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75em;
  font-weight: 500;
}

/* Dark mode adjustments */
[data-mode="dark"] .category-header {
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
}

[data-mode="dark"] .category-header:hover {
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
}

[data-mode="dark"] .post-item:hover {
  background: rgba(255,255,255,0.05);
}

/* Animation for initial load */
.category-item {
  opacity: 0;
  animation: fadeInUp 0.5s ease forwards;
}

.category-item:nth-child(1) { animation-delay: 0.1s; }
.category-item:nth-child(2) { animation-delay: 0.2s; }
.category-item:nth-child(3) { animation-delay: 0.3s; }
.category-item:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .categories-container {
    padding: 10px;
  }
  
  .category-header {
    padding: 15px;
    font-size: 1em;
  }
  
  .posts-container {
    padding: 15px;
  }
  
  .post-link {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}
</style>

<div class="categories-container">
  <div class="page-header">
    <h1>📂 Browse by Categories</h1>
    <p>Explore posts organized by topic. Click on any category to expand and view related posts.</p>
  </div>

  <ul class="category-tree">
    {% assign categories_list = site.categories | sort %}
    {% for category in categories_list %}
      {% assign category_name = category[0] %}
      {% assign posts = category[1] %}
      
      <li class="category-item" data-category="{{ category_name }}">
        <div class="category-header" onclick="toggleCategory(this)">
          <div style="display: flex; align-items: center;">
            {% case category_name %}
              {% when 'projects' %}
                <span class="category-icon">🚀</span>
              {% when 'frontend' %}
                <span class="category-icon">🎨</span>
              {% when 'backend' %}
                <span class="category-icon">⚙️</span>
              {% when 'python' %}
                <span class="category-icon">🐍</span>
              {% when 'javascript' %}
                <span class="category-icon">📜</span>
              {% when 'react' %}
                <span class="category-icon">⚛️</span>
              {% else %}
                <span class="category-icon">📁</span>
            {% endcase %}
            <span>{{ category_name | capitalize }}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="category-count">{{ posts.size }} post{% if posts.size != 1 %}s{% endif %}</span>
            <span class="expand-icon">▼</span>
          </div>
        </div>
        
        <div class="posts-container">
          <ul class="post-list">
            {% assign sorted_posts = posts | sort: 'date' | reverse %}
            {% for post in sorted_posts %}
              <li class="post-item">
                <a href="{{ post.url | relative_url }}" class="post-link">
                  <span>{{ post.title }}</span>
                  <span class="post-date">{{ post.date | date: "%b %d, %Y" }}</span>
                </a>
                {% if post.tags.size > 0 %}
                  <div class="post-tags">
                    {% for tag in post.tags limit: 4 %}
                      <span class="post-tag">{{ tag }}</span>
                    {% endfor %}
                  </div>
                {% endif %}
              </li>
            {% endfor %}
          </ul>
        </div>
      </li>
    {% endfor %}
  </ul>
</div>

<script>
function toggleCategory(header) {
  const categoryItem = header.parentElement;
  const isExpanded = categoryItem.classList.contains('expanded');
  
  // Close all other categories first (accordion behavior)
  document.querySelectorAll('.category-item.expanded').forEach(item => {
    if (item !== categoryItem) {
      item.classList.remove('expanded');
    }
  });
  
  // Toggle current category
  categoryItem.classList.toggle('expanded', !isExpanded);
  
  // Add some visual feedback
  if (!isExpanded) {
    setTimeout(() => {
      categoryItem.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }, 200);
  }
}

// Auto-expand if URL has hash for specific category
document.addEventListener('DOMContentLoaded', function() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    const categoryItem = document.querySelector(`[data-category="${hash}"]`);
    if (categoryItem) {
      categoryItem.classList.add('expanded');
      setTimeout(() => {
        categoryItem.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 500);
    }
  }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.category-item.expanded').forEach(item => {
      item.classList.remove('expanded');
    });
  }
});
</script>
