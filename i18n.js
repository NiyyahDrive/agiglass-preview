/* AGI_GLASS_CINEMATIC_PREVIEW_20260917 — bilingual layer (sq default, en translation).
   Albanian lives in index.html so the page stays readable without JavaScript;
   this file only holds the English overrides and the strings JS generates itself. */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'agi-lang';
  var LANGS = ['sq', 'en'];

  /* English overrides for every translatable node in index.html, plus the
     runtime strings the wizard builds in script.js. */
  var EN = {
    'meta.title': 'AGI Glass · Vehicle glass in Shkodër, Albania (concept preview)',
    'meta.desc': 'Concept preview for AGI Glass, Shkodër: windscreen replacement and repair, window film, ADAS calibration, deflectors, glass darkening and a mobile workshop.',

    'a11y.skip': 'Skip to content',
    'a11y.brand': 'AGI Glass, back to top',
    'a11y.nav': 'Main navigation',
    'a11y.lang': 'Choose language',
    'a11y.menu': 'Menu',
    'a11y.scroll': 'Scroll down',
    'a11y.facts': 'Key facts',
    'a11y.video': 'Video of the AGI Glass workshop',
    'a11y.filmstrip': 'Frames from the video',
    'a11y.newTab': '(Google Maps, opens in a new tab)',
    'a11y.quickActions': 'Quick actions',

    'banner.text': '<strong>Concept preview</strong> · not the official AGI Glass website',

    'brand.tag': 'Auto glass · Shkodër',
    'brand.tagLong': 'Auto glass · Shkodër · since 2009',

    'nav.services': 'Services',
    'nav.why': 'Why AGI Glass',
    'nav.workshop': 'The workshop',
    'nav.process': 'How it works',
    'nav.wholesale': 'Wholesale',
    'nav.quote': 'Quote',
    'nav.contact': 'Contact',

    'cta.quote': 'Request a quote',
    'cta.quoteShort': 'Quote',
    'cta.callNow': 'Call now',
    'cta.call': 'Call',
    'cta.directions': 'Get directions',
    'cta.route': 'Directions',

    'hero.eyebrow': 'AGI Glass · Shkodër · since 2009',
    'hero.title': '<span class="line">Your car glass</span><span class="line">in <em class="sheen">specialist hands.</em></span>',
    'hero.lead': 'Glass replacement and repair, window film, ADAS calibration and deflectors. In our workshop on Rruga Vehbi Balla, or with the mobile workshop.',
    'hero.hours': 'Monday – Saturday · 08:00 – 16:00',

    'alt.hero': 'The AGI Glass building in Shkodër with a vehicle in front of the entrance',
    'alt.tech1': 'An AGI Glass technician working on the side window of a vehicle in the workshop',
    'alt.meter': 'A tint meter placed on the side window of a car',
    'alt.tinted': 'Darkened side windows of a black vehicle in the AGI Glass workshop',
    'alt.hall': 'The workshop hall with glass racks and a vehicle in the centre',
    'alt.door': 'A technician working at the open door of a black vehicle',
    'alt.tintmeter': 'A glass tint meter reading 82',
    'alt.plate': 'A demonstration plate reading AGI GLASS on the front of a vehicle',

    'facts.since': 'In business since',
    'facts.mobileK': 'Mobile',
    'facts.mobileV': 'Workshop at your location',
    'facts.days': 'Monday – Saturday',

    'svc.title': 'Every pane, <span class="muted">its own job.</span>',
    'svc.lead': 'From the windscreen to the deflectors: work on your vehicle, in the workshop or where you are.',
    'svc.1.t': 'Glass replacement',
    'svc.1.d': 'Windscreens, side and rear glass, matched to the specification and options of your vehicle: original or alternative.',
    'svc.2.t': 'Window film',
    'svc.2.d': 'Films that help block UV and IR radiation, cut glare and add privacy.',
    'svc.3.t': 'Glass darkening',
    'svc.3.d': 'Darkening the glass with the technique known locally as bombardim.',
    'svc.4.t': 'Glass repair',
    'svc.4.d': 'Small damage is best repaired quickly: dust and water make a clean result harder.',
    'svc.5.t': 'ADAS calibration',
    'svc.5.d': 'When the windscreen is replaced, the camera of the safety systems has to be recalibrated. That is what ADAS calibration is for.',
    'svc.6.t': 'Deflectors',
    'svc.6.d': 'Wind and rain deflectors fitted into the window channel, wholesale and retail.',
    'svc.7.t': 'Mobile workshop',
    'svc.7.d': 'Besides the workshop, many jobs can be done where you are. Call to find out whether that applies to your case.',

    'why.title': 'Glass is part of your safety.',
    'why.1.t': 'Safety',
    'why.1.d': 'The windscreen carries the cameras of the driver assistance systems. That is why we offer ADAS calibration after a replacement.',
    'why.2.t': 'Specialisation',
    'why.2.d': 'Since 2009 we have worked on vehicle glass: replacement, repair, film, darkening and deflectors.',
    'why.3.t': 'Convenience',
    'why.3.d': 'A workshop in Shkodër, a mobile workshop and clear hours: Monday – Saturday, 08:00 – 16:00.',

    'media.title': 'Inside AGI Glass.',
    'media.lead': "Frames from AGI Glass's own video: the building, the workshop and the work on the glass.",
    'media.play': 'Watch the video',
    'media.size': '0:42 · 3.3 MB',

    'proc.title': 'How a job usually goes.',
    'proc.lead': 'A general outline. The steps can differ per vehicle and per service.',
    'proc.1.t': 'Contact',
    'proc.1.d': 'Call us or come by the workshop and tell us the vehicle and the problem.',
    'proc.2.t': 'Inspection & advice',
    'proc.2.d': 'We look at the damage and explain which options there are.',
    'proc.3.t': 'The work',
    'proc.3.d': 'The job is done in the workshop or, where possible, with the mobile workshop.',
    'proc.4.t': 'Handover',
    'proc.4.d': 'You get the vehicle back and we show you what was done.',

    'ws.eyebrow': 'Wholesale & retail',
    'ws.title': 'Glass and deflectors, wholesale or retail.',
    'ws.body': 'AGI Glass sells vehicle glass and deflectors to wholesale customers as well as retail customers. Call about availability and the model you need.',
    'ws.cta': 'Ask about wholesale',

    'q.title': 'Request a quote in three steps.',
    'q.lead': 'Fill in the vehicle, the service and your contact details. In this preview the form works completely, but it sends nothing.',
    'q.badge': 'Demo · no data is sent',
    'q.formLabel': 'Quote request (demo)',
    'q.noscript': 'JavaScript is disabled, so all three steps are shown at once. The form sends nothing; call or email for a real request.',
    'q.stepWord': 'Step 1',
    'q.stepWord2': 'Step 2',
    'q.stepWord3': 'Step 3',
    'q.s1.name': 'Vehicle & service',
    'q.s2.name': 'Location & timing',
    'q.s3.name': 'Contact & photos',

    'q.s1.title': 'Which vehicle?',
    'q.s1.lead': 'Choose the customer type and the services you are interested in.',
    'q.f.customer': 'Customer type *',
    'q.cust.private.t': 'Private',
    'q.cust.private.s': 'Personal vehicle',
    'q.cust.business.t': 'Business',
    'q.cust.business.s': 'Company or fleet',
    'q.f.make': 'Make and model *',
    'q.ph.make': 'e.g. Volkswagen Golf 7',
    'q.f.year': 'Year (optional)',
    'q.ph.year': 'e.g. 2016',
    'q.f.plate': 'Number plate (optional)',
    'q.ph.plate': 'e.g. AA 123 BB',
    'q.f.services': 'What do you need? *',
    'q.f.servicesHint': '(pick one or more)',
    'q.svc.replacement.t': 'Glass replacement',
    'q.svc.repair.t': 'Glass repair',
    'q.svc.film.t': 'Window film',
    'q.svc.adas.t': 'ADAS calibration',
    'q.svc.deflectors.t': 'Deflectors',
    'q.svc.darkening.t': 'Glass darkening',
    'q.svc.mobile.t': 'Mobile workshop',
    'q.f.problem': 'Describe the problem (optional)',
    'q.ph.problem': 'e.g. 5 cm crack in the windscreen, driver’s side',

    'q.next': 'Continue',
    'q.back': 'Back',

    'q.s2.title': 'Where and when?',
    'q.s2.lead': 'This helps work out whether the job happens in the workshop or at your location.',
    'q.f.place': 'Where would you like the work done? *',
    'q.place.workshop.t': 'At the AGI workshop',
    'q.place.workshop.s': 'Rruga Vehbi Balla, Shkodër',
    'q.place.mobile.t': 'Mobile service',
    'q.place.mobile.s': 'At your location, if possible',
    'q.place.advise.t': 'Advise me',
    'q.place.advise.s': 'I am not sure',
    'q.f.city': 'City or location *',
    'q.ph.city': 'e.g. Shkodër',
    'q.hint.mobile': 'Whether the mobile service is possible is always confirmed by phone.',
    'q.f.timing': 'How urgent is it? *',
    'q.time.urgent.t': 'Urgent',
    'q.time.twoweeks.t': 'Within two weeks',
    'q.time.later.t': 'Later',
    'q.time.exploring.t': 'Just exploring',

    'q.s3.title': 'How should we reach you?',
    'q.s3.lead': 'Only what is needed to get back to you.',
    'q.f.name': 'Name *',
    'q.f.phone': 'Phone *',
    'q.ph.phone': 'e.g. 069 123 4567',
    'q.f.email': 'Email (optional)',
    'q.ph.email': 'e.g. name@example.com',
    'q.f.prefer': 'How would you prefer to be contacted? *',
    'q.prefer.phone.t': 'Phone',
    'q.prefer.email.t': 'Email',
    'q.f.files': 'Photos or PDF (optional)',
    'q.drop.t': 'Choose files or drag them here',
    'q.drop.s': 'Up to 6 files · max 5 MB each · JPG, PNG, WEBP, HEIC or PDF',
    'q.filesList': 'Selected files',
    'q.privacy': 'This page is a public concept preview. Your text and files stay on your own device: nothing is uploaded, stored or sent anywhere. Closing the page removes them.',
    'q.submit': 'Finish (demo, nothing is sent)',

    'q.done.title': 'The demo worked — but nothing was sent.',
    'q.done.lead': 'This is a public preview without a form backend. Your data stayed in your browser. For a real request, call or email AGI Glass.',
    'q.done.sumTitle': 'Your summary (local only)',
    'q.done.copy': 'Copy summary',
    'q.done.restart': 'Start over',

    'q.sideLabel': 'Direct contact',
    'q.side.call.t': 'Fastest by phone',
    'q.side.call.d': 'Monday – Saturday, 08:00 – 16:00',
    'q.side.visit.t': 'Come to the workshop',
    'q.side.note.t': 'What this page is',
    'q.side.note.d': 'A concept preview built on the public information of AGI Glass. It is not the official website and it does not accept real requests.',

    'contact.title': 'Find us in Shkodër.',
    'contact.phone': 'Phone',
    'contact.address': 'Address',
    'contact.hours': 'Hours',
    'contact.hoursV': 'Monday – Saturday<br>08:00 – 16:00',
    'contact.hoursInline': 'Monday – Saturday, 08:00 – 16:00',
    'contact.email': 'Email',
    'contact.card.t': 'Prefer to write?',
    'contact.card.d': 'Fill in the request in three steps. In this preview it is not sent, but it shows exactly how it would work.',

    'footer.note': 'AGI Glass · Concept preview, not the official website. The phone and map links lead to the real business.',

    /* runtime strings generated by script.js */
    'err.required': 'This field is required.',
    'err.choose': 'Choose an option.',
    'err.services': 'Choose at least one service.',
    'err.phone': 'Enter a valid phone number.',
    'err.email': 'Enter a valid email address.',
    'err.emailNeeded': 'Add an email address, or choose contact by phone.',
    'err.step': 'Check the highlighted fields.',
    'files.tooMany': 'Maximum 6 files. “{name}” was not added.',
    'files.tooBig': '“{name}” is larger than 5 MB and was not added.',
    'files.badType': '“{name}” is not an image or a PDF.',
    'files.remove': 'Remove {name}',
    'files.doc': 'Document',
    'progress.text': 'Step {n} of 3',
    'sum.customer': 'Customer type',
    'sum.vehicle': 'Vehicle',
    'sum.year': 'Year',
    'sum.plate': 'Number plate',
    'sum.services': 'Services',
    'sum.problem': 'Problem',
    'sum.place': 'Location of the work',
    'sum.city': 'City or location',
    'sum.timing': 'Urgency',
    'sum.name': 'Name',
    'sum.phone': 'Phone',
    'sum.email': 'Email',
    'sum.prefer': 'Preferred contact',
    'sum.files': 'Files',
    'sum.filesN': '{n} selected (not uploaded)',
    'copy.ok': 'Summary copied to your clipboard.',
    'copy.fail': 'Copying failed — select the text and copy it manually.',
    'mail.subject': 'Quote request – AGI Glass'
  };

  /* Albanian counterparts of the runtime-only strings (everything else is
     snapshotted straight from the Albanian HTML). */
  var SQ_RUNTIME = {
    'err.required': 'Kjo fushë është e detyrueshme.',
    'err.choose': 'Zgjidhni një opsion.',
    'err.services': 'Zgjidhni të paktën një shërbim.',
    'err.phone': 'Shkruani një numër telefoni të vlefshëm.',
    'err.email': 'Shkruani një adresë email të vlefshme.',
    'err.emailNeeded': 'Shtoni një adresë email ose zgjidhni kontaktin me telefon.',
    'err.step': 'Kontrolloni fushat e shënuara.',
    'files.tooMany': 'Maksimumi 6 skedarë. „{name}” nuk u shtua.',
    'files.tooBig': '„{name}” është mbi 5 MB dhe nuk u shtua.',
    'files.badType': '„{name}” nuk është foto dhe as PDF.',
    'files.remove': 'Hiq {name}',
    'files.doc': 'Dokument',
    'progress.text': 'Hapi {n} nga 3',
    'sum.customer': 'Lloji i klientit',
    'sum.vehicle': 'Automjeti',
    'sum.year': 'Viti',
    'sum.plate': 'Targa',
    'sum.services': 'Shërbimet',
    'sum.problem': 'Problemi',
    'sum.place': 'Vendi i punës',
    'sum.city': 'Qyteti ose vendndodhja',
    'sum.timing': 'Urgjenca',
    'sum.name': 'Emri',
    'sum.phone': 'Telefoni',
    'sum.email': 'Email',
    'sum.prefer': 'Kontakti i preferuar',
    'sum.files': 'Skedarët',
    'sum.filesN': '{n} të zgjedhur (nuk ngarkohen)',
    'copy.ok': 'Përmbledhja u kopjua.',
    'copy.fail': 'Kopjimi dështoi — zgjidhni tekstin dhe kopjojeni manualisht.',
    'mail.subject': 'Kërkesë për ofertë – AGI Glass'
  };

  /* what to snapshot, and how to write it back */
  var KINDS = [
    { attr: 'data-i18n', get: function (el) { return el.textContent; }, set: function (el, v) { el.textContent = v; } },
    { attr: 'data-i18n-html', get: function (el) { return el.innerHTML; }, set: function (el, v) { el.innerHTML = v; } },
    { attr: 'data-i18n-alt', get: function (el) { return el.getAttribute('alt'); }, set: function (el, v) { el.setAttribute('alt', v); } },
    { attr: 'data-i18n-ph', get: function (el) { return el.getAttribute('placeholder'); }, set: function (el, v) { el.setAttribute('placeholder', v); } },
    { attr: 'data-i18n-aria', get: function (el) { return el.getAttribute('aria-label'); }, set: function (el, v) { el.setAttribute('aria-label', v); } },
    { attr: 'data-i18n-content', get: function (el) { return el.getAttribute('content'); }, set: function (el, v) { el.setAttribute('content', v); } }
  ];

  var snap = {};   // kind attr -> { key -> original Albanian value }
  var lang = 'sq';

  function snapshot() {
    KINDS.forEach(function (kind) {
      var store = snap[kind.attr] = {};
      var nodes = document.querySelectorAll('[' + kind.attr + ']');
      [].forEach.call(nodes, function (el) {
        var key = el.getAttribute(kind.attr);
        if (!(key in store)) store[key] = kind.get(el);
      });
    });
  }

  function valueFor(kindAttr, key, target) {
    if (target === 'en' && EN[key] != null) return EN[key];
    var store = snap[kindAttr];
    return store && key in store ? store[key] : null;
  }

  function apply(target) {
    KINDS.forEach(function (kind) {
      var nodes = document.querySelectorAll('[' + kind.attr + ']');
      [].forEach.call(nodes, function (el) {
        var key = el.getAttribute(kind.attr);
        var v = valueFor(kind.attr, key, target);
        if (v != null) kind.set(el, v);
      });
    });
    document.documentElement.setAttribute('lang', target);
  }

  function syncSwitches(target) {
    var groups = document.querySelectorAll('[data-lang-switch]');
    [].forEach.call(groups, function (g) {
      [].forEach.call(g.querySelectorAll('[data-lang]'), function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === target));
      });
    });
  }

  function store(target) {
    try { localStorage.setItem(STORAGE_KEY, target); } catch (e) { /* private mode */ }
  }

  function read() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      return LANGS.indexOf(v) > -1 ? v : null;
    } catch (e) { return null; }
  }

  var i18n = {
    get lang() { return lang; },

    /* Translate a key. Albanian falls back to the value snapshotted from the
       Albanian HTML, so markup stays the single source of truth for sq. */
    t: function (key, vars) {
      var out;
      if (lang === 'en') out = EN[key];
      else out = SQ_RUNTIME[key] != null ? SQ_RUNTIME[key] : (snap['data-i18n'] || {})[key];
      if (out == null) out = EN[key] != null ? EN[key] : key;
      if (vars) {
        Object.keys(vars).forEach(function (k) {
          out = out.split('{' + k + '}').join(String(vars[k]));
        });
      }
      return out;
    },

    set: function (target, persist) {
      if (LANGS.indexOf(target) === -1) target = 'sq';
      lang = target;
      apply(target);
      syncSwitches(target);
      if (persist !== false) store(target);
      document.dispatchEvent(new CustomEvent('agi:lang', { detail: { lang: target } }));
    },

    init: function () {
      snapshot();
      var groups = document.querySelectorAll('[data-lang-switch]');
      [].forEach.call(groups, function (g) {
        g.addEventListener('click', function (e) {
          var btn = e.target.closest ? e.target.closest('[data-lang]') : null;
          if (!btn || !g.contains(btn)) return;
          i18n.set(btn.getAttribute('data-lang'));
        });
      });
      i18n.set(read() || 'sq', false);
    }
  };

  global.AGI = global.AGI || {};
  global.AGI.i18n = i18n;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', i18n.init);
  } else {
    i18n.init();
  }
})(window);
