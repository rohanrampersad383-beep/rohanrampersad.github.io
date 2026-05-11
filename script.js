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
    if (animeApi.engine) {
      animeApi.engine.fps = 60;
      animeApi.engine.pauseOnDocumentHidden = true;
    }
    console.log('Portfolio interactions loaded');
  }

  const runAnime = (config) => {
    if (!animeReady) return null;
    const { targets, ...params } = config;
    return animeApi.animate(targets, { autoplay: true, ...params });
  };
  const runFastAnime = (config) => {
    if (!animeReady) return null;
    const { targets, ...params } = config;
    if (animeApi.waapi && typeof animeApi.waapi.animate === 'function') {
      try {
        return animeApi.waapi.animate(targets, { autoplay: true, ...params });
      } catch (error) {
        return animeApi.animate(targets, { autoplay: true, ...params });
      }
    }
    return animeApi.animate(targets, { autoplay: true, ...params });
  };
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const retainedObservers = [];

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
  const desktopNavLinks = Array.from(document.querySelectorAll('.nav__links a[href^="#"]'));
  const navIndicator = document.querySelector('.nav__indicator');
  const navTargets = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  let lastY = window.scrollY;
  const navIndicatorState = { x: 0, width: 34, opacity: 0 };

  function moveNavIndicator(activeLink) {
    if (!navIndicator || !activeLink || window.innerWidth <= 820) return;
    const parentRect = activeLink.parentElement.getBoundingClientRect();
    const rect = activeLink.getBoundingClientRect();
    const next = {
      x: rect.left - parentRect.left + 8,
      width: Math.max(28, rect.width - 16),
      opacity: 1,
    };

    if (animeReady) {
      runAnime({
        targets: navIndicatorState,
        x: next.x,
        width: next.width,
        opacity: next.opacity,
        duration: 380,
        easing: 'outCubic',
        onUpdate: () => {
          navIndicator.style.transform = `translateX(${navIndicatorState.x}px)`;
          navIndicator.style.width = `${navIndicatorState.width}px`;
          navIndicator.style.opacity = String(navIndicatorState.opacity);
        },
      });
    } else {
      navIndicator.style.transform = `translateX(${next.x}px)`;
      navIndicator.style.width = `${next.width}px`;
      navIndicator.style.opacity = '1';
    }
  }

  function updateActiveNav(y) {
    let current = navTargets[0]?.id || '';
    navTargets.forEach((section) => {
      if (y >= section.offsetTop - 180) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
    });
    moveNavIndicator(desktopNavLinks.find((link) => link.getAttribute('href') === `#${current}`));
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
    if (window.__cursorMoodReady) updateCursorMoodByScroll(y);
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

    const badgeTargets = document.querySelectorAll('.hero__badges .pill');
    const headlineTargets = document.querySelectorAll('.hero__title .reveal-line');
    const introTargets = document.querySelectorAll('.hero__meta');
    const ctaTargets = document.querySelectorAll('.hero__cta .btn, .hero__socials > *');
    const stripTargets = document.querySelectorAll('.hero__strip .strip');
    const visualTargets = document.querySelectorAll('.hero-browser-shell, .hero__cluster .float');
    const runtimeBadge = document.querySelector('.portfolio-runtime-badge');
    const stagedTargets = [
      ...badgeTargets,
      ...(runtimeBadge ? [runtimeBadge] : []),
      ...headlineTargets,
      ...introTargets,
      ...ctaTargets,
      ...stripTargets,
    ];

    animeApi.set(stagedTargets, { opacity: 0, translateY: 24 });
    animeApi.set(visualTargets, { opacity: 0, translateY: 28, scale: 0.975 });
    if (runtimeBadge) animeApi.set(runtimeBadge, { opacity: 0, translateY: 10, scale: 0.94 });

    if (typeof animeApi.createTimeline === 'function') {
      const heroTl = animeApi.createTimeline({ autoplay: true, defaults: { easing: 'outCubic' } });
      heroTl
        .add(badgeTargets, { opacity: [0, 1], translateY: [22, 0], delay: animeApi.stagger(70), duration: 640 }, 80)
        .add(runtimeBadge, { opacity: [0, 1], translateY: [10, 0], scale: [0.94, 1], duration: 560 }, 170)
        .add(headlineTargets, { opacity: [0, 1], translateY: [36, 0], delay: animeApi.stagger(110), duration: 820, easing: 'outExpo' }, 240)
        .add(introTargets, { opacity: [0, 1], translateY: [24, 0], duration: 720 }, 540)
        .add(visualTargets, { opacity: [0, 1], translateY: [34, 0], scale: [0.975, 1], delay: animeApi.stagger(95), duration: 920, easing: 'outExpo' }, 360)
        .add(ctaTargets, { opacity: [0, 1], translateY: [20, 0], delay: animeApi.stagger(55), duration: 620 }, 720)
        .add(stripTargets, { opacity: [0, 1], translateY: [18, 0], delay: animeApi.stagger(80), duration: 680 }, 900);
      return;
    }

    runAnime({
      targets: [...stagedTargets, ...visualTargets],
      opacity: [0, 1],
      translateY: [24, 0],
      delay: animeApi.stagger(72, { start: 80 }),
      duration: 900,
      easing: 'outCubic',
    });
  }
  runHeroIntro();

  /* ---------- Anime.js SVG line drawing and motion path accent ---------- */
  function setupHeroSvgShowcase() {
    const drawPaths = Array.from(document.querySelectorAll('.anime-draw-path, .anime-motion-path'));
    const motionPath = document.getElementById('heroMotionPath');
    const motionDot = document.getElementById('heroMotionDot');
    if (!drawPaths.length || !animeReady) return;

    drawPaths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });

    drawPaths.forEach((path, index) => {
      runAnime({
        targets: path,
        strokeDashoffset: [path.getTotalLength(), 0],
        delay: 980 + index * 180,
        duration: 1800,
        easing: 'inOutSine',
      });
    });

    if (motionDot) motionDot.style.display = 'none';
  }
  setupHeroSvgShowcase();

  /* ---------- hero convergence into RR core ---------- */
  function setupHeroConvergence() {
    const hero = document.querySelector('.hero');
    const avatar = document.querySelector('.hero__avatar');
    const convergence = document.getElementById('heroConvergence');
    const paths = Array.from(document.querySelectorAll('[data-convergence-path]'));
    const particles = Array.from(document.querySelectorAll('[data-convergence-particle]'));
    const pulse = document.querySelector('.hero__avatar-pulse');
    if (!hero || !avatar || !convergence || !paths.length) return;
    let convergenceActivated = false;
    const staticConvergence = reduceMotion || window.innerWidth <= 640;
    const activePathCount = 3;
    const activePaths = paths.slice(0, activePathCount);
    const activeParticles = particles.slice(0, activePathCount);
    paths.slice(activePathCount).forEach((path) => { path.style.display = 'none'; });
    particles.slice(activePathCount).forEach((particle) => { particle.style.display = 'none'; });

    const drawConvergencePaths = () => {
      const heroRect = hero.getBoundingClientRect();
      const avatarRect = avatar.getBoundingClientRect();
      const width = Math.max(1, Math.round(heroRect.width));
      const height = Math.max(1, Math.round(Math.min(heroRect.height, window.innerHeight * 0.92)));
      const target = {
        x: avatarRect.left - heroRect.left + avatarRect.width / 2,
        y: avatarRect.top - heroRect.top + avatarRect.height / 2,
      };
      convergence.setAttribute('viewBox', `0 0 ${width} ${height}`);

      const starts = [
        { x: width * 0.08, y: height * 0.16, c1x: width * 0.03, c1y: height * 0.32, c2x: target.x - 92, c2y: target.y - 132 },
        { x: width * 0.88, y: height * 0.2, c1x: width * 0.86, c1y: height * 0.58, c2x: target.x + 260, c2y: target.y + 118 },
        { x: width * 0.76, y: height * 0.76, c1x: width * 0.56, c1y: height * 0.78, c2x: target.x + 188, c2y: target.y + 92 },
        { x: width * 0.28, y: height * 0.08, c1x: width * 0.18, c1y: height * 0.24, c2x: target.x - 126, c2y: target.y - 86 },
      ];

      paths.forEach((path, index) => {
        const route = starts[index] || starts[0];
        const d = `M${route.x.toFixed(1)} ${route.y.toFixed(1)} C${route.c1x.toFixed(1)} ${route.c1y.toFixed(1)} ${route.c2x.toFixed(1)} ${route.c2y.toFixed(1)} ${target.x.toFixed(1)} ${target.y.toFixed(1)}`;
        path.setAttribute('d', d);
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = staticConvergence || convergenceActivated ? '0' : length;
        if (particles[index]) {
          const startPoint = path.getPointAtLength(0);
          particles[index].setAttribute('cx', startPoint.x);
          particles[index].setAttribute('cy', startPoint.y);
          particles[index].style.opacity = reduceMotion ? '0' : '0';
          particles[index].style.transform = 'none';
        }
      });
    };

    const powerUpAvatar = () => {
      avatar.classList.add('is-powered');
      if (!animeReady) return;
      runFastAnime({
        targets: avatar,
        scale: [1, 1.16, 1],
        duration: 900,
        easing: 'outElastic(1, .55)',
      });
      if (pulse) {
        runFastAnime({
          targets: pulse,
          opacity: [0, .95, 0],
          scale: [0.8, 2.35],
          duration: 980,
          easing: 'outCubic',
        });
      }
      window.setTimeout(() => {
        avatar.style.willChange = 'auto';
        convergence.classList.add('is-settled');
        paths.forEach((path) => { path.style.willChange = 'auto'; });
      }, 1400);
    };

    drawConvergencePaths();
    window.addEventListener('resize', () => {
      drawConvergencePaths();
    }, { passive: true });

    if (staticConvergence || !animeReady || !activePaths.length) {
      powerUpAvatar();
      return;
    }

    const arrivalAt = 3350;
    const baseDelay = 760;
    const stagger = 130;
    let completedParticles = 0;
    convergenceActivated = true;

    activePaths.forEach((path, index) => {
      const delay = baseDelay + index * stagger;
      const duration = Math.max(1500, arrivalAt - delay);
      path.style.willChange = 'stroke-dashoffset, opacity';
      runAnime({
        targets: path,
        strokeDashoffset: [path.getTotalLength(), 0],
        opacity: [0.1, 0.68, 0.24],
        delay,
        duration,
        easing: 'inOutSine',
      });

      const particle = activeParticles[index];
      if (!particle) return;
      if (typeof animeApi.createMotionPath === 'function') {
        particle.setAttribute('cx', '0');
        particle.setAttribute('cy', '0');
        const motion = animeApi.createMotionPath(path);
        runAnime({
          targets: particle,
          translateX: motion.translateX,
          translateY: motion.translateY,
          rotate: motion.rotate,
          opacity: [0, 1, 1, 0],
          scale: [0.65, 1.18, 1],
          delay,
          duration,
          easing: 'inOutSine',
          onComplete: () => {
            particle.style.display = 'none';
            completedParticles += 1;
            if (completedParticles === activeParticles.length) powerUpAvatar();
          },
        });
        return;
      }

      const length = path.getTotalLength();
      const startTime = performance.now() + delay;
      const fallbackMove = (time) => {
        if (time < startTime) {
          requestAnimationFrame(fallbackMove);
          return;
        }
        const progress = clamp((time - startTime) / duration, 0, 1);
        const point = path.getPointAtLength(progress * length);
        particle.setAttribute('cx', point.x);
        particle.setAttribute('cy', point.y);
        particle.style.opacity = progress > .04 && progress < .96 ? '1' : '0';
        if (progress < 1) {
          requestAnimationFrame(fallbackMove);
          return;
        }
        completedParticles += 1;
        particle.style.display = 'none';
        if (completedParticles === activeParticles.length) powerUpAvatar();
      };
      requestAnimationFrame(fallbackMove);
    });
  }
  setupHeroConvergence();

  /* ---------- signature hero orb and network animation ---------- */
  function setupSignatureHeroEffects() {
    if (!animeReady) return;

    const hero = document.querySelector('.hero');
    const heroLoopAnimations = [];
    const networkLines = Array.from(document.querySelectorAll('.hero-network__line'));
    const networkNodes = document.querySelectorAll('.hero-network__node');
    networkLines.forEach((line) => {
      const length = line.getTotalLength();
      line.style.strokeDasharray = length;
      line.style.strokeDashoffset = length;
    });

    networkLines.forEach((line, index) => {
      runAnime({
        targets: line,
        strokeDashoffset: [line.getTotalLength(), 0],
        delay: 760 + index * 180,
        duration: 1500,
        easing: 'inOutSine',
      });
    });

    runAnime({
      targets: networkNodes,
      opacity: [0.25, 1],
      scale: [0.65, 1.18],
      delay: animeApi.stagger(95, { start: 1150, from: 'center' }),
      duration: 900,
      easing: 'outElastic(1, .55)',
    });

    const orbSpin = runAnime({
      targets: '.portfolio-runtime-badge__orb, .hero__avatar-orb',
      rotate: [0, 360],
      duration: 18000,
      loop: true,
      easing: 'linear',
    });
    const arcSpinA = runAnime({
      targets: '.hero__avatar-arc--1',
      rotate: [0, 360],
      duration: 14000,
      loop: true,
      easing: 'linear',
    });
    const arcSpinB = runAnime({
      targets: '.hero__avatar-arc--2',
      rotate: [360, 0],
      duration: 19000,
      loop: true,
      easing: 'linear',
    });
    [orbSpin, arcSpinA, arcSpinB].forEach((animation) => {
      if (animation) heroLoopAnimations.push(animation);
    });

    if ('IntersectionObserver' in window && heroLoopAnimations.length) {
      const heroAnimationObserver = new IntersectionObserver((entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        heroLoopAnimations.forEach((animation) => {
          if (isVisible) {
            if (typeof animation.play === 'function') animation.play();
            return;
          }
          if (typeof animation.pause === 'function') animation.pause();
        });
      }, { threshold: 0.05 });
      if (hero) {
        heroAnimationObserver.observe(hero);
        retainedObservers.push(heroAnimationObserver);
      }
    }
  }
  setupSignatureHeroEffects();

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

  /* ---------- animated stats counters ---------- */
  function setupStatsCounters() {
    const stats = document.querySelector('[data-stats]');
    const counters = Array.from(document.querySelectorAll('[data-stat-count]'));
    if (!stats || !counters.length) return;
    if (animeReady) animeApi.set('.stat-tile', { opacity: 0.001, translateY: 22 });

    const playCounters = () => {
      counters.forEach((counter, index) => {
        const target = Number(counter.getAttribute('data-stat-count') || '0');
        if (!animeReady) {
          counter.textContent = String(target);
          return;
        }

        const state = { value: 0 };
        runAnime({
          targets: state,
          value: target,
          delay: 120 + index * 140,
          duration: 1050,
          easing: 'outCubic',
          onUpdate: () => {
            counter.textContent = String(Math.round(state.value));
          },
        });
      });

      if (animeReady) {
        runAnime({
          targets: '.stat-tile',
          opacity: [0.001, 1],
          translateY: [22, 0],
          delay: animeApi.stagger(70),
          duration: 720,
          easing: 'outCubic',
        });
      }
    };

    let played = false;
    const tryPlayCounters = () => {
      if (played) return;
      const rect = stats.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.86 && rect.bottom > 0) {
        played = true;
        playCounters();
        window.removeEventListener('scroll', tryPlayCounters);
        window.removeEventListener('resize', tryPlayCounters);
      }
    };

    if ('IntersectionObserver' in window && !reduceMotion) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          tryPlayCounters();
          statsObserver.disconnect();
        });
      }, { threshold: 0.24 });
      statsObserver.observe(stats);
      retainedObservers.push(statsObserver);
      window.addEventListener('scroll', tryPlayCounters, { passive: true });
      window.addEventListener('resize', tryPlayCounters);
      setTimeout(tryPlayCounters, 400);
    } else {
      playCounters();
    }
  }
  setupStatsCounters();

  /* ---------- project storytelling flow animations ---------- */
  function setupProjectFlows() {
    const flows = Array.from(document.querySelectorAll('[data-flow]'));
    if (!flows.length) return;

    const playFlow = (flow) => {
      const nodes = flow.querySelectorAll('.flow-node');
      const connectors = flow.querySelectorAll('.flow-connector');
      const trace = flow.querySelector('.flow-trace');

      if (!animeReady) {
        nodes.forEach((node) => node.classList.add('is-flow-hot'));
        return;
      }

      runAnime({
        targets: nodes,
        opacity: [0.001, 1],
        translateY: [12, 0],
        scale: [0.92, 1],
        delay: animeApi.stagger(110),
        duration: 560,
        easing: 'outCubic',
      });
      runAnime({
        targets: connectors,
        scaleX: [0, 1],
        transformOrigin: ['0% 50%', '0% 50%'],
        delay: animeApi.stagger(120, { start: 180 }),
        duration: 620,
        easing: 'outCubic',
      });
      nodes.forEach((node, index) => {
        setTimeout(() => node.classList.add('is-flow-hot'), 260 + index * 170);
        setTimeout(() => node.classList.remove('is-flow-hot'), 1200 + index * 120);
      });
      if (trace) {
        runAnime({
          targets: trace,
          translateX: ['0%', '480%'],
          opacity: [0, 1, 0],
          delay: 380,
          duration: 1500,
          easing: 'inOutSine',
        });
      }
    };

    if ('IntersectionObserver' in window && !reduceMotion) {
      const flowObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          playFlow(entry.target);
          flowObserver.unobserve(entry.target);
        });
      }, { threshold: 0.36 });
      flows.forEach((flow) => flowObserver.observe(flow));
      retainedObservers.push(flowObserver);
    } else {
      flows.forEach(playFlow);
    }
  }
  setupProjectFlows();

  /* ---------- advanced skill grid wave ---------- */
  function setupSkillWave() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection || !animeReady || reduceMotion) return;

    const waveTargets = skillsSection.querySelectorAll('.bento__cell, .tech-orbit');
    const chipTargets = skillsSection.querySelectorAll('.chip, .tech-drag-badge');
    animeApi.set(waveTargets, { opacity: 0.001, translateY: 34, scale: 0.97 });
    animeApi.set(chipTargets, { opacity: 0.001, translateY: 18, scale: 0.9 });

    const playWave = () => {
      runAnime({
        targets: waveTargets,
        opacity: [0.001, 1],
        translateY: [34, 0],
        scale: [0.97, 1],
        delay: animeApi.stagger(95, { grid: [3, 2], from: 'center' }),
        duration: 760,
        easing: 'outExpo',
      });

      runAnime({
        targets: chipTargets,
        opacity: [0.001, 1],
        translateY: [18, 0],
        scale: [0.9, 1],
        delay: animeApi.stagger(24, { grid: [8, 6], from: 'center', start: 220 }),
        duration: 520,
        easing: 'outCubic',
      });
    };

    if ('IntersectionObserver' in window) {
      const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          playWave();
          skillObserver.disconnect();
        });
      }, { threshold: 0.18 });
      skillObserver.observe(skillsSection);
      retainedObservers.push(skillObserver);
    } else {
      playWave();
    }

    if (!allowPointerEffects) return;
    chipTargets.forEach((chip) => {
      if (chip.classList.contains('tech-drag-badge')) return;
      chip.addEventListener('mouseenter', () => {
        runAnime({
          targets: chip,
          translateY: -5,
          scale: 1.055,
          duration: 260,
          easing: 'outCubic',
        });
      });
      chip.addEventListener('mouseleave', () => {
        runAnime({
          targets: chip,
          translateY: 0,
          scale: 1,
          duration: 420,
          easing: 'outElastic(1, .55)',
        });
      });
    });
  }
  setupSkillWave();

  /* ---------- interactive skill category filter ---------- */
  function setupSkillFilters() {
    const tabs = Array.from(document.querySelectorAll('[data-skill-filter]'));
    const skills = Array.from(document.querySelectorAll('[data-skill-cats]'));
    if (!tabs.length || !skills.length) return;

    const applyFilter = (category) => {
      tabs.forEach((tab) => {
        tab.classList.toggle('is-active', tab.getAttribute('data-skill-filter') === category);
      });

      skills.forEach((skill, index) => {
        const cats = (skill.getAttribute('data-skill-cats') || '').split(/\s+/);
        const isMatch = category === 'all' || cats.includes(category);
        skill.classList.toggle('skill-dimmed', !isMatch);
        skill.classList.toggle('skill-highlight', isMatch && category !== 'all');

        if (animeReady) {
          runAnime({
            targets: skill,
            opacity: isMatch ? 1 : 0.28,
            scale: isMatch ? [0.96, 1.04, 1] : 0.96,
            translateY: isMatch ? [-2, 0] : 0,
            delay: Math.min(index * 12, 220),
            duration: 360,
            easing: 'outCubic',
          });
        }
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => applyFilter(tab.getAttribute('data-skill-filter') || 'all'));
    });
  }
  setupSkillFilters();

  /* ---------- scroll-synced divider fill ---------- */
  function setupScrollDividerFill() {
    const dividers = Array.from(document.querySelectorAll('.bleed-divider'));
    if (!dividers.length || reduceMotion) {
      dividers.forEach((divider) => divider.style.setProperty('--scroll-fill', '100%'));
      return;
    }

    let ticking = false;
    const updateDividerFill = () => {
      const viewport = window.innerHeight || 1;
      dividers.forEach((divider) => {
        const rect = divider.getBoundingClientRect();
        const progress = clamp((viewport - rect.top) / (viewport + rect.height + 180), 0, 1);
        divider.style.setProperty('--scroll-fill', `${Math.round(progress * 100)}%`);
      });
      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateDividerFill);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();
  }
  setupScrollDividerFill();

  /* ---------- cursor energy field ---------- */
  const spot = document.getElementById('spotlight');
  const cursorShape = document.getElementById('cursorShape');
  const cursorPath = document.getElementById('cursorEnergyPath');
  const particleLayer = document.getElementById('cursorParticles');
  const root = document.documentElement;
  const cursorState = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    energy: 0.18,
    scale: 0.74,
    stretch: 0,
    rotation: 0,
  };
  const auraState = {
    x: cursorState.x,
    y: cursorState.y,
    energy: cursorState.energy,
    scale: cursorState.scale,
  };
  const cursorMorphTargets = ['#cursorMorphA', '#cursorMorphB', '#cursorMorphC', '#cursorMorphD'];
  const cursorMoods = {
    hero: ['34, 211, 238', '124, 92, 255', '91, 139, 255'],
    stack: ['59, 130, 246', '34, 211, 238', '124, 92, 255'],
    projects: ['124, 92, 255', '34, 211, 238', '244, 114, 182'],
    contact: ['34, 211, 238', '34, 197, 94', '91, 139, 255'],
  };
  const cursorMoodSections = [
    ['#home', 'hero'],
    ['#skills', 'stack'],
    ['#projects', 'projects'],
    ['#contact', 'contact'],
  ];
  let lastParticleAt = 0;
  let activeParticles = 0;
  const particlePool = [];
  const maxCursorParticles = 30;
  let idleTimer = null;
  let lastPointer = { x: cursorState.x, y: cursorState.y, t: performance.now() };
  let currentCursorMood = 'hero';
  let currentMorphIndex = 0;
  let morphLocked = false;
  let auraFrame = null;
  const auraTarget = {
    x: cursorState.x,
    y: cursorState.y,
    energy: cursorState.energy,
    scale: cursorState.scale,
  };

  function applyCursorMood(mode) {
    if (mode === currentCursorMood) return;
    currentCursorMood = mode;
    const mood = cursorMoods[mode] || cursorMoods.hero;
    root.style.setProperty('--cursor-rgb', mood[0]);
    root.style.setProperty('--cursor-rgb-2', mood[1]);
    root.style.setProperty('--cursor-rgb-3', mood[2]);
  }

  function updateCursorMoodByScroll(y = window.scrollY) {
    let nextMood = 'hero';
    cursorMoodSections.forEach(([selector, mood]) => {
      const section = document.querySelector(selector);
      if (section && y >= section.offsetTop - window.innerHeight * 0.42) nextMood = mood;
    });
    applyCursorMood(nextMood);
  }

  function paintCursor() {
    root.style.setProperty('--cursor-x', `${auraState.x}px`);
    root.style.setProperty('--cursor-y', `${auraState.y}px`);
    root.style.setProperty('--cursor-energy', Math.max(cursorState.energy, auraState.energy).toFixed(3));
    if (spot) {
      spot.style.transform = `translate(${auraState.x - 75}px, ${auraState.y - 75}px) scale(${auraState.scale})`;
    }
    if (cursorShape) {
      const stretchX = 1 + cursorState.stretch * 0.24;
      const stretchY = 1 - cursorState.stretch * 0.1;
      cursorShape.style.transform = `translate(${cursorState.x - 32}px, ${cursorState.y - 32}px) rotate(${cursorState.rotation}deg) scale(${cursorState.scale * stretchX}, ${cursorState.scale * stretchY})`;
    }
  }

  function setCursorEnergy(energy, duration = 420) {
    const nextEnergy = clamp(energy, 0.12, 1);
    cursorState.energy = nextEnergy;
    cursorState.scale = 0.64 + nextEnergy * 0.32;
    auraTarget.energy = nextEnergy;
    auraTarget.scale = 0.66 + nextEnergy * 0.34;
    paintCursor();
    scheduleAuraTrail();

    if (animeReady && spot) {
      runAnime({
        targets: spot,
        opacity: [parseFloat(getComputedStyle(spot).opacity) || 0, Math.min(0.68, 0.42 + nextEnergy * 0.18)],
        duration,
        easing: 'outCubic',
      });
    }
    if (animeReady && cursorShape) {
      runAnime({
        targets: cursorShape,
        opacity: [parseFloat(getComputedStyle(cursorShape).opacity) || 0, Math.min(0.94, 0.68 + nextEnergy * 0.18)],
        duration,
        easing: 'outCubic',
      });
    }
  }

  function morphCursor(targetSelector, duration = 560) {
    if (!allowPointerEffects || !animeReady || !cursorPath || !animeApi.svg || typeof animeApi.svg.morphTo !== 'function') {
      const target = document.querySelector(targetSelector);
      if (cursorPath && target) cursorPath.setAttribute('d', target.getAttribute('d'));
      return;
    }
    if (morphLocked) return;
    morphLocked = true;
    try {
      runAnime({
        targets: cursorPath,
        d: animeApi.svg.morphTo(targetSelector),
        duration,
        easing: 'inOutQuad',
        onComplete: () => { morphLocked = false; },
      });
    } catch (error) {
      const target = document.querySelector(targetSelector);
      if (target) cursorPath.setAttribute('d', target.getAttribute('d'));
      morphLocked = false;
    }
  }

  function startCursorMorphLoop() {
    if (!allowPointerEffects || !cursorPath || reduceMotion) return;
    const loop = () => {
      currentMorphIndex = (currentMorphIndex + 1) % cursorMorphTargets.length;
      morphCursor(cursorMorphTargets[currentMorphIndex], 720 + Math.random() * 220);
      window.setTimeout(loop, 980 + Math.random() * 520);
    };
    window.setTimeout(loop, 720);
  }

  function updateAuraTrail() {
    auraState.x += (auraTarget.x - auraState.x) * 0.34;
    auraState.y += (auraTarget.y - auraState.y) * 0.34;
    auraState.energy += (auraTarget.energy - auraState.energy) * 0.22;
    auraState.scale += (auraTarget.scale - auraState.scale) * 0.22;
    paintCursor();
    const moving =
      Math.abs(auraTarget.x - auraState.x) > 0.4 ||
      Math.abs(auraTarget.y - auraState.y) > 0.4 ||
      Math.abs(auraTarget.energy - auraState.energy) > 0.01 ||
      Math.abs(auraTarget.scale - auraState.scale) > 0.01;
    if (moving) {
      auraFrame = requestAnimationFrame(updateAuraTrail);
    } else {
      auraFrame = null;
    }
  }

  function scheduleAuraTrail() {
    if (!auraFrame) auraFrame = requestAnimationFrame(updateAuraTrail);
  }

  function getCursorParticle() {
    if (!particleLayer) return null;
    const particle = particlePool.pop() || document.createElement('span');
    particle.style.display = 'block';
    particle.style.opacity = '0';
    particle.style.transform = 'none';
    return particle;
  }

  function recycleCursorParticle(particle) {
    particle.style.display = 'none';
    particle.style.opacity = '0';
    particle.className = 'cursor-particle';
    activeParticles = Math.max(0, activeParticles - 1);
    if (particlePool.length < maxCursorParticles) particlePool.push(particle);
  }

  function spawnCursorParticle(x, y, burst = 1, velocity = 0) {
    if (!particleLayer || !animeReady) return;
    const now = performance.now();
    const heroRect = document.querySelector('.hero')?.getBoundingClientRect();
    const inHero = heroRect && y >= heroRect.top && y <= heroRect.bottom;
    if (burst <= 1 && now - lastParticleAt < (inHero ? 58 : 34)) return;
    lastParticleAt = now;

    const emissions = Math.min(burst, inHero ? 3 : 5);
    const colors = [
      getComputedStyle(root).getPropertyValue('--cursor-rgb').trim() || '34, 211, 238',
      getComputedStyle(root).getPropertyValue('--cursor-rgb-2').trim() || '124, 92, 255',
      getComputedStyle(root).getPropertyValue('--cursor-rgb-3').trim() || '91, 139, 255',
    ];

    for (let i = 0; i < emissions; i += 1) {
      if (activeParticles >= (inHero ? 18 : maxCursorParticles)) return;
      activeParticles += 1;
      const particle = getCursorParticle();
      if (!particle) return;
      const variant = Math.random();
      particle.className = `cursor-particle${variant > 0.72 ? ' cursor-particle--dash' : variant > 0.42 ? ' cursor-particle--diamond' : ''}`;
      const size = 5 + Math.random() * 6 + Math.min(velocity * 0.018, 4);
      const drift = 28 + Math.random() * 42 + Math.min(velocity * 0.12, 28);
      particle.style.setProperty('--p-size', `${size}px`);
      particle.style.setProperty('--p-rgb', colors[Math.floor(Math.random() * colors.length)]);
      particle.style.left = `${x + (Math.random() - 0.5) * 10}px`;
      particle.style.top = `${y + (Math.random() - 0.5) * 10}px`;
      if (!particle.parentNode) particleLayer.appendChild(particle);

      runAnime({
        targets: particle,
        translateX: [0, (Math.random() - 0.5) * drift],
        translateY: [0, (Math.random() - 0.5) * drift],
        rotate: [Math.random() * 80 - 40, Math.random() * 220 - 110],
        opacity: [1, 0],
        scale: [0.9 + Math.random() * 0.55, 0],
        duration: 480 + Math.random() * 260,
        easing: 'outCubic',
        onComplete: () => recycleCursorParticle(particle),
      });
    }
  }

  function setupCursorMoodObserver() {
    if (!('IntersectionObserver' in window) || reduceMotion) return;
    const moodObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        applyCursorMood(entry.target.getAttribute('data-cursor-mood') || 'hero');
      });
    }, { threshold: 0.28, rootMargin: '-20% 0px -45% 0px' });

    cursorMoodSections.forEach(([selector, mood]) => {
      const section = document.querySelector(selector);
      if (!section) return;
      section.setAttribute('data-cursor-mood', mood);
      moodObserver.observe(section);
    });
    retainedObservers.push(moodObserver);
  }

  applyCursorMood('hero');
  paintCursor();
  setupCursorMoodObserver();
  startCursorMorphLoop();
  window.__cursorMoodReady = true;
  updateCursorMoodByScroll();

  if (spot && cursorShape && allowPointerEffects) {
    root.classList.add('custom-cursor-ready');
    window.addEventListener('mousemove', (e) => {
      if (!spot.classList.contains('is-active')) spot.classList.add('is-active');
      if (cursorShape && !cursorShape.classList.contains('is-active')) cursorShape.classList.add('is-active');
      spot.classList.remove('is-idle');
      if (cursorShape) cursorShape.classList.remove('is-idle');
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        spot.classList.add('is-idle');
        if (cursorShape) cursorShape.classList.add('is-idle');
        cursorState.stretch = 0;
        setCursorEnergy(0.15, 900);
      }, 950);

      const now = performance.now();
      const dx = e.clientX - lastPointer.x;
      const dy = e.clientY - lastPointer.y;
      const dt = Math.max(16, now - lastPointer.t);
      const velocity = Math.sqrt(dx * dx + dy * dy) / dt * 16.67;
      const stretch = clamp(velocity / 42, 0, 1);
      const rotation = Math.abs(dx) + Math.abs(dy) > 2 ? Math.atan2(dy, dx) * (180 / Math.PI) : cursorState.rotation;
      lastPointer = { x: e.clientX, y: e.clientY, t: now };

      cursorState.x = e.clientX;
      cursorState.y = e.clientY;
      cursorState.energy = Math.max(cursorState.energy, 0.34 + stretch * 0.18);
      cursorState.scale = Math.max(cursorState.scale, 0.74 + stretch * 0.1);
      cursorState.stretch = stretch;
      cursorState.rotation = rotation;
      paintCursor();

      auraTarget.x = e.clientX;
      auraTarget.y = e.clientY;
      auraTarget.energy = Math.max(auraTarget.energy, 0.24 + stretch * 0.14);
      auraTarget.scale = Math.max(auraTarget.scale, 0.7 + stretch * 0.07);
      scheduleAuraTrail();
      spawnCursorParticle(e.clientX, e.clientY, stretch > 0.55 ? 2 : 1, velocity);
    }, { passive: true });
    window.addEventListener('mouseleave', () => {
      spot.classList.remove('is-active');
      if (cursorShape) cursorShape.classList.remove('is-active');
      setCursorEnergy(0.12, 500);
    });

    const energyTargets = document.querySelectorAll(
      '.btn, .social-chip, .nav__links a, [data-project], .learning-card, .chip, .story-chip, .project-flow, .tech-drag-badge, .portfolio-runtime-badge, .contact__row'
    );
    energyTargets.forEach((target) => {
      target.classList.add('energy-target');
      target.addEventListener('mouseenter', () => {
        target.classList.add('is-energy-hover');
        setCursorEnergy(0.82, 220);
        morphCursor('#cursorMorphB', 420);
        cursorState.stretch = Math.max(cursorState.stretch, 0.62);
        spawnCursorParticle(cursorState.x, cursorState.y, 5, 38);
        if (animeReady) {
          runAnime({
            targets: target,
            scale: target.matches('[data-project], .learning-card') ? 1.012 : 1.045,
            translateY: target.matches('[data-project], .learning-card') ? -4 : -2,
            duration: 260,
            easing: 'outCubic',
          });
        }
      });
      target.addEventListener('mouseleave', () => {
        target.classList.remove('is-energy-hover');
        setCursorEnergy(0.28, 420);
        if (animeReady) {
          runAnime({
            targets: target,
            scale: 1,
            translateY: 0,
            duration: 420,
            easing: 'outElastic(1, .55)',
          });
        }
      });
    });

    document.querySelectorAll('input, textarea, select, [contenteditable="true"]').forEach((field) => {
      field.addEventListener('mouseenter', () => root.classList.add('cursor-text-mode'));
      field.addEventListener('mouseleave', () => root.classList.remove('cursor-text-mode'));
      field.addEventListener('focus', () => root.classList.add('cursor-text-mode'));
      field.addEventListener('blur', () => root.classList.remove('cursor-text-mode'));
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

    let frame = card.querySelector('.case__anime-frame');
    if (!frame) {
      frame = document.createElement('span');
      frame.className = 'case__anime-frame';
      frame.innerHTML = [
        '<span class="case__frame-glint case__frame-glint--top"></span>',
        '<span class="case__frame-glint case__frame-glint--right"></span>',
        '<span class="case__frame-glint case__frame-glint--bottom"></span>',
        '<span class="case__frame-glint case__frame-glint--left"></span>',
      ].join('');
      card.appendChild(frame);
    }

    if (!allowPointerEffects || !animeReady) return;

    card.addEventListener('mouseenter', () => {
      card.classList.add('is-frame-active');
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
      runAnime({
        targets: frame.querySelector('.case__frame-glint--top'),
        translateX: ['0%', '380%'],
        opacity: [0, 1, 0],
        duration: 760,
        easing: 'outCubic',
      });
      runAnime({
        targets: frame.querySelector('.case__frame-glint--bottom'),
        translateX: ['360%', '-20%'],
        opacity: [0, 0.85, 0],
        duration: 760,
        easing: 'outCubic',
      });
      runAnime({
        targets: frame.querySelectorAll('.case__frame-glint--left, .case__frame-glint--right'),
        translateY: ['0%', '330%'],
        opacity: [0, 0.75, 0],
        delay: animeApi.stagger(80),
        duration: 720,
        easing: 'outCubic',
      });
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('is-frame-active');
      runAnime({
        targets: card,
        translateY: 0,
        scale: 1,
        duration: 420,
        easing: 'outCubic',
      });
    });
  });

  /* ---------- draggable tech badges ---------- */
  function setupDraggableTechBadges() {
    const stage = document.querySelector('.tech-orbit__stage');
    const badges = Array.from(document.querySelectorAll('.tech-drag-badge'));
    if (!stage || !badges.length || !allowPointerEffects) return;

    if (typeof animeApi?.createDraggable === 'function') {
      try {
        badges.forEach((badge) => {
          animeApi.createDraggable(badge, {
            container: stage,
            containerPadding: 8,
            releaseStiffness: 46,
            releaseDamping: 13,
            releaseEase: 'out(3)',
            onGrab: () => badge.classList.add('is-dragging'),
            onRelease: () => badge.classList.remove('is-dragging'),
          });
        });
        return;
      } catch (error) {
        console.warn('Anime.js Draggable unavailable; using bounded pointer fallback.', error);
      }
    }

    badges.forEach((badge) => {
      let dragging = false;
      let startX = 0;
      let startY = 0;
      let currentX = 0;
      let currentY = 0;
      let bounds = null;

      badge.addEventListener('pointerdown', (event) => {
        dragging = true;
        badge.classList.add('is-dragging');
        badge.setPointerCapture?.(event.pointerId);
        startX = event.clientX - currentX;
        startY = event.clientY - currentY;

        const stageRect = stage.getBoundingClientRect();
        const badgeRect = badge.getBoundingClientRect();
        bounds = {
          minX: -(badgeRect.left - stageRect.left) + 8,
          maxX: stageRect.right - badgeRect.right - 8,
          minY: -(badgeRect.top - stageRect.top) + 8,
          maxY: stageRect.bottom - badgeRect.bottom - 8,
        };

        if (animeReady) {
          runAnime({
            targets: badge,
            scale: 1.08,
            duration: 180,
            easing: 'outCubic',
          });
        }
      });

      badge.addEventListener('pointermove', (event) => {
        if (!dragging || !bounds) return;
        currentX = clamp(event.clientX - startX, bounds.minX, bounds.maxX);
        currentY = clamp(event.clientY - startY, bounds.minY, bounds.maxY);
        badge.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.08)`;
      });

      const release = (event) => {
        if (!dragging) return;
        dragging = false;
        badge.classList.remove('is-dragging');
        badge.releasePointerCapture?.(event.pointerId);

        if (animeReady) {
          runAnime({
            targets: badge,
            translateX: currentX,
            translateY: currentY,
            scale: [1.08, 1],
            duration: 520,
            easing: 'outElastic(1, .55)',
          });
        } else {
          badge.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
      };

      badge.addEventListener('pointerup', release);
      badge.addEventListener('pointercancel', release);
      badge.addEventListener('dblclick', () => {
        currentX = 0;
        currentY = 0;
        if (animeReady) {
          runAnime({
            targets: badge,
            translateX: 0,
            translateY: 0,
            scale: 1,
            duration: 580,
            easing: 'outElastic(1, .55)',
          });
        } else {
          badge.style.transform = '';
        }
      });
    });
  }
  setupDraggableTechBadges();

  if (animeReady) {
    runAnime({
      targets: '.tech-orbit__hint-icon',
      translateX: [-3, 3],
      direction: 'alternate',
      loop: true,
      duration: 980,
      easing: 'inOutSine',
    });
  }

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
