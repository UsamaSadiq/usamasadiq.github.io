---
layout: home
title: "Usama Sadiq"
---

<div class="row">
  <aside class="col-md-4">
    <img src="/assets/images/profile.jpg" class="img-fluid rounded-circle mb-3" alt="Profile picture">
    <p>Backend Developer &amp; DevOps Engineer passionate about building scalable systems and automating workflows.</p>
    <strong>Key Skills</strong>
    <ul>
      <li>Python, Django, React</li>
      <li>Docker, Kubernetes, AWS</li>
    </ul>
    <p>
      <a href="https://github.com/usamasadiq" class="me-2"><i class="fab fa-github"></i></a>
      <a href="https://www.linkedin.com/in/usamasadiq" class="me-2"><i class="fab fa-linkedin"></i></a>
      <a href="https://twitter.com/usamasadiq"><i class="fab fa-twitter"></i></a>
    </p>
    <p><a class="btn btn-primary" href="/assets/resume.pdf">Download Resume</a></p>
    <button id="theme-toggle" class="btn btn-secondary mt-2">Toggle Theme</button>
  </aside>
  <div class="col-md-8">

Welcome to my personal portfolio built with [Jekyll](https://jekyllrb.com/).

## About Me

Hi! I'm Usama Sadiq — a passionate Backend Developer and DevOps Engineer who loves automating things, building scalable systems, and solving real-world problems through code. I'm currently working at Arbisoft, where I contribute to the edX project, dabble with AWS magic, and occasionally geek out over cool tech stuff. When I'm not knee-deep in Python or battling with Docker containers, you'll probably find me lost in a good book, binge-watching anime, or sketching out ideas for my next side project.

## Education

- **Bachelor of Science in Computer Science (BSCS)**, Information Technology University (ITU) Lahore, Pakistan, 2014–2018 — Graduated with honors focusing on software engineering, algorithms, and cloud computing technologies.

## Skills & Expertise

I have 6+ years of experience working with Python, Django, React, MySQL, Docker, AWS, Kubernetes, and CI/CD technologies. I specialize in building scalable backend systems and optimizing infrastructure. I am responsible for leading migrations, resolving high-priority issues, and developing tools that improve the developer experience.

Check out the [Projects](/projects/) page to see a showcase of my work or head over to the [Blog](/blog/) section for updates.

### Featured Projects
{% assign feat = site.projects | slice: 0,3 %}
<ul>
{% for project in feat %}
  <li><a href="{{ project.url }}">{{ project.title }}</a></li>
{% endfor %}
</ul>

### Latest Posts
<ul>
{% for post in site.posts limit:3 %}
  <li><a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date_to_string }}</li>
{% endfor %}
</ul>

  </div>
</div>

<script src="/assets/js/theme-toggle.js"></script>
