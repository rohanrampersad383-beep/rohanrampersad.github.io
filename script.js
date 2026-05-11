/* ================================================================
   Rohan Rampersad - Anime.js powered interactions
   ================================================================ */

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const allowPointerEffects = !reduceMotion && !coarsePointer;
  const animeApi = window.anime || null;
  const animeReady = !!(animeApi && typeof animeApi.animate === 'function') && !reduceMotion;

  if (animeApi && typeof animeApi.animate === 'function') {
    console.log('Anime.js latest version loaded successfully');
  }

  const runAnime = (config) => {
    if (!animeReady) return null;
    const { targets, ...params } = config;
    return animeApi.animate(targets, params);
  };

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

  /* ---------- hero intro animation ---------- */
  function runHeroIntro() {
    if (!animeReady) return;

    const introTargets = document.querySelectorAll(
      '.hero__badges .pill, .hero__title .reveal-line, .hero__meta, .hero__cta .btn, .hero__socials > *, .hero__strip .strip'
    );
    const visualTargets = document.querySelectorAll('.hero-browser-shell, .hero__cluster .float');

    animeApi.set(introTargets, { opacity: 0, translateY: 24 });
    animeApi.set(visualTargets, { opacity: 0, translateY: 28, scale: 0.975 });

    runAnime({
      targets: introTargets,
      opacity: [0, 1],
      translateY: [24, 0],
      delay: animeApi.stagger(72, { start: 80 }),
      duration: 900,
      easing: 'outCubic',
    });

    runAnime({
      targets: visualTargets,
      opacity: [0, 1],
      translateY: [34, 0],
      scale: [0.975, 1],
      delay: animeApi.stagger(110, { start: 360 }),
      duration: 950,
      easing: 'outExpo',
    });
  }
  runHeroIntro();

  /* ---------- terminal boot sequence ---------- */
  function runTerminalSequence() {
    const terminal = document.querySelector('.float--terminal .terminal');
    if (!terminal || !animeReady) return;

    const lines = [
      '<span class="c-mut">&gt;</span> initializing portfolio...',
      '<span class="c-mut">&gt;</span> loading projects...',
      '<span class="c-mut">&gt;</span> connecting to GitHub...',
      '<span class="c-ok">&gt;</span> AI Job Match Assistant ready',
      '<span class="c-ok">&gt;</span> Fitness Central ready',
      '<span class="c-ok">&gt;</span> resume loaded successfully',
      '<span class="c-acc">▌</span>',
    ];

    terminal.innerHTML = '';
    lines.forEach((line, index) => {
      const row = document.createElement('span');
      row.className = 'terminal__line';
      row.innerHTML = line;
      row.style.opacity = '0';
      row.style.transform = 'translateY(8px)';
      terminal.appendChild(row);

      runAnime({
        targets: row,
        opacity: [0, 1],
        translateY: [8, 0],
        duration: 420,
        delay: 520 + index * 260,
        easing: 'outCubic',
      });
    });

    const cursor = terminal.querySelector('.terminal__line:last-child');
    if (cursor) {
      cursor.classList.add('terminal__cursor');
      runAnime({
        targets: cursor,
        opacity: [1, 0.25],
        direction: 'alternate',
        loop: true,
        duration: 650,
        easing: 'inOutSine',
        delay: 2200,
      });
    }
  }
  runTerminalSequence();

  /* ---------- reveal on scroll ---------- */
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        target.classList.add('is-visible');

        if (animeReady) {
          target.style.transition = 'none';
          runAnime({
            targets: target,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 860,
            easing: 'outCubic',
          });

          if (target.classList.contains('bento__cell') || target.classList.contains('learning-card')) {
            runAnime({
              targets: target.querySelectorAll('.chip, .learning-card__kicker, h3, p'),
              opacity: [0, 1],
              translateY: [12, 0],
              delay: animeApi.stagger(38, { start: 120 }),
              duration: 520,
              easing: 'outCubic',
            });
          }

          if (target.matches('.case')) {
            runAnime({
              targets: target.querySelectorAll('.chip, .case__metrics > div, .case__cta .btn'),
              opacity: [0, 1],
              translateY: [12, 0],
              delay: animeApi.stagger(45, { start: 180 }),
              duration: 560,
              easing: 'outCubic',
            });
          }
        }

        observer.unobserve(target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

    revealItems.forEach((el) => {
      if (animeReady && el.closest('.hero')) {
        el.classList.add('is-visible');
        return;
      }
      observer.observe(el);
    });
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- mouse-follow spotlight ---------- */
  const spot = document.getElementById('spotlight');
  let spotActive = false;
  const spotlightState = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  if (spot && allowPointerEffects) {
    window.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
      if (!spotActive) {
        spot.classList.add('is-active');
        spotActive = true;
      }

      if (animeReady) {
        runAnime({
          targets: spotlightState,
          x: e.clientX,
          y: e.clientY,
          duration: 420,
          easing: 'outQuad',
          update: () => {
            spot.style.transform = `translate(${spotlightState.x - 300}px, ${spotlightState.y - 300}px)`;
          },
        });
      } else {
        spot.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      }
    });
    window.addEventListener('mouseleave', () => {
      spot.classList.remove('is-active');
      spotActive = false;
    });
  }

  /* ---------- card cursor glow and Anime.js hover polish ---------- */
  document.querySelectorAll('[data-project], .learning-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });

  document.querySelectorAll('[data-project]').forEach((card) => {
    let shine = card.querySelector('.case__shine');
    if (!shine) {
      shine = document.createElement('span');
      shine.className = 'case__shine';
      card.appendChild(shine);
    }

    if (!allowPointerEffects || !animeReady) return;

    card.addEventListener('mouseenter', () => {
      runAnime({
        targets: card,
        translateY: -8,
        scale: 1.006,
        duration: 360,
        easing: 'outCubic',
      });
      runAnime({
        targets: shine,
        translateX: ['-120%', '220%'],
        opacity: [0, 0.9, 0],
        duration: 760,
        easing: 'outCubic',
      });
    });

    card.addEventListener('mouseleave', () => {
      runAnime({
        targets: card,
        translateY: 0,
        scale: 1,
        duration: 420,
        easing: 'outCubic',
      });
    });
  });

  if (allowPointerEffects) {
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
    document.querySelectorAll('[data-magnetic], .btn, .social-chip').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.14;
        const y = (e.clientY - r.top - r.height / 2) * 0.2;

        if (animeReady) {
          runAnime({
            targets: btn,
            translateX: x,
            translateY: y,
            duration: 260,
            easing: 'outQuad',
          });
        } else {
          btn.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
        }
      });
      btn.addEventListener('mouseleave', () => {
        if (animeReady) {
          runAnime({
            targets: btn,
            translateX: 0,
            translateY: 0,
            duration: 420,
            easing: 'outElastic(1, .55)',
          });
        } else {
          btn.style.transform = '';
        }
      });
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

  /* ---------- divider and frame accents ---------- */
  if (animeReady) {
    runAnime({
      targets: '.bleed-divider',
      scaleX: [0.45, 1],
      opacity: [0.35, 0.95],
      delay: animeApi.stagger(120),
      duration: 900,
      easing: 'outCubic',
    });
    runAnime({
      targets: '.mockup-ring, .frame-glow-ring',
      opacity: [0.28, 0.62],
      direction: 'alternate',
      loop: true,
      duration: 2600,
      easing: 'inOutSine',
    });
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
