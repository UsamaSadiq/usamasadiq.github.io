---
layout: default
title: Projects
---

<div id="project-filters" class="mb-3">
  <button class="btn btn-secondary btn-sm me-2" data-filter="all">All</button>
  <button class="btn btn-secondary btn-sm me-2" data-filter="backend">Backend</button>
  <button class="btn btn-secondary btn-sm me-2" data-filter="devops">DevOps</button>
</div>
<ul id="project-list">
{% for project in site.projects %}
  <li data-tags="{{ project.tags | join:' ' }}"><a href="{{ project.url }}">{{ project.title }}</a></li>
{% endfor %}
</ul>

<script src="/assets/js/project-filter.js"></script>
