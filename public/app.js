(() => {
  'use strict';
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const root = document.documentElement;
  const data = window.PORTFOLIO_DATA;
  const reduceQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(pointer: fine)');
  const readStore = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const writeStore = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  let motion = readStore('harby-motion') ? readStore('harby-motion') === 'on' : !reduceQuery.matches;
  let theme = readStore('harby-theme') || 'dark';
  let canvasRedraw = () => {};
  let canvasStop = () => {};
  let previousFocus = null;
  const escape = value => String(value || '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

  function applyTheme() {
    root.dataset.theme = theme;
    $('.theme-toggle').setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    $('.theme-toggle').setAttribute('aria-pressed', String(theme === 'light'));
    $('meta[name="theme-color"]').content = theme === 'dark' ? '#0b0d0c' : '#f0f0e8';
    canvasRedraw();
  }
  $('.theme-toggle').addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    writeStore('harby-theme', theme);
    applyTheme();
  });
  applyTheme();

  function applyMotion() {
    root.dataset.motion = motion ? 'on' : 'off';
    $('#motion-toggle').setAttribute('aria-pressed', String(motion));
    $('#motion-label').textContent = motion ? 'Motion on' : 'Motion off';
    $$('svg').forEach(svg => { try { motion ? svg.unpauseAnimations() : svg.pauseAnimations(); } catch {} });
    if (!motion) {
      $$('.reveal').forEach(el => el.classList.add('is-visible'));
      $$('[data-count]').forEach(el => { el.textContent = el.dataset.count + (el.dataset.suffix || ''); });
      $$('.magnetic').forEach(el => { el.style.transform = ''; });
      canvasStop();
    }
    canvasRedraw();
  }
  $('#motion-toggle').addEventListener('click', () => {
    motion = !motion;
    writeStore('harby-motion', motion ? 'on' : 'off');
    applyMotion();
  });
  reduceQuery.addEventListener('change', () => {
    if (!readStore('harby-motion')) { motion = !reduceQuery.matches; applyMotion(); }
  });
  applyMotion();

  const loadCount = $('#load-count');
  const introStart = performance.now();
  function loadFrame(now) {
    const progress = Math.min(1, (now - introStart) / 700);
    loadCount.textContent = String(Math.floor(progress * 100)).padStart(3, '0');
    if (progress < 1 && motion) requestAnimationFrame(loadFrame);
  }
  if (motion) requestAnimationFrame(loadFrame);

  const clockFormatter = new Intl.DateTimeFormat('en-GB', {timeZone:'Asia/Dubai',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
  const updateClock = () => { $$('[data-clock]').forEach(el => { el.textContent = 'UAE / ' + clockFormatter.format(new Date()); }); };
  updateClock();
  setInterval(updateClock, 1000);
  $('#copyright-year').textContent = new Date().getFullYear();

  const menuToggle = $('.menu-toggle');
  const mobileNav = $('#mobile-nav');
  function setMenu(open, restoreFocus = true) {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileNav.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    if (open) $('a', mobileNav).focus({preventScroll:true});
    else if (restoreFocus) menuToggle.focus({preventScroll:true});
  }
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', mobileNav).forEach(a => a.addEventListener('click', () => setMenu(false, false)));
  matchMedia('(min-width: 761px)').addEventListener('change', event => { if(event.matches && !mobileNav.hidden) setMenu(false, false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileNav.hidden) setMenu(false);
    if (event.key === 'Tab' && !mobileNav.hidden) {
      const focusable = [menuToggle, ...$$('a', mobileNav)];
      if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable.at(-1).focus(); }
      else if (!event.shiftKey && document.activeElement === focusable.at(-1)) { event.preventDefault(); focusable[0].focus(); }
    }
  });

  let revealObserver;
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, {threshold:0.08,rootMargin:'0px 0px -20px 0px'});
  }
  function observeReveals(context = document) {
    $$('.reveal', context).forEach(el => {
      if (revealObserver && motion) revealObserver.observe(el);
      else el.classList.add('is-visible');
    });
  }
  observeReveals();

  const countObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      countObserver.unobserve(entry.target);
      const el = entry.target;
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      if (!motion) return;
      const start = performance.now();
      function tick(now) {
        if (!motion) { el.textContent = target + suffix; return; }
        const progress = Math.min(1, (now - start) / 1400);
        el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3))) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, {threshold:.5}) : null;
  if (countObserver) $$('[data-count]').forEach(el => countObserver.observe(el));

  const reading = $('[data-read-reveal]');
  const fullReadingText = reading.textContent;
  reading.setAttribute('aria-label', fullReadingText);
  reading.innerHTML = fullReadingText.split(/\s+/).map(word => `<span class="read-word" aria-hidden="true">${escape(word)}</span>`).join(' ');
  const readWords = $$('.read-word', reading);
  let scrollQueued = false;
  function updateScroll() {
    const height = root.scrollHeight - innerHeight;
    $('.scroll-progress').style.transform = `scaleX(${height > 0 ? scrollY / height : 0})`;
    const rect = reading.getBoundingClientRect();
    const progress = motion ? Math.min(1, Math.max(0, (innerHeight * .87 - rect.top) / (innerHeight * .55))) : 1;
    readWords.forEach((word, index) => word.classList.toggle('lit', index / readWords.length < progress));
    const timeline = $('#timeline');
    const timelineRect = timeline.getBoundingClientRect();
    timeline.style.setProperty('--timeline-progress', Math.max(0, Math.min(1, (innerHeight * .7 - timelineRect.top) / timelineRect.height)));
    const sections = ['about','work','experience','credentials'];
    let active = '';
    for (const id of sections) { if ($('#'+id).getBoundingClientRect().top < innerHeight * .42) active = id; }
    $$('.nav-link').forEach(el => {
      el.classList.toggle('active', el.dataset.nav === active);
      if(el.dataset.nav === active) el.setAttribute('aria-current','location'); else el.removeAttribute('aria-current');
    });
    scrollQueued = false;
  }
  addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); } }, {passive:true});
  addEventListener('resize', updateScroll, {passive:true});

  const artMarkup = type => window.ProjectArt.markup(type);

  const orderedProjects = data.projects;
  const projectUrl = slug => `project.html?p=${encodeURIComponent(slug)}`;
  const workCount = $('#work-count-number');
  if (workCount) workCount.textContent = String(data.projects.length).padStart(2,'0');
  let currentFilter = 'all';
  let expandedProjects = false;
  const archiveGrid = $('#projects-grid');
  function renderProjects() {
    const matches = orderedProjects.filter(project => currentFilter === 'all' || project.tags.includes(currentFilter));
    const visible = expandedProjects ? matches : matches.slice(0,6);
    archiveGrid.innerHTML = visible.map(project => {
      const index = data.projects.indexOf(project);
      const art = project.art ?? 7;
      const href = projectUrl(project.slug);
      return `<article class="project-card"><a class="project-preview" href="${href}" data-art="${art}" data-cursor="Open" aria-label="Open project: ${escape(project.title)}"><span class="preview-topline"><span>${String(index+1).padStart(2,'0')} / ${escape(project.labels[0] || 'PROJECT')}</span><span>READ THE CASE STUDY</span></span>${artMarkup(art)}<span class="preview-open" aria-hidden="true">↗</span></a><div class="project-caption"><div><h4><a href="${href}" tabindex="-1">${escape(project.title)}</a></h4><p>${project.labels.map(escape).join(' / ')}</p></div><span aria-hidden="true">↗</span></div></article>`;
    }).join('');
    $('#project-count').textContent = `Showing ${visible.length} of ${matches.length} projects`;
    const show = $('#show-projects');
    show.hidden = matches.length <= 6;
    show.innerHTML = expandedProjects ? 'Show selected projects <span>−</span>' : `View all ${matches.length} projects <span>+</span>`;
    show.setAttribute('aria-expanded', String(expandedProjects));
    show.setAttribute('aria-controls','projects-grid');
    $$('.filter-button').forEach(button => {
      const count = button.dataset.filter === 'all' ? data.projects.length : data.projects.filter(project => project.tags.includes(button.dataset.filter)).length;
      button.setAttribute('aria-pressed', String(button.dataset.filter === currentFilter));
      const existing = $('span',button);
      if (existing) existing.textContent = count;
      else { const countSpan = document.createElement('span'); countSpan.textContent = count; button.append(countSpan); }
    });
    if (!motion) $$('svg', archiveGrid).forEach(svg => { try { svg.pauseAnimations(); } catch {} });
    window.ProjectArt.fit(archiveGrid);
  }
  renderProjects();
  $$('.filter-button').forEach(button => button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    expandedProjects = false;
    renderProjects();
  }));
  $$('[data-filter-jump]').forEach(link => link.addEventListener('click', () => {
    currentFilter = link.dataset.filterJump;
    expandedProjects = true;
    renderProjects();
  }));
  $('#show-projects').addEventListener('click', () => {
    const wasExpanded = expandedProjects;
    expandedProjects = !expandedProjects;
    renderProjects();
    if (wasExpanded) $('.project-archive').scrollIntoView({behavior:motion?'smooth':'instant',block:'start'});
  });

  $('#timeline').innerHTML = data.experience.map((entry,index) => `<details class="experience-entry reveal" ${entry.open?'open':''}><summary><span class="mono">${escape(entry.date)}</span><h3>${escape(entry.title)}</h3><span class="experience-org">${escape(entry.organization)}</span><span class="experience-toggle" aria-hidden="true">+</span></summary><div class="experience-body">${entry.description?`<p>${escape(entry.description)}</p>`:''}${entry.details.length?`<ul>${entry.details.map(detail=>`<li>${escape(detail)}</li>`).join('')}</ul>`:''}</div></details>`).join('');
  $('#cert-list').innerHTML = data.certifications.map((cert,index) => `<article class="cert-card reveal ${cert.inProgress?'in-progress':'is-clickable'}">${cert.inProgress?'':`<button class="card-open" type="button" data-cert="${index}" aria-label="View certificate: ${escape(cert.title)}"></button>`}<span class="cert-symbol" aria-hidden="true">${cert.inProgress?'◌':'✳'}</span><div><h4>${escape(cert.title)}</h4><p>${escape(cert.issuer)}</p></div>${cert.inProgress?'':'<span class="cert-view" aria-hidden="true">↗</span>'}</article>`).join('');
  $('#skills-grid').innerHTML = data.skills.map((group,index)=>`<div class="skill-group reveal"><h4>${escape(group.title)}<span>[0${index+1}]</span></h4><div class="skill-tags">${group.items.map(item=>`<span>${escape(item)}</span>`).join('')}</div></div>`).join('');
  const win = data.highlight;
  if (win) $('#highlight-win').innerHTML = `<article class="win-card reveal"><div class="win-photos">${win.images.map((image,index)=>`<button class="win-photo" type="button" data-win-image="${index}" data-cursor="View" aria-label="Enlarge photo: ${escape(image.alt)}"><img src="${escape(image.src)}" alt="${escape(image.alt)}" loading="lazy"></button>`).join('')}</div><div class="win-copy"><span class="mono win-label"><i class="status-dot"></i> ${escape(win.label)}</span><h4>${escape(win.title)}</h4><span class="win-org mono">${escape(win.organizers)}</span><p>${escape(win.description)}</p>${win.project ? `<a class="text-link win-link" href="project.html?p=${encodeURIComponent(win.project)}">See what we built <span>↗</span></a>` : ''}</div></article>`;
  $('#recognition-list').innerHTML = data.awards.map(award=>`<article class="recognition-item"><span class="mono">${escape(award.label)}</span><div><h4>${escape(award.title)}</h4><p>${escape(award.description)}</p></div></article>`).join('');
  observeReveals();
  updateScroll();

  const dialog = $('#media-dialog');
  function openMedia({kicker, title, sub, file, verify, verify2, alt, foot}) {
    previousFocus = document.activeElement;
    $('#media-foot').textContent = foot || 'MOHAMED HARBY / CREDENTIALS';
    $('#media-kicker').textContent = kicker;
    $('#media-title').textContent = title;
    $('#media-sub').textContent = sub || '';
    const frame = $('#media-frame');
    frame.classList.remove('is-stack');
    const actions = $('#media-actions');
    const unavailable = () => {
      frame.innerHTML = `<div class="media-missing"><span class="mono">PREVIEW UNAVAILABLE</span><p>This document can't be shown right now.${verify ? ' You can still verify it with the issuer.' : ' Get in touch and I\'ll send a copy.'}</p></div>`;
      $('[data-full]', actions)?.remove();
    };
    actions.innerHTML = `${file ? `<a class="text-link" data-full href="${escape(file)}" target="_blank" rel="noopener">Open full size <span>↗</span></a>` : ''}${verify ? `<a class="text-link" href="${escape(verify)}" target="_blank" rel="noopener noreferrer">Verify with issuer <span>↗</span></a>` : ''}`;
    if (Array.isArray(file)) {
      const roman = ['I','II','III','IV'];
      actions.innerHTML = file.map((src, i) => `<a class="text-link" href="${escape(src)}" target="_blank" rel="noopener">Open ${roman[i]} <span>↗</span></a>`).join('') + [verify, verify2].filter(Boolean).map((url, i) => `<a class="text-link" href="${escape(url)}" target="_blank" rel="noopener noreferrer">Verify ${roman[i]} <span>↗</span></a>`).join('');
      frame.classList.add('is-stack');
      frame.innerHTML = file.map((src, i) => `<img src="${escape(src)}" alt="${escape(title)}, part ${roman[i]}" loading="lazy">`).join('');
    }
    else if (!file) unavailable();
    else if (/\.pdf($|\?)/i.test(file)) {
      frame.innerHTML = `<object data="${escape(file)}#view=FitH" type="application/pdf" aria-label="${escape(title)}"><div class="media-missing"><span class="mono">PDF</span><p>Your browser can't show PDFs here. Use "Open full size" below.</p></div></object>`;
    } else {
      frame.innerHTML = `<div class="media-loading mono">LOADING…</div>`;
      const img = new Image();
      img.alt = alt || title;
      img.onload = () => { frame.innerHTML = ''; frame.append(img); };
      img.onerror = unavailable;
      img.src = file;
    }
    document.body.classList.add('dialog-open');
    dialog.showModal();
    $('.dialog-close', dialog).focus({preventScroll:true});
  }
  function closeDialog() { dialog.close(); }
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    $('#media-frame').innerHTML = '';
    if (previousFocus?.isConnected) previousFocus.focus({preventScroll:true});
  });
  $('.dialog-close', dialog).addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect=dialog.getBoundingClientRect(); if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom) closeDialog(); } });
  $('#cert-list').addEventListener('click', event => {
    const button = event.target.closest('[data-cert]');
    if (!button) return;
    const cert = data.certifications[Number(button.dataset.cert)];
    openMedia({kicker:'CERTIFICATION', title:cert.title, sub:cert.issuer, file:cert.file, verify:cert.verify, verify2:cert.verify2});
  });
  $('#open-degree')?.addEventListener('click', () => {
    const degree = data.degree || {};
    openMedia({kicker:'EDUCATION / SEP 2023 — JUN 2026', title:degree.title || 'BSc Cybersecurity', sub:[degree.issuer || 'Curtin University Dubai', degree.honours, 'GPA 3.5 / 4.0', degree.conferred && 'Conferred ' + degree.conferred].filter(Boolean).join(' · '), file:degree.file, verify:degree.verify});
  });
  $('#highlight-win')?.addEventListener('click', event => {
    const button = event.target.closest('[data-win-image]');
    if (!button || !win) return;
    const image = win.images[Number(button.dataset.winImage)];
    openMedia({kicker:win.label, title:win.title, sub:win.organizers, file:image.src, alt:image.alt, foot:'MOHAMED HARBY / RECOGNITION'});
  });

  const dashTabs = $$('[data-dash]');
  function selectDashTab(tab, focus = false) {
    dashTabs.forEach(button => {
      const selected = button === tab;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
      $('#view-'+button.dataset.dash).hidden = !selected;
    });
    if (focus) tab.focus();
  }
  dashTabs.forEach((tab,index) => {
    tab.addEventListener('click', () => selectDashTab(tab));
    tab.addEventListener('keydown', event => {
      if (['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) {
        event.preventDefault();
        let next = event.key === 'Home' ? 0 : event.key === 'End' ? dashTabs.length-1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + dashTabs.length) % dashTabs.length;
        selectDashTab(dashTabs[next],true);
      }
    });
  });

  let toastTimer;
  function toast(message) { clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('show');toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3500); }
  $('#copy-email').addEventListener('click', async () => {
    const email = 'mohammadharbi913@gmail.com';
    function copied() {
      toast('Email address copied. Let’s start a conversation.');
      $('#copy-email').innerHTML='Copied <span>✓</span>';
      setTimeout(()=>$('#copy-email').innerHTML='Copy email <span>⧉</span>',2500);
    }
    try {
      await navigator.clipboard.writeText(email);
      copied();
    } catch {
      const field = document.createElement('textarea');
      field.value = email;
      field.setAttribute('readonly','');
      field.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      document.body.append(field);
      field.select();
      let didCopy = false;
      try { didCopy = document.execCommand('copy'); } catch {}
      field.remove();
      if (didCopy) { $('#copy-email').focus({preventScroll:true}); copied(); return; }
      const selection = getSelection();
      const range = document.createRange();
      range.selectNodeContents($('#email-address'));
      selection.removeAllRanges();selection.addRange(range);
      toast('Email selected. Press Ctrl+C or ⌘C to copy.');
    }
  });

  let scrambleTimer;
  const scramble = $('[data-scramble]');
  scramble.addEventListener('pointerenter', () => {
    if (!motion || !finePointer.matches) return;
    clearInterval(scrambleTimer);
    let frame = 0;
    const original = scramble.dataset.scramble;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    scrambleTimer = setInterval(() => {
      if (!motion) { clearInterval(scrambleTimer);scramble.textContent=original;return; }
      scramble.textContent = original.split('').map((letter,index)=> index < frame / 3 ? letter : characters[Math.floor(Math.random()*characters.length)]).join('');
      frame++;
      if(frame > original.length*3+3){clearInterval(scrambleTimer);scramble.textContent=original;}
    },35);
  });

  const cursor = $('.cursor');
  let cursorFrame = 0;
  let pointerX = 0, pointerY = 0, cursorX = 0, cursorY = 0;
  function moveCursor() {
    cursorX += (pointerX-cursorX)*.2;cursorY += (pointerY-cursorY)*.2;
    cursor.style.transform=`translate3d(${cursorX}px,${cursorY}px,0)`;
    if(motion && finePointer.matches && !document.hidden) cursorFrame=requestAnimationFrame(moveCursor);
    else cursorFrame=0;
  }
  document.addEventListener('pointermove', event => {
    if(!finePointer.matches || !motion) return;
    pointerX=event.clientX;pointerY=event.clientY;
    if(!cursorFrame){cursorX=pointerX;cursorY=pointerY;cursorFrame=requestAnimationFrame(moveCursor);}
    cursor.classList.add('is-active');
    const explore=event.target.closest('[data-cursor]');
    cursor.classList.toggle('is-explore',!!explore);
    cursor.classList.toggle('over-link',!explore && !!event.target.closest('a,button,summary'));
    $('span',cursor).textContent=explore?.dataset.cursor || 'Explore';
  },{passive:true});
  document.documentElement.addEventListener('pointerleave',()=>cursor.classList.remove('is-active'));
  $$('.magnetic').forEach(el=>{
    el.addEventListener('pointermove',event=>{if(!motion||!finePointer.matches)return;const rect=el.getBoundingClientRect();el.style.transform=`translate(${(event.clientX-rect.left-rect.width/2)*.16}px,${(event.clientY-rect.top-rect.height/2)*.16}px)`;});
    el.addEventListener('pointerleave',()=>{el.style.transform='';});
  });
  $$('.spotlight').forEach(el=>el.addEventListener('pointermove',event=>{if(!motion||!finePointer.matches)return;const rect=el.getBoundingClientRect();el.style.setProperty('--mx',`${event.clientX-rect.left}px`);el.style.setProperty('--my',`${event.clientY-rect.top}px`);},{passive:true}));
  $$('[data-tilt]').forEach(el=>{
    const target=$('.dashboard',el);
    el.addEventListener('pointermove',event=>{if(!motion||!finePointer.matches)return;const rect=el.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width-.5;const y=(event.clientY-rect.top)/rect.height-.5;target.style.transform=`rotateY(${x*9}deg) rotateX(${-y*8}deg) rotate(-1deg)`;});
    el.addEventListener('pointerleave',()=>{target.style.transform='';});
  });

  // Native 2D canvas: a projected 3D wireframe, with no runtime dependencies.
  const canvas = $('#hero-canvas');
  const context = canvas.getContext('2d');
  if (context) {
    let width=0,height=0,ratio=1,frameId=0,heroVisible=true;
    let mouseX=0,mouseY=0,targetX=0,targetY=0;
    let previousTime=0,phase=0;
    const nodes=[];
    const latitudeCount=18,longitudeCount=36;
    for(let i=0;i<=latitudeCount;i++){
      const latitude=Math.PI*i/latitudeCount;
      for(let j=0;j<longitudeCount;j++){
        const longitude=2*Math.PI*j/longitudeCount;
        const modulation=1+.055*Math.sin(longitude*3)*Math.sin(latitude*4);
        nodes.push({x:Math.sin(latitude)*Math.cos(longitude)*modulation,y:Math.cos(latitude)*modulation,z:Math.sin(latitude)*Math.sin(longitude)*modulation,latitude:i,longitude:j});
      }
    }
    const dust=Array.from({length:28},(_,i)=>({x:((i*127.13)%997)/997,y:((i*173.77)%991)/991,r:i%4===0?1.3:.6}));
    function sizeCanvas(){const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;ratio=Math.min(devicePixelRatio||1,1.75);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);context.setTransform(ratio,0,0,ratio,0,0);redraw();}
    function draw(now){
      frameId=0;
      const elapsed=previousTime?Math.min(now-previousTime,50):16;previousTime=now;
      if(motion) phase+=elapsed*.00012;
      mouseX+=(targetX-mouseX)*.035;mouseY+=(targetY-mouseY)*.035;
      context.clearRect(0,0,width,height);
      const dark=theme==='dark';
      const rgb=dark?'157,197,126':'67,99,45';
      const radius=Math.min(width*.38,height*.37);
      const cx=width*.54,cy=height*.48;
      const rotation=phase+mouseX*.18;
      const tilt=.23+mouseY*.15;
      const cosR=Math.cos(rotation),sinR=Math.sin(rotation),cosT=Math.cos(tilt),sinT=Math.sin(tilt);
      const projected=nodes.map(point=>{
        const x=point.x*cosR-point.z*sinR;
        const z=point.x*sinR+point.z*cosR;
        const y=point.y*cosT-z*sinT;
        const depth=point.y*sinT+z*cosT;
        const perspective=3.8/(3.8-depth);
        return{x:cx+x*radius*perspective,y:cy+y*radius*perspective,z:depth};
      });
      const glow=context.createRadialGradient(cx,cy,0,cx,cy,radius*1.5);
      glow.addColorStop(0,dark?'rgba(83,122,48,.07)':'rgba(83,122,48,.035)');glow.addColorStop(1,'rgba(83,122,48,0)');
      context.fillStyle=glow;context.fillRect(0,0,width,height);
      context.lineWidth=.55;
      projected.forEach((point,index)=>{
        const original=nodes[index];
        const alpha=(point.z+1.2)/2.3;
        if(original.latitude<latitudeCount){const next=projected[index+longitudeCount];context.strokeStyle=`rgba(${rgb},${.045+alpha*.18})`;context.beginPath();context.moveTo(point.x,point.y);context.lineTo(next.x,next.y);context.stroke();}
        if(original.latitude>0&&original.latitude<latitudeCount){const next=projected[original.latitude*longitudeCount+(original.longitude+1)%longitudeCount];context.strokeStyle=`rgba(${rgb},${.04+alpha*.13})`;context.beginPath();context.moveTo(point.x,point.y);context.lineTo(next.x,next.y);context.stroke();}
        if(index%7===0&&point.z>-.1){context.fillStyle=`rgba(${rgb},${alpha*.6})`;context.beginPath();context.arc(point.x,point.y,index%35===0?1.8:.8,0,Math.PI*2);context.fill();}
      });
      // Signal paths travel around separate orbital planes.
      const pathTime=motion?phase:.7;
      for(let orbit=0;orbit<3;orbit++){
        const orbitRadius=radius*(1.17+orbit*.055);
        context.save();context.translate(cx,cy);context.rotate(-.5+orbit*.8+mouseX*.1);
        context.strokeStyle=`rgba(${rgb},${dark?.13:.19})`;context.lineWidth=.65;context.beginPath();context.ellipse(0,0,orbitRadius,orbitRadius*(.3+orbit*.1),0,0,Math.PI*2);context.stroke();
        const angle=pathTime*(1.3+orbit*.35)+orbit*2.1;
        const x=Math.cos(angle)*orbitRadius,y=Math.sin(angle)*orbitRadius*(.3+orbit*.1);
        context.fillStyle=dark?'#b9f56c':'#487025';context.shadowColor=dark?'#b9f56c':'transparent';context.shadowBlur=10;context.beginPath();context.arc(x,y,2.4,0,Math.PI*2);context.fill();context.restore();
      }
      dust.forEach((star,index)=>{const y=(star.y*height+pathTime*index*1.5)%height;context.fillStyle=`rgba(${rgb},${.12+(index%3)*.07})`;context.beginPath();context.arc(star.x*width,y,star.r,0,Math.PI*2);context.fill();});
      if(motion&&heroVisible&&!document.hidden) frameId=requestAnimationFrame(draw);
    }
    function redraw(){if(!frameId){previousTime=0;frameId=requestAnimationFrame(draw);}}
    canvasRedraw=redraw;
    canvasStop=()=>{if(frameId){cancelAnimationFrame(frameId);frameId=0;}previousTime=0;};
    if('ResizeObserver' in window) new ResizeObserver(sizeCanvas).observe(canvas);else addEventListener('resize',sizeCanvas,{passive:true});
    if('IntersectionObserver' in window)new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;if(heroVisible)redraw();else canvasStop();},{rootMargin:'50px'}).observe($('#home'));
    $('#home').addEventListener('pointermove',event=>{if(!motion)return;const rect=canvas.getBoundingClientRect();targetX=(event.clientX-rect.left)/rect.width-.5;targetY=(event.clientY-rect.top)/rect.height-.5;},{passive:true});
    $('#home').addEventListener('pointerleave',()=>{targetX=targetY=0;});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)canvasStop();else if(heroVisible)redraw();});
    sizeCanvas();
  }
  applyMotion();
})();
