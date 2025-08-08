/* ==========================================================================
   Components Controller - Modular UI Components
   ========================================================================== */

class ComponentsController {
  constructor() {
    this.components = new Map();
    this.isInitialized = false;

    this.init();
  }

  init() {
    if (this.isInitialized) return;

    this.renderTimeline();
    this.renderSkills();
    this.renderProjects();
    this.renderCertifications();
    this.setupFormHandling();

    this.isInitialized = true;
  }

  // Render experience timeline
  renderTimeline() {
    const timelineContainer = document.getElementById('timeline');
    if (!timelineContainer || !resumeData.experience) return;

    const timelineHTML = resumeData.experience.map((item, index) => {
      const isLeft = index % 2 === 0;

      return `
        <div class="timeline-item animate-on-scroll ${isLeft ? 'observe-fade' : 'observe-fade'}" data-index="${index}">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-header">
              <h3 class="timeline-title">${item.title}</h3>
              <span class="timeline-period">${item.period}</span>
            </div>
            <div class="timeline-company">${item.company}</div>
            <div class="timeline-position">${item.type}</div>
            <div class="timeline-description">${item.description}</div>
            ${item.achievements && item.achievements.length > 0 ? `
              <ul class="timeline-achievements">
                ${item.achievements.map(achievement => `
                  <li>${achievement}</li>
                `).join('')}
              </ul>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    timelineContainer.innerHTML = timelineHTML;

    // Store reference for animations
    this.components.set('timeline', timelineContainer);
  }

  // Render skills grid
  renderSkills() {
    const skillsContainer = document.getElementById('skills-grid');
    if (!skillsContainer || !resumeData.skills) return;

    const skillsHTML = resumeData.skills.map(category => `
      <div class="skill-category animate-on-scroll observe-scale" data-category="${category.category}">
        <div class="skill-category-header">
          <div class="skill-category-icon">${category.icon}</div>
          <h3 class="skill-category-title">${category.category}</h3>
          <p class="skill-category-description">${category.description}</p>
        </div>
        <ul class="skill-list">
          ${category.skills.map(skill => `
            <li class="skill-item">
              <span class="skill-name">${skill.name}</span>
              <div class="skill-level">
                <div class="skill-bar">
                  <div class="skill-progress" style="width: ${skill.level}%"></div>
                </div>
                <span class="skill-percentage">${skill.level}%</span>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');

    skillsContainer.innerHTML = skillsHTML;

    // Trigger progress bar animations
    setTimeout(() => {
      if (window.animationController) {
        window.animationController.animateProgressBars();
      }
    }, 100);

    this.components.set('skills', skillsContainer);
  }

  // Render projects grid
  renderProjects() {
    const projectsContainer = document.getElementById('projects-grid');
    if (!projectsContainer || !resumeData.projects) return;

    const projectsHTML = resumeData.projects.map((project, index) => `
      <div class="project-card animate-on-scroll observe-scale hover-lift" data-project-id="${project.id}">
        <div class="project-image">
          <div class="project-icon">${project.icon}</div>
        </div>
        <div class="project-content">
          <div class="project-header">
            <h3 class="project-title">${project.title}</h3>
            <span class="project-category">${project.category}</span>
          </div>
          <p class="project-description">${project.description}</p>
          <div class="project-tech">
            ${project.technologies.map(tech => `
              <span class="tech-tag">${tech}</span>
            `).join('')}
          </div>
          <div class="project-links">
            ${project.links.github ? `
              <a href="${project.links.github}" target="_blank" class="project-link github" aria-label="View GitHub Repository">
                <i class="fab fa-github"></i>
                <span>Code</span>
              </a>
            ` : ''}
            ${project.links.demo ? `
              <a href="${project.links.demo}" target="_blank" class="project-link demo" aria-label="View Live Demo">
                <i class="fas fa-external-link-alt"></i>
                <span>Live App</span>
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `).join('');

    projectsContainer.innerHTML = projectsHTML;

    // Add click handlers for project modals
    this.setupProjectModals();

    this.components.set('projects', projectsContainer);
  }

  // Render certifications grid
  renderCertifications() {
    const certificationsContainer = document.getElementById('certifications-grid');
    if (!certificationsContainer || !resumeData.certifications) return;

    const certificationsHTML = resumeData.certifications.map((cert, index) => `
      <div class="certification-card animate-on-scroll observe-fade hover-lift" data-cert-id="${cert.id}">
        <div class="certification-header">
          <div class="certification-icon">${cert.icon}</div>
          <span class="certification-category">${cert.category}</span>
        </div>
        <h3 class="certification-title">${cert.title}</h3>
        <div class="certification-issuer">${cert.issuer}</div>
        <div class="certification-date">${cert.date}</div>
        ${cert.grade ? `<div class="certification-grade">${cert.grade}</div>` : ''}
        <p class="certification-description">${cert.description}</p>
        ${cert.verificationLink ? `
          <a href="${cert.verificationLink}" target="_blank" class="certification-verify" aria-label="Verify Certificate">
            <i class="fas fa-external-link-alt"></i>
            <span>Verify</span>
          </a>
        ` : ''}
      </div>
    `).join('');

    certificationsContainer.innerHTML = certificationsHTML;

    this.components.set('certifications', certificationsContainer);
  }

  // Setup project modal functionality
  setupProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't trigger modal if clicking on links
        if (e.target.closest('a')) return;

        const projectId = parseInt(card.dataset.projectId);
        const project = resumeData.projects.find(p => p.id === projectId);

        if (project) {
          this.openProjectModal(project);
        }
      });
    });
  }

  // Open project modal with details
  openProjectModal(project) {
    const modalHTML = `
      <div class="modal-overlay" id="project-modal">
        <div class="modal-container">
          <div class="modal-header">
            <h2 class="modal-title">${project.title}</h2>
            <button class="modal-close" aria-label="Close modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="modal-project-icon">${project.icon}</div>
            <div class="modal-project-meta">
              <span class="modal-project-category">${project.category}</span>
              <span class="modal-project-status">${project.status}</span>
            </div>
            <p class="modal-project-description">${project.description}</p>

            <div class="modal-section">
              <h3>Key Features</h3>
              <ul class="modal-features-list">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>

            <div class="modal-section">
              <h3>Technologies Used</h3>
              <div class="modal-tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
              </div>
            </div>

            <div class="modal-actions">
              ${project.links.github ? `
                <a href="${project.links.github}" target="_blank" class="btn btn-outline">
                  <i class="fab fa-github"></i>
                  <span>View Code</span>
                </a>
              ` : ''}
              ${project.links.demo ? `
                <a href="${project.links.demo}" target="_blank" class="btn btn-primary">
                  <i class="fas fa-external-link-alt"></i>
                  <span>Live Demo</span>
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    // Remove existing modal
    const existingModal = document.getElementById('project-modal');
    if (existingModal) {
      existingModal.remove();
    }

    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.classList.add('modal-open');

    // Setup modal close handlers
    this.setupModalHandlers();
  }

  // Setup modal event handlers
  setupModalHandlers() {
    const modal = document.getElementById('project-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    const closeModal = () => {
      modal.classList.add('fade-out');
      document.body.classList.remove('modal-open');

      setTimeout(() => {
        modal.remove();
      }, 300);
    };

    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });

    // ESC key handler
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    };

    document.addEventListener('keydown', escHandler);

    // Animate modal in
    setTimeout(() => {
      modal.classList.add('fade-in');
    }, 10);
  }

  // Setup contact form handling
  setupFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission(contactForm);
    });

    // Setup floating label animations
    this.setupFloatingLabels(contactForm);
  }

  // Handle form submission
  handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
      // Show success message
      this.showFormMessage('Message sent successfully! I'll get back to you soon.', 'success');

      // Reset form
      form.reset();

      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // Reset floating labels
      this.resetFloatingLabels(form);
    }, 2000);
  }

  // Setup floating label animations
  setupFloatingLabels(form) {
    const formGroups = form.querySelectorAll('.form-group');

    formGroups.forEach(group => {
      const input = group.querySelector('input, textarea');
      const label = group.querySelector('label');

      if (!input || !label) return;

      // Handle focus/blur events
      input.addEventListener('focus', () => {
        group.classList.add('focused');
      });

      input.addEventListener('blur', () => {
        if (!input.value) {
          group.classList.remove('focused');
        }
      });

      // Handle input events
      input.addEventListener('input', () => {
        if (input.value) {
          group.classList.add('has-value');
        } else {
          group.classList.remove('has-value');
        }
      });

      // Initial check
      if (input.value) {
        group.classList.add('has-value');
      }
    });
  }

  // Reset floating labels after form submission
  resetFloatingLabels(form) {
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
      group.classList.remove('focused', 'has-value');
    });
  }

  // Show form message
  showFormMessage(message, type = 'success') {
    const messageHTML = `
      <div class="form-message ${type} fade-in">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
      </div>
    `;

    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Add new message
    const contactForm = document.getElementById('contact-form');
    contactForm.insertAdjacentHTML('afterend', messageHTML);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      const messageEl = document.querySelector('.form-message');
      if (messageEl) {
        messageEl.classList.add('fade-out');
        setTimeout(() => messageEl.remove(), 300);
      }
    }, 5000);
  }

  // Public method to refresh component
  refreshComponent(componentName) {
    switch (componentName) {
      case 'timeline':
        this.renderTimeline();
        break;
      case 'skills':
        this.renderSkills();
        break;
      case 'projects':
        this.renderProjects();
        break;
      case 'certifications':
        this.renderCertifications();
        break;
    }
  }

  // Public method to get component reference
  getComponent(componentName) {
    return this.components.get(componentName);
  }

  // Cleanup method
  destroy() {
    // Remove event listeners and clean up components
    this.components.forEach((component, name) => {
      if (component && component.parentNode) {
        component.innerHTML = '';
      }
    });

    this.components.clear();
    this.isInitialized = false;
  }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.componentsController = new ComponentsController();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ComponentsController;
}