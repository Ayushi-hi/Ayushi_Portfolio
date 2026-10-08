/* effects.js — motion + interaction layer for the cyberpunk portfolio.
 *
 * Usage (e.g. in App.jsx):
 *   import './cyberpunk.css';
 *   import './effects.css';
 *   import { initEffects } from './effects';
 *   useEffect(() => initEffects(), []);
 *
 * It only touches your existing class names, so no JSX changes are needed.
 * A MutationObserver re-scans the page, so content that loads later
 * (e.g. projects fetched from an API) gets the effects too.
 */

const CONFIG = {
  bootOnce: true, // show the boot screen once per browser session
  bootLines: [
    'BIOS v2.077 ............................ OK',
    'mounting /dev/portfolio ................ OK',
    'loading skills.db ...................... OK',
    'establishing secure channel ............ OK',
    '> ACCESS GRANTED',
  ],
};

const GLYPHS = '!<>-_\\/[]{}=+*^?#0123456789';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ───────── text scramble (decrypt) ───────── */
const originals = new WeakMap();
function scramble(el, ms = 800) {
  let nodes = originals.get(el);
  if (!nodes) {
    nodes = [];
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      if (w.currentNode.nodeValue.trim()) nodes.push([w.currentNode, w.currentNode.nodeValue]);
    }
    originals.set(el, nodes);
  }
  if (!nodes.length) return;
  cancelAnimationFrame(el._fxRaf);
  if (reduce) {
    nodes.forEach(([n, t]) => (n.nodeValue = t));
    return;
  }
  const total = nodes.reduce((n, [, t]) => n + t.length, 0);
  const t0 = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - t0) / ms);
    const shown = Math.floor(p * total);
    let i = 0;
    for (const [node, text] of nodes) {
      let out = '';
      for (const ch of text) {
        out += /\s/.test(ch) || i < shown ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        i++;
      }
      node.nodeValue = out;
    }
    if (p < 1) el._fxRaf = requestAnimationFrame(tick);
  };
  el._fxRaf = requestAnimationFrame(tick);
}

