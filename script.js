/**
 * GRAND CAFE MANDI BAHAUDDIN — PRODUCTION JAVASCRIPT
 * Zero dependencies, high performance, accessible & resilient.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveHoursStatus();
  initMobileDrawer();
  initCoverFlowCarousel();
  initMenuFilters();
  initWhatsAppOrderButtons();
  initScrollHeader();
  initCopyrightYear();
});

/**
 * 1. Dynamic Business Hours & Live Open/Closed Status
 * Hours: 11:00 AM – 2:00 AM (Closes at 2:00 AM next day)
 */
function initLiveHoursStatus() {
  const liveStatusText = document.getElementById('liveStatusText');
  const liveDot = document.querySelector('.live-dot');
  if (!liveStatusText) return;

  function updateStatus() {
    const now = new Date();
    // Use local time or Pakistan Standard Time (UTC+5)
    // Calculate current hours and minutes
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeVal = currentHour + currentMinutes / 60;

    // Grand Cafe is open from 11:00 AM (11.0) to 2:00 AM next day (2.0)
    // Therefore: open if currentTimeVal >= 11.0 OR currentTimeVal < 2.0
    const isOpen = (currentTimeVal >= 11.0 || currentTimeVal < 2.0);

    if (isOpen) {
      liveStatusText.textContent = 'Open Now • Closes 2:00 AM';
      if (liveDot) {
        liveDot.style.backgroundColor = 'var(--color-whatsapp)';
        liveDot.style.boxShadow = '0 0 8px var(--color-whatsapp)';
      }
    } else {
      liveStatusText.textContent = 'Closed Now • Reopens at 11:00 AM';
      if (liveDot) {
        liveDot.style.backgroundColor = 'var(--color-gold-400)';
        liveDot.style.boxShadow = '0 0 8px var(--color-gold-400)';
      }
    }
  }

  updateStatus();
  // Refresh every 60 seconds
  setInterval(updateStatus, 60000);
}

/**
 * 2. Mobile Navigation Drawer & Accessibility Focus Management
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const navLinks = drawer ? drawer.querySelectorAll('.mobile-nav-link, .mobile-drawer-actions a') : [];

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    if (backdrop) {
      backdrop.classList.add('active');
      backdrop.setAttribute('aria-hidden', 'false');
    }
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 100);
    }
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    if (backdrop) {
      backdrop.classList.remove('active');
      backdrop.setAttribute('aria-hidden', 'true');
    }
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  // Close when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeDrawer();
    }
  });
}

/**
 * 3. Menu Category Filtering
 */
function initMenuFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  if (!filterButtons.length || !menuCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');

      // Update active state and ARIA
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Filter cards
      menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/**
 * 4. WhatsApp Quick Order Button Handlers
 */
function initWhatsAppOrderButtons() {
  const orderButtons = document.querySelectorAll('.quick-order-btn');
  const phoneNumber = '923045484444';

  orderButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemName = button.getAttribute('data-item') || 'food item';
      const message = encodeURIComponent(`Hi Grand Cafe, I would like to order: ${itemName}. Please confirm availability and delivery/takeaway details.`);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

      showToast(`Opening WhatsApp order for "${itemName}"...`);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  });
}

/**
 * 5. Toast Notification System
 */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/**
 * 6. Sticky Header Elevation on Scroll
 */
function initScrollHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * 7. Dynamic Footer Year
 */
function initCopyrightYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * 8. 3D CoverFlow Carousel (Best Sellers Showcase)
 * Converted from React CoverFlowCarousel to Pure Vanilla JavaScript
 * Features: 3D Perspective transforms, Ambience blur, Autoplay (5000ms),
 * Touch swipe, Keyboard navigation, Click-to-slide & responsive mobile scaling.
 */
