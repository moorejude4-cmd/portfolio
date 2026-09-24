/* KC Friends of Jung: premium polish.
   Loaded on every page by one short script tag in Square's Tracking tools.
   Part 1 is the CSS. Part 2 finds your buttons, cards, gallery tiles and
   footer by their current colors and tags them, since Square doesn't
   publish stable class names. Edit or delete any CSS block here; changes
   go live once GitHub Pages redeploys, no Square republish needed. */
(function () {
  var css = `
:root{
  --kc-teal:#006678; --kc-teal-deep:#004B58; --kc-cream:#F6F0E6; --kc-ink:#1F2A2E;
  --kc-radius:8px; --kc-ease:cubic-bezier(.22,.61,.36,1);
  --kc-shadow:0 12px 30px -14px rgba(31,42,46,.38);
  --kc-lift:0 22px 44px -16px rgba(31,42,46,.45);
}

/* Type and small details */
html{scroll-behavior:smooth}
body{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
::selection{background:var(--kc-teal);color:#fff}
h1,h2,h3{letter-spacing:-.01em!important;text-wrap:balance}
p{line-height:1.7!important;text-wrap:pretty}
a:focus-visible,button:focus-visible{outline:2px solid var(--kc-teal)!important;outline-offset:3px}

/* Cream background and calm header (only kicks in if the old gray or peach is still set) */
.kc-cream{background-color:var(--kc-cream)!important}
.kc-header{background-color:var(--kc-cream)!important;border-bottom:1px solid rgba(0,102,120,.14)!important}

/* One teal for every button */
.kc-btn{background-color:var(--kc-teal)!important;border-color:var(--kc-teal)!important;color:#fff!important;border-radius:var(--kc-radius)!important;letter-spacing:.04em!important;transition:background-color .3s var(--kc-ease),box-shadow .3s var(--kc-ease),transform .3s var(--kc-ease)!important}
.kc-btn-join{border-radius:0 var(--kc-radius) var(--kc-radius) 0!important}
.kc-btn-outline{background-color:transparent!important;border-color:var(--kc-teal)!important;color:var(--kc-teal)!important;border-radius:var(--kc-radius)!important;letter-spacing:.04em!important;transition:background-color .3s var(--kc-ease),color .3s var(--kc-ease)!important}
.kc-btn *,.kc-btn-outline *{color:inherit!important}

/* Cards, date pills, gallery tiles, video */
.kc-card{border:0!important;border-radius:14px!important;overflow:hidden!important;box-shadow:var(--kc-shadow)!important;transition:transform .45s var(--kc-ease),box-shadow .45s var(--kc-ease)!important}
.kc-pill{background-color:rgba(0,102,120,.09)!important;color:var(--kc-teal)!important;letter-spacing:.06em!important}
.kc-tile{box-shadow:var(--kc-shadow)!important;transition:transform .45s var(--kc-ease),box-shadow .45s var(--kc-ease)!important}
iframe[src*="youtube"],iframe[src*="vimeo"]{border-radius:12px!important;box-shadow:var(--kc-shadow)!important}

/* Form fields */
input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=button]),textarea,select{background-color:rgba(255,255,255,.6)!important;border-color:rgba(31,42,46,.28)!important;color:var(--kc-ink)!important;transition:border-color .25s,box-shadow .25s!important}
input::placeholder,textarea::placeholder{color:rgba(31,42,46,.5)!important}
input:focus,textarea:focus,select:focus{outline:none!important;border-color:var(--kc-teal)!important;box-shadow:0 0 0 3px rgba(0,102,120,.16)!important}

/* Nav links: spaced caps with an underline that fades in on hover */
nav a:not(.kc-btn):not(.kc-btn-outline){text-transform:uppercase;letter-spacing:.12em!important;font-size:.9em;text-decoration:underline!important;text-decoration-color:transparent!important;text-decoration-thickness:1px!important;text-underline-offset:.45em;transition:text-decoration-color .3s,color .3s}

/* Footer: cream wash over the mandala so text, logo and icons stay readable.
   Raise the .9 to hide more of the mandala, lower it to show more. */
.kc-footer-bg{box-shadow:inset 0 0 0 200vmax rgba(246,240,230,.9)!important}
.kc-footer-img{opacity:.1!important}
.kc-footer-solid{background-color:var(--kc-cream)!important}
.kc-footer :is(p,a,span,li,div,small,label,h1,h2,h3,h4,h5,h6):not(.kc-btn,.kc-btn-outline,.kc-btn *,.kc-btn-outline *){color:var(--kc-ink)!important;text-shadow:none!important}

/* Hides the payment icons in the footer. Delete this line to keep them. */
.kc-hide{display:none!important}

/* Hover effects, mouse only so phones don't get stuck mid-hover */
@media (hover:hover){
  .kc-btn:not([disabled]):hover{background-color:var(--kc-teal-deep)!important;border-color:var(--kc-teal-deep)!important;transform:translateY(-1px);box-shadow:0 10px 22px -10px rgba(0,102,120,.6)!important}
  .kc-btn-outline:hover{background-color:var(--kc-teal)!important;color:#fff!important}
  .kc-card:hover,.kc-tile:hover{transform:translateY(-4px);box-shadow:var(--kc-lift)!important}
  nav a:not(.kc-btn):not(.kc-btn-outline):hover{text-decoration-color:currentColor!important}
  .kc-footer a:not(.kc-btn,.kc-btn-outline):hover,.kc-footer a:not(.kc-btn,.kc-btn-outline):hover *{color:var(--kc-teal)!important}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}
`;

  var tag = document.createElement('style');
  tag.textContent = css;
  (document.head || document.documentElement).appendChild(tag);

  var GRAY = '#C3C2BE', PEACH = '#EBA371', TEALS = ['#006678', '#2A6476'], PILL = '#F1F1F1';

  function rgb(v) {
    var m = v && v.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    var p = m[1].trim().split(/[\s,\/]+/).map(parseFloat);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  function near(c, hex, tol) {
    if (!c || c.a < 0.9) return false;
    var n = parseInt(hex.slice(1), 16);
    return Math.abs(c.r - (n >> 16)) <= tol && Math.abs(c.g - ((n >> 8) & 255)) <= tol && Math.abs(c.b - (n & 255)) <= tol;
  }
  function st(el) { return getComputedStyle(el); }
  function rect(el) { return el.getBoundingClientRect(); }
  function text(el) { return String(el.innerText || el.value || '').trim(); }
  function within(el, sel) { try { return !!el.closest(sel); } catch (e) { return false; } }
  function framed(s) {
    return ['Top', 'Right', 'Bottom', 'Left'].every(function (d) {
      return parseFloat(s['border' + d + 'Width']) >= 1 && s['border' + d + 'Style'] !== 'none';
    });
  }

  function findFooter(vw) {
    var fs = document.querySelectorAll('footer'), i, n, hit = null;
    for (i = fs.length - 1; i >= 0; i--) if (rect(fs[i]).width >= vw * 0.9) return fs[i];
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while ((n = w.nextNode())) {
      var pe = n.parentElement;
      if (pe && !/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(pe.tagName) && n.nodeValue.indexOf('\u00A9') > -1) hit = pe;
    }
    for (var el = hit; el && el !== document.body; el = el.parentElement) {
      var r = rect(el);
      if (r.width >= vw * 0.9 && r.height >= 250) return el;
    }
    return null;
  }

  function run() {
    if (!document.body) return;
    var vw = window.innerWidth, all = document.querySelectorAll('html, body, body *'), i, el, s, c, r;

    // 1. Colors: gray page to cream, peach header to cream, both teals to one teal
    for (i = 0; i < all.length; i++) {
      el = all[i]; s = st(el); c = rgb(s.backgroundColor);
      if (!c || c.a < 0.9) continue;
      if (near(c, GRAY, 6)) { el.classList.add('kc-cream'); continue; }
      if (near(c, PEACH, 8)) {
        r = rect(el);
        if (r.top + window.scrollY < 220 || /fixed|sticky/.test(s.position)) {
          if (r.width > vw * 0.9) el.classList.add('kc-header');
        }
        continue;
      }
      if ((near(c, TEALS[0], 10) || near(c, TEALS[1], 10)) && (within(el, 'a, button, [role="button"]') || el.matches('input[type="submit"]'))) {
        r = rect(el);
        if (r.width >= 60 && r.height < 120 && text(el).length > 2) {
          var join = parseFloat(s.borderTopLeftRadius) === 0 && parseFloat(s.borderTopRightRadius) > 0;
          el.classList.add('kc-btn');
          if (join) el.classList.add('kc-btn-join');
        }
      }
    }

    // 2. Outlined buttons (like the one in the header)
    var links = document.querySelectorAll('a, button, [role="button"]');
    for (i = 0; i < links.length; i++) {
      el = links[i];
      if (el.classList.contains('kc-btn') || el.querySelector('.kc-btn')) continue;
      s = st(el); c = rgb(s.backgroundColor);
      var bc = rgb(s.borderTopColor);
      if ((!c || c.a === 0) && framed(s) && bc && bc.a > 0 && text(el).length > 2 && rect(el).width >= 60) el.classList.add('kc-btn-outline');
    }

    // 3. Cards: the framed box around a teal button (the event card)
    var btns = document.querySelectorAll('.kc-btn');
    for (i = 0; i < btns.length; i++) {
      for (var p = btns[i].parentElement, d = 0; p && p !== document.body && d < 10; d++, p = p.parentElement) {
        s = st(p);
        if (!(framed(s) || s.boxShadow !== 'none')) continue;
        r = rect(p);
        if (r.width >= vw - 8 || r.height >= 1000) break;
        if (r.height > 150) { p.classList.add('kc-card'); break; }
      }
    }
    var inCards = document.querySelectorAll('.kc-card *');
    for (i = 0; i < inCards.length; i++) {
      if (near(rgb(st(inCards[i]).backgroundColor), PILL, 4)) inCards[i].classList.add('kc-pill');
    }

    // 4. Footer: find the mandala layer, then the payment icons
    var foot = findFooter(vw), zone = null;
    if (foot) {
      var fr = rect(foot);
      zone = foot;
      for (var up = foot.parentElement, u = 0; up && up !== document.body && u < 3; u++, up = up.parentElement) {
        if (rect(up).height > fr.height * 1.6) break;
        zone = up;
      }
      if (!zone.classList.contains('kc-footer')) {
        var list = [zone].concat([].slice.call(zone.querySelectorAll('*'))), bgEl = null, bgImg = null;
        for (i = 0; i < list.length && !bgEl && !bgImg; i++) {
          el = list[i]; r = rect(el);
          if (r.width < fr.width * 0.8 || r.height < fr.height * 0.6) continue;
          if (st(el).backgroundImage.indexOf('url(') > -1) bgEl = el;
          else if (/^(IMG|PICTURE|VIDEO)$/.test(el.tagName)) bgImg = el;
        }
        if (bgEl) bgEl.classList.add('kc-footer-bg');
        if (bgImg) { bgImg.classList.add('kc-footer-img'); bgImg.parentElement.classList.add('kc-footer-solid'); }
        if (bgEl || bgImg) zone.classList.add('kc-footer');
      }
      var PAY = /visa|master ?card|amex|american express|discover|jcb|apple ?pay|google ?pay|cash ?app|afterpay|diners|union ?pay/i, hits = [];
      var icons = zone.querySelectorAll('img, svg');
      for (i = 0; i < icons.length; i++) {
        el = icons[i];
        var t = [el.getAttribute('alt'), el.getAttribute('aria-label'), el.getAttribute('title'), el.getAttribute('src'), el.querySelector('title') ? el.querySelector('title').textContent : ''].join(' ');
        if (PAY.test(t)) hits.push(el);
      }
      if (hits.length >= 3) {
        var g = hits[0].parentElement;
        while (g && !hits.every(function (h) { return g.contains(h); })) g = g.parentElement;
        if (g && g !== zone && g !== foot && rect(g).height < 160 && !g.querySelector('input, nav, h1, h2, h3, p') && g.textContent.indexOf('\u00A9') < 0) g.classList.add('kc-hide');
        else hits.forEach(function (h) { h.classList.add('kc-hide'); });
      }
    }

    // 5. Gallery tiles: content images the site already rounds get the lifted look
    var imgs = document.querySelectorAll('img');
    for (i = 0; i < imgs.length; i++) {
      el = imgs[i];
      if ((zone && zone.contains(el)) || within(el, 'header, footer, nav, .kc-card, .kc-header, .kc-tile, [class*="logo"], .kc-btn')) continue;
      r = rect(el);
      if (r.width < 120 || r.width > vw * 0.9) continue;
      for (var n2 = el, target = null, k = 0; n2 && n2 !== document.body && k < 5; k++, n2 = n2.parentElement) {
        var nr = rect(n2);
        if (Math.abs(nr.width - r.width) > 4 || Math.abs(nr.height - r.height) > 4) break;
        if (parseFloat(st(n2).borderTopLeftRadius) > 0) target = n2;
      }
      if (target) target.classList.add('kc-tile');
    }
  }

  // Square builds the page with JavaScript, so re-check as it renders
  var timer = null, last = 0;
  function schedule() {
    if (timer) return;
    timer = setTimeout(function () {
      timer = null; last = Date.now();
      try { run(); } catch (e) { if (window.console) console.warn('KCFOJ polish:', e); }
    }, Math.max(150, 800 - (Date.now() - last)));
  }
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('load', schedule, true);
  window.addEventListener('resize', schedule);
  schedule();
})();
