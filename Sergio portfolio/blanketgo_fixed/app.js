const ICONS = {
  github: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
  linkedin: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
  mail: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>'
};

let DATA = null;
const SVGNS = 'http://www.w3.org/2000/svg';
const VB = 1000;
const C = VB / 2;
const RING_R = 340;
const NODE_R = 96;

async function loadData() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch('projects.json', { signal: controller.signal, cache: 'no-cache' });
    if (!res.ok) throw new Error('Project data could not be loaded.');
    const data = await res.json();
    if (!data.profile || !Array.isArray(data.categories) || !Array.isArray(data.projects)) {
      throw new Error('Project data is incomplete.');
    }
    DATA = data;
    return DATA;
  } finally {
    clearTimeout(timeout);
  }
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

function githubURL(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'github.com' && !url.username && !url.password ? url.href : '';
  } catch { return ''; }
}

function el(tag, attrs = {}, text) {
  const n = document.createElementNS(SVGNS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  if (text != null) n.textContent = text;
  return n;
}

const wheel = () => document.getElementById('wheel');
let nodeEls = [];
let isOpen = false;
let activeCategory = null;
let projectTrigger = null;
let categoryRevealTimer = null;

function buildWheel() {
  const svg = wheel();
  svg.setAttribute('viewBox', `0 0 ${VB} ${VB}`);
  svg.innerHTML = '';
  nodeEls = [];

  const defs = el('defs');
  defs.innerHTML = `
    <radialGradient id="nodeGrad" cx="50%" cy="35%" r="75%">
      <stop offset="0%" stop-color="#23232c"/>
      <stop offset="100%" stop-color="#121218"/>
    </radialGradient>
    <radialGradient id="hubGrad" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#1c1726"/>
      <stop offset="100%" stop-color="#0d0d12"/>
    </radialGradient>
    <filter id="goldGlow" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="0" stdDeviation="14" flood-color="#d4af37" flood-opacity="0.45"/>
    </filter>
    <filter id="purpleGlow" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="0" stdDeviation="18" flood-color="#7c3aed" flood-opacity="0.5"/>
    </filter>`;
  svg.appendChild(defs);

  svg.appendChild(el('circle', { cx: C, cy: C, r: RING_R + 8, class: 'cat-ring' }));
  svg.appendChild(el('circle', { cx: C, cy: C, r: RING_R - NODE_R - 18, class: 'cat-ring', 'stroke-dasharray': '2 8', opacity: '0.5' }));

  const cats = DATA.categories;
  const n = cats.length;
  cats.forEach((cat, i) => {
    const ang = (-Math.PI / 2) + (i / n) * Math.PI * 2;
    const cx = C + RING_R * Math.cos(ang);
    const cy = C + RING_R * Math.sin(ang);
    const count = DATA.projects.filter(p => p.category === cat.id).length;

    const spoke = el('line', { x1: C, y1: C, x2: cx, y2: cy, stroke: 'rgba(255,255,255,0.06)', 'stroke-width': '1.5' });
    spoke.dataset.role = 'spoke';
    svg.appendChild(spoke);

    const g = el('g', { class: 'cat-node', tabindex: '0', role: 'button', 'aria-label': cat.label });
    g.style.transformOrigin = `${cx}px ${cy}px`;
    g.style.transition = 'opacity .35s ease, transform .35s ease';

    const circle = el('circle', { cx, cy, r: NODE_R, fill: 'url(#nodeGrad)', stroke: 'rgba(212,175,55,0.5)', 'stroke-width': '1.5' });
    circle.dataset.role = 'circle';
    g.appendChild(circle);

    g.appendChild(el('text', {
      x: cx, y: cy - 8, 'text-anchor': 'middle', fill: '#f4f4f6',
      'font-size': '30', 'font-weight': '700', 'font-family': 'Space Grotesk, sans-serif'
    }, cat.short));
    g.appendChild(el('text', {
      x: cx, y: cy + 24, 'text-anchor': 'middle', fill: '#d4af37',
      'font-size': '20', 'font-family': 'JetBrains Mono, monospace', 'letter-spacing': '1'
    }, `${count} ${count === 1 ? 'project' : 'projects'}`));

    g.addEventListener('mouseenter', () => { if (!isOpen) { circle.setAttribute('filter', 'url(#goldGlow)'); circle.setAttribute('stroke', '#d4af37'); } });
    g.addEventListener('mouseleave', () => { circle.removeAttribute('filter'); circle.setAttribute('stroke', 'rgba(212,175,55,0.5)'); });
    g.addEventListener('click', () => openCategory(cat));
    g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCategory(cat); } });

    svg.appendChild(g);
    nodeEls.push({ g, cat, cx, cy });
  });

  const hub = el('g', { id: 'hub' });
  hub.appendChild(el('circle', { cx: C, cy: C, r: 130, fill: 'url(#hubGrad)', stroke: 'rgba(124,58,237,0.5)', 'stroke-width': '1.5', filter: 'url(#purpleGlow)' }));
  hub.appendChild(el('text', { x: C, y: C - 14, 'text-anchor': 'middle', fill: '#f4f4f6', 'font-size': '34', 'font-weight': '700', 'font-family': 'Space Grotesk, sans-serif' }, 'WORK'));
  hub.appendChild(el('text', { x: C, y: C + 22, 'text-anchor': 'middle', class: 'hub-label', 'font-size': '17' }, 'pick a lane'));
  svg.appendChild(hub);
}