function initCoverFlowCarousel() {
  const stage = document.getElementById('coverflowStage');
  const section = document.getElementById('best-sellers');
  const prevBtn = document.getElementById('coverflowPrev');
  const nextBtn = document.getElementById('coverflowNext');
  const dotsContainer = document.getElementById('coverflowDots');
  const ambienceImg = document.getElementById('coverflowAmbienceImg');

  if (!stage || !section) return;

  const cards = Array.from(stage.querySelectorAll('.coverflow-card'));
  const total = cards.length;
  if (total === 0) return;

  let currentIndex = 0;
  let isHovered = false;
  let autoplayTimer = null;
  const autoplayDelay = 5000;
  let touchStartX = 0;

  // Calculate transforms and responsive layout
  function updateCoverFlow(index) {
    currentIndex = (index + total) % total;

    const screenWidth = window.innerWidth;
    const isSmallMobile = screenWidth <= 430;
    const isMobile = screenWidth <= 768;

    // Translation values based on viewport to prevent horizontal overflow
    let tx1 = 285;
    let tx2 = 510;
    let rot1 = 24;
    let rot2 = 38;
    let sc1 = 0.84;
    let sc2 = 0.68;

    if (isSmallMobile) {
      tx1 = 110;
      tx2 = 180;
      rot1 = 18;
      rot2 = 25;
      sc1 = 0.80;
      sc2 = 0.60;
    } else if (isMobile) {
      tx1 = 145;
      tx2 = 240;
      rot1 = 20;
      rot2 = 30;
      sc1 = 0.82;
      sc2 = 0.65;
    }

    cards.forEach((card, idx) => {
      const offset = (idx - currentIndex + total) % total;
      const content = card.querySelector('.coverflow-card-content');

      let transform = 'translateX(0px) scale(0.4) rotateY(0deg)';
      let opacity = 0;
      let zIndex = 0;
      let filter = 'brightness(0.4) blur(2px)';
      let isCenter = false;
      let boxShadow = 'none';

      if (offset === 0) {
        isCenter = true;
        transform = 'translateX(0px) scale(1) rotateY(0deg)';
        opacity = 1;
        zIndex = 30;
        filter = 'brightness(1)';
        boxShadow = '0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(197,168,128,0.25)';
      } else if (offset === 1) {
        transform = `translateX(${tx1}px) scale(${sc1}) rotateY(-${rot1}deg)`;
        opacity = 0.65;
        zIndex = 20;
        filter = 'brightness(0.75)';
        boxShadow = '0 15px 35px rgba(0,0,0,0.5)';
      } else if (offset === 2) {
        transform = `translateX(${tx2}px) scale(${sc2}) rotateY(-${rot2}deg)`;
        opacity = 0.38;
        zIndex = 10;
        filter = 'brightness(0.55) blur(1px)';
        boxShadow = '0 15px 35px rgba(0,0,0,0.5)';
      } else if (offset === total - 1) {
        transform = `translateX(-${tx1}px) scale(${sc1}) rotateY(${rot1}deg)`;
        opacity = 0.65;
        zIndex = 20;
        filter = 'brightness(0.75)';
        boxShadow = '0 15px 35px rgba(0,0,0,0.5)';
      } else if (offset === total - 2) {
        transform = `translateX(-${tx2}px) scale(${sc2}) rotateY(${rot2}deg)`;
        opacity = 0.38;
        zIndex = 10;
        filter = 'brightness(0.55) blur(1px)';
        boxShadow = '0 15px 35px rgba(0,0,0,0.5)';
      }

      card.style.transform = transform;
      card.style.opacity = opacity;
      card.style.zIndex = zIndex;
      card.style.filter = filter;
      card.style.boxShadow = boxShadow;
      card.style.cursor = isCenter ? 'default' : 'pointer';

      if (isCenter) {
        card.classList.add('is-center');
        card.setAttribute('aria-hidden', 'false');
        if (content) {
          content.style.opacity = '1';
          content.style.transform = 'translateY(0px)';
          content.style.pointerEvents = 'auto';
        }
      } else {
        card.classList.remove('is-center');
        card.setAttribute('aria-hidden', 'true');
        if (content) {
          content.style.opacity = '0';
          content.style.transform = 'translateY(16px)';
          content.style.pointerEvents = 'none';
        }
      }
    });

    // Update Background Ambience image
    if (ambienceImg) {
      const activeCardImg = cards[currentIndex].querySelector('.coverflow-card-img');
      if (activeCardImg && activeCardImg.src) {
        ambienceImg.src = activeCardImg.src;
      }
    }

    // Update Pagination Dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.coverflow-dot');
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('active');
          dot.setAttribute('aria-selected', 'false');
        }
      });
    }
  }

  function nextSlide() {
    updateCoverFlow(currentIndex + 1);
  }

  function prevSlide() {
    updateCoverFlow(currentIndex - 1);
  }

  function goToSlide(idx) {
    updateCoverFlow(idx);
  }

  // Autoplay timer handling
  function startAutoplay() {
    stopAutoplay();
    if (!isHovered && total > 1) {
      autoplayTimer = setInterval(nextSlide, autoplayDelay);
    }
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Event Listeners for Controls
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  // Dots click
  if (dotsContainer) {
    const dots = dotsContainer.querySelectorAll('.coverflow-dot');
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        startAutoplay();
      });
    });
  }

  // Side cards click-to-slide
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      if (idx !== currentIndex) {
        goToSlide(idx);
        startAutoplay();
      }
    });
  });

  // Hover pause & resume
  section.addEventListener('mouseenter', () => {
    isHovered = true;
    stopAutoplay();
  });

  section.addEventListener('mouseleave', () => {
    isHovered = false;
    startAutoplay();
  });

  // Touch swipe support
  section.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      touchStartX = e.touches[0].clientX;
      isHovered = true;
      stopAutoplay();
    }
  }, { passive: true });

  section.addEventListener('touchend', (e) => {
    if (e.changedTouches.length > 0) {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 45) {
        if (diff < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      isHovered = false;
      startAutoplay();
    }
  }, { passive: true });

  // Keyboard navigation (Left / Right arrows)
  window.addEventListener('keydown', (e) => {
    // Only navigate if section is partially in viewport
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        startAutoplay();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        startAutoplay();
      }
    }
  });

  // Window resize debounced recalculation
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCoverFlow(currentIndex);
    }, 100);
  }, { passive: true });

  // Initialize carousel
  updateCoverFlow(0);
  startAutoplay();
}

