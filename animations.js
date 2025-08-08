/* ==========================================================================
   Animations Controller - Clean Animation Management
   ========================================================================== */

class AnimationController {
  constructor() {
    this.observers = new Map();
    this.animations = new Map();
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupParticles();
    this.setupTypingAnimation();
    this.setupCounterAnimations();
    this.setupScrollAnimations();
  }

  // Intersection Observer for scroll-triggered animations
  setupIntersectionObserver() {
    const options = {
      threshold: 0.2,
      rootMargin: '-50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, options);

    // Observe elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    this.observers.set('scroll', observer);
  }

  // Animate element based on its classes
  animateElement(element) {
    if (this.isReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }

    const animationClasses = [
      'fade-in-up', 'fade-in-left', 'fade-in-right', 
      'scale-in', 'slide-up', 'bounce-in'
    ];

    animationClasses.forEach(animClass => {
      if (element.classList.contains(`observe-${animClass.replace('-', '')}`)) {
        element.classList.add(animClass);
      }
    });

    // Add generic animation class
    element.classList.add('animate');
  }

  // Particles animation for hero background
  setupParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(50, Math.floor(canvas.width * canvas.height / 15000));

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.3
        });
      }
    };

    const animateParticles = () => {
      if (this.isReducedMotion) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = '#2563eb';
        ctx.fill();
        ctx.restore();
      });

      // Draw connections
      this.drawConnections(ctx, particles);

      animationId = requestAnimationFrame(animateParticles);
    };

    const drawConnections = (ctx, particles) => {
      const maxDistance = 100;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (maxDistance - distance) / maxDistance * 0.2;

            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    // Initialize
    resizeCanvas();
    createParticles();
    animateParticles();

    // Handle resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    // Store animation ID for cleanup
    this.animations.set('particles', animationId);
  }

  // Typing animation for hero subtitle
  setupTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement || this.isReducedMotion) return;

    const texts = resumeData.personal.typingTexts;
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeText = () => {
      const currentText = texts[textIndex];

      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => {
          isDeleting = true;
        }, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }

      setTimeout(typeText, typingSpeed);
    };

    typeText();
  }

  // Counter animations for stats
  setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-value]');

    const animateCounter = (counter, target) => {
      const duration = 2000;
      const start = performance.now();
      const startValue = 0;

      const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOut);

        counter.textContent = currentValue;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(animate);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.value);

          if (!counter.classList.contains('animated')) {
            counter.classList.add('animated');
            animateCounter(counter, target);
          }

          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // Progress bar animations for skills
  animateProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress');

    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.style.width || '0%';

          progressBar.style.width = '0%';

          setTimeout(() => {
            progressBar.style.transition = 'width 1.5s ease-out';
            progressBar.style.width = width;
          }, 200);

          progressObserver.unobserve(progressBar);
        }
      });
    }, { threshold: 0.3 });

    progressBars.forEach(bar => progressObserver.observe(bar));
  }

  // Scroll-based animations
  setupScrollAnimations() {
    let ticking = false;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      // Parallax effect for hero background
      const heroBackground = document.querySelector('.hero-background');
      if (heroBackground) {
        heroBackground.style.transform = `translateY(${rate}px)`;
      }

      // Navbar background opacity
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (scrolled > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking && !this.isReducedMotion) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  // Stagger animations for timeline items
  staggerTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.2}s`;
      item.classList.add('fade-in-up');
    });
  }

  // Hover animations
  setupHoverAnimations() {
    const hoverElements = document.querySelectorAll('.hover-lift');

    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        if (!this.isReducedMotion) {
          element.style.transform = 'translateY(-5px)';
          element.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
        }
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = '';
        element.style.boxShadow = '';
      });
    });
  }

  // Loading animation
  showLoadingAnimation() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.remove('hidden');
    }
  }

  hideLoadingAnimation() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');

      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }
  }

  // Cleanup method
  destroy() {
    // Stop all animations
    this.animations.forEach((animationId, key) => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    });

    // Disconnect observers
    this.observers.forEach((observer, key) => {
      observer.disconnect();
    });

    // Clear maps
    this.animations.clear();
    this.observers.clear();
  }

  // Public method to trigger specific animations
  triggerAnimation(element, animationType) {
    if (this.isReducedMotion) return;

    element.classList.add(animationType);

    // Remove animation class after completion
    element.addEventListener('animationend', () => {
      element.classList.remove(animationType);
    }, { once: true });
  }

  // Method to check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.animationController = new AnimationController();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationController;
}