/**
 * GRAND CAFE MANDI BAHAUDDIN — PRODUCTION JAVASCRIPT
 * Zero dependencies, high performance, accessible & resilient.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveHoursStatus();
  initMobileDrawer();
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