export function initEffects() {
  const ac = new AbortController();
  const observers = [];
  const timers = [];
  const cleanups = [];
  const on = (t, ev, fn, opts = {}) => t.addEventListener(ev, fn, { ...opts, signal: ac.signal });
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const done = { tilt: new WeakSet(), magnet: new WeakSet(), rows: new WeakSet(), scr: new WeakSet(), count: new WeakSet(), nav: new WeakSet() };
  const fresh = (sel, key) => $$(sel).filter((e) => !done[key].has(e) && done[key].add(e));
  let ready = false; // true once the boot screen has finished
  const afterBoot = [];
  const whenReady = (fn) => (ready ? fn() : afterBoot.push(fn));

  document.documentElement.classList.add('fx');
  cleanups.push(() => document.documentElement.classList.remove('fx'));

  /* ───────── boot screen ───────── */
  function boot() {
    const skip = reduce || (CONFIG.bootOnce && sessionStorage.getItem('fxBooted'));
    if (skip) return finishBoot();
    const el = document.createElement('div');
    el.id = 'fx-boot';
    el.innerHTML = '<div class="fx-boot-term"><pre></pre><div class="fx-boot-bar"><i></i></div><small>click or press any key to skip</small></div>';
    document.body.append(el);
    document.body.classList.add('booting');
    const pre = $('pre', el);
    const bar = $('i', el);
    let i = 0;
    let finished = false;
    const end = () => {
      if (finished) return;
      finished = true;
      el.classList.add('out');
      document.body.classList.remove('booting');
      try { sessionStorage.setItem('fxBooted', '1'); } catch (e) { /* ignore */ }
      later(() => el.remove(), 800);
      finishBoot();
    };
    const next = () => {
      if (finished) return;
      if (i >= CONFIG.bootLines.length) return later(end, 400);
      pre.textContent += CONFIG.bootLines[i++] + '\n';
      bar.style.width = (i / CONFIG.bootLines.length) * 100 + '%';
      later(next, 180 + Math.random() * 180);
    };
    next();
    on(el, 'click', end);
    on(window, 'keydown', end, { once: true });
    cleanups.push(() => {
      el.remove();
      document.body.classList.remove('booting');
    });
  }
  function finishBoot() {
    ready = true;
    afterBoot.splice(0).forEach((fn) => fn());
  }

  /* ───────── scroll progress bar ───────── */
  function progress() {
    const bar = document.createElement('div');
    bar.id = 'fx-progress';
    document.body.append(bar);
    cleanups.push(() => bar.remove());
    let queued = false;
    const update = () => {
      queued = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    on(window, 'scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
    on(window, 'resize', update);
    update();
  }

  /* ───────── matrix / code rain behind the hero orbit ───────── */
  function rain() {
    const host = $('.hero-right');
    if (!host || reduce) return;
    const c = document.createElement('canvas');
    c.className = 'fx-rain';
    host.prepend(c);
    cleanups.push(() => c.remove());
    const ctx = c.getContext('2d');
    const size = 16;
    let w = 0, h = 0, drops = [], last = 0, visible = true, raf = 0;
    const chars = 'アイウエオカキクケコサシスセソ01{}<>/;=$#'.split('');
    const resize = () => {
      const r = host.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${size}px "Share Tech Mono", monospace`;
      drops = Array.from({ length: Math.ceil(w / size) }, () => -Math.random() * 40);
    };
    const frame = (t) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden || t - last < 45) return;
      last = t;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.14)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * size;
        ctx.fillStyle = Math.random() > 0.96 ? '#ff2bd6' : Math.random() > 0.85 ? '#d8ffff' : '#00f0ff';
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * size, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    resize();
    on(window, 'resize', resize);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(host);
    observers.push(io);
    raf = requestAnimationFrame(frame);
    cleanups.push(() => cancelAnimationFrame(raf));
  }

  /* ───────── hero mouse parallax ───────── */
  function parallax() {
    const hero = $('.hero');
    if (!hero || reduce || !finePointer) return;
    on(hero, 'mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      const wrap = $('.hero-circle-wrap');
      const stats = $('.hero-stats-float');
      if (wrap) wrap.style.transform = `translate(${x * 26}px, ${y * 26}px)`;
      if (stats) stats.style.transform = `translate(${x * -10}px, ${y * -8}px)`;
    });
    on(hero, 'mouseleave', () => {
      const wrap = $('.hero-circle-wrap');
      const stats = $('.hero-stats-float');
      if (wrap) wrap.style.transform = '';
      if (stats) stats.style.transform = '';
    });
  }

  /* ───────── things that need re-scanning as content loads ───────── */
  const ioRows = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('fx-in');
      ioRows.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  const ioScr = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      scramble(e.target, e.target.matches('.s-title') ? 900 : 700);
      ioScr.unobserve(e.target);
    });
  }, { threshold: 0.6 });
  observers.push(ioRows, ioScr);

  function scan() {
    // staggered entrance for rows / pills / cards
    fresh('.skill-row, .proj-item, .social-link, .vol-card, .pill, .ptag, .edu-card-new, .cert-card-new', 'rows').forEach((el) => {
      const idx = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
      el.style.setProperty('--d', Math.min(idx, 10) * 0.06 + 's');
      if (!reduce) {
        el.classList.add('fx-pre');
        ioRows.observe(el);
      }
    });

    // decrypt text when headings scroll into view
    fresh('.s-label, .s-title, .contact-big', 'scr').forEach((el) => ioScr.observe(el));

    // decrypt text on nav hover
    fresh('.nav-links a', 'nav').forEach((a) => {
      on(a, 'mouseenter', () => scramble(a, 350));
    });

    // 3D tilt + glare
    if (!reduce && finePointer) {
      fresh('.proj-featured, .cert-card-new, .hstat, .vol-card, .proj-featured-vis', 'tilt').forEach((el) => {
        el.classList.add('fx-tilt');
        on(el, 'mousemove', (e) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg)`;
          el.style.setProperty('--gx', (x + 0.5) * 100 + '%');
          el.style.setProperty('--gy', (y + 0.5) * 100 + '%');
        });
        on(el, 'mouseleave', () => (el.style.transform = ''));
      });

      // magnetic buttons
      fresh('.btn', 'magnet').forEach((b) => {
        on(b, 'mousemove', (e) => {
          const r = b.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          b.style.transform = `translate(${dx * 0.18}px, ${dy * 0.28}px)`;
        });
        on(b, 'mouseleave', () => (b.style.transform = ''));
      });
    }

    // count-up stats
    fresh('.hstat-n', 'count').forEach((el) => {
      const final = (el.dataset.final = el.dataset.final || el.textContent.trim());
      const m = final.match(/^(\d+)(.*)$/);
      if (!m || reduce) return;
      const to = +m[1];
      const suffix = m[2];
      el.textContent = '0' + suffix;
      whenReady(() => later(() => {
        const t0 = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - t0) / 1400);
          el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }, 900));
    });
  }

  let scanQueued = false;
  const mo = new MutationObserver(() => {
    if (scanQueued) return;
    scanQueued = true;
    requestAnimationFrame(() => { scanQueued = false; scan(); });
  });
  mo.observe(document.body, { childList: true, subtree: true });
  observers.push(mo);

  /* ───────── hacker terminal (press ` or click the >_ button) ───────── */
  function terminal() {
    const box = document.createElement('div');
    box.id = 'fx-term';
    box.hidden = true;
    box.innerHTML = `
      <div class="fx-term-win" role="dialog" aria-label="Terminal">
        <div class="fx-term-bar"><span>guest@portfolio:~</span><button type="button" aria-label="Close terminal">×</button></div>
        <div class="fx-term-out" role="log"></div>
        <label class="fx-term-in"><span>$</span><input autocomplete="off" spellcheck="false" aria-label="Terminal command"></label>
      </div>`;
    const fab = document.createElement('button');
    fab.id = 'fx-term-fab';
    fab.type = 'button';
    fab.textContent = '>_';
    fab.setAttribute('aria-label', 'Open terminal');
    document.body.append(box, fab);
    cleanups.push(() => { box.remove(); fab.remove(); });

    const out = $('.fx-term-out', box);
    const input = $('input', box);
    const history = [];
    let hi = 0;
    const print = (text, cls = '') => {
      const d = document.createElement('div');
      d.className = cls;
      d.textContent = text;
      out.append(d);
      out.scrollTop = out.scrollHeight;
    };
    const open = () => {
      box.hidden = false;
      if (!out.children.length) {
        print('Welcome. Type "help" to see what this terminal can do.', 'dim');
      }
      input.focus();
    };
    const close = () => { box.hidden = true; fab.focus(); };

    const SECTIONS = { about: '.about-strip', skills: '.about-strip', projects: '.projects-section', education: '.edu-section', contact: '.contact-section', top: '.hero' };
    const ACCENTS = { cyan: '#00f0ff', magenta: '#ff2bd6', yellow: '#fcee0a', green: '#39ff88' };
    const text = (sel) => ($(sel)?.textContent || '').replace(/\s+/g, ' ').trim();

    const commands = {
      help: () => ['about            who I am', 'skills           what I work with', 'projects         things I have built', 'contact          how to reach me', 'goto <section>   about | skills | projects | education | contact | top', 'theme <color>    cyan | magenta | yellow | green', 'glitch           break the matrix for a second', 'clear / exit'],
      about: () => [text('.about-body') || text('.hero-desc') || 'Nothing here yet.'],
      skills: () => {
        const rows = $$('.skill-row').map((r) => `${text_(r, '.skill-row-name')}: ${$$('.pill', r).map((p) => p.textContent.trim()).join(', ')}`);
        return rows.length ? rows : ['No skills found.'];
      },
      projects: () => {
        const names = $$('.proj-featured-name, .proj-name').map((n) => '• ' + n.textContent.replace(/\s+/g, ' ').trim());
        return names.length ? names : ['Projects are still loading. Try again in a moment.'];
      },
      contact: () => {
        const a = $('.contact-email');
        return [a ? a.textContent.trim() : 'Scroll to the contact section.', ...$$('.social-link').map((l) => `${text_(l, '.sl-label')}: ${text_(l, '.sl-val')}`)];
      },
      goto: (arg) => {
        const sel = SECTIONS[arg];
        const el = sel ? $(sel) : $('#' + CSS.escape(arg || '_'));
        if (!el) return [`Unknown section "${arg || ''}". Try: ${Object.keys(SECTIONS).join(', ')}`];
        close();
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
        return [];
      },
      theme: (arg) => {
        if (!ACCENTS[arg]) return [`Pick one: ${Object.keys(ACCENTS).join(', ')}`];
        document.documentElement.style.setProperty('--gold2', ACCENTS[arg]);
        return [`Accent set to ${arg}.`];
      },
      glitch: () => {
        document.body.classList.add('fx-glitch');
        later(() => document.body.classList.remove('fx-glitch'), 1600);
        return ['!!! signal corrupted !!!'];
      },
      clear: () => { out.innerHTML = ''; return []; },
      exit: () => { close(); return []; },
    };
    function text_(root, sel) { return ($(sel, root)?.textContent || '').replace(/\s+/g, ' ').trim(); }

    on(input, 'keydown', (e) => {
      if (e.key === 'Enter') {
        const raw = input.value.trim();
        input.value = '';
        if (!raw) return;
        history.push(raw); hi = history.length;
        print('$ ' + raw, 'cmd');
        const [cmd, ...args] = raw.toLowerCase().split(/\s+/);
        const fn = commands[cmd];
        (fn ? fn(args[0]) : [`command not found: ${cmd}. Type "help".`]).forEach((l) => print(l));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        hi = Math.max(0, hi - 1);
        input.value = history[hi] || '';
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        hi = Math.min(history.length, hi + 1);
        input.value = history[hi] || '';
      }
    });
    on(fab, 'click', open);
    on($('.fx-term-bar button', box), 'click', close);
    on(box, 'click', (e) => { if (e.target === box) close(); });
    on(window, 'keydown', (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '');
      if (e.key === '`' && !typing) { e.preventDefault(); box.hidden ? open() : close(); }
      else if (e.key === 'Escape' && !box.hidden) close();
    });
  }

  boot();
  progress();
  rain();
  parallax();
  terminal();
  scan();
  whenReady(() => {
    $$('.hero-eyebrow span, .role-badge, .circle-sub, .hero-vertical').forEach((el) => scramble(el, 900));
  });

  return () => {
    ac.abort();
    observers.forEach((o) => o.disconnect());
    timers.forEach(clearTimeout);
    cleanups.reverse().forEach((fn) => fn());
  };
}