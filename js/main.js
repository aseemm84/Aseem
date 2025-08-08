/* ==========================================================================
   Main Application Controller - Clean & Modular
   ========================================================================== */

class DigitalResumeApp {
  constructor() {
    this.isInitialized = false;
    this.controllers = new Map();
    this.currentSection = 'home';
    this.isLoading = true;

    this.init();
  }

  async init() {
    if (this.isInitialized) return;

    try {
      // Show loading screen
      this.showLoadingScreen();

      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }

      // Initialize core functionality
      await this.initializeCore();

      // Initialize controllers
      this.initializeControllers();

      // Setup navigation
      this.setupNavigation();

      // Setup scroll handling
      this.setupScrollHandling();

      // Hide loading screen
      setTimeout(() => {
        this.hideLoadingScreen();
        this.isLoading = false;
      }, 1500);

      this.isInitialized = true;
      console.log('â Digital Resume App initialized successfully');

    } catch (error) {
      console.error('â Failed to initialize app:', error);
      this.handleInitError(error);
    }
  }

  // Show loading screen
  showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.remove('hidden');
    }
  }

  // Hide loading screen
  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');

      setTimeout(() => {
        if (loadingScreen.parentNode) {
          loadingScreen.remove();
        }
      }, 500);
    }
  }

  // Initialize core functionality
  async initializeCore() {
    // Initialize stats counter animation
    this.setupStatsCounter();

    // Setup accessibility features
    this.setupAccessibility();

    // Setup performance monitoring
    this.setupPerformanceMonitoring();

    // Setup error handling
    this.setupErrorHandling();
  }

  // Initialize controllers
  initializeControllers() {
    // Animation controller should already be initialized
    if (window.animationController) {
      this.controllers.set('animations', window.animationController);
    }

    // Components controller should already be initialized
    if (window.componentsController) {
      this.controllers.set('components', window.componentsController);
    }
  }

  // Setup navigation functionality
  setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }

    // Navigation link clicks
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.navigateToSection(targetId);
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu && navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // ESC key to close mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        this.closeMobileMenu();
      }
    });
  }

  // Toggle mobile navigation menu
  toggleMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');

      // Prevent body scroll when menu is open
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }
  }

  // Close mobile navigation menu
  closeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Navigate to specific section
  navigateToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      // Update current section
      this.currentSection = sectionId;

      // Smooth scroll to section
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Update active navigation link
      this.updateActiveNavLink(sectionId);

      // Close mobile menu if open
      this.closeMobileMenu();

      // Track navigation
      this.trackNavigation(sectionId);
    }
  }

  // Update active navigation link
  updateActiveNavLink(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href').substring(1);

      if (href === activeSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Setup scroll handling
  setupScrollHandling() {
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      const scrollY = window.pageYOffset;

      // Update current section based on scroll position
      this.updateCurrentSection(scrollY);

      // Handle navbar visibility
      this.handleNavbarScroll(scrollY, lastScrollY);

      lastScrollY = scrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // Update current section based on scroll position
  updateCurrentSection(scrollY) {
    const sections = document.querySelectorAll('section[id]');
    const offset = 100; // Offset for better UX

    sections.forEach(section => {
      const sectionTop = section.offsetTop - offset;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.id;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        if (this.currentSection !== sectionId) {
          this.currentSection = sectionId;
          this.updateActiveNavLink(sectionId);
        }
      }
    });
  }

  // Handle navbar scroll behavior
  handleNavbarScroll(scrollY, lastScrollY) {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Add/remove scrolled class
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll (optional)
    // Uncomment if you want navbar to hide on scroll down
    /*
    if (scrollY > lastScrollY && scrollY > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    */
  }

  // Setup stats counter animation
  setupStatsCounter() {
    const stats = document.querySelectorAll('.stat-number[data-value]');

    if (!stats.length || !resumeData.stats) return;

    // Update stats with data from resumeData
    resumeData.stats.forEach((stat, index) => {
      const statElement = stats[index];
      if (statElement) {
        statElement.dataset.value = stat.value;
        statElement.textContent = '0';

        // Add suffix if exists
        const nextElement = statElement.nextElementSibling;
        if (nextElement && stat.suffix) {
          const suffixSpan = document.createElement('span');
          suffixSpan.textContent = stat.suffix;
          suffixSpan.className = 'stat-suffix';
          statElement.appendChild(suffixSpan);
        }
      }
    });
  }

  // Setup accessibility features
  setupAccessibility() {
    // Add focus visible class for keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Setup ARIA labels and roles
    this.setupARIALabels();

    // Setup skip links
    this.setupSkipLinks();
  }

  // Setup ARIA labels and accessibility attributes
  setupARIALabels() {
    // Add ARIA label to navigation
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.setAttribute('role', 'navigation');
      navbar.setAttribute('aria-label', 'Main navigation');
    }

    // Add ARIA labels to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
      const icon = link.querySelector('i');
      if (icon) {
        const iconClass = icon.className;
        let label = 'Social link';

        if (iconClass.includes('linkedin')) label = 'LinkedIn profile';
        else if (iconClass.includes('github')) label = 'GitHub profile';
        else if (iconClass.includes('envelope')) label = 'Email contact';
        else if (iconClass.includes('chart-line')) label = 'Streamlit portfolio';

        link.setAttribute('aria-label', label);
      }
    });
  }

  // Setup skip links for accessibility
  setupSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--primary-color);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  // Setup performance monitoring
  setupPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let cumulativeLayoutShiftScore = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            cumulativeLayoutShiftScore += entry.value;
          }
        });
        console.log('CLS:', cumulativeLayoutShiftScore);
      }).observe({ entryTypes: ['layout-shift'] });
    }

    // Log page load time
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
  }

  // Setup global error handling
  setupErrorHandling() {
    // Handle JavaScript errors
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      this.handleError(e.error);
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      this.handleError(e.reason);
    });
  }

  // Handle initialization errors
  handleInitError(error) {
    console.error('Initialization error:', error);

    // Show fallback UI
    const fallbackHTML = `
      <div class="error-fallback">
        <div class="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>We're having trouble loading the full experience. Please refresh the page or try again later.</p>
          <button onclick="window.location.reload()" class="btn btn-primary">
            <i class="fas fa-refresh"></i>
            <span>Refresh Page</span>
          </button>
        </div>
      </div>
    `;

    document.body.innerHTML = fallbackHTML;
  }

  // Handle runtime errors
  handleError(error) {
    // Log error for monitoring
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }

    // Show user-friendly error message if needed
    // Implementation depends on error severity
  }

  // Track navigation for analytics
  trackNavigation(sectionId) {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: sectionId,
        page_location: `${window.location.origin}#${sectionId}`
      });
    }

    // Console log for development
    console.log(`Navigated to section: ${sectionId}`);
  }

  // Public method to refresh the app
  refresh() {
    // Refresh components
    if (this.controllers.has('components')) {
      const componentsController = this.controllers.get('components');
      ['timeline', 'skills', 'projects', 'certifications'].forEach(component => {
        componentsController.refreshComponent(component);
      });
    }
  }

  // Public method to get current section
  getCurrentSection() {
    return this.currentSection;
  }

  // Cleanup method
  destroy() {
    // Clean up controllers
    this.controllers.forEach(controller => {
      if (controller && typeof controller.destroy === 'function') {
        controller.destroy();
      }
    });

    // Remove event listeners
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('error', this.handleError);
    window.removeEventListener('unhandledrejection', this.handleError);

    // Clear references
    this.controllers.clear();
    this.isInitialized = false;

    console.log('Digital Resume App destroyed');
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  window.digitalResumeApp = new DigitalResumeApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Page hidden - pausing non-essential operations');
  } else {
    console.log('Page visible - resuming operations');
  }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DigitalResumeApp;
}