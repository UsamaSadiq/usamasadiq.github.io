---
layout: default
title: Projects
---

<ul>
{% for project in site.projects %}
  <li><a href="{{ project.url }}">{{ project.title }}</a></li>
{% endfor %}
</ul>
