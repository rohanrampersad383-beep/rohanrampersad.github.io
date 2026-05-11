/* ================================================================
   Rohan Rampersad - Cinematic interactions
   ================================================================ */

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- year ---------- */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- live clock in nav ---------- */
  const navTime = document.getElementById('navTime');
  function tick() {
    if (!navTime) return;
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    navTime.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} TT`;
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- navbar scroll behavior and active section ---------- */
  const nav = document.getElementById('nav');
  const navLinks = Array.from(document.querySelectorAll('.nav__links a[href^="#"], .nav__mobile a[href^="#"]'));
  const navTargets = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  let lastY = window.scrollY;

  function updateActiveNav(y) {
    let current = navTargets[0]?.id || '';
    navTargets.forEach((section) => {
      if (y >= section.offsetTop - 180) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
    });
  }

  const onScroll = () => {
    const y = window.scrollY;
    if (nav) {
      if (y > 20) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');

      if (y > 280 && y > lastY) nav.style.transform = 'translateY(-160%)';
      else nav.style.transform = 'translateY(0)';
    }
    updateActiveNav(y);
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const navMobile = document.getElementById('navMobile');
  if (menuBtn && navMobile) {
    menuBtn.addEventListener('click', () => navMobile.classList.toggle('open'));
    navMobile.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => navMobile.classList.remove('open'))
    );
  }

  /* ---------- reveal on scroll ---------- */
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

    revealItems.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i * 50, 320) + 'ms';
      observer.observe(el);
    });
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- mouse-follow spotlight ---------- */
  const spot = document.getElementById('spotlight');
  let spotActive = false;
  if (spot && !reduceMotion) {
    window.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
      if (!spotActive) {
        spot.classList.add('is-active');
        spotActive = true;
      }
      spot.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    });
    window.addEventListener('mouseleave', () => {
      spot.classList.remove('is-active');
      spotActive = false;
    });
  }

  /* ---------- card cursor glow ---------- */
  document.querySelectorAll('[data-project], .learning-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });

  if (!reduceMotion) {
    /* ---------- subtle tilt on tilt cards ---------- */
    document.querySelectorAll('[data-tilt]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-2px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });

    /* ---------- magnetic buttons ---------- */
    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.16;
        const y = (e.clientY - r.top - r.height / 2) * 0.22;
        btn.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });

    /* ---------- hero floating cards: parallax on mouse ---------- */
    const cluster = document.querySelector('.hero__cluster');
    if (cluster) {
      const floats = cluster.querySelectorAll('.float, .hero-browser-shell');
      cluster.addEventListener('mousemove', (e) => {
        const r = cluster.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        floats.forEach((f) => {
          const depth = parseFloat(f.dataset.float || '1');
          f.style.translate = `${x * depth * 8}px ${y * depth * 8}px`;
        });
      });
      cluster.addEventListener('mouseleave', () => {
        floats.forEach((f) => { f.style.translate = ''; });
      });
    }
  }

  /* ---------- copy-to-clipboard ---------- */
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      const original = btn.textContent;
      navigator.clipboard?.writeText(text).then(() => {
        btn.textContent = 'Copied';
        setTimeout(() => { btn.textContent = original; }, 1400);
      });
    });
  });

  /* ---------- footer last-updated stamp ---------- */
  const ft = document.getElementById('footTime');
  if (ft) {
    const opts = { hour: '2-digit', minute: '2-digit' };
    ft.textContent = `today at ${new Date().toLocaleTimeString([], opts)}`;
  }
})();
