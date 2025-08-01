---
layout: page
title: Achievements
icon: fas fa-trophy
order: 5
---

<div class="achievements-container">
  {% for category in site.data.achievements.categories %}
  <section class="mb-5">
    <!-- Category Header -->
    <div class="d-flex align-items-center mb-4">
      <i class="{{ category.icon }} me-3 text-primary" style="font-size: 1.75rem;"></i>
      <div>
        <h2 class="mb-1">{{ category.name }}</h2>
        <p class="text-muted mb-0">{{ category.description }}</p>
      </div>
    </div>
    
    <!-- Simple Logo Images for Testing -->
    <div class="row">
      {% for badge in category.badges %}
      <div class="col-md-3 mb-3">
        <div class="text-center">
          <img src="{{ badge.icon }}" alt="{{ badge.name }}" class="achievement-logo-hover" style="width: 120px; height: 120px; object-fit: contain; display: block; margin: 0 auto; border-radius: 10px; padding: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.3s ease; cursor: pointer;">
          <p class="mt-2"><strong>{{ badge.name }}</strong></p>
          <small class="text-muted">{{ badge.description }}</small>
        </div>
      </div>
      {% endfor %}
    </div>
  </section>
  {% endfor %}
</div>

<style>
/* Hover animation for achievement logos */
.achievement-logo-hover:hover {
  transform: scale(1.15);
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  border-radius: 15px;
}

/* Optional: Add a subtle glow effect */
.achievement-logo-hover:hover {
  transform: scale(1.15);
  box-shadow: 0 8px 20px rgba(0,0,0,0.25), 0 0 0 3px rgba(59, 130, 246, 0.1);
  border-radius: 15px;
}

/* Smooth transition for the container on hover */
.col-md-3:hover {
  z-index: 10;
}
</style>