function openCategory(cat) {
  if (isOpen) return;
  isOpen = true;
  activeCategory = cat.id;
  const svg = wheel();
  const wrap = document.getElementById('wheel-wrap');
  if (wrap) wrap.classList.add('results-open');
  document.body.classList.add('results-open');

  svg.querySelectorAll('[data-role="spoke"]').forEach(s => { s.style.transition = 'opacity .3s'; s.style.opacity = '0'; });

  nodeEls.forEach(({ g, cat: c, cx, cy }) => {
    if (c.id === cat.id) {
      g.style.transform = `translate(${(C - cx) * 0.55}px, ${(C - cy) * 0.55}px) scale(0.6)`;
      g.style.opacity = '0';
    } else {
      const ang = Math.atan2(cy - C, cx - C);
      g.style.transform = `translate(${Math.cos(ang) * 160}px, ${Math.sin(ang) * 160}px) scale(0.4)`;
      g.style.opacity = '0';
    }
  });
  const hub = document.getElementById('hub');
  hub.style.transition = 'opacity .3s ease, transform .3s ease';
  hub.style.transformOrigin = `${C}px ${C}px`;
  hub.style.transform = 'scale(0.5)';
  hub.style.opacity = '0';

  const results = document.getElementById('cat-results');
  renderCategoryResults(cat);
  categoryRevealTimer = setTimeout(() => {
    results.classList.add('show');
    document.getElementById('back-btn').focus({ preventScroll: true });
    // Scroll the results panel into view so projects are immediately visible
    // (fixes mobile bug where the first project was hidden below the fold).
    const isMobile = window.matchMedia('(max-width: 720px)').matches;
    if (isMobile) {
      const wrapEl = document.getElementById('wheel-wrap');
      if (wrapEl) {
        const topbar = document.querySelector('.topbar');
        const topbarH = topbar ? topbar.offsetHeight : 0;
        const targetY = wrapEl.getBoundingClientRect().top + window.scrollY - topbarH - 12;
        window.scrollTo({ top: Math.max(0, targetY), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    }
  }, 280);
}

function closeCategory() {
  clearTimeout(categoryRevealTimer);
  const results = document.getElementById('cat-results');
  results.classList.remove('show');
  const wrap = document.getElementById('wheel-wrap');
  if (wrap) wrap.classList.remove('results-open');
  document.body.classList.remove('results-open');
  const svg = wheel();
  svg.querySelectorAll('[data-role="spoke"]').forEach(s => { s.style.opacity = '1'; });
  nodeEls.forEach(({ g }) => { g.style.transform = ''; g.style.opacity = '1'; });
  const hub = document.getElementById('hub');
  hub.style.transform = ''; hub.style.opacity = '1';
  isOpen = false;
  nodeEls.find(({ cat }) => cat.id === activeCategory)?.g.focus({ preventScroll: true });
}

function renderCategoryResults(cat) {
  const results = document.getElementById('cat-results');
  const list = DATA.projects.filter(p => p.category === cat.id);
  results.innerHTML = `
    <button class="back-to-wheel" id="back-btn">&larr; All categories</button>
    <div class="cat-results-head">
      <h2 class="ttl">${escapeHTML(cat.label)} <span class="accent">·</span></h2>
      <div class="sub">${escapeHTML(cat.blurb)}</div>
    </div>
    <div class="proj-list">
      ${list.map(p => `
        <button type="button" class="proj-row" data-slug="${escapeHTML(p.slug)}" aria-haspopup="dialog">
          <span class="meta">
            <span class="pt">${escapeHTML(p.title)} ${visBadge()}</span>
            <span class="ps">${escapeHTML(p.summary)}</span>
          </span>
          <span class="arrow" aria-hidden="true">&rarr;</span>
        </button>`).join('')}
    </div>`;
  document.getElementById('back-btn').addEventListener('click', closeCategory);
  results.querySelectorAll('.proj-row').forEach(row => {
    row.addEventListener('click', () => openProject(row.dataset.slug));
  });
}

function repoBlock(p) {
  const url = githubURL(p.github);
  const hasRepo = url && new URL(url).pathname.split('/').filter(Boolean).length === 2;
  const target = hasRepo ? url : githubURL(DATA.profile.github);
  return {
    btn: target ? `<a class="btn btn-gold" href="${escapeHTML(target)}" target="_blank" rel="noopener noreferrer">${hasRepo ? 'Open on GitHub' : 'GitHub profile'} <span aria-hidden="true">↗</span></a>` : '',
    note: `<div class="repo-note">${hasRepo ? 'Repository access is managed on GitHub. Private repositories require an invitation and sign-in.' : 'A repository link is not listed for this project. You can find my profile on GitHub.'}</div>`
  };
}

function visBadge() {
  return '<span class="vis-badge priv">GitHub access</span>';
}

function openProject(slug) {
  const p = DATA.projects.find(x => x.slug === slug);
  if (!p) return;
  const cat = DATA.categories.find(c => c.id === p.category);
  const back = document.getElementById('detail-back');
  projectTrigger = document.activeElement;
  const tags = p.tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('');
  const hi = (p.highlights || []).map(h => `<li>${escapeHTML(h)}</li>`).join('');
  const repo = repoBlock(p);
  back.innerHTML = `
    <div class="detail-card">
      <div class="detail-cat">${escapeHTML(cat?.label)}</div>
      <h2 id="project-title">${escapeHTML(p.title)}</h2>
      <p class="desc">${escapeHTML(p.description)}</p>
      <div class="detail-tags">${tags}</div>
      ${hi ? `<div class="detail-sub">Project details</div><ul class="detail-list">${hi}</ul>` : ''}
      ${repo.note}
      <div class="detail-actions">${repo.btn}<button class="btn btn-close" id="close-detail">Close</button></div>
    </div>`;
  back.classList.add('open');
  document.body.classList.add('modal-open');
  [...document.body.children].filter(node => node !== back && node.tagName !== 'SCRIPT').forEach(node => { node.inert = true; });
  document.getElementById('close-detail').focus();
  document.getElementById('close-detail').addEventListener('click', closeProject);
}
function closeProject() {
  document.getElementById('detail-back').classList.remove('open');
  document.body.classList.remove('modal-open');
  [...document.body.children].forEach(node => { node.inert = false; });
  projectTrigger?.focus({ preventScroll: true });
}

function renderFooter() {
  const p = DATA.profile;
  return `
    <div class="container footer-inner">
      <div class="footer-socials">
        <a href="${p.github}" target="_blank" rel="noopener" aria-label="GitHub">${ICONS.github}</a>
        <a href="${p.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICONS.linkedin}</a>
        <a href="mailto:${p.email}" aria-label="Email">${ICONS.mail}</a>
      </div>
      <div class="footer-copy">© ${new Date().getFullYear()} ${escapeHTML(p.name)} · Built with care. Always learning.</div>
    </div>`;
}

document.addEventListener('keydown', e => {
  const back = document.getElementById('detail-back');
  if (e.key === 'Tab' && back?.classList.contains('open')) {
    const focusable = [...back.querySelectorAll('a[href], button')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  if (e.key !== 'Escape') return;
  if (back?.classList.contains('open')) closeProject();
  else if (isOpen) closeCategory();
});

async function init() {
  const form = document.getElementById('contact-form');
  // Attach before loading so a failed request never submits personal data in the URL.
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!DATA || !form.reportValidity()) return;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`From: ${name}\nReply to: ${email}\n\n${message}`);
    window.location.href = `mailto:${DATA.profile.email}?subject=${subject}&body=${body}`;
    document.getElementById('contact-status').textContent = 'Email draft requested. If no app opened, email ' + DATA.profile.email + ' directly.';
  });
  try {
    await loadData();
    if (wheel()) {
      document.getElementById('intro-tag').textContent = DATA.profile.tagline;
      document.getElementById('footer').innerHTML = renderFooter();
      buildWheel();
      document.getElementById('load-status').hidden = true;
      document.querySelector('.stage').setAttribute('aria-busy', 'false');
      document.getElementById('detail-back').addEventListener('click', event => {
        if (event.target.id === 'detail-back') closeProject();
      });
    }
    if (form) {
      document.getElementById('gh-link').href = githubURL(DATA.profile.github);
      document.getElementById('li-link').href = DATA.profile.linkedin;
    }
  } catch (error) {
    const status = document.getElementById('load-status') || document.getElementById('contact-status');
    status.textContent = window.location.protocol === 'file:'
      ? 'Open this portfolio through a local web server (http://localhost:8000), rather than opening the HTML file directly.'
      : 'Projects could not load. Please reload the page to try again, or contact sergiowater@gmail.com.';
    document.querySelector('.stage')?.setAttribute('aria-busy', 'false');
    if (wheel()) document.getElementById('wheel-wrap').hidden = true;
    if (form) form.querySelector('button').disabled = true;
    console.error(error);
  }
}

init();
