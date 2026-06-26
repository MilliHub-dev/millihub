/**
 * MILLIHUB — Main JS
 */

(function () {
  "use strict";

  /* ── Header scroll state ─────────────────────────────── */
  const header = document.querySelector('#header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', onScroll);

  /* ── Mobile nav ──────────────────────────────────────── */
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      document.body.classList.toggle('mobile-nav-active');
      mobileToggle.classList.toggle('bi-list');
      mobileToggle.classList.toggle('bi-x');
    });
    document.querySelectorAll('#navmenu a').forEach(link => {
      link.addEventListener('click', () => {
        if (document.body.classList.contains('mobile-nav-active')) {
          document.body.classList.remove('mobile-nav-active');
          mobileToggle.classList.add('bi-list');
          mobileToggle.classList.remove('bi-x');
        }
      });
    });
  }

  /* ── Preloader ───────────────────────────────────────── */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      setTimeout(() => preloader.remove(), 500);
    });
  }

  /* ── Scroll-to-top ───────────────────────────────────── */
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    document.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('active', window.scrollY > 120);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── AOS ─────────────────────────────────────────────── */
  function aosInit() {
    AOS.init({ duration: 600, easing: 'ease-out', once: true, offset: 60 });
  }
  window.addEventListener('load', aosInit);

  /* ── GLightbox ───────────────────────────────────────── */
  const glightbox = GLightbox({ selector: '.glightbox' });

  /* ── Swiper ──────────────────────────────────────────── */
  window.addEventListener('load', () => {
    document.querySelectorAll('.init-swiper').forEach(el => {
      const config = JSON.parse(el.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(el, config);
    });
  });

  /* ── FAQ accordion ───────────────────────────────────── */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach(el => {
    el.addEventListener('click', () => el.closest('.faq-item').classList.toggle('faq-active'));
  });

  /* ── Skills progress bars ────────────────────────────── */
  document.querySelectorAll('.skills-animation').forEach(container => {
    new Waypoint({
      element: container,
      offset: '80%',
      handler() {
        container.querySelectorAll('.progress-bar').forEach(bar => {
          bar.style.width = bar.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /* ── Isotope portfolio ───────────────────────────────── */
  document.querySelectorAll('.isotope-layout').forEach(layout => {
    let iso;
    imagesLoaded(layout.querySelector('.isotope-container'), () => {
      iso = new Isotope(layout.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout.dataset.layout || 'masonry',
        filter: layout.dataset.defaultFilter || '*',
        sortBy: layout.dataset.sort || 'original-order'
      });
    });

    layout.querySelectorAll('.isotope-filters li').forEach(btn => {
      btn.addEventListener('click', function () {
        layout.querySelector('.filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        iso.arrange({ filter: this.dataset.filter });
      });
    });
  });

  /* ── Scrollspy ───────────────────────────────────────── */
  const navLinks = document.querySelectorAll('.navmenu a');
  function scrollspy() {
    navLinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;
      const pos = window.scrollY + 200;
      if (pos >= section.offsetTop && pos <= section.offsetTop + section.offsetHeight) {
        document.querySelectorAll('.navmenu a.active').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('load', scrollspy);
  document.addEventListener('scroll', scrollspy, { passive: true });

  /* ── Hash link offset correction ────────────────────── */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        }, 100);
      }
    }
  });

  /* ── Stats counter ───────────────────────────────────── */
  const statsSection = document.querySelector('#stats');
  if (statsSection) {
    new Waypoint({
      element: statsSection,
      offset: '85%',
      handler() {
        document.querySelectorAll('.stats-item .num[data-count]').forEach(el => {
          const target = +el.getAttribute('data-count');
          const suffix = el.querySelector('span') ? el.querySelector('span').outerHTML : '';
          let current = 0;
          const inc = Math.max(1, Math.ceil(target / 60));
          const timer = setInterval(() => {
            current = Math.min(current + inc, target);
            el.innerHTML = current + suffix;
            if (current >= target) clearInterval(timer);
          }, 20);
        });
        this.destroy();
      }
    });
  }

  /* ── Subtle link cursor transform ───────────────────── */
  document.querySelectorAll('a, button, .service-item, .team-member, .portfolio-item').forEach(el => {
    el.addEventListener('mouseenter', () => el.style.willChange = 'transform');
    el.addEventListener('mouseleave', () => el.style.willChange = '');
  });

})();
