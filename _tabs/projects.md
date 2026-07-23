---
# the default layout is 'page'
icon: fas fa-code
order: 3
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

.project-status-flag {
  background: #f59e0b;
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

.section-heading {
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--card-border-color);
  font-size: 1.5rem;
  font-weight: 600;
}
</style>

# My Projects

A selection of work I have led or owned, organized by impact. The flagship Open edX and cloud work below reflects my day-to-day engineering. Side projects are kept at the bottom.

<div class="section-heading">Open edX Ecosystem</div>
<div class="projects-grid">

  <div class="project-card">
    <div class="project-status project-status-flag">Flagship</div>
    <div class="project-header">
      <div class="project-icon">📈</div>
      <h3 class="project-title">Open edX Org Health Dashboard</h3>
    </div>
    <p class="project-description">
      A real-time dashboard aggregating CI/CD status, dependency compliance, Django upgrade progress, and contribution trends across 150+ Open edX repositories. Presented at Open edX Conference 2024.
    </p>
    <div class="project-tech">
      <span class="tech-tag">Python</span>
      <span class="tech-tag">Pandas</span>
      <span class="tech-tag">AWS Lambda</span>
      <span class="tech-tag">S3</span>
      <span class="tech-tag">GitHub Actions</span>
    </div>
    <div class="project-actions">
      <a href="https://github.com/UsamaSadiq/org-health-dashboard" class="project-btn project-btn-primary" target="_blank" rel="noopener">💻 View Source</a>
    </div>
  </div>

  <div class="project-card">
    <div class="project-header">
      <div class="project-icon">🐍</div>
      <h3 class="project-title">Python 3.12 Platform Upgrade</h3>
    </div>
    <p class="project-description">
      Led the Python 3.12 migration across 10+ critical Open edX services. Audited dependencies, submitted upstream patches, rebuilt Docker images, and coordinated staggered rollouts across distributed teams.
    </p>
    <div class="project-tech">
      <span class="tech-tag">Python 3.12</span>
      <span class="tech-tag">Docker</span>
      <span class="tech-tag">Codemods</span>
      <span class="tech-tag">CI/CD</span>
    </div>
  </div>

  <div class="project-card">
    <div class="project-header">
      <div class="project-icon">🧩</div>
      <h3 class="project-title">Django Ecosystem Upgrade</h3>
    </div>
    <p class="project-description">
      Coordinated the Django 4.2 upgrade across 150+ Open edX repositories. Built reusable codemods, refactored dozens of PRs from community contributors, and established a baseline version matrix with automated progress tracking.
    </p>
    <div class="project-tech">
      <span class="tech-tag">Django 4.2</span>
      <span class="tech-tag">Python</span>
      <span class="tech-tag">Refactoring</span>
      <span class="tech-tag">Code Review</span>
    </div>
  </div>

  <div class="project-card">
    <div class="project-header">
      <div class="project-icon">🔄</div>
      <h3 class="project-title">CI/CD Revamp and GitHub Actions Migration</h3>
    </div>
    <p class="project-description">
      Replaced legacy Jenkins, CircleCI, and Travis CI pipelines with GitHub Actions across the Open edX ecosystem. Built self-hosted autoscaling runners on AWS EKS with Kubernetes, HPA, and cluster autoscaler.
    </p>
    <div class="project-tech">
      <span class="tech-tag">GitHub Actions</span>
      <span class="tech-tag">AWS EKS</span>
      <span class="tech-tag">Kubernetes</span>
      <span class="tech-tag">HPA</span>
      <span class="tech-tag">Helm</span>
    </div>
  </div>

</div>

