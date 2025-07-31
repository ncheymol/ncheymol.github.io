/**
 * Main JavaScript file for Nicolas CHEYMOL's blog
 * Optimized for performance and accessibility
 */

(function() {
  'use strict';

  // ===== UTILITY FUNCTIONS =====
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  // Debounce function for performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ===== SEARCH AND FILTER FUNCTIONALITY =====
  class BlogFilter {
    constructor() {
      this.searchInput = $('#searchInput');
      this.langSelect = $('#langSelect');
      this.tagDropdownBtn = $('#tagDropdownBtn');
      this.tagDropdownMenu = $('#tagDropdownMenu');
      this.tagCheckboxes = $$('.tag-checkbox');
      this.posts = $$('.blog-list .post');
      this.selectedTags = ['all'];
      
      this.init();
    }

    init() {
      if (!this.searchInput) return; // Only on home page
      
      this.bindEvents();
      this.setupTagDropdown();
    }

    bindEvents() {
      this.searchInput.addEventListener('input', debounce(() => this.filterPosts(), 300));
      this.langSelect.addEventListener('change', () => this.filterPosts());
    }

    setupTagDropdown() {
      // Toggle dropdown
      this.tagDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleDropdown();
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!$('#tagDropdown').contains(e.target)) {
          this.hideDropdown();
        }
      });

      // Handle tag selection
      this.tagDropdownMenu.addEventListener('change', (e) => {
        this.handleTagSelection(e);
      });
    }

    toggleDropdown() {
      const isVisible = this.tagDropdownMenu.style.display === 'block';
      this.tagDropdownMenu.style.display = isVisible ? 'none' : 'block';
    }

    hideDropdown() {
      this.tagDropdownMenu.style.display = 'none';
    }

    handleTagSelection(e) {
      const checkbox = e.target;
      
      if (checkbox.value === 'all') {
        if (checkbox.checked) {
          this.tagCheckboxes.forEach(cb => {
            if (cb.value !== 'all') cb.checked = false;
          });
          this.selectedTags = ['all'];
        } else {
          // Prevent unchecking "all" if nothing else is checked
          const checkedTags = [...this.tagCheckboxes].filter(cb => 
            cb.value !== 'all' && cb.checked
          );
          if (checkedTags.length === 0) {
            checkbox.checked = true;
            this.selectedTags = ['all'];
          }
        }
      } else {
        const checkedTags = [...this.tagCheckboxes].filter(cb => 
          cb.value !== 'all' && cb.checked
        );
        
        if (checkedTags.length > 0) {
          this.tagCheckboxes.forEach(cb => {
            if (cb.value === 'all') cb.checked = false;
          });
          this.selectedTags = checkedTags.map(cb => cb.value);
        } else {
          this.tagCheckboxes.forEach(cb => {
            if (cb.value === 'all') cb.checked = true;
          });
          this.selectedTags = ['all'];
        }
      }
      
      this.updateTagDropdownBtn();
      this.filterPosts();
    }

    updateTagDropdownBtn() {
      if (this.selectedTags.includes('all')) {
        this.tagDropdownBtn.textContent = 'Tous les tags';
      } else {
        this.tagDropdownBtn.textContent = this.selectedTags.join(', ');
      }
    }

    filterPosts() {
      const query = this.searchInput.value.toLowerCase();
      const selectedLang = this.langSelect.value;
      const allSelected = this.selectedTags.includes('all') || this.selectedTags.length === 0;

      this.posts.forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase();
        const desc = post.querySelector('.post-desc')?.textContent.toLowerCase() || '';
        const lang = post.getAttribute('data-lang') || 'fr';
        const tags = (post.getAttribute('data-tags') || '').split(',');

        const matchesLang = selectedLang === 'all' || lang === selectedLang;
        const matchesQuery = title.includes(query) || desc.includes(query);
        const matchesTag = allSelected || this.selectedTags.some(tag => tags.includes(tag));

        post.style.display = (matchesLang && matchesQuery && matchesTag) ? '' : 'none';
      });
    }
  }

  // ===== SIDEBAR TOGGLE FUNCTIONALITY =====
  class SidebarToggle {
    constructor() {
      this.sidebar = $('#sidebar');
      this.toggleBtn = $('.aside-toggle');
      
      if (this.sidebar && this.toggleBtn) {
        this.init();
      }
    }

    init() {
      this.toggleBtn.addEventListener('click', () => this.toggleSidebar());
      
      // Keyboard support
      this.toggleBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleSidebar();
        }
      });
    }

    toggleSidebar() {
      this.sidebar.classList.toggle('aside-collapsed');
      
      // Update button text and aria-label
      const isCollapsed = this.sidebar.classList.contains('aside-collapsed');
      this.toggleBtn.textContent = isCollapsed ? '☰' : '✕';
      this.toggleBtn.setAttribute('aria-label', 
        isCollapsed ? 'Développer le menu' : 'Réduire le menu'
      );
    }
  }

  // ===== CODE COPY FUNCTIONALITY =====
  class CodeCopy {
    constructor() {
      this.init();
    }

    init() {
      const preBlocks = $$('pre');
      preBlocks.forEach(pre => this.addCopyButton(pre));
    }

    addCopyButton(pre) {
      pre.classList.add('pre-block');
      
      const wrapper = document.createElement('div');
      wrapper.className = 'pre-copy-btn-wrapper';
      
      const btn = document.createElement('button');
      btn.className = 'pre-copy-btn';
      btn.setAttribute('title', 'Copier le code');
      btn.setAttribute('aria-label', 'Copier le code dans le presse-papiers');
      btn.innerHTML = this.getCopyIcon();
      
      btn.addEventListener('click', () => this.copyCode(pre, btn));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.copyCode(pre, btn);
        }
      });
      
      wrapper.appendChild(btn);
      pre.parentNode.insertBefore(wrapper, pre);
    }

    getCopyIcon() {
      return `<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
        <rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect>
        <path d='M5 15V5a2 2 0 0 1 2-2h10'></path>
      </svg>`;
    }

    async copyCode(pre, btn) {
      const code = pre.querySelector('code');
      const text = code ? code.textContent : pre.textContent;
      
      try {
        await navigator.clipboard.writeText(text);
        this.showCopiedFeedback(btn);
      } catch (err) {
        // Fallback for older browsers
        this.fallbackCopy(text, btn);
      }
    }

    showCopiedFeedback(btn) {
      btn.classList.add('copied');
      btn.setAttribute('aria-label', 'Code copié !');
      
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.setAttribute('aria-label', 'Copier le code dans le presse-papiers');
      }, 1200);
    }

    fallbackCopy(text, btn) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        this.showCopiedFeedback(btn);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      
      document.body.removeChild(textArea);
    }
  }

  // ===== LAZY LOADING FOR IMAGES =====
  class LazyLoader {
    constructor() {
      this.images = $$('img[data-src]');
      this.init();
    }

    init() {
      if ('IntersectionObserver' in window) {
        this.setupIntersectionObserver();
      } else {
        this.loadAllImages();
      }
    }

    setupIntersectionObserver() {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      this.images.forEach(img => imageObserver.observe(img));
    }

    loadImage(img) {
      const src = img.getAttribute('data-src');
      if (src) {
        img.src = src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
      }
    }

    loadAllImages() {
      this.images.forEach(img => this.loadImage(img));
    }
  }

  // ===== PERFORMANCE MONITORING =====
  class PerformanceMonitor {
    constructor() {
      this.init();
    }

    init() {
      if ('performance' in window) {
        window.addEventListener('load', () => {
          setTimeout(() => this.logPerformance(), 0);
        });
      }
    }

    logPerformance() {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        console.log('Page Load Performance:', {
          'DOM Content Loaded': `${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`,
          'Load Complete': `${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`,
          'Total Load Time': `${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`
        });
      }
    }
  }

  // ===== ACCESSIBILITY ENHANCEMENTS =====
  class AccessibilityEnhancer {
    constructor() {
      this.init();
    }

    init() {
      this.addSkipLinks();
      this.enhanceKeyboardNavigation();
      this.addAriaLabels();
    }

    addSkipLinks() {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.textContent = 'Aller au contenu principal';
      skipLink.className = 'skip-link';
      skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
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

    enhanceKeyboardNavigation() {
      // Add keyboard navigation for interactive elements
      const interactiveElements = $$('button, a, input, select, textarea');
      interactiveElements.forEach(el => {
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && el.tagName !== 'A') {
            e.preventDefault();
            el.click();
          }
        });
      });
    }

    addAriaLabels() {
      // Add aria-labels to elements that need them
      const searchInput = $('#searchInput');
      if (searchInput) {
        searchInput.setAttribute('aria-label', 'Rechercher dans les articles');
      }
      
      const langSelect = $('#langSelect');
      if (langSelect) {
        langSelect.setAttribute('aria-label', 'Filtrer par langue');
      }
    }
  }

  // ===== SERVICE WORKER REGISTRATION =====
  class ServiceWorkerManager {
    constructor() {
      this.init();
    }

    init() {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(registration => {
              console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
              console.log('SW registration failed: ', registrationError);
            });
        });
      }
    }
  }

  // ===== INITIALIZATION =====
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new BlogFilter();
    new SidebarToggle();
    new CodeCopy();
    new LazyLoader();
    new PerformanceMonitor();
    new AccessibilityEnhancer();
    new ServiceWorkerManager();
    
    // Add main content ID for skip link
    const main = $('main');
    if (main) {
      main.id = 'main-content';
    }
  });

})(); 