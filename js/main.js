/* ==========================================================================
   Main Application Controller - Clean & Modular
   ========================================================================== */

class DigitalResumeApp {
  constructor() {
    this.isInitialized = false;
    this.controllers = new Map();
    this.currentSection = 'home';
    this.isLoading = true;

    // Early bind of the init method to the instance
    this.init = this.init.bind(this);
  }

  async init() {
    if (this.isInitialized) return;

    try {
      // Show loading screen immediately
      this.showLoadingScreen();

      // Defer non-critical initializations until after the page is loaded
      if (document.readyState === 'loading') {
        await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
      }

      // Initialize controllers first as they populate the DOM
      this.initializeControllers();
      
      // Then initialize core functionalities that depend on the DOM
      await this.initializeCore();

      // Setup event listeners and other interactive elements
      this.setupNavigation();
      this.setupScrollHandling();

      // Hide loading screen after a delay to allow animations to settle
      setTimeout(() => {
        this.hideLoadingScreen();
        this.isLoading = false;
      }, 500); // Reduced delay for faster perceived load

      this.isInitialized = true;
      console.log('✅ Digital Resume App initialized successfully');

    } catch (error) {
      console.error('❌ Failed to initialize app:', error);
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
      // Use 'transitionend' for a smoother removal
      loadingScreen.addEventListener('transitionend', () => {
        if (loadingScreen.parentNode) {
          loadingScreen.remove();
        }
      }, { once: true });
    }
  }

  // Initialize core functionality
  async initializeCore() {
    // This now correctly runs after components are rendered
    this.setupStatsCounter();
    this.setupAccessibility();
    this.setupPerformanceMonitoring();
    this.setupErrorHandling();
  }

  // Initialize controllers
  initializeControllers() {
    // These controllers render the dynamic content from data.js
    if (typeof ComponentsController !== 'undefined') {
        this.controllers.set('components', new ComponentsController());
    }
     if (typeof AnimationController !== 'undefined') {
        this.controllers.set('animations', new AnimationController());
    }
  }

  // Setup navigation functionality
  setupNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.navigateToSection(targetId);
      });
    });

    document.addEventListener('click', (e) => {
      if (navMenu && navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  closeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navMenu && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
  }

  navigateToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      this.currentSection = sectionId;
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.updateActiveNavLink(sectionId);
      this.closeMobileMenu();
      this.trackNavigation(sectionId);
    }
  }

  updateActiveNavLink(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href').substring(1) === activeSection);
    });
  }

  setupScrollHandling() {
    let ticking = false;
    const handleScroll = () => {
      this.updateCurrentSection(window.pageYOffset);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  updateCurrentSection(scrollY) {
    const sections = document.querySelectorAll('section[id]');
    let current = 'home';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 75; // Navbar height offset
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    if (current !== this.currentSection) {
        this.currentSection = current;
        this.updateActiveNavLink(this.currentSection);
    }
  }
  
  // This was moved to the animation controller, but we ensure stats are populated
  setupStatsCounter() {
    const statsContainer = document.getElementById('stats-grid');
    if (!statsContainer || !resumeData.stats) return;

    const statsHTML = resumeData.stats.map(stat => `
        <div class="stat-item">
            <span class="stat-number" data-value="${stat.value}">0</span>
            <span class="stat-label">${stat.label}</span>
        </div>
    `).join('');
    statsContainer.innerHTML = statsHTML;
  }

  setupAccessibility() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Tab') document.body.classList.add('keyboard-navigation');
    });
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  setupPerformanceMonitoring() {
    window.addEventListener('load', () => {
      if (performance) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
      }
    });
  }

  setupErrorHandling() {
    window.addEventListener('error', e => console.error('Global error:', e.error));
    window.addEventListener('unhandledrejection', e => console.error('Unhandled promise rejection:', e.reason));
  }

  handleInitError(error) {
    this.hideLoadingScreen();
    const fallbackHTML = `
      <div style="text-align: center; padding: 50px; font-family: sans-serif;">
        <h2>Oops! Something went wrong.</h2>
        <p>We're having trouble loading the page. Please try refreshing.</p>
        <button onclick="window.location.reload()">Refresh</button>
      </div>
    `;
    document.body.innerHTML = fallbackHTML;
  }

  trackNavigation(sectionId) {
    console.log(`Navigated to: ${sectionId}`);
  }

  destroy() {
    this.controllers.forEach(controller => {
      if (typeof controller.destroy === 'function') controller.destroy();
    });
    this.isInitialized = false;
    console.log('App destroyed');
  }
}

// Initialize the application
const app = new DigitalResumeApp();
app.init();