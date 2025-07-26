---
# the default layout is 'page'
icon: fas fa-code
order: 2
---

<style>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.project-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border-color);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: var(--link-color);
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

.project-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.project-icon {
  font-size: 1.5rem;
  margin-right: 0.75rem;
  color: var(--link-color);
}

.project-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--heading-color);
}

.project-description {
  color: var(--text-muted-color);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: var(--tag-bg);
  color: var(--tag-color);
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
}

.project-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}

.project-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  text-align: center;
  flex: 1;
}

.project-btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.project-btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  color: white;
  text-decoration: none;
}

.project-btn-secondary {
  background: transparent;
  border: 1px solid var(--card-border-color);
  color: var(--text-color);
}

.project-btn-secondary:hover {
  background: var(--button-bg);
  color: var(--text-color);
  text-decoration: none;
}

.project-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.5rem;
  background: #10b981;
  color: white;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Dark mode adjustments */
[data-mode="dark"] .project-card {
  --card-bg: #1e1e2e;
  --card-border-color: #313244;
  --tag-bg: #313244;
  --tag-color: #cdd6f4;
  --button-bg: #313244;
}

[data-mode="light"] .project-card {
  --card-bg: #ffffff;
  --card-border-color: #e5e7eb;
  --tag-bg: #f3f4f6;
  --tag-color: #374151;
  --button-bg: #f9fafb;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .project-actions {
    flex-direction: column;
  }
}
</style>

# My Projects

Welcome to my projects showcase! Here you'll find live demonstrations and detailed information about the applications and tools I've built.

<div class="projects-grid">
  <!-- Flashmaster Project Card -->
  <div class="project-card">
    <div class="project-status">Live Demo</div>
    <div class="project-header">
      <div class="project-icon">⚡</div>
      <h3 class="project-title">Flashmaster</h3>
    </div>
    <p class="project-description">
      Interactive learning application built with React and TypeScript. Practice programming concepts through dynamic flashcards covering Python, JavaScript, React, and more technologies.
    </p>
    <div class="project-tech">
      <span class="tech-tag">React</span>
      <span class="tech-tag">TypeScript</span>
      <span class="tech-tag">JSON</span>
      <span class="tech-tag">CSS3</span>
    </div>
    <div class="project-actions">
      <a href="/projects/flashmaster/" class="project-btn project-btn-primary">🚀 Launch App</a>
      <a href="/posts/flashmaster-learning-app/" class="project-btn project-btn-secondary">📖 Read More</a>
    </div>
  </div>

  <!-- edX Scraper Project Card -->
  <div class="project-card">
    <div class="project-header">
      <div class="project-icon">🔍</div>
      <h3 class="project-title">edX Institution Scraper</h3>
    </div>
    <p class="project-description">
      Advanced Python web scraper that extracts course information from edX institutions using Selenium WebDriver. Features dynamic content handling, robust element selection, incremental CSV export, and comprehensive error recovery for educational research and analytics.
    </p>
    <div class="project-tech">
      <span class="tech-tag">Python</span>
      <span class="tech-tag">Selenium</span>
      <span class="tech-tag">Pandas</span>
      <span class="tech-tag">Web Scraping</span>
    </div>
    <div class="project-actions">
      <a href="/posts/edx-institution-course-scraper/" class="project-btn project-btn-primary">📖 Read Blog Post</a>
      <a href="/projects/edx-scraper/" class="project-btn project-btn-secondary">💻 View Source</a>
    </div>
  </div>

  <!-- Template for Future Projects (Comment for reference) -->
  <!--
  <div class="project-card">
    <div class="project-status">Coming Soon</div>
    <div class="project-header">
      <div class="project-icon">🆕</div>
      <h3 class="project-title">New Project Title</h3>
    </div>
    <p class="project-description">
      Brief description of your new project...
    </p>
    <div class="project-tech">
      <span class="tech-tag">Tech1</span>
      <span class="tech-tag">Tech2</span>
    </div>
    <div class="project-actions">
      <a href="#" class="project-btn project-btn-primary">🚀 Live Demo</a>
      <a href="#" class="project-btn project-btn-secondary">📖 Read More</a>
    </div>
  </div>
  -->
</div>

<!-- ## How to Add New Projects

To add a new project card, simply copy the template above and customize:

1. **Project Status**: `Live Demo`, `In Progress`, `Coming Soon`, etc.
2. **Icon**: Choose an appropriate emoji or FontAwesome icon
3. **Title**: Project name
4. **Description**: Brief, engaging description
5. **Tech Stack**: Add relevant technology tags
6. **Actions**: Link to live demo, blog post, or GitHub repo -->
