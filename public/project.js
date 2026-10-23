(() => {
  'use strict';
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const root = document.documentElement;
  const data = window.PORTFOLIO_DATA;
  const reduceQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const readStore = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const writeStore = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let motion = readStore('harby-motion') ? readStore('harby-motion') === 'on' : !reduceQuery.matches;
  let theme = readStore('harby-theme') || 'dark';

  /* Theme + motion, shared with the home page through localStorage */
  function applyTheme() {
    root.dataset.theme = theme;
    const toggle = $('.theme-toggle');
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.setAttribute('aria-pressed', String(theme === 'light'));
    $('meta[name="theme-color"]').content = theme === 'dark' ? '#0b0d0c' : '#f0f0e8';
  }
  $('.theme-toggle').addEventListener('click', () => { theme = theme === 'dark' ? 'light' : 'dark'; writeStore('harby-theme', theme); applyTheme(); });
  applyTheme();
  function applyMotion() {
    root.dataset.motion = motion ? 'on' : 'off';
    $('#motion-toggle').setAttribute('aria-pressed', String(motion));
    $('#motion-label').textContent = motion ? 'Motion on' : 'Motion off';
    $$('svg').forEach(svg => { try { motion ? svg.unpauseAnimations() : svg.pauseAnimations(); } catch {} });
    if (!motion) $$('.reveal').forEach(el => el.classList.add('is-visible'));
  }
  $('#motion-toggle').addEventListener('click', () => { motion = !motion; writeStore('harby-motion', motion ? 'on' : 'off'); applyMotion(); });

  const clock = new Intl.DateTimeFormat('en-GB', {timeZone:'Asia/Dubai',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
  const tick = () => $$('[data-clock]').forEach(el => { el.textContent = 'UAE / ' + clock.format(new Date()); });
  tick(); setInterval(tick, 1000);
  $('#copyright-year').textContent = new Date().getFullYear();

  /* Find the project */
  const all = [data.featured, ...data.projects];
  const slug = new URLSearchParams(location.search).get('p') || location.pathname.split('/').filter(Boolean).pop()?.replace(/\.html$/, '');
  const index = all.findIndex(project => project.slug === slug);
  const main = $('#main');

  if (index < 0) {
    document.title = 'Project not found — Mohamed Harby';
    main.innerHTML = `<section class="pp-missing"><span class="mono accent">404 / PROJECT NOT FOUND</span><h1>Nothing here.</h1><p class="muted">That project link doesn't exist. It may have been renamed.</p><a class="pill-button outline-button" href="index.html#work">Browse all work <span>↗</span></a></section>`;
    applyMotion();
    return;
  }

  const project = all[index];
  const isFeatured = index === 0;
  const next = all[(index + 1) % all.length];
  const number = isFeatured ? 'FLAGSHIP' : `PROJECT ${String(index).padStart(2, '0')} / ${String(data.projects.length).padStart(2, '0')}`;
  document.title = `${project.title} — Mohamed Harby`;
  $('meta[name="description"]').content = project.summary;
  $('meta[property="og:title"]').content = `${project.title} — Mohamed Harby`;

  const youtubeId = url => {
    if (!url) return '';
    const match = String(url).match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
    return match ? match[1] : '';
  };
  const sectionId = (heading, i) => 's-' + (i + 1) + '-' + heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  /* Build the list of sections, including the special ones */
  const sections = (project.sections || []).map(section => ({...section, kind: 'text'}));
  if (project.pipeline) sections.splice(1, 0, {heading: 'Trust is a pipeline, not a prompt', kind: 'pipeline'});
  const videoId = youtubeId(project.video);
  const localVideo = project.localVideo || '';
  const repos = (project.repos || []).filter(repo => repo && repo.url);
  if (project.figures?.length) sections.push({heading: 'From the build', kind: 'figures'});
  if (isFeatured || videoId || localVideo) sections.push({heading: isFeatured ? 'Watch the walkthrough' : localVideo ? 'See it running' : 'Video presentation', kind: 'video'});
  if (repos.length) sections.push({heading: 'Source code', kind: 'source'});
  sections.forEach((section, i) => { section.id = sectionId(section.heading, i); });

  const githubIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>';

  function renderSection(section, i) {
    const head = `<span class="mono idx">${String(i + 1).padStart(2, '0')} /</span><h2>${escape(section.heading)}</h2>`;
    if (section.kind === 'pipeline') {
      return `<section class="pp-section reveal" id="${section.id}">${head}<p>The model is never the final word. Every result passes three gates before an analyst relies on it.</p><div class="case-pipeline">${project.pipeline.map(step => `<div><span class="mono">${escape(step.step)}</span><h4>${escape(step.title)}</h4><p>${escape(step.text)}</p></div>`).join('')}</div></section>`;
    }
    if (section.kind === 'figures') {
      return `<section class="pp-section reveal" id="${section.id}">${head}<div class="pp-figures">${project.figures.map(figure => `<figure><a href="${escape(figure.src)}" target="_blank" rel="noopener" aria-label="Open full size: ${escape(figure.caption)}"><img src="${escape(figure.src)}" alt="${escape(figure.caption)}" loading="lazy"></a><figcaption>${escape(figure.caption)}</figcaption></figure>`).join('')}</div><p class="pp-figure-hint mono">SELECT A FIGURE TO OPEN IT FULL SIZE ↗</p></section>`;
    }
    if (section.kind === 'video' && localVideo) {
      return `<section class="pp-section reveal" id="${section.id}">${head}<p>A screen recording of both programs: entering data with validation, then analysing it overall and by continent.</p><div class="pp-video" style="margin-top:22px"><video controls preload="metadata" playsinline ${project.videoPoster ? `poster="${escape(project.videoPoster)}"` : ''}><source src="${escape(localVideo)}" type="video/mp4">Your browser can't play this video.</video></div></section>`;
    }
    if (section.kind === 'video') {
      const frame = videoId
        ? `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0" title="${escape(project.title)} video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
        : `<div class="pp-video-empty"><span class="play-ring" aria-hidden="true">▶</span><span class="mono">VIDEO WALKTHROUGH COMING SOON</span></div>`;
      const intro = isFeatured ? 'I walk through the platform, the AI pipeline and the decisions behind it.' : 'Our recorded presentation of the deployment.';
      const link = videoId ? `<a class="text-link" href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener">Watch on YouTube <span>↗</span></a>` : '';
      return `<section class="pp-section reveal" id="${section.id}">${head}<p>${intro}</p><div class="pp-video" style="margin-top:22px">${frame}</div>${link ? `<div style="margin-top:16px">${link}</div>` : ''}</section>`;
    }
    if (section.kind === 'source') {
      const many = repos.length > 1;
      return `<section class="pp-section reveal" id="${section.id}">${head}<div class="pp-repos">${repos.map(repo => {
        const name = repo.url.replace(/^https?:\/\/(www\.)?github\.com\//, '').replace(/\/$/, '');
        return `<div class="pp-panel"><div class="gh-row"><span class="gh-icon">${githubIcon}</span><div><span class="mono">${escape(repo.label ? repo.label.toUpperCase() : 'GITHUB REPOSITORY')}</span><h3>${escape(name.split('/').pop().replace(/-+$/, '').replace(/-/g, ' '))}</h3></div></div><p>${many ? escape('github.com/' + name) : 'Browse the full source, commit history and documentation.'}</p><a class="pill-button outline-button" href="${escape(repo.url)}" target="_blank" rel="noopener noreferrer">View on GitHub <span>↗</span></a></div>`;
      }).join('')}</div></section>`;
    }
    const body = (section.body || []).map(text => `<p>${escape(text)}</p>`).join('');
    const points = section.points?.length ? `<ul>${section.points.map(point => `<li>${escape(point)}</li>`).join('')}</ul>` : '';
    return `<section class="pp-section reveal" id="${section.id}">${head}${body}${points}</section>`;
  }

  const meta = [
    ['CONTEXT', project.unit],
    ['ROLE', project.role],
    isFeatured ? ['TEAM', project.team] : ['DISCIPLINE', (project.labels || []).join(' · ')],
    isFeatured ? ['TIMELINE', project.year] : ['BUILT WITH', (project.stack || []).slice(0, 4).join(' · ')]
  ].filter(([, value]) => value);

  const title = isFeatured
    ? `<h1 class="pp-title is-brand">cybee<span>+</span></h1>`
    : `<h1 class="pp-title">${escape(project.title)}</h1>`;

  main.innerHTML = `
    <section class="pp-hero" aria-labelledby="pp-title">
      <div class="pp-kicker"><span class="mono"><a class="pp-back" href="index.html#work"><span aria-hidden="true">←</span> All work</a></span><span class="mono">${escape(number)} · ${escape((project.labels || []).join(' / '))}</span></div>
      ${title.replace('<h1 ', '<h1 id="pp-title" ')}
      <p class="pp-tagline">${escape(project.tagline || project.summary)}</p>
      <dl class="pp-meta">${meta.map(([label, value]) => `<div><dt>${label}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl>
    </section>
    <div class="pp-art" data-art="${project.art ?? 7}"><span class="art-tag">${escape(isFeatured ? 'CONCEPT VISUAL' : (project.labels || [])[0] || 'PROJECT')}</span>${window.ProjectArt.markup(project.art ?? 7)}</div>
    ${project.metrics ? `<div class="pp-metrics">${project.metrics.map(metric => `<div class="reveal"><strong>${escape(metric.value)}</strong><span>${escape(metric.label)}</span></div>`).join('')}</div>` : ''}
    <div class="pp-body">
      <aside class="pp-aside">
        <div class="pp-toc-wrap"><h2>ON THIS PAGE</h2><ol class="pp-toc">${sections.map(section => `<li><a href="#${section.id}">${escape(section.heading)}</a></li>`).join('')}</ol></div>
        ${project.stack?.length ? `<div><h2>STACK</h2><div class="pp-stack">${project.stack.map(item => `<span>${escape(item)}</span>`).join('')}</div></div>` : ''}
      </aside>
      <div class="pp-content">
        ${isFeatured ? '' : `<section class="pp-section reveal" id="overview"><span class="mono idx">IN SHORT /</span><p style="color:var(--ink);font-size:17px">${escape(project.summary)}</p></section>`}
        ${sections.map(renderSection).join('')}
      </div>
    </div>
    <nav class="pp-next" aria-label="Next project"><div><span class="mono">NEXT ${next === data.featured ? 'UP / FLAGSHIP' : 'PROJECT'}</span><a class="next-link" href="project.html?p=${encodeURIComponent(next.slug)}">${escape(next.title)} <span aria-hidden="true">↗</span></a></div><a class="text-link" href="index.html#work">Back to all work <span>↙</span></a></nav>`;

  window.ProjectArt.fit(main);
  /* Reveal, progress, table of contents */
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), {threshold: .08}) : null;
  $$('.reveal').forEach(el => (observer && motion) ? observer.observe(el) : el.classList.add('is-visible'));

  const tocLinks = $$('.pp-toc a');
  let queued = false;
  function onScroll() {
    queued = false;
    const height = root.scrollHeight - innerHeight;
    $('.scroll-progress').style.transform = `scaleX(${height > 0 ? scrollY / height : 0})`;
    let active = null;
    sections.forEach(section => { const el = document.getElementById(section.id); if (el && el.getBoundingClientRect().top < innerHeight * .35) active = section.id; });
    tocLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + active));
  }
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(onScroll); } }, {passive: true});
  onScroll();
  applyMotion();
})();