<div class="section-heading">Cloud and Platform</div>
<div class="projects-grid">

  <div class="project-card">
    <div class="project-status project-status-flag">Flagship</div>
    <div class="project-header">
      <div class="project-icon">☁️</div>
      <h3 class="project-title">Commercial AI Document Validation Platform</h3>
    </div>
    <p class="project-description">
      Senior Cloud Architect and DevOps Lead for a cloud-native AWS-based AI document validation system (client name private). Owns infrastructure topology, multi-environment CI/CD, and AWS service selection. The live bridge to the MLOps trajectory.
    </p>
    <div class="project-tech">
      <span class="tech-tag">AWS Lambda</span>
      <span class="tech-tag">RDS</span>
      <span class="tech-tag">Aurora</span>
      <span class="tech-tag">ECS</span>
      <span class="tech-tag">Docker</span>
      <span class="tech-tag">CI/CD</span>
    </div>
  </div>

  <div class="project-card">
    <div class="project-header">
      <div class="project-icon">📊</div>
      <h3 class="project-title">Real-Time Analytics Dashboard</h3>
    </div>
    <p class="project-description">
      Architected a real-time analytics system integrating RESTful APIs, Pandas for transformation, and AWS Lambda for compute. CloudWatch monitoring and custom metrics for operational visibility.
    </p>
    <div class="project-tech">
      <span class="tech-tag">AWS Lambda</span>
      <span class="tech-tag">Python</span>
      <span class="tech-tag">Pandas</span>
      <span class="tech-tag">CloudWatch</span>
    </div>
  </div>

  <div class="project-card">
    <div class="project-header">
      <div class="project-icon">🌐</div>
      <h3 class="project-title">Serverless Data Pipeline</h3>
    </div>
    <p class="project-description">
      Event-driven data pipeline using AWS Lambda, S3, and Secrets Manager with Pandas-based transformation. Authored modular Lambda functions reusable across Open edX monitoring and data ingestion.
    </p>
    <div class="project-tech">
      <span class="tech-tag">AWS Lambda</span>
      <span class="tech-tag">S3</span>
      <span class="tech-tag">Secrets Manager</span>
      <span class="tech-tag">Pandas</span>
    </div>
  </div>

</div>

<div class="section-heading">Concurrent Open Source: Pressingly</div>
<div class="projects-grid">

  <div class="project-card">
    <div class="project-status project-status-flag">Flagship</div>
    <div class="project-header">
      <div class="project-icon">🔐</div>
      <h3 class="project-title">mpass-auth-proxy</h3>
    </div>
    <p class="project-description">
      The unified corporate SSO integration layer for the Pressingly FOSS bundle. Enforces corporate_id claim validation across authentication middleware in Twenty, Plane, Outline, Penpot, and SurfSense. Bypasses Cognito hosted UI for federated IdPs.
    </p>
    <div class="project-tech">
      <span class="tech-tag">Python</span>
      <span class="tech-tag">OAuth</span>
      <span class="tech-tag">OpenID Connect</span>
      <span class="tech-tag">Cognito</span>
      <span class="tech-tag">SSO</span>
    </div>
  </div>

  <div class="project-card">
    <div class="project-header">
      <div class="project-icon">🤖</div>
      <h3 class="project-title">MCP Server Implementations</h3>
    </div>
    <p class="project-description">
      Built and shipped Model Context Protocol (MCP) servers for SurfSense, Plane, and Outline with mPass support, enabling AI coding tools to interact with these services natively.
    </p>
    <div class="project-tech">
      <span class="tech-tag">MCP</span>
      <span class="tech-tag">Python</span>
      <span class="tech-tag">OAuth</span>
      <span class="tech-tag">AI Tooling</span>
    </div>
    <div class="project-actions">
      <a href="https://github.com/UsamaSadiq/surfsense-mcp-server" class="project-btn project-btn-secondary" target="_blank" rel="noopener">SurfSense MCP</a>
    </div>
  </div>

  <div class="project-card">
    <div class="project-header">
      <div class="project-icon">🚀</div>
      <h3 class="project-title">foss-sandbox to foss-main Promotion Pipeline</h3>
    </div>
    <p class="project-description">
      Implemented the gated promotion path for staging-to-production releases across the Pressingly FOSS bundle, standardizing how changes move from sandboxes to production.
    </p>
    <div class="project-tech">
      <span class="tech-tag">CI/CD</span>
      <span class="tech-tag">GitHub Actions</span>
      <span class="tech-tag">Release Engineering</span>
    </div>
  </div>

</div>

<div class="section-heading">Side Projects</div>
<div class="projects-grid">

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

</div>
