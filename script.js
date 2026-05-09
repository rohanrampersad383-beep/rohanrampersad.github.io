/* ================================================================
   ROHAN RAMPERSAD — Cinematic interactions
   ================================================================ */

(function () {

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
  tick(); setInterval(tick, 1000);

  /* ---------- navbar scroll behavior ---------- */
  const nav = document.getElementById('nav');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    if (y > 20) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
    if (y > 280 && y > lastY) nav.style.transform = 'translateY(-160%)';
    else nav.style.transform = 'translateY(0)';
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const navMobile = document.getElementById('navMobile');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => navMobile.classList.toggle('open'));
    navMobile.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navMobile.classList.remove('open'))
    );
  }

  /* ---------- reveal on scroll ---------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = Math.min(i * 50, 320) + 'ms';
    observer.observe(el);
  });

  /* ---------- mouse-follow spotlight ---------- */
  const spot = document.getElementById('spotlight');
  let spotActive = false;
  window.addEventListener('mousemove', (e) => {
    if (!spotActive) { spot.classList.add('is-active'); spotActive = true; }
    spot.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
  });
  window.addEventListener('mouseleave', () => { spot.classList.remove('is-active'); spotActive = false; });

  /* ---------- project cards: cursor glow ---------- */
  document.querySelectorAll('[data-project]').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });

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

  /* ---------- hero floating cards: parallax on mouse ---------- */
  const cluster = document.querySelector('.hero__cluster');
  if (cluster) {
    const floats = cluster.querySelectorAll('.float');
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
/* ---------- copy-to-clipboard ---------- */
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      const original = btn.textContent;
      navigator.clipboard?.writeText(text).then(() => {
        btn.textContent = 'Copied ✓';
        setTimeout(() => { btn.textContent = original; }, 1400);
      });
    });
  });

  /* ---------- footer last-deploy stamp ---------- */
  const ft = document.getElementById('footTime');
  if (ft) {
    const opts = { hour: '2-digit', minute: '2-digit' };
    ft.textContent = `today · ${new Date().toLocaleTimeString([], opts)}`;
  }

})();
