/* AGI_GLASS_CINEMATIC_PREVIEW_20260917 — vanilla JS, no dependencies, no trackers */
(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.add('js');

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

  /* ---- header state ---- */

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
})();
