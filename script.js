/* ============================================================
   ARITUA — Matcha Bliss SuperLatte — PDP Interactivity
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Header scroll effect ----
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // ---- Mobile menu toggle ----
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('header__nav--open');
      const spans = menuToggle.querySelectorAll('span');
      if (mainNav.classList.contains('header__nav--open')) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  // ---- Quantity selector ----
  const qtyInput = document.getElementById('qtyInput');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const addToCartBtn = document.getElementById('addToCart');

  function updateCartButtonPrice() {
    const qty = parseInt(qtyInput.value) || 1;
    const purchaseOption = document.querySelector('input[name="purchase"]:checked');
    const basePrice = purchaseOption && purchaseOption.value === 'subscribe' ? 23.72 : 27.90;
    const total = (basePrice * qty).toFixed(2).replace('.', ',');
    const priceEl = addToCartBtn.querySelector('.btn__price');
    if (priceEl) {
      priceEl.textContent = total + ' \u20AC';
    }
  }

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      const val = parseInt(qtyInput.value) || 1;
      if (val > 1) {
        qtyInput.value = val - 1;
        updateCartButtonPrice();
      }
    });

    qtyPlus.addEventListener('click', () => {
      const val = parseInt(qtyInput.value) || 1;
      if (val < 10) {
        qtyInput.value = val + 1;
        updateCartButtonPrice();
      }
    });

    qtyInput.addEventListener('change', () => {
      let val = parseInt(qtyInput.value) || 1;
      val = Math.max(1, Math.min(10, val));
      qtyInput.value = val;
      updateCartButtonPrice();
    });
  }

  // ---- Purchase option toggle ----
  const purchaseOptions = document.querySelectorAll('.purchase-option');
  purchaseOptions.forEach(option => {
    const radio = option.querySelector('input[type="radio"]');
    if (radio) {
      radio.addEventListener('change', () => {
        purchaseOptions.forEach(o => o.classList.remove('purchase-option--active'));
        option.classList.add('purchase-option--active');
        updateCartButtonPrice();
      });
    }
  });

  // ---- Add to Cart animation ----
  const cartCount = document.querySelector('.header__cart-count');

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const qty = parseInt(qtyInput.value) || 1;
      let current = parseInt(cartCount.textContent) || 0;
      current += qty;
      cartCount.textContent = current;

      // Button feedback
      const span = addToCartBtn.querySelector('span:first-child');
      const originalText = span.textContent;
      span.textContent = 'Added!';
      addToCartBtn.style.background = '#2D5016';

      setTimeout(() => {
        span.textContent = originalText;
        addToCartBtn.style.background = '';
      }, 1500);

      // Cart icon bounce
      const cartIcon = document.querySelector('.header__cart');
      if (cartIcon) {
        cartIcon.classList.add('cart-bounce');
        setTimeout(() => cartIcon.classList.remove('cart-bounce'), 400);
      }
    });
  }

  // ---- Sticky Add to Cart (mobile) ----
  const stickyAtc = document.getElementById('stickyAtc');
  const productActions = document.querySelector('.product-info__actions');

  if (stickyAtc && productActions) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          stickyAtc.classList.add('sticky-atc--visible');
        } else {
          stickyAtc.classList.remove('sticky-atc--visible');
        }
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );
    observer.observe(productActions);

    // Sticky button click scrolls to product
    const stickyBtn = stickyAtc.querySelector('.btn--sticky');
    if (stickyBtn) {
      stickyBtn.addEventListener('click', () => {
        productActions.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }

  // ---- Thumbnail gallery ----
  const thumbs = document.querySelectorAll('.product-gallery__thumb');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('product-gallery__thumb--active'));
      thumb.classList.add('product-gallery__thumb--active');
    });
  });

  // ---- How to prepare tabs ----
  const howToTabs = document.querySelectorAll('.how-to__tab');
  const pourStep = document.getElementById('pourStep');
  const stirStep = document.getElementById('stirStep');

  howToTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      howToTabs.forEach(t => t.classList.remove('how-to__tab--active'));
      tab.classList.add('how-to__tab--active');

      const type = tab.dataset.tab;
      if (type === 'iced') {
        pourStep.textContent = 'Add 100ml of cold water or plant milk. Drop in a handful of ice cubes.';
        stirStep.textContent = 'Shake vigorously in a bottle or blend until frothy. Pour and enjoy your refreshing iced ritual.';
      } else {
        pourStep.innerHTML = 'Add 200ml of hot water (70&ndash;80&deg;C, not boiling) for the smoothest taste.';
        stirStep.textContent = 'Whisk or stir briskly until creamy and smooth. Take a moment. Breathe. Enjoy your ritual.';
      }
    });
  });

  // ---- Scroll-reveal animation ----
  const revealElements = document.querySelectorAll(
    '.benefit-card, .ingredient-card, .testimonial-card, .bundle-card, .how-to__step, .faq__item, .comparison-table, .section-header'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Final CTA button ----
  const finalCta = document.getElementById('finalCta');
  if (finalCta) {
    finalCta.addEventListener('click', (e) => {
      e.preventDefault();
      const heroSection = document.querySelector('.product-info__actions');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // ---- Smooth scroll for review link ----
  const reviewLink = document.querySelector('.product-info__review-link');
  if (reviewLink) {
    reviewLink.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('reviews');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
