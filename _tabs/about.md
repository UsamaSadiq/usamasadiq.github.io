---
# the default layout is 'page'
icon: fas fa-info-circle
order: 1
---

<link rel="stylesheet" href="{{ '/assets/css/project-styles.css' | relative_url }}">

Hi, I'm Usama Sadiq, Principal Software Engineer, Open edX Core Contributor, and hands-on Python/Django + DevOps specialist with over 6 years of experience in building and scaling modern web infrastructure.

I bring a unique combination of backend engineering expertise, cloud-native DevOps practices, and open-source leadership to every initiative I work on.
- 📄 [Download My Resume](/assets/resume.pdf) - Get a comprehensive overview of my experience and skills.

---

## 🌱 My Journey

Coming from a humble background, I began my journey as a factory worker and assistant. With the help of scholarships, mentorship, and community support, I earned my degree in Computer Science from Information Technology University, Lahore.

What started as curiosity became a career of purpose. From freelancing and research internships to leading open-source initiatives and enterprise deployments, I’ve grown by solving real-world problems with code.

---

## 🚀 What I Do

- **Backend Engineering**: I design scalable APIs using Python, Django, and Django REST Framework.
- **Cloud and DevOps**: I work extensively with AWS services (ECS, Lambda, RDS, CloudWatch, S3), CI/CD automation, Docker, and Kubernetes.
- **Open edX Leadership**: I am a recognized core contributor and community leader in the Open edX ecosystem, regularly involved in strategic upgrades, migration efforts, and process standardization.

---

## 🛠️ Technical & Soft Skills

- **Languages & Frameworks**: Python, Django, Django REST Framework, Pandas, NumPy, React.js
- **Cloud & DevOps**: AWS (ECS, Lambda, RDS, CloudWatch, S3, IAM, Secrets Manager), Docker, GitHub Actions, Kubernetes, ArgoCD, Jenkins, GoCD, Ansible, Datadog, Splunk, NewRelic
- **Soft Skills**: Technical documentation, mentorship, cross-team collaboration, public speaking, project leadership, community engagement

---

## 👥 Leadership in Open edX

Over the years, I’ve played an active role in improving the developer experience and ecosystem stability for Open edX:

- **Community Leadership**: Championed platform-wide upgrades and modernization projects. Led by example and supported contributors across time zones.
- **Speaker & Advocate**: Delivered technical talks at Open edX conferences, presenting tools, best practices, and sharing behind-the-scenes of high-impact efforts.
- **Mentorship & Onboarding**: Helped onboard new contributors by documenting workflows, simplifying tooling, and guiding them through their first PRs.
- **Standardization & Automation**: Built codemods, scripts, and bots to automate repetitive tasks like PR creation, version bumps, and repository tracking.

---

## 🔧 Highlight Projects

<div class="projects-grid">

<div class="project-highlight-card">
<div class="project-icon">🐍</div>
<h3>Python 3.12 Platform Upgrade</h3>
<p>Led the Python 3.12 migration across 10+ critical Open edX services and internal tools.</p>
<ul>
<li>Audited dependencies, submitted patches to incompatible upstream packages, and tested under new runtimes.</li>
<li>Rebuilt Docker images to support Python 3.12, ensured backward compatibility, and upgraded CI workflows accordingly.</li>
<li>Managed risk across distributed teams by coordinating test freezes, staggered rollouts, and fallback strategies.</li>
<li>Used CI runners and codemods introduced in earlier projects to accelerate the migration effort.</li>
</ul>
</div>

<div class="project-highlight-card">
<div class="project-icon">📊</div>
<h3>Real-Time Analytics Dashboard</h3>
<p>Architected a real-time analytics system by integrating RESTful APIs, leveraging Pandas for transformation and computation, and deploying compute logic using AWS Lambda.</p>
<ul>
<li>Configured AWS CloudWatch to monitor application metrics and set up alerts for anomalies.</li>
<li>Designed data flows that minimized latency and supported on-demand insights for stakeholders.</li>
<li>Collaborated with frontend developers to expose meaningful data visualizations for operational decision-making.</li>
<li>Acted as a performance lead to trace bottlenecks and optimize Lambda cold start impact.</li>
</ul>
</div>

