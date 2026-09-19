/* AGI_GLASS_CINEMATIC_PREVIEW_20260917 — vanilla JS, no dependencies, no trackers.
   The quote wizard is a local demo: it never submits and never transmits anything. */
(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.add('js');

  var i18n = (window.AGI && window.AGI.i18n) || { lang: 'sq', t: function (k) { return k; } };
  var t = function (key, vars) { return i18n.t(key, vars); };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var conn = navigator.connection || {};
  var saveData = conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType || '');

  /* ---- mobile menu ---- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var nav = document.querySelector('[data-nav]');
  var header = document.querySelector('[data-header]');
  // panel hangs under the header; when the concept banner is still in view the
  // CSS 100dvh-based height overshoots the viewport, so size it to the real space left
  function fitMenu() {
    nav.style.height = Math.max(0, window.innerHeight - header.getBoundingClientRect().bottom) + 'px';
  }
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    if (open) fitMenu(); else nav.style.height = '';
    nav.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 960px)').addEventListener('change', function (mq) {
      if (mq.matches) setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (toggle.getAttribute('aria-expanded') === 'true') fitMenu();
    });
  }

  /* ---- reveal on scroll (staggered per group) ---- */
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    reveals.forEach(function (el) {
      var siblings = el.parentElement ? [].slice.call(el.parentElement.children).filter(function (c) { return c.classList.contains('reveal'); }) : [];
      var i = siblings.indexOf(el);
      if (i > 0) el.style.setProperty('--d', Math.min(i, 5) * 0.08 + 's');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- parallax depth (transform only, rAF-throttled) ---- */
  var layers = [].slice.call(document.querySelectorAll('[data-parallax]'));
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 12);
    if (!reduceMotion) {
      layers.forEach(function (el) {
        var rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.2;
        el.style.transform = 'translate3d(0,' + (-rect.top * speed).toFixed(1) + 'px,0)';
      });
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---- hero loop: small (≈0.5 MB) muted clip, only when motion + data allow ---- */
  var heroVideo = document.querySelector('[data-hero-video]');
  if (heroVideo && !reduceMotion && !saveData) {
    window.addEventListener('load', function () {
      heroVideo.src = heroVideo.getAttribute('data-src');
      heroVideo.addEventListener('canplaythrough', function () {
        var p = heroVideo.play();
        if (p && p.then) {
          p.then(function () { heroVideo.classList.add('is-ready'); }).catch(function () {});
        } else {
          heroVideo.classList.add('is-ready');
        }
      }, { once: true });
    });
  }

  /* ---- workshop video: loads only on explicit play ---- */
  var player = document.querySelector('[data-player]');
  if (player) {
    var video = player.querySelector('video');
    var cover = player.querySelector('[data-play]');
    cover.addEventListener('click', function () {
      player.classList.add('is-playing');
      video.preload = 'auto';
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
      video.focus();
    });
    video.addEventListener('play', function () { player.classList.add('is-playing'); });
  }

  /* ---- footer year ---- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  /* =====================================================================
     QUOTE WIZARD — three steps, local only. No action, no fetch, no submit.
     ===================================================================== */
  var form = document.querySelector('[data-wizard]');
  if (!form) return;

  var MAX_FILES = 6;
  var MAX_BYTES = 5 * 1024 * 1024;
  var TOTAL_STEPS = 3;

  var steps = [].slice.call(form.querySelectorAll('[data-step]'));
  var pills = [].slice.call(form.querySelectorAll('[data-pill]'));
  var progressBar = form.querySelector('[data-progress]');
  var progressText = form.querySelector('[data-progress-text]');
  var doneBox = form.querySelector('[data-done]');
  var stepper = form.querySelector('[data-stepper]');
  var progressWrap = form.querySelector('[data-progress-wrap]');
  var summaryList = form.querySelector('[data-summary]');
  var toast = form.querySelector('[data-toast]');
  var mailLink = form.querySelector('[data-mail]');

  var current = 1;
  var reached = 1;
  var activeErrors = {};        // field name -> { key, vars }
  var picked = [];              // [{ file, url }]
  var submission = null;        // element references, so the summary follows the language

  /* ---------- errors ---------- */
  function errNode(name) { return form.querySelector('[data-err="' + name + '"]'); }

  function fieldControl(name) {
    if (name === 'files') return form.querySelector('[data-drop]');
    return form.querySelector('#q-' + name) || form.querySelector('[data-group="' + name + '"]');
  }

  function showErr(name, key, vars) {
    activeErrors[name] = { key: key, vars: vars || null };
    var node = errNode(name);
    if (node) {
      node.textContent = t(key, vars);
      node.hidden = false;
    }
    var control = fieldControl(name);
    if (control) {
      control.classList.add('is-invalid');
      if (control.tagName === 'INPUT' || control.tagName === 'TEXTAREA') control.setAttribute('aria-invalid', 'true');
    }
  }

  function clearErr(name) {
    delete activeErrors[name];
    var node = errNode(name);
    if (node) { node.hidden = true; node.textContent = ''; }
    var control = fieldControl(name);
    if (control) {
      control.classList.remove('is-invalid');
      control.removeAttribute('aria-invalid');
    }
  }

  function clearErrors() { Object.keys(activeErrors).forEach(clearErr); }

  function repaintErrors() {
    Object.keys(activeErrors).forEach(function (name) {
      var node = errNode(name);
      if (node) node.textContent = t(activeErrors[name].key, activeErrors[name].vars);
    });
  }

  /* ---------- option tiles (radio groups and the multi-select service group) ---------- */
  function groupNode(name) { return form.querySelector('[data-group="' + name + '"]'); }
  function options(name) { return [].slice.call(groupNode(name).querySelectorAll('.opt')); }
  function isMulti(group) { return group.hasAttribute('data-multi'); }

  function selected(name) {
    var group = groupNode(name);
    var attr = isMulti(group) ? 'aria-pressed' : 'aria-checked';
    return [].slice.call(group.querySelectorAll('.opt')).filter(function (b) {
      return b.getAttribute(attr) === 'true';
    });
  }

  function pick(group, btn) {
    var name = group.getAttribute('data-group');
    if (isMulti(group)) {
      btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    } else {
      [].forEach.call(group.querySelectorAll('.opt'), function (b) {
        b.setAttribute('aria-checked', String(b === btn));
      });
    }
    clearErr(name);
    if (name === 'prefer') clearErr('email');
  }

  [].forEach.call(form.querySelectorAll('[data-group]'), function (group) {
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('.opt');
      if (btn && group.contains(btn)) pick(group, btn);
    });
    group.addEventListener('keydown', function (e) {
      if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].indexOf(e.key) === -1) return;
      var btn = e.target.closest('.opt');
      if (!btn || !group.contains(btn)) return;
      var all = [].slice.call(group.querySelectorAll('.opt'));
      var step = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : -1;
      var next = all[(all.indexOf(btn) + step + all.length) % all.length];
      e.preventDefault();
      next.focus();
      if (!isMulti(group)) pick(group, next);
    });
  });

  /* clear a field error as soon as the visitor starts fixing it */
  [].forEach.call(form.querySelectorAll('input, textarea'), function (el) {
    el.addEventListener('input', function () {
      var name = el.id.replace(/^q-/, '');
      if (activeErrors[name]) clearErr(name);
    });
  });

  /* ---------- step navigation ---------- */
  function setProgress() {
    var pct = Math.round((current / TOTAL_STEPS) * 100);
    if (progressBar) progressBar.style.width = pct + '%';
    if (progressText) progressText.textContent = t('progress.text', { n: current });
  }

  function goTo(n, focusIt) {
    current = n;
    reached = Math.max(reached, n);
    steps.forEach(function (s) {
      s.classList.toggle('is-active', Number(s.getAttribute('data-step')) === n);
    });
    pills.forEach(function (p) {
      var i = Number(p.getAttribute('data-pill'));
      p.classList.toggle('is-active', i === n);
      p.classList.toggle('is-done', i < n);
      if (i === n) p.setAttribute('aria-current', 'step'); else p.removeAttribute('aria-current');
      p.setAttribute('aria-disabled', String(i > reached));
    });
    setProgress();
    if (focusIt !== false) {
      var head = form.querySelector('[data-step="' + n + '"] h3');
      if (head) {
        head.setAttribute('tabindex', '-1');
        head.focus({ preventScroll: true });
      }
      form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }

  function digits(s) { return (s || '').replace(/\D+/g, ''); }

  function validateStep(n) {
    var ok = true;
    function fail(name, key) { showErr(name, key); ok = false; }

    if (n === 1) {
      if (!selected('customer').length) fail('customer', 'err.choose');
      if (!form.querySelector('#q-make').value.trim()) fail('make', 'err.required');
      if (!selected('services').length) fail('services', 'err.services');
    } else if (n === 2) {
      if (!selected('place').length) fail('place', 'err.choose');
      if (!form.querySelector('#q-city').value.trim()) fail('city', 'err.required');
      if (!selected('timing').length) fail('timing', 'err.choose');
    } else if (n === 3) {
      if (!form.querySelector('#q-name').value.trim()) fail('name', 'err.required');
      var phone = form.querySelector('#q-phone').value;
      if (!phone.trim()) fail('phone', 'err.required');
      else if (digits(phone).length < 6) fail('phone', 'err.phone');

      var prefer = selected('prefer')[0];
      if (!prefer) fail('prefer', 'err.choose');

      var email = form.querySelector('#q-email').value.trim();
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) fail('email', 'err.email');
      else if (!email && prefer && prefer.getAttribute('data-value') === 'email') fail('email', 'err.emailNeeded');
    }

    if (!ok) {
      var first = form.querySelector('[data-step="' + n + '"] .is-invalid');
      if (first) {
        var target = first.classList.contains('opts') ? first.querySelector('.opt') : first;
        if (target) target.focus({ preventScroll: false });
      }
    }
    return ok;
  }

  [].forEach.call(form.querySelectorAll('[data-next]'), function (btn) {
    btn.addEventListener('click', function () {
      if (!validateStep(current)) return;
      goTo(Number(btn.getAttribute('data-next')));
    });
  });

  [].forEach.call(form.querySelectorAll('[data-prev]'), function (btn) {
    btn.addEventListener('click', function () { goTo(Number(btn.getAttribute('data-prev'))); });
  });

  pills.forEach(function (p) {
    p.addEventListener('click', function () {
      var target = Number(p.getAttribute('data-pill'));
      if (target === current) return;
      if (target > current) {
        for (var i = current; i < target; i++) {
          if (!validateStep(i)) { goTo(i); return; }
        }
      }
      goTo(target);
    });
  });

  /* ---------- file picker (previews stay local, object URLs are revoked) ---------- */
  var drop = form.querySelector('[data-drop]');
  var fileInput = form.querySelector('[data-file-input]');
  var fileList = form.querySelector('[data-file-list]');

  function isAllowed(file) {
    var name = (file.name || '').toLowerCase();
    if (file.type && file.type.indexOf('image/') === 0) return true;
    if (file.type === 'application/pdf') return true;
    return /\.(jpe?g|png|webp|gif|avif|heic|heif|pdf)$/.test(name);
  }

  function isImage(file) {
    var name = (file.name || '').toLowerCase();
    return (file.type && file.type.indexOf('image/') === 0) || /\.(jpe?g|png|webp|gif|avif|heic|heif)$/.test(name);
  }

  function prettySize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1).replace('.0', '') + ' MB';
  }

  function releaseFile(entry) {
    if (entry.url) { URL.revokeObjectURL(entry.url); entry.url = null; }
  }

  function renderFiles() {
    fileList.textContent = '';
    picked.forEach(function (entry, index) {
      var li = document.createElement('li');
      li.className = 'file';

      var thumb = document.createElement('span');
      thumb.className = 'file__thumb';
      if (entry.url) {
        var img = document.createElement('img');
        img.src = entry.url;
        img.alt = '';
        img.addEventListener('error', function () {
          // e.g. HEIC, which most browsers cannot decode — fall back to the extension
          thumb.classList.add('file__thumb--doc');
          thumb.textContent = (entry.file.name.split('.').pop() || '').slice(0, 4).toUpperCase();
        });
        thumb.appendChild(img);
      } else {
        thumb.classList.add('file__thumb--doc');
        thumb.textContent = (entry.file.name.split('.').pop() || '').slice(0, 4).toUpperCase();
      }
      li.appendChild(thumb);

      var meta = document.createElement('span');
      meta.className = 'file__meta';
      var nm = document.createElement('strong');
      nm.textContent = entry.file.name;
      var sz = document.createElement('small');
      sz.textContent = prettySize(entry.file.size);
      meta.appendChild(nm);
      meta.appendChild(sz);
      li.appendChild(meta);

      var rm = document.createElement('button');
      rm.type = 'button';
      rm.className = 'file__rm';
      rm.setAttribute('aria-label', t('files.remove', { name: entry.file.name }));
      rm.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      rm.addEventListener('click', function () {
        releaseFile(picked[index]);
        picked.splice(index, 1);
        renderFiles();
        clearErr('files');
      });
      li.appendChild(rm);

      fileList.appendChild(li);
    });
  }

  function addFiles(list) {
    var problem = null;
    [].forEach.call(list, function (file) {
      if (picked.length >= MAX_FILES) { problem = ['files.tooMany', file.name]; return; }
      if (!isAllowed(file)) { problem = ['files.badType', file.name]; return; }
      if (file.size > MAX_BYTES) { problem = ['files.tooBig', file.name]; return; }
      picked.push({ file: file, url: isImage(file) ? URL.createObjectURL(file) : null });
    });
    renderFiles();
    if (problem) showErr('files', problem[0], { name: problem[1] });
    else clearErr('files');
  }

  if (fileInput) {
    fileInput.addEventListener('change', function () {
      addFiles(fileInput.files);
      fileInput.value = '';
    });
  }
  if (drop) {
    ['dragenter', 'dragover'].forEach(function (evt) {
      drop.addEventListener(evt, function (e) { e.preventDefault(); drop.classList.add('is-over'); });
    });
    ['dragleave', 'dragend'].forEach(function (evt) {
      drop.addEventListener(evt, function () { drop.classList.remove('is-over'); });
    });
    drop.addEventListener('drop', function (e) {
      e.preventDefault();
      drop.classList.remove('is-over');
      if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files);
    });
  }

  /* ---------- summary + explicit non-send state ---------- */
  function optLabel(btn) {
    if (!btn) return '';
    var el = btn.querySelector('.opt__t');
    return (el ? el.textContent : btn.textContent).trim();
  }

  function collect() {
    return {
      customer: selected('customer')[0] || null,
      make: form.querySelector('#q-make').value.trim(),
      year: form.querySelector('#q-year').value.trim(),
      plate: form.querySelector('#q-plate').value.trim(),
      services: selected('services'),
      problem: form.querySelector('#q-problem').value.trim(),
      place: selected('place')[0] || null,
      city: form.querySelector('#q-city').value.trim(),
      timing: selected('timing')[0] || null,
      name: form.querySelector('#q-name').value.trim(),
      phone: form.querySelector('#q-phone').value.trim(),
      email: form.querySelector('#q-email').value.trim(),
      prefer: selected('prefer')[0] || null,
      fileCount: picked.length
    };
  }

  function summaryRows() {
    if (!submission) return [];
    var s = submission;
    var rows = [
      ['sum.customer', optLabel(s.customer)],
      ['sum.vehicle', s.make],
      ['sum.year', s.year],
      ['sum.plate', s.plate],
      ['sum.services', s.services.map(optLabel).join(', ')],
      ['sum.problem', s.problem],
      ['sum.place', optLabel(s.place)],
      ['sum.city', s.city],
      ['sum.timing', optLabel(s.timing)],
      ['sum.name', s.name],
      ['sum.phone', s.phone],
      ['sum.email', s.email],
      ['sum.prefer', optLabel(s.prefer)],
      ['sum.files', s.fileCount ? t('sum.filesN', { n: s.fileCount }) : '']
    ];
    return rows.filter(function (r) { return r[1]; }).map(function (r) { return [t(r[0]), r[1]]; });
  }

  function renderSummary() {
    if (!summaryList) return;
    summaryList.textContent = '';
    summaryRows().forEach(function (row) {
      var wrap = document.createElement('div');
      var dt = document.createElement('dt');
      dt.textContent = row[0];
      var dd = document.createElement('dd');
      dd.textContent = row[1];
      wrap.appendChild(dt);
      wrap.appendChild(dd);
      summaryList.appendChild(wrap);
    });
  }

  function summaryText() {
    return summaryRows().map(function (r) { return r[0] + ': ' + r[1]; }).join('\n');
  }

  function showDone() {
    submission = collect();
    renderSummary();
    steps.forEach(function (s) { s.classList.remove('is-active'); });
    if (stepper) stepper.hidden = true;
    if (progressWrap) progressWrap.hidden = true;
    doneBox.hidden = false;
    var head = doneBox.querySelector('h3');
    if (head) {
      head.setAttribute('tabindex', '-1');
      head.focus({ preventScroll: true });
    }
    form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  // Nothing is ever submitted: the form has no action and the handler always stops it.
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateStep(3)) return;
    showDone();
  });

  var restart = form.querySelector('[data-restart]');
  if (restart) {
    restart.addEventListener('click', function () {
      picked.forEach(releaseFile);
      picked = [];
      renderFiles();
      [].forEach.call(form.querySelectorAll('input, textarea'), function (el) {
        if (el.type !== 'file') el.value = '';
      });
      [].forEach.call(form.querySelectorAll('.opt'), function (b) {
        if (b.hasAttribute('aria-pressed')) b.setAttribute('aria-pressed', 'false');
        if (b.hasAttribute('aria-checked')) b.setAttribute('aria-checked', 'false');
      });
      clearErrors();
      submission = null;
      if (summaryList) summaryList.textContent = '';
      if (toast) toast.textContent = '';
      doneBox.hidden = true;
      if (stepper) stepper.hidden = false;
      if (progressWrap) progressWrap.hidden = false;
      reached = 1;
      goTo(1);
    });
  }

  var copyBtn = form.querySelector('[data-copy]');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = summaryText();
      var done = function (ok) { if (toast) toast.textContent = t(ok ? 'copy.ok' : 'copy.fail'); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
  }

  function setMailSubject() {
    if (mailLink) mailLink.href = 'mailto:info@agiglass.al?subject=' + encodeURIComponent(t('mail.subject'));
  }

  /* ---------- keep JS-generated text in sync with the language switch ---------- */
  document.addEventListener('agi:lang', function () {
    setProgress();
    repaintErrors();
    renderFiles();
    if (submission) renderSummary();
    setMailSubject();
    if (toast) toast.textContent = '';
  });

  window.addEventListener('pagehide', function () { picked.forEach(releaseFile); });

  setMailSubject();
  goTo(1, false);
})();
