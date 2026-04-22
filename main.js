
'use strict';

(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let rafId  = null;

  /* Smooth ring lag */
  function animateRing() {
    const ease = 0.13;
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;

    dot.style.left  = mouseX + 'px';
    dot.style.top   = mouseY + 'px';
    ring.style.left = ringX  + 'px';
    ring.style.top  = ringY  + 'px';

    rafId = requestAnimationFrame(animateRing);
  }

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafId) rafId = requestAnimationFrame(animateRing);
  });

  /* Hover state on interactive elements */
  const hoverTargets = 'a, button, [data-hover]';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) document.body.classList.add('hovering');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverTargets)) document.body.classList.remove('hovering');
  });

  /* Click state */
  document.addEventListener('mousedown', () => document.body.classList.add('clicking'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('clicking'));

  /* Hide cursor when leaving window */
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '';
    ring.style.opacity = '';
  });
})();

(function initRipple() {
  document.addEventListener('click', e => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top  = e.clientY + 'px';
    document.body.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
})();

(function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  let ticking = false;

  function updateNav() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });
})();

(function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    });
  }, { threshold: 0.45 });

  sections.forEach(s => observer.observe(s));
})();


(function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  let open = false;

  function toggle() {
    open = !open;
    btn.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  btn.addEventListener('click', toggle);

  /* Close on link click */
  menu.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      if (open) toggle();
    });
  });

  /* Close on outside click */
  menu.addEventListener('click', e => {
    if (e.target === menu) toggle();
  });

  /* Close on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && open) toggle();
  });
})();


(function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
})();

(function initFloatCards() {
  const cards = document.querySelectorAll('.float-card');
  if (!cards.length) return;

  cards.forEach((card, i) => {
    setTimeout(() => card.classList.add('visible'), 1200 + i * 300);
  });
})();

(function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-count]');
  if (!nums.length) return;

  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function animateCount(el) {
    const target   = parseFloat(el.dataset.count);
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = easeOutQuart(progress) * target;

      /* Show one decimal if target has it (e.g. 99 → "99") */
      el.textContent = Number.isInteger(target)
        ? Math.floor(value)
        : value.toFixed(1);

      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(el => observer.observe(el));
})();

(function initMagnetic() {
  /* Only on non-touch devices */
  if (window.matchMedia('(hover: none)').matches) return;

  const targets = document.querySelectorAll('.btn-primary, .btn-ghost, .nav-cta, .feat-card');

  targets.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect    = el.getBoundingClientRect();
      const cx      = rect.left + rect.width  / 2;
      const cy      = rect.top  + rect.height / 2;
      const dx      = (e.clientX - cx) * 0.22;
      const dy      = (e.clientY - cy) * 0.22;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1)';
      setTimeout(() => { el.style.transition = ''; }, 500);
    });
  });
})();


(function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hero   = document.getElementById('hero');
  const cards  = document.querySelectorAll('.float-card');
  const orbs   = document.querySelectorAll('.orb');
  if (!hero) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      /* Fade & translate hero content */
      const heroH = hero.offsetHeight;
      const prog  = Math.min(scrollY / heroH, 1);
      const content = hero.querySelector('.hero-content');
      if (content) {
        content.style.transform = `translateY(${scrollY * 0.18}px)`;
        content.style.opacity   = 1 - prog * 1.4;
      }

      /* Orb parallax */
      orbs.forEach((orb, i) => {
        const factor = [0.04, 0.07, 0.05][i] || 0.05;
        orb.style.transform = `translateY(${scrollY * factor}px)`;
      });

      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();

(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      const top    = target.getBoundingClientRect().top + window.scrollY - (navH || 72);

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


(function initPageLoad() {
  document.documentElement.style.opacity = '0';
  document.documentElement.style.transition = 'opacity .5s ease';

  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      document.documentElement.style.opacity = '1';
    });
  });
})();