<div class="project-highlight-card">
<div class="project-icon">☁️</div>
<h3>Serverless Data Pipeline</h3>
<p>Led the design and deployment of a fully serverless, event-driven data pipeline using AWS Lambda, S3, and Secrets Manager.</p>
<ul>
<li>Embedded robust error handling and monitoring with CloudWatch logs and custom metrics.</li>
<li>Integrated API responses with data transformation logic using Pandas, achieving scalability under fluctuating workloads.</li>
<li>Authored modular Lambda functions reusable across Open edX monitoring tools and data ingestion components.</li>
<li>Shared this design pattern with the team to inform best practices for other AWS-native projects, including the CI autoscaler and health dashboards.</li>
</ul>
</div>

<div class="project-highlight-card">
<div class="project-icon">🐳</div>
<h3>Containerization and Environment Unification</h3>
<p>Migrated over 8 monolithic or script-based services into standardized Docker containers.</p>
<ul>
<li>Unified development, staging, and production environments to eliminate "works on my machine" issues.</li>
<li>Refactored legacy Ansible scripts into clean Dockerfiles and docker-compose configurations.</li>
<li>Reduced onboarding time for new developers by introducing a self-contained dev environment.</li>
<li>Coordinated with QA and DevOps to build GitHub Actions-based integration pipelines.</li>
</ul>
</div>

<div class="project-highlight-card">
<div class="project-icon">📈</div>
<h3>Open edX Repo Health Dashboard</h3>
<p>Created the <strong>Repo Health Dashboard</strong>, a pivotal internal tool to surface real-time insights across 150+ Open edX repositories.</p>
<ul>
<li>Visualized repository health, Django upgrade status, stale PRs, CI failures, and contribution trends.</li>
<li>Integrated data scraping, transformation, and S3-hosted frontend as part of a scalable pipeline.</li>
<li>Presented this tool at the <strong>Open edX Conference 2024</strong>, promoting it as a community alignment enabler and modernization compass.</li>
<li>Extended the dashboard to auto-fetch GitHub data using scheduled workflows on GitHub Actions.</li>
</ul>
</div>

<div class="project-highlight-card">
<div class="project-icon">🧩</div>
<h3>Coordinated Django Upgrade Across Open edX</h3>
<p>Spearheaded the ecosystem-wide transition to modern Django versions.</p>
<ul>
<li>Established a baseline version matrix for 150+ repos and created automation to track upgrade status.</li>
<li>Reviewed, refactored, and merged dozens of PRs from community contributors, ensuring consistency.</li>
<li>Developed codemods and reusable upgrade scripts used by multiple teams.</li>
<li>Triaged CI failures with custom test matrices and Docker runtime adjustments, working closely with CI and infrastructure teams.</li>
</ul>
</div>

<div class="project-highlight-card">
<div class="project-icon">🔄</div>
<h3>CI/CD Revamp and GitHub Actions Migration</h3>
<p>Transformed the CI/CD architecture by replacing legacy Jenkins, CircleCI, and Travis CI pipelines with GitHub Actions.</p>
<ul>
<li>Set up autoscaling GitHub runners on AWS EKS using Kubernetes, HPA, and cluster-autoscaler integrations.</li>
<li>Authored shared GitHub Actions consumed across internal and community repositories to ensure consistency.</li>
<li>Documented the full CI stack migration to help onboard Open edX community members.</li>
<li>Reduced CI cost and improved reliability, unlocking faster feedback cycles for developers.</li>
</ul>
</div>

</div>

---

Thanks for reading. I’m always open to connect, collaborate, or share ideas. 