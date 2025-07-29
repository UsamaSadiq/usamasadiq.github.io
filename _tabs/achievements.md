---
layout: page
title: Achievements
icon: fas fa-trophy
order: 4
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
    
    <!-- Badges Grid -->
    <div class="row g-4">
      {% for badge in category.badges %}
      <div class="col-lg-4 col-md-6">
        <div class="card h-100 border-0 shadow-sm achievement-card">
          <div class="card-body p-4">
            <!-- Badge Header -->
            <div class="d-flex align-items-start mb-3">
              {% if badge.icon contains '.svg' %}
                <img src="{{ badge.icon | relative_url }}" 
                     alt="{{ badge.name }}" 
                     class="achievement-icon me-3"
                     style="width: 48px; height: 48px; object-fit: contain;">
              {% else %}
                <i class="{{ badge.icon }} fs-1 text-primary me-3"></i>
              {% endif %}
              <div class="flex-grow-1">
                <h5 class="card-title mb-1">{{ badge.name }}</h5>
                {% if badge.date and site.data.achievements.settings.show_dates %}
                <small class="text-muted">{{ badge.date }}</small>
                {% endif %}
              </div>
            </div>
            
            <!-- Badge Description -->
            <p class="card-text text-muted mb-3">{{ badge.description | truncate: 80 }}</p>
            
            <!-- Action Button -->
            <div class="mt-auto">
              <button class="btn btn-outline-primary btn-sm w-100" 
                      data-bs-toggle="modal" 
                      data-bs-target="#modal-{{ category.id }}-{{ badge.name | slugify }}">
                <i class="fas fa-info-circle me-1"></i>View Details
              </button>
            </div>
          </div>
        </div>
      </div>
      {% endfor %}
    </div>
  </section>
  {% endfor %}
</div>

<!-- Achievement Detail Modals -->
{% for category in site.data.achievements.categories %}
{% for badge in category.badges %}
<div class="modal fade" id="modal-{{ category.id }}-{{ badge.name | slugify }}" tabindex="-1" aria-labelledby="modal-{{ category.id }}-{{ badge.name | slugify }}-label" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <div class="d-flex align-items-center">
          {% if badge.icon contains '.svg' %}
            <img src="{{ badge.icon | relative_url }}" 
                 alt="{{ badge.name }}" 
                 class="me-3"
                 style="width: 48px; height: 48px; object-fit: contain;">
          {% else %}
            <i class="{{ badge.icon }} fs-1 text-primary me-3"></i>
          {% endif %}
          <div>
            <h4 class="modal-title mb-1" id="modal-{{ category.id }}-{{ badge.name | slugify }}-label">{{ badge.name }}</h4>
            {% if badge.date and site.data.achievements.settings.show_dates %}
            <small class="text-muted">{{ badge.date }}</small>
            {% endif %}
          </div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p class="fs-6 mb-4">{{ badge.description }}</p>
        
        {% if badge.skills and site.data.achievements.settings.show_skills %}
        <div class="mb-4">
          <h6 class="text-muted mb-2">Key Skills & Technologies</h6>
          {% for skill in badge.skills %}
          <span class="badge bg-secondary me-1 mb-1">{{ skill }}</span>
          {% endfor %}
        </div>
        {% endif %}
        
        {% if badge.impact %}
        <div class="mb-4">
          <h6 class="text-muted mb-2">Impact & Results</h6>
          <p class="mb-0">{{ badge.impact }}</p>
        </div>
        {% endif %}
        
        {% if badge.url %}
        <div class="text-center">
          <a href="{{ badge.url }}" 
             class="btn btn-primary" 
             target="_blank" 
             rel="noopener">
            <i class="fas fa-external-link-alt me-1"></i>Learn More
          </a>
        </div>
        {% endif %}
      </div>
    </div>
  </div>
</div>
{% endfor %}
{% endfor %}

<script>
// Ensure Bootstrap modal functionality works
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap modals if Bootstrap is available
  if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    // Bootstrap 5 is available, modals should work automatically
    console.log('Bootstrap 5 modals initialized');
  } else if (typeof $ !== 'undefined' && $.fn.modal) {
    // Fallback to Bootstrap 4 with jQuery
    $('.modal').modal();
    console.log('Bootstrap 4 modals initialized');
  } else {
    // Manual modal implementation as fallback
    console.log('Implementing custom modal functionality');
    
    // Add click handlers for modal triggers
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-bs-target');
        const modal = document.querySelector(targetId);
        
        if (modal) {
          modal.style.display = 'block';
          modal.classList.add('show');
          modal.setAttribute('aria-hidden', 'false');
          document.body.classList.add('modal-open');
          
          // Create backdrop
          const backdrop = document.createElement('div');
          backdrop.className = 'modal-backdrop fade show';
          document.body.appendChild(backdrop);
          
          // Close modal function
          const closeModal = function() {
            modal.style.display = 'none';
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
            backdrop.remove();
          };
          
          // Add close handlers
          modal.querySelectorAll('[data-bs-dismiss="modal"]').forEach(function(closeBtn) {
            closeBtn.addEventListener('click', closeModal);
          });
          
          // Close on backdrop click
          backdrop.addEventListener('click', closeModal);
          
          // Close on escape key
          document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeModal();
          });
        }
      });
    });
  }
});
</script>

<style>
/* Achievement Cards Enhancement */
.achievement-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  height: 280px; /* Fixed height for consistent grid */
}

.achievement-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.achievement-card .card-body {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.achievement-icon {
  border-radius: 8px;
  padding: 4px;
  background: rgba(var(--bs-primary-rgb), 0.1);
  flex-shrink: 0;
}

/* Manual modal styles for fallback */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
}

.modal.show {
  display: block !important;
}

.modal-dialog {
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
}

.modal-lg {
  max-width: 800px;
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 500px;
    margin: 1.75rem auto;
  }
  .modal-lg {
    max-width: 800px;
  }
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: var(--card-bg);
  background-clip: padding-box;
  border: 1px solid var(--card-border-color);
  border-radius: 0.5rem;
  outline: 0;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid var(--card-border-color);
  border-top-left-radius: calc(0.5rem - 1px);
  border-top-right-radius: calc(0.5rem - 1px);
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
  color: var(--text-color) !important;
}

/* Modal text styling */
.modal-body p,
.modal-body .fs-6,
.modal-body .mb-0,
.modal-body .mb-4 {
  color: var(--text-color) !important;
}

.modal-body .mb-4 p {
  color: var(--text-color) !important;
}

.modal-body h6 {
  color: var(--heading-color) !important;
}

.modal-body h6.text-muted {
  color: var(--text-muted-color) !important;
}

.modal-title {
  color: var(--heading-color) !important;
}

.modal .text-muted {
  color: var(--text-muted-color) !important;
}

.modal .badge {
  background-color: var(--label-color) !important;
  color: var(--card-bg) !important;
}

.modal .bg-secondary {
  background-color: var(--label-color) !important;
  color: var(--card-bg) !important;
}

/* Dark mode specific overrides */
[data-mode="dark"] .modal-body,
[data-mode="dark"] .modal-body p,
[data-mode="dark"] .modal-body .fs-6,
[data-mode="dark"] .modal-body .mb-0,
[data-mode="dark"] .modal-body .mb-4 {
  color: var(--text-color) !important;
}

.btn-close {
  padding: 0.5rem 0.5rem;
  margin: -0.5rem -0.5rem -0.5rem auto;
  background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='m.235 1.419 1.419-1.419 6.346 6.346 6.346-6.346 1.419 1.419-6.346 6.346 6.346 6.346-1.419 1.419-6.346-6.346L1.654 13.764.235 12.345 6.581 6 .235 1.419z'/%3e%3c/svg%3e") center/1em auto no-repeat;
  border: 0;
  border-radius: 0.375rem;
  opacity: 0.5;
  cursor: pointer;
}

.btn-close:hover {
  opacity: 0.75;
}

/* Dark mode btn-close */
[data-mode="dark"] .btn-close {
  filter: invert(1) grayscale(100%) brightness(200%);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .achievement-card {
    height: auto;
    min-height: 260px;
  }
  
  .achievement-card .d-flex {
    flex-direction: column;
    text-align: center;
  }
  
  .achievement-icon {
    margin-bottom: 1rem !important;
    margin-right: 0 !important;
    align-self: center;
  }
  
  .modal-dialog {
    margin: 1rem;
  }
}
</style>
