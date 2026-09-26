/* KC Friends of Jung: premium polish + the "oh wow" layer (v2.6, Red Book palette).
   Loaded on every page by one short script tag in Square's Tracking tools.
   Part 1 is the CSS. Part 2 finds your buttons, cards, gallery tiles and
   footer by their current colors and tags them, since Square doesn't
   publish stable class names. Edit or delete any CSS block here; changes
   go live once GitHub Pages redeploys, no Square republish needed. */
(function () {
  var css = `
:root{
  --kc-accent:#8B2A24; --kc-accent-deep:#6A1D19; --kc-cream:#F6F0E6; --kc-ink:#1F2A2E;
  --kc-radius:8px; --kc-ease:cubic-bezier(.22,.61,.36,1);
  --kc-shadow:0 12px 30px -14px rgba(31,42,46,.38);
  --kc-lift:0 22px 44px -16px rgba(31,42,46,.45);
}

/* Type and small details */
html{scroll-behavior:smooth}
body{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
::selection{background:var(--kc-accent);color:#fff}
h1,h2,h3{letter-spacing:-.01em!important;text-wrap:balance}
p{line-height:1.7!important;text-wrap:pretty}
a:focus-visible,button:focus-visible{outline:2px solid var(--kc-accent)!important;outline-offset:3px}

/* Cream background and calm header (only kicks in if the old gray or peach is still set) */
.kc-cream{background-color:var(--kc-cream)!important}
.kc-header{background-color:var(--kc-cream)!important;border-bottom:1px solid rgba(139,42,36,.14)!important}

/* One Red Book red for every button */
.kc-btn{background-color:var(--kc-accent)!important;border-color:var(--kc-accent)!important;color:#fff!important;border-radius:var(--kc-radius)!important;letter-spacing:.04em!important;transition:background-color .3s var(--kc-ease),box-shadow .3s var(--kc-ease),transform .3s var(--kc-ease)!important}
.kc-btn-join{border-radius:0 var(--kc-radius) var(--kc-radius) 0!important}
.kc-btn-outline{background-color:transparent!important;border-color:var(--kc-accent)!important;color:var(--kc-accent)!important;border-radius:var(--kc-radius)!important;letter-spacing:.04em!important;transition:background-color .3s var(--kc-ease),color .3s var(--kc-ease)!important}
.kc-btn *,.kc-btn-outline *{color:inherit!important}

/* Cards, date pills, gallery tiles, video */
.kc-card{border:0!important;border-radius:14px!important;overflow:hidden!important;box-shadow:var(--kc-shadow)!important;transition:transform .45s var(--kc-ease),box-shadow .45s var(--kc-ease)!important}
.kc-pill{background-color:rgba(139,42,36,.09)!important;color:var(--kc-accent)!important;letter-spacing:.06em!important}
.kc-tile{box-shadow:var(--kc-shadow)!important;transition:transform .45s var(--kc-ease),box-shadow .45s var(--kc-ease)!important}
iframe[src*="youtube"],iframe[src*="vimeo"]{border-radius:12px!important;box-shadow:var(--kc-shadow)!important}

/* Form fields */
input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=button]),textarea,select{border-color:rgba(31,42,46,.28)!important;color:var(--kc-ink)!important;transition:border-color .25s,box-shadow .25s!important}
input::placeholder,textarea::placeholder{color:rgba(31,42,46,.5)!important}
input:focus,textarea:focus,select:focus{outline:none!important;border-color:var(--kc-accent)!important;box-shadow:0 0 0 3px rgba(139,42,36,.16)!important}

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
  .kc-btn:not([disabled]):hover{background-color:var(--kc-accent-deep)!important;border-color:var(--kc-accent-deep)!important;transform:translateY(-1px);box-shadow:0 10px 22px -10px rgba(139,42,36,.6)!important}
  .kc-btn-outline:hover{background-color:var(--kc-accent)!important;color:#fff!important}
  .kc-card:hover,.kc-tile:hover{transform:translateY(-4px);box-shadow:var(--kc-lift)!important}
  nav a:not(.kc-btn):not(.kc-btn-outline):hover{text-decoration-color:currentColor!important}
  .kc-footer a:not(.kc-btn,.kc-btn-outline):hover,.kc-footer a:not(.kc-btn,.kc-btn-outline):hover *{color:var(--kc-accent)!important}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}
`;

  var tag = document.createElement('style');
  tag.textContent = css;
  (document.head || document.documentElement).appendChild(tag);

  var GRAY = '#C3C2BE', PEACH = '#EBA371', TEALS = ['#006678', '#2A6476', '#8B2A24'], PILL = '#F1F1F1';

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
      if (TEALS.some(function (t) { return near(c, t, 10); }) && (within(el, 'a, button, [role="button"]') || el.matches('input[type="submit"]'))) {
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
      if ((!c || c.a === 0 || (c.r > 200 && c.g > 200 && c.b > 200)) && framed(s) && bc && bc.a > 0 && text(el).length > 2 && rect(el).width >= 60) el.classList.add('kc-btn-outline');
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
      if ((zone && zone.contains(el)) || within(el, 'header, footer, nav, .kc-card, .kc-header, .kc-tile, [class*="logo"], .kc-btn, .kc-lb, .kc-veil, .kc-shadow, .kc-band')) continue;
      r = rect(el);
      if (r.width < 120 || r.width > vw * 0.9) continue;
      for (var n2 = el, target = null, k = 0; n2 && n2 !== document.body && k < 5; k++, n2 = n2.parentElement) {
        var nr = rect(n2);
        if (Math.abs(nr.width - r.width) > 4 || Math.abs(nr.height - r.height) > 4) break;
        if (parseFloat(st(n2).borderTopLeftRadius) > 0) target = n2;
      }
      if (target) target.classList.add('kc-tile');
    }
    if (window.KCFOJ_wow) window.KCFOJ_wow();
  }

  // Square builds the page with JavaScript, so re-check as it renders
  var timer = null, last = 0;
  function schedule() {
    if (timer) return;
    timer = setTimeout(function () {
      timer = null; last = Date.now();
      try { run(); } catch (e) { if (window.console) console.warn('KCFOJ polish:', e); }
    }, Math.max(60, 350 - (Date.now() - last)));
  }
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('load', schedule, true);
  window.addEventListener('resize', schedule);
  schedule();
})();

/* ===== Part 3: the "oh wow" layer (v2.2) =====
   Arrival veil, breathing hero, scroll reveals, word band,
   Red Book viewer and Shadow section.
   Edit the words and the quote in KC below. */
(function () {
  var KC = {
    name: 'Kansas City Friends of Jung',
    quote: 'Who looks outside, dreams; who looks inside, awakes.',
    by: 'C. G. Jung',
    words: ['Dreams', 'Shadow', 'Archetypes', 'Individuation', 'The Self', 'Symbol', 'Anima', 'Myth']
  };
  var D = document, R = D.documentElement;
  function mq(q) { return !!(window.matchMedia && window.matchMedia(q).matches); }
  var still = mq('(prefers-reduced-motion: reduce)');
  var fine = mq('(hover: hover) and (pointer: fine)');

  var css = `
:root{--kc-gold:#A8844F;--kc-night:#0E1517;--kc-deep:#8B2A24;--kc-paper:#F5F0E7;--kc-e:cubic-bezier(.2,.7,.2,1)}
html.kc-lock{overflow:hidden}

/* 1. Arrival */
.kc-veil{position:fixed;inset:0;z-index:2147483600;background:var(--kc-paper);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;padding:24px;cursor:pointer;transition:opacity 1.1s cubic-bezier(.7,0,.2,1),transform 1.3s cubic-bezier(.7,0,.2,1),filter 1.1s ease}
.kc-veil svg{width:min(46vw,230px);height:auto;overflow:visible;animation:kcTurn 5s var(--kc-e) both}
.kc-draw{fill:none;stroke:var(--kc-gold);stroke-width:1.15;stroke-linecap:round;stroke-dasharray:var(--l,700);stroke-dashoffset:var(--l,700);animation:kcDraw 1.5s cubic-bezier(.6,0,.2,1) forwards}
.kc-veil-name{font:400 clamp(13px,2vw,17px)/1.5 'Playfair Display',Georgia,serif;letter-spacing:.34em;text-transform:uppercase;color:#2A3336;text-align:center;opacity:0;transform:translateY(8px);animation:kcRise 1.2s 1s var(--kc-e) forwards}
.kc-veil.kc-go{opacity:0;transform:translateY(-4%) scale(1.02);filter:blur(8px);pointer-events:none}
@keyframes kcDraw{to{stroke-dashoffset:0}}
@keyframes kcRise{to{opacity:1;transform:none}}
@keyframes kcTurn{from{transform:rotate(-40deg) scale(.92)}to{transform:none}}

/* 2. Breathing hero */
.kc-hero-wrap{overflow:clip!important}
.kc-hero-pre{filter:blur(18px) saturate(.5);transform:scale(1.14);opacity:.35}
.kc-hero{transform-origin:50% 60%;animation:kcSurface 2.8s var(--kc-e) both,kcBreathe 22s 2.8s ease-in-out infinite alternate}
.kc-hero-soft{animation:kcSurfaceSoft 2.4s var(--kc-e) both}
@keyframes kcSurface{from{filter:blur(18px) saturate(.5);transform:scale(1.14);opacity:.35}to{filter:blur(0) saturate(1);transform:scale(1);opacity:1}}
@keyframes kcSurfaceSoft{from{filter:blur(18px);opacity:.35}to{filter:blur(0);opacity:1}}
@keyframes kcBreathe{from{transform:scale(1)}to{transform:scale(1.07)}}
.kc-aurora{position:absolute;inset:0;background-size:180% 180%!important;z-index:1;pointer-events:none;mix-blend-mode:soft-light;opacity:.7;background:radial-gradient(38% 46% at 22% 32%,rgba(214,168,98,.85),transparent 70%),radial-gradient(42% 52% at 78% 68%,rgba(139,42,36,.7),transparent 70%),radial-gradient(30% 40% at 58% 18%,rgba(255,244,226,.9),transparent 70%);animation:kcDrift 24s ease-in-out infinite alternate}
@keyframes kcDrift{from{background-position:0% 0%}to{background-position:100% 100%}}

/* 3. Scroll reveals and the word band */
.kc-rv.kc-rv,.kc-rv-h.kc-rv-h{transition:opacity 1.2s var(--kc-e),transform 1.2s var(--kc-e),filter 1.4s var(--kc-e)!important}
.kc-rv{opacity:0;transform:translateY(28px)}
.kc-rv-h{opacity:0;filter:blur(10px);transform:translateY(.4em)}
.kc-rv.kc-in{opacity:1;transform:none}
.kc-rv-h.kc-in{opacity:1;filter:blur(0);transform:none}
.kc-band{position:relative;overflow:hidden;border-block:1px solid rgba(139,42,36,.2);padding-block:clamp(14px,2.2vw,22px)}
.kc-band.kc-band-in{animation:kcUnfold 1.1s var(--kc-e) both}
@keyframes kcUnfold{from{max-height:0;opacity:0;padding-block:0}to{max-height:160px;opacity:1}}
.kc-still .kc-band.kc-band-in{animation:none}
.kc-band-track{display:flex;width:max-content;animation:kcMarq 60s linear infinite}
.kc-band span{display:inline-flex;align-items:center;gap:.9em;padding-inline:.45em;white-space:nowrap;font:italic 400 clamp(22px,3.6vw,42px)/1.15 'Playfair Display',Georgia,serif;color:var(--kc-deep)}
.kc-band i{font-style:normal;color:var(--kc-gold);font-size:.5em}
@keyframes kcMarq{to{transform:translateX(-50%)}}

/* 4. Red Book viewer */
.kc-sheen::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(circle at var(--mx,50%) var(--my,30%),rgba(255,255,255,.5),transparent 55%);opacity:0;transition:opacity .4s;mix-blend-mode:soft-light}
.kc-sheen:hover::after{opacity:1}
.kc-lb{position:fixed;inset:0;z-index:2147483500;display:flex;align-items:center;justify-content:center;padding:64px 16px;background:rgba(10,15,17,.94);opacity:0;transition:opacity .45s ease;cursor:zoom-out}
.kc-lb.kc-open{opacity:1}
.kc-lb img{max-width:min(100%,880px);max-height:100%;object-fit:contain;border-radius:6px;box-shadow:0 40px 90px -30px rgba(0,0,0,.8);transform:scale(.94) translateY(14px);transition:transform .7s var(--kc-e),opacity .18s ease;cursor:default}
.kc-lb.kc-open img{transform:none}
.kc-lb button{position:absolute;display:grid;place-items:center;width:46px;height:46px;padding:0;border-radius:50%;border:1px solid rgba(246,240,230,.3);background:rgba(10,15,17,.4);color:#F6F0E6;font:300 26px/1 Georgia,serif;cursor:pointer;transition:background .25s,border-color .25s}
.kc-lb button:hover{background:rgba(246,240,230,.12);border-color:rgba(246,240,230,.6)}
.kc-lb button:focus-visible{outline:2px solid var(--kc-gold);outline-offset:3px}
.kc-lb-x{top:max(12px,env(safe-area-inset-top));right:12px}
.kc-lb-prev,.kc-lb-next{top:50%;margin-top:-23px}
.kc-lb-prev{left:12px}.kc-lb-next{right:12px}
.kc-lb-count{position:absolute;left:0;right:0;bottom:max(20px,env(safe-area-inset-bottom));text-align:center;color:rgba(246,240,230,.6);font:500 11px/1 system-ui,sans-serif;letter-spacing:.32em}
@media (max-width:600px){.kc-lb-prev,.kc-lb-next{display:none}}

/* 5. The Shadow */
.kc-shadow{position:relative!important;overflow:hidden!important;background:var(--kc-night)!important;min-height:clamp(420px,72vh,680px)!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;padding:clamp(72px,11vw,140px) 24px!important;margin:0!important;--x:50%;--y:50%;--kc-r:220px}
.kc-shadow::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle min(calc(var(--kc-r) * 1.7), 380px) at var(--x) var(--y),rgba(255,214,160,.17),rgba(255,214,160,.05) 45%,transparent 72%)}
.kc-shadow-q{position:relative;margin:0;max-width:15ch;text-align:center;font:italic 400 clamp(34px,6.4vw,78px)/1.12 'Playfair Display',Georgia,serif;letter-spacing:-.01em;text-wrap:balance;color:transparent;background:radial-gradient(circle var(--kc-r) at var(--qx,50%) var(--qy,50%),#F8F1E4 0%,rgba(248,241,228,.6) 38%,rgba(248,241,228,.07) 72%);-webkit-background-clip:text;background-clip:text}
.kc-shadow-by{display:block;margin-top:1.2em;font:500 11px/1.4 'Libre Franklin',system-ui,sans-serif;font-style:normal;letter-spacing:.36em;text-transform:uppercase}
.kc-shadow-hint{position:absolute;left:0;right:0;bottom:24px;padding:0 16px;text-align:center;font:500 10px/1.4 system-ui,sans-serif;letter-spacing:.34em;text-transform:uppercase;color:rgba(246,240,230,.32);transition:opacity .8s}
.kc-shadow.kc-used .kc-shadow-hint{opacity:0}
.kc-lantern{position:absolute;left:var(--x);top:var(--y);width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;background:#FFE2B3;box-shadow:0 0 18px 6px rgba(255,205,140,.45);pointer-events:none;opacity:0;transition:opacity .4s}
@media (hover:hover) and (pointer:fine){.kc-shadow{cursor:none}.kc-shadow:hover .kc-lantern{opacity:1}}
.kc-lit .kc-shadow-q{color:#F8F1E4;background:none}


.kc-still .kc-band-track,.kc-still .kc-aurora{animation:none}
`;
  var tag = D.createElement('style');
  tag.textContent = css;
  (D.head || R).appendChild(tag);
  if (still) R.classList.add('kc-still');

  function rect(el) { return el.getBoundingClientRect(); }
  function mk(t, cls, html) { var e = D.createElement(t); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }
  function chrome(el) { return !!el.closest('header, footer, nav, .kc-veil, .kc-lb, .kc-band, .kc-shadow, .kc-footer, .kc-header, .kc-hero-wrap'); }
  // The top-level page section an element lives in (its parent holds 3+ full-width blocks)
  function sectionOf(el) {
    var vw = window.innerWidth;
    while (el && el.parentElement && el.parentElement !== D.body) {
      var p = el.parentElement, n = 0;
      for (var c = p.firstElementChild; c; c = c.nextElementSibling) {
        var r = rect(c);
        if (r.width >= vw * 0.9 && r.height > 40) n++;
      }
      if (n >= 3) return el;
      el = p;
    }
    return null;
  }

  // 1. Arrival veil: once per visit
  var veilUp = false, queue = [];
  function whenClear(fn) { if (veilUp) queue.push(fn); else fn(); }
  function mandala() {
    var s = '<svg viewBox="-110 -110 220 220" aria-hidden="true">', d = 0, i;
    function sh(t, a) { s += '<' + t + ' class="kc-draw" style="animation-delay:' + (d += 0.03).toFixed(2) + 's" ' + a + '/>'; }
    sh('circle', 'r="104"'); sh('circle', 'r="97"');
    for (i = 0; i < 12; i++) sh('ellipse', 'rx="17" ry="45" cy="-52" transform="rotate(' + i * 30 + ')"');
    sh('circle', 'r="46"');
    for (i = 0; i < 8; i++) sh('circle', 'r="9" cy="-31" transform="rotate(' + (i * 45 + 22.5) + ')"');
    sh('path', 'd="M0 -24 L7 -7 L24 0 L7 7 L0 24 L-7 7 L-24 0 L-7 -7 Z"');
    sh('circle', 'r="4.5"');
    return s + '</svg>';
  }
  function showVeil(force) {
    var seen = false;
    try { seen = sessionStorage.getItem('kcVeil') === '1'; sessionStorage.setItem('kcVeil', '1'); } catch (e) {}
    if (still || (seen && !force)) return;
    var v = mk('div', 'kc-veil', mandala());
    var nm = mk('div', 'kc-veil-name'); nm.textContent = KC.name; v.appendChild(nm);
    v.setAttribute('aria-hidden', 'true');
    R.appendChild(v);
    [].forEach.call(v.querySelectorAll('.kc-draw'), function (p) {
      var L = 700;
      try { L = Math.ceil(p.getTotalLength()) + 2; } catch (e) {}
      p.style.setProperty('--l', L);
    });
    veilUp = true;
    var done = false;
    function lift() {
      if (done) return;
      done = true; veilUp = false;
      v.classList.add('kc-go');
      var q = queue; queue = [];
      q.forEach(function (f) { try { f(); } catch (e) {} });
      setTimeout(function () { if (v.parentNode) v.parentNode.removeChild(v); }, 1400);
    }
    v.addEventListener('click', lift);
    // Phones keep showing the previous page until this one paints, so time the hold from the
    // moment the drawing animation starts (that is when the veil becomes visible)
    var armed = false;
    function arm() {
      if (armed) return;
      armed = true;
      setTimeout(lift, 2700);
      setTimeout(function () { lift(); if (v.parentNode) v.parentNode.removeChild(v); }, 5500);
    }
    v.addEventListener('animationstart', arm);
    setTimeout(arm, 7000);
  }

  // 2. Hero: surfaces from a blur, then slowly breathes under a drifting aurora
  var heroEl = null, heroSoft = false;
  // Only clip a small, plain box around the hero: never the page, never anything that scrolls
  function safeWrap(w, r) {
    if (!w || w === D.body || w === R || !(window.CSS && CSS.supports && CSS.supports('overflow', 'clip'))) return false;
    var s = getComputedStyle(w), wr = rect(w);
    if (/auto|scroll|overlay/.test(s.overflowY + s.overflowX)) return false;
    if (w.scrollHeight > w.clientHeight + 4) return false;
    return wr.height <= r.height * 1.25 && wr.height <= window.innerHeight * 1.3;
  }
  function surface() {
    if (!heroEl || still) return;
    heroEl.classList.remove('kc-hero', 'kc-hero-soft');
    heroEl.classList.add('kc-hero-pre');
    whenClear(function () {
      heroEl.classList.remove('kc-hero-pre');
      void heroEl.offsetWidth;
      heroEl.classList.add(heroSoft ? 'kc-hero-soft' : 'kc-hero');
    });
  }
  function hero() {
    if (heroEl && D.contains(heroEl)) return;
    heroEl = null;
    var vw = R.clientWidth || window.innerWidth, all = D.body.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      // Square puts the banner inside the page's <header>, so only the nav bar itself is off limits
      if (el.closest('nav, a, button, .kc-veil, .kc-header, .kc-lb, .kc-card, .kc-tile, .kc-shadow, .kc-band')) continue;
      var r = rect(el);
      if (r.width < vw - 6 || r.height < 160 || r.height > window.innerHeight * 1.25 || r.top + window.scrollY > 700) continue;
      if (!/^(IMG|PICTURE|VIDEO)$/.test(el.tagName) && getComputedStyle(el).backgroundImage.indexOf('url(') < 0) continue;
      var wrap = el.parentElement;
      heroSoft = !safeWrap(wrap, r);
      heroEl = el;
      if (!heroSoft) {
        wrap.classList.add('kc-hero-wrap');
        if (getComputedStyle(wrap).position === 'static') wrap.style.position = 'relative';
        wrap.appendChild(mk('div', 'kc-aurora'));
      }
      surface();
      return;
    }
  }

  // 3a. Word band under the hero
  var bandEl = null, bandTries = 0, bandTimer = 0, H = 'h1, h2, h3, h4', diag = [];
  function path(el) {
    var out = [];
    for (var n = 0; el && el !== D.body && el !== R && n < 4; n++, el = el.parentElement) {
      var c = typeof el.className === 'string' ? el.className.trim().split(/\s+/).filter(function (x) { return x && x.indexOf('kc-') !== 0; }).slice(0, 2).join('.') : '';
      out.push(el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (c ? '.' + c : ''));
    }
    return out.join(' < ') || 'body';
  }
  // Returns '' when the band is full width, below the banner, above the next heading and not hidden
  function bandFits(hb, h, minW) {
    var b = rect(bandEl);
    if (b.width < window.innerWidth * minW) return 'too narrow (' + Math.round(b.width) + 'px)';
    if (b.height < 20) return 'squashed (' + Math.round(b.height) + 'px tall)';
    if (b.top < hb - 2) return 'overlaps banner';
    if (h ? b.bottom > rect(h).top + 2 : b.top > hb + 240) return 'too far down';
    for (var a = bandEl.parentElement; a && a !== D.body && a !== R; a = a.parentElement) {
      var s2 = getComputedStyle(a);
      if (s2.display === 'none' || s2.visibility === 'hidden') return 'hidden by ' + path(a);
      var ar = rect(a);
      // Scrollable boxes don't hide content (you can scroll to it); only hidden/clip boxes do
      if (/hidden|clip/.test(s2.overflowY) && (b.top < ar.top - 1 || b.bottom > ar.bottom + 1)) return 'clipped by ' + path(a);
      if (/hidden|clip/.test(s2.overflowX) && (b.left < ar.left - 2 || b.right > ar.right + 2)) return 'clipped by ' + path(a);
    }
    return '';
  }
  function showDiag() {
    if (location.hash !== '#kcdebug') return;
    var box = D.getElementById('kc-diag') || D.body.appendChild(mk('pre'));
    box.id = 'kc-diag';
    box.style.cssText = 'position:fixed;left:8px;right:8px;bottom:8px;z-index:2147483647;max-height:55vh;overflow:auto;margin:0;padding:10px;background:#fff;color:#111;font:11px/1.45 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap;border:2px solid #8B2A24;border-radius:6px';
    box.textContent = 'KCFOJ debug (v2.6) page ' + location.pathname + '\n' + diag.join('\n');
  }
  function band() {
    if (!heroEl || bandTries >= 12 || (bandEl && D.contains(bandEl))) return;
    bandTries++;
    if (!bandEl) {
      var w = KC.words.map(function (x) { return '<span>' + x + '<i>✦</i></span>'; }).join('');
      bandEl = mk('div', 'kc-band', '<div class="kc-band-track">' + w + w + w + w + '</div>');
      bandEl.setAttribute('aria-hidden', 'true');
    }
    bandEl.classList.remove('kc-band-in');
    // Measure the banner without its zoom animation, which makes it look taller than it is
    var ot = heroEl.style.getPropertyValue('transform'), op = heroEl.style.getPropertyPriority('transform');
    heroEl.style.setProperty('transform', 'none', 'important');
    var hb = rect(heroEl).bottom;
    if (ot) heroEl.style.setProperty('transform', ot, op); else heroEl.style.removeProperty('transform');
    var hs = D.querySelectorAll(H), h = null, spots = [], i, a, k, why;
    for (i = 0; i < hs.length; i++) {
      if (chrome(hs[i]) || rect(hs[i]).height === 0) continue;
      if (rect(hs[i]).top >= hb - 2) { h = hs[i]; break; }
    }
    diag = ['try ' + bandTries + ' | screen ' + window.innerWidth + 'x' + window.innerHeight,
            'banner: ' + path(heroEl) + ' | bottom ' + Math.round(hb),
            'next heading: ' + (h ? h.tagName + ' "' + h.textContent.trim().slice(0, 32) + '" ' + path(h.parentElement) : 'none found')];
    if (h) {
      // The widest block that holds only this heading (its section), without swallowing the banner
      var sec = h;
      while (sec.parentElement && sec.parentElement !== D.body && !sec.parentElement.contains(heroEl) && sec.parentElement.querySelectorAll(H).length === 1) sec = sec.parentElement;
      spots.push([sec.parentElement, sec]);
    }
    for (a = heroEl; a.parentElement && a !== D.body && a.parentElement !== R; a = a.parentElement) spots.push([a.parentElement, a.nextSibling]);
    for (k = 0; k < 2; k++) {
      for (i = 0; i < spots.length; i++) {
        try { spots[i][0].insertBefore(bandEl, spots[i][1]); } catch (e) { continue; }
        why = bandFits(hb, h, k ? 0.6 : 0.85);
        diag.push((k ? 'loose ' : '') + 'in ' + path(spots[i][0]) + ' -> ' + (why || 'OK'));
        if (!why) { if (!still) bandEl.classList.add('kc-band-in'); showDiag(); return; }
      }
    }
    if (bandEl.parentNode) bandEl.parentNode.removeChild(bandEl);
    showDiag();
    clearTimeout(bandTimer);
    if (bandTries < 12) bandTimer = setTimeout(function () { if (window.KCFOJ_wow) window.KCFOJ_wow(); }, 1200);
  }

  // 3b. Scroll reveals
  var io = null;
  if (!still && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(function (ents) {
      var vis = ents.filter(function (e) { return e.isIntersecting; }).map(function (e) { return e.target; });
      vis.sort(function (a, b) { var ra = rect(a), rb = rect(b); return (ra.top - rb.top) || (ra.left - rb.left); });
      vis.forEach(function (el, i) {
        io.unobserve(el);
        var delay = Math.min(i, 6) * 90;
        el.style.transitionDelay = delay + 'ms';
        el.classList.add('kc-in');
        setTimeout(function () { el.classList.remove('kc-rv', 'kc-rv-h', 'kc-in'); el.style.transitionDelay = ''; }, 1500 + delay);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
  }
  function reveal() {
    if (!io) return;
    var els = D.querySelectorAll('h1, h2, h3, p, iframe, form, .kc-card, .kc-tile');
    [].forEach.call(els, function (el) {
      if (el.dataset.kcRv || chrome(el)) return;
      if (!el.classList.contains('kc-card') && el.closest('.kc-card')) return;
      if (!el.classList.contains('kc-tile') && el.closest('.kc-tile')) return;
      if (el.tagName !== 'FORM' && el.closest('form')) return;
      if (rect(el).height === 0) return;
      el.dataset.kcRv = '1';
      el.classList.add(/^H[12]$/.test(el.tagName) ? 'kc-rv-h' : 'kc-rv');
      whenClear(function () { io.observe(el); });
    });
  }

  // 4. Red Book viewer: tilt on hover, full-screen on tap
  var lb = null, lbList = [], lbI = 0, lbFrom = null;
  function srcOf(t) { var im = t.tagName === 'IMG' ? t : t.querySelector('img'); return im ? (im.currentSrc || im.src) : ''; }
  function lbShow() {
    var im = lb.querySelector('img');
    im.src = srcOf(lbList[lbI]);
    lb.querySelector('.kc-lb-count').textContent = (lbI + 1) + ' / ' + lbList.length;
  }
  function lbStep(d) {
    lbI = (lbI + d + lbList.length) % lbList.length;
    var im = lb.querySelector('img');
    im.style.opacity = 0;
    setTimeout(function () { lbShow(); im.style.opacity = 1; }, 180);
  }
  function lbClose() {
    lb.classList.remove('kc-open');
    R.classList.remove('kc-lock');
    setTimeout(function () { if (!lb.classList.contains('kc-open') && lb.parentNode) lb.parentNode.removeChild(lb); }, 450);
    if (lbFrom && lbFrom.focus) lbFrom.focus();
  }
  function lbOpen(list, i, from) {
    lbList = list; lbI = Math.max(0, i); lbFrom = from;
    if (!lb) {
      lb = mk('div', 'kc-lb', '<img alt=""><button type="button" class="kc-lb-x" aria-label="Close">×</button><button type="button" class="kc-lb-prev" aria-label="Previous plate">‹</button><button type="button" class="kc-lb-next" aria-label="Next plate">›</button><div class="kc-lb-count"></div>');
      lb.setAttribute('role', 'dialog');
      lb.setAttribute('aria-modal', 'true');
      lb.setAttribute('aria-label', 'Image viewer');
      lb.addEventListener('click', function (e) {
        if (e.target.closest('.kc-lb-prev')) return lbStep(-1);
        if (e.target.closest('.kc-lb-next')) return lbStep(1);
        if (e.target.tagName !== 'IMG') lbClose();
      });
      var sx = 0;
      lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
      lb.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) lbStep(dx < 0 ? 1 : -1); });
      D.addEventListener('keydown', function (e) {
        if (!lb.classList.contains('kc-open')) return;
        if (e.key === 'Escape') lbClose();
        if (e.key === 'ArrowRight') lbStep(1);
        if (e.key === 'ArrowLeft') lbStep(-1);
      });
    }
    D.body.appendChild(lb);
    lbShow();
    R.classList.add('kc-lock');
    requestAnimationFrame(function () { requestAnimationFrame(function () { lb.classList.add('kc-open'); lb.querySelector('.kc-lb-x').focus(); }); });
  }
  function gallery() {
    [].forEach.call(D.querySelectorAll('.kc-tile'), function (t) {
      if (t.dataset.kcG || t.closest('.kc-lb')) return;
      t.dataset.kcG = '1';
      if (fine && !still) {
        if (t.tagName !== 'IMG') {
          if (getComputedStyle(t).position === 'static') t.style.position = 'relative';
          t.classList.add('kc-sheen');
        }
        t.addEventListener('pointermove', function (e) {
          var r = rect(t), px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
          t.style.transition = 'transform .15s ease-out, box-shadow .3s';
          t.style.transform = 'perspective(900px) rotateX(' + (-py * 10).toFixed(2) + 'deg) rotateY(' + (px * 12).toFixed(2) + 'deg) translateY(-6px) scale(1.02)';
          t.style.setProperty('--mx', ((px + 0.5) * 100).toFixed(1) + '%');
          t.style.setProperty('--my', ((py + 0.5) * 100).toFixed(1) + '%');
        });
        t.addEventListener('pointerleave', function () {
          t.style.transition = 'transform .8s cubic-bezier(.2,.7,.2,1), box-shadow .5s';
          t.style.transform = '';
        });
      }
      t.style.cursor = 'zoom-in';
      if (!t.hasAttribute('tabindex') && !t.closest('a, button')) { t.setAttribute('tabindex', '0'); t.setAttribute('role', 'button'); t.setAttribute('aria-label', 'Open image'); }
      function open(e) {
        var a = t.closest('a[href]');
        if (a && !/^(#|javascript)/i.test(a.getAttribute('href'))) return;
        e.preventDefault(); e.stopPropagation();
        var list = [].slice.call(D.querySelectorAll('.kc-tile'));
        lbOpen(list, list.indexOf(t), t);
      }
      t.addEventListener('click', open);
      t.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') open(e); });
    });
  }

  // 5. The Shadow: a dark band where the light follows your cursor, or your scroll
  var shadowEl = null;
  function lantern(sec) {
    var q = sec.querySelector('.kc-shadow-q');
    if (still) { sec.classList.add('kc-lit'); return; }
    var x = 0.3, y = 0.5, tx = 0.3, ty = 0.5, inside = false, live = false, raf = 0, rr = 150;
    function tick(t) {
      var r = rect(sec), rq = rect(q), vh = window.innerHeight;
      var base = Math.max(140, Math.min(260, window.innerWidth * 0.22)), rt = base;
      if (!inside) {
        var p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        tx = 0.14 + 0.72 * p + 0.05 * Math.sin(t / 1300);
        ty = 0.5 + 0.16 * Math.sin(p * Math.PI * 2 + t / 2100);
        if (!fine) {
          // 1 when the quote sits mid-screen, easing to 0 as it moves away
          var mid = (rq.top + rq.height / 2) / vh, near = Math.max(0, 1 - Math.abs(mid - 0.5) / 0.32);
          near = near * near * (3 - 2 * near);
          var qx = (rq.left - r.left + rq.width / 2) / r.width, qy = (rq.top - r.top + rq.height / 2) / r.height;
          tx += (qx - tx) * near; ty += (qy - ty) * near;
          rt = base + (Math.hypot(rq.width, rq.height) / 2 / 0.4 - base) * near;
        }
      }
      var k = inside ? 0.2 : 0.07;
      x += (tx - x) * k; y += (ty - y) * k; rr += (rt - rr) * 0.08;
      var px = x * r.width, py = y * r.height;
      sec.style.setProperty('--kc-r', Math.round(rr) + 'px');
      sec.style.setProperty('--x', px.toFixed(1) + 'px');
      sec.style.setProperty('--y', py.toFixed(1) + 'px');
      q.style.setProperty('--qx', (px - (rq.left - r.left)).toFixed(1) + 'px');
      q.style.setProperty('--qy', (py - (rq.top - r.top)).toFixed(1) + 'px');
      raf = live ? requestAnimationFrame(tick) : 0;
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        live = e[0].isIntersecting;
        if (live && !raf) raf = requestAnimationFrame(tick);
      }).observe(sec);
    } else { sec.classList.add('kc-lit'); }
    if (fine) {
      sec.addEventListener('pointermove', function (e) {
        var r = rect(sec);
        inside = true; sec.classList.add('kc-used');
        tx = (e.clientX - r.left) / r.width; ty = (e.clientY - r.top) / r.height;
      });
      sec.addEventListener('pointerleave', function () { inside = false; });
    } else {
      window.addEventListener('scroll', function () { sec.classList.add('kc-used'); }, { passive: true, once: true });
      function touch(e) {
        var r = rect(sec), tp = e.touches[0];
        if (!tp) return;
        inside = true; sec.classList.add('kc-used');
        tx = (tp.clientX - r.left) / r.width; ty = (tp.clientY - r.top) / r.height;
      }
      sec.addEventListener('touchstart', touch, { passive: true });
      sec.addEventListener('touchmove', touch, { passive: true });
      sec.addEventListener('touchend', function () { inside = false; }, { passive: true });
      sec.addEventListener('touchcancel', function () { inside = false; }, { passive: true });
    }
  }
  function shadow() {
    if (shadowEl && D.contains(shadowEl)) return;
    var hs = D.querySelectorAll('h1, h2, h3'), anchor = null;
    for (var i = 0; i < hs.length; i++) {
      if (/contact/i.test(hs[i].textContent) && !chrome(hs[i])) { anchor = sectionOf(hs[i]); break; }
    }
    if (!anchor) return;
    shadowEl = mk('section', 'kc-shadow', '<div class="kc-lantern"></div><blockquote class="kc-shadow-q"></blockquote><div class="kc-shadow-hint"></div>');
    var q = shadowEl.querySelector('.kc-shadow-q');
    q.textContent = KC.quote;
    var by = mk('cite', 'kc-shadow-by'); by.textContent = KC.by; q.appendChild(by);
    shadowEl.querySelector('.kc-shadow-hint').textContent = fine ? 'Move your light through the dark' : 'Scroll or drag to carry the light';
    anchor.parentElement.insertBefore(shadowEl, anchor);
    lantern(shadowEl);
  }


  function unstick() {
    if (R.classList.contains('kc-lock') && !(lb && lb.classList.contains('kc-open'))) R.classList.remove('kc-lock');
  }
  setInterval(unstick, 1500);
  ['wheel', 'touchstart', 'keydown'].forEach(function (ev) { window.addEventListener(ev, unstick, { passive: true }); });

  showVeil(false);
  function isHome() {
    if (window.KCFOJ_FORCE_HOME) return true;
    var pth = location.pathname.replace(/\/+$/, '');
    return pth === '' || /^\/(index\.(php|html?)|home)$/i.test(pth);
  }
  // Square switches pages without reloading, so clear anything tied to the previous page
  var lastPath = null;
  function routeCheck() {
    if (location.pathname === lastPath) return;
    lastPath = location.pathname;
    if (heroEl) heroEl.classList.remove('kc-hero', 'kc-hero-soft', 'kc-hero-pre');
    heroEl = null; heroSoft = false;
    [].forEach.call(D.querySelectorAll('.kc-aurora'), function (x) { x.parentNode.removeChild(x); });
    [].forEach.call(D.querySelectorAll('.kc-hero-wrap'), function (x) { x.classList.remove('kc-hero-wrap'); });
    if (bandEl && bandEl.parentNode) bandEl.parentNode.removeChild(bandEl);
    bandTries = 0; clearTimeout(bandTimer);
    if (shadowEl && shadowEl.parentNode) shadowEl.parentNode.removeChild(shadowEl);
    shadowEl = null;
  }
  window.KCFOJ_wow = function () {
    if (!D.body) return;
    routeCheck();
    var home = isHome();
    [home && hero, home && band, home && shadow, gallery, reveal].forEach(function (f) {
      if (!f) return;
      try { f(); } catch (e) { if (window.console) console.warn('KCFOJ wow:', e); }
    });
  };
  window.KCFOJ = { replayIntro: function () { window.scrollTo(0, 0); showVeil(true); surface(); } };
})();

/* ===== Part 4 (add-on): illuminated initials + rubric ornaments =====
   Paste at the very end of the file. Uses the existing palette tokens
   and runs inside the existing update cycle (KCFOJ_wow). */
(function () {
  var D = document;
  var css = `
.kc-initial::first-letter{float:left;font-family:'UnifrakturMaguntia','Playfair Display',Georgia,serif;font-weight:400;font-style:normal;font-size:3.5em;line-height:.85;color:var(--kc-accent);padding:.1em .12em .04em;margin:.08em .16em 0 0;border:1px solid var(--kc-gold);background:rgba(139,42,36,.05)}
.kc-rubric::after{content:"";display:block;width:clamp(120px,20vw,180px);height:12px;margin:.5em auto 0;background:linear-gradient(var(--kc-gold),var(--kc-gold)) left center/calc(50% - 16px) 1px no-repeat,linear-gradient(var(--kc-gold),var(--kc-gold)) right center/calc(50% - 16px) 1px no-repeat,url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M6 0L7.6 4.4 12 6 7.6 7.6 6 12 4.4 7.6 0 6 4.4 4.4z' fill='%238B2A24'/%3E%3C/svg%3E") center/11px 11px no-repeat}
.kc-rubric-left::after{margin-left:0}
`;
  var tag = D.createElement('style');
  tag.textContent = css;
  (D.head || D.documentElement).appendChild(tag);

  function skip(el) { return !!el.closest('header, footer, nav, form, blockquote, li, a, button, .kc-veil, .kc-lb, .kc-band, .kc-shadow, .kc-footer, .kc-header, .kc-hero-wrap, .kc-card'); }
  function left(el) { return /^(left|start|justify)$/.test(getComputedStyle(el).textAlign); }
  function fontOnce() {
    if (D.getElementById('kc-initial-font')) return;
    var l = D.createElement('link');
    l.id = 'kc-initial-font'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap&text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    D.head.appendChild(l);
  }

  function illuminate() {
    // Section headings get a small crimson-and-gold rubric beneath them
    [].forEach.call(D.querySelectorAll('h1, h2, h3'), function (h) {
      if (h.dataset.kcRubric || skip(h)) return;
      var s = getComputedStyle(h), t = h.textContent.trim();
      if (parseFloat(s.fontSize) < 28 || t.length < 2 || t.length > 60 || /^(right|end)$/.test(s.textAlign)) return;
      h.dataset.kcRubric = '1';
      h.classList.add('kc-rubric');
      if (left(h)) h.classList.add('kc-rubric-left');
    });
    // The first long, left-aligned paragraph after each heading opens with an illuminated initial
    var armed = true;
    [].forEach.call(D.querySelectorAll('h1, h2, h3, h4, p'), function (el) {
      if (skip(el)) return;
      if (el.tagName !== 'P') { armed = true; return; }
      if (!armed || el.dataset.kcInitial) { if (el.dataset.kcInitial) armed = false; return; }
      var t = el.textContent.trim();
      if (t.length < 160 || !/^[A-Za-z]/.test(t) || !left(el)) return;
      el.dataset.kcInitial = '1';
      el.classList.add('kc-initial');
      armed = false;
      fontOnce();
    });
  }

  var prev = window.KCFOJ_wow;
  window.KCFOJ_wow = function () {
    if (prev) prev();
    try { illuminate(); } catch (e) { if (window.console) console.warn('KCFOJ add-on:', e); }
  };
})();
/* ===== Part 5 (add-on): mandala compass =====
  A small gold mandala in the corner that draws itself line by line as
  you scroll and completes at the bottom of the page. Tap it to return
  to the top. Paste at the very end of the file, after Part 4. */
(function () {
 var D = document, R = D.documentElement;
 var SIDE = 'right'; // change to 'left' if something else lives in that corner
 var still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 var css = `
.kc-compass{position:fixed;${SIDE}:max(16px,env(safe-area-inset-${SIDE},0px));bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:2147483300;width:52px;height:52px;padding:0;margin:0;border:0;border-radius:50%;background:var(--kc-cream);box-shadow:0 10px 24px -12px rgba(31,42,46,.5),0 0 0 1px rgba(168,132,79,.35);cursor:pointer;opacity:0;transform:translateY(10px) scale(.92);pointer-events:none;transition:opacity .5s ease,transform .6s var(--kc-e),box-shadow .5s ease;-webkit-tap-highlight-color:transparent}
.kc-compass.kc-on{opacity:1;transform:none;pointer-events:auto}
.kc-compass svg{display:block;width:100%;height:100%}
.kc-compass .kc-cg>*{fill:none;stroke:var(--kc-gold);stroke-width:2.2;stroke-linecap:round}
.kc-compass .kc-cg-ghost{opacity:.2}
.kc-compass .kc-cdot{fill:var(--kc-gold);opacity:.35;transition:fill .6s ease,opacity .6s ease}
.kc-compass.kc-done .kc-cdot{fill:var(--kc-accent);opacity:1}
.kc-compass.kc-done{box-shadow:0 10px 24px -12px rgba(31,42,46,.5),0 0 0 1px var(--kc-gold),0 0 18px -2px rgba(168,132,79,.55)}
@media (hover:hover){.kc-compass.kc-on:hover{transform:scale(1.07)}}
@media (max-width:600px){.kc-compass{width:46px;height:46px}}
.kc-lock .kc-compass{opacity:0;pointer-events:none}
.kc-still .kc-compass,.kc-still .kc-compass .kc-cdot{transition:none}
@media print{.kc-compass{display:none}}
`;
 var tag = D.createElement('style');
 tag.textContent = css;
 (D.head || R).appendChild(tag);
 // The same figure as the intro mandala, simplified to read at 50px: ring, 12 petals, inner ring, star
 function shapes() {
   var s = '<circle r="46"/>';
   for (var i = 0; i < 12; i++) s += '<ellipse rx="7.5" ry="19" cy="-24" transform="rotate(' + i * 30 + ')"/>';
   return s + '<circle r="20"/><path d="M0 -12L3.5 -3.5 12 0 3.5 3.5 0 12 -3.5 3.5 -12 0 -3.5 -3.5Z"/>';
 }
 var btn = D.createElement('button');
 btn.type = 'button';
btn.id = 'kc-compass';
 btn.className = 'kc-compass';
 btn.title = 'Back to top';
 btn.setAttribute('aria-label', 'Back to top');
 btn.setAttribute('aria-hidden', 'true');
 btn.tabIndex = -1;
 btn.innerHTML = '<svg viewBox="-50 -50 100 100" aria-hidden="true" focusable="false"><g class="kc-cg kc-cg-ghost">' + shapes() + '</g><g class="kc-cg kc-cg-ink">' + shapes() + '</g><circle class="kc-cdot" r="4.5"/></svg>';
 var ink = [], lens = [], lastP = -1, inner = null, ticking = false;
 function measure() {
   ink = [].slice.call(btn.querySelectorAll('.kc-cg-ink > *'));
   lens = ink.map(function (el) { var L = 0; try { L = el.getTotalLength(); } catch (e) {} return Math.ceil(L || 300) + 1; });
   ink.forEach(function (el, i) { el.style.strokeDasharray = lens[i]; el.style.strokeDashoffset = lens[i]; });
   lastP = -1;
 }
 // Each line takes its turn: the outer ring first, then the petals clockwise, then the inner ring and star
 function draw(p) {
   if (p === lastP) return;
   lastP = p;
   var k = p * ink.length;
   for (var i = 0; i < ink.length; i++) {
     var f = Math.min(1, Math.max(0, k - i));
     ink[i].style.strokeDashoffset = (lens[i] * (1 - f)).toFixed(1);
   }
   btn.classList.toggle('kc-done', p >= 1);
 }
 // Square normally scrolls the page itself; fall back to an inner scrolling box if it doesn't
 function findScroller() {
   var se = D.scrollingElement || R;
   inner = null;
   if (se.scrollHeight - window.innerHeight > 40) return;
   var c = D.querySelectorAll('body, body > *, body > * > *, main');
   for (var i = 0; i < c.length; i++) {
     var s = getComputedStyle(c[i]);
     if (/auto|scroll/.test(s.overflowY) && c[i].scrollHeight - c[i].clientHeight > 40 && c[i].clientHeight >= window.innerHeight * 0.7) { inner = c[i]; return; }
   }
 }
 function where() {
   var top, max, se = D.scrollingElement || R;
   if (inner) { top = inner.scrollTop; max = inner.scrollHeight - inner.clientHeight; }
   else { top = window.pageYOffset || se.scrollTop; max = se.scrollHeight - window.innerHeight; }
   return { top: top, p: max > 40 ? Math.min(1, Math.max(0, top / max) / 0.985) : -1 };
 }
 function update() {
   ticking = false;
   if (!D.contains(btn)) return;
   var w = where();
   var on = w.p >= 0 && w.top > 140 && !D.querySelector('.kc-veil');
   if (on !== btn.classList.contains('kc-on')) {
     btn.classList.toggle('kc-on', on);
     btn.setAttribute('aria-hidden', on ? 'false' : 'true');
     btn.tabIndex = on ? 0 : -1;
   }
   draw(w.p < 0 ? 0 : w.p);
 }
 function queue() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
 function mount() {
   if (!D.body) return;
   if (!D.contains(btn)) { D.body.appendChild(btn); measure(); }
   findScroller();
   queue();
 }
 btn.addEventListener('click', function () {
   var to = { top: 0, behavior: still ? 'auto' : 'smooth' };
   if (inner) inner.scrollTo(to); else window.scrollTo(to);
   if (D.activeElement === btn) btn.blur();
 });
 D.addEventListener('scroll', queue, { capture: true, passive: true });
 window.addEventListener('resize', function () { findScroller(); queue(); }, { passive: true });
 var prev = window.KCFOJ_wow;
 window.KCFOJ_wow = function () {
   if (prev) prev();
   try { mount(); } catch (e) { if (window.console) console.warn('KCFOJ compass:', e); }
 };
 if (D.readyState !== 'loading') mount(); else D.addEventListener('DOMContentLoaded', mount);
})();
/* ===== Part 6 (add-on): event date seals =====
  An illuminated date seal on the corner of each event photo: weekday,
  a large crimson day number and the month in small capitals, framed in
  gold. Paste at the very end of the file, after Part 5. */
(function () {
 var D = document;
 var HIDE_PILL = true; // false keeps Square's own date pill under the photo as well
 var css = `
.kc-seal{position:absolute;z-index:2;display:flex;flex-direction:column;align-items:center;min-width:62px;padding:7px 9px 8px;background:var(--kc-cream);border:1px solid var(--kc-gold);box-shadow:inset 0 0 0 3px var(--kc-cream),inset 0 0 0 4px rgba(168,132,79,.55),0 12px 26px -12px rgba(20,12,10,.6);color:var(--kc-ink);text-align:center;pointer-events:none;transform-origin:50% 60%;transition:transform .5s var(--kc-e)}
.kc-seal-wd{font:600 9px/1 'Libre Franklin',system-ui,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:var(--kc-gold);margin:1px 0 4px .24em}
.kc-seal-day{font:400 34px/.95 'Playfair Display',Georgia,serif;font-variant-numeric:lining-nums;color:var(--kc-accent)}
.kc-seal-mo{font:500 11px/1 'Playfair Display',Georgia,serif;letter-spacing:.2em;text-transform:uppercase;margin-top:5px;padding:5px 0 0 .2em;border-top:1px solid rgba(168,132,79,.6)}
@media (max-width:600px){.kc-seal{min-width:56px;padding:6px 8px 7px}.kc-seal-day{font-size:30px}}
@media (hover:hover){.kc-card:hover .kc-seal{transform:rotate(-3deg) scale(1.03)}}
.kc-still .kc-seal{transition:none}
.kc-still .kc-card:hover .kc-seal{transform:none}
.kc-seal-src{position:absolute!important;width:1px!important;height:1px!important;margin:-1px!important;padding:0!important;border:0!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;clip-path:inset(50%)!important;white-space:nowrap!important}
`;
 var tag = D.createElement('style');
 tag.textContent = css;
 (D.head || D.documentElement).appendChild(tag);
 var MO = { jan: 'Jan', feb: 'Feb', mar: 'Mar', apr: 'Apr', may: 'May', jun: 'June', jul: 'July', aug: 'Aug', sep: 'Sept', oct: 'Oct', nov: 'Nov', dec: 'Dec' };
 var WD = '(mon|tue|wed|thu|fri|sat|sun)[a-z]*\\.?,?\\s+', MN = '(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\\.?';
 var A = new RegExp('^(?:' + WD + ')?' + MN + '\\s+(\\d{1,2})(?:st|nd|rd|th)?\\b', 'i');   // "FRI, SEP 25"
 var B = new RegExp('^(?:' + WD + ')?(\\d{1,2})(?:st|nd|rd|th)?\\s+' + MN, 'i');           // "Fri 25 Sep"
 // Returns the date parts, plus whether the text is only a date (safe to hide)
 function parse(t) {
   t = t.replace(/\s+/g, ' ').trim();
   var m = t.match(A), p = null;
   if (m) p = { wd: m[1], mo: m[2], d: m[3] };
   else if ((m = t.match(B))) p = { wd: m[1], d: m[2], mo: m[3] };
   if (!p || +p.d < 1 || +p.d > 31) return null;
   p.only = /^[\s,.]*(\d{4})?[\s,.]*$/.test(t.slice(m[0].length));
   return p;
 }
 function photoIn(card) {
   var cw = card.getBoundingClientRect().width, all = card.querySelectorAll('*');
   for (var i = 0; i < all.length; i++) {
     var el = all[i], r = el.getBoundingClientRect();
     if (r.width < cw * 0.6 || r.height < 100) continue;
     if (/^(IMG|PICTURE|VIDEO)$/.test(el.tagName) || getComputedStyle(el).backgroundImage.indexOf('url(') > -1) return el;
   }
   return null;
 }
 // Sits 14px in from the photo's top-left corner, wherever the photo is inside its box
 function place(s) {
   var k = s._kc, a = k.anchor.getBoundingClientRect(), r = k.photo.getBoundingClientRect();
   s.style.top = Math.round(r.top - a.top - k.anchor.clientTop + 14) + 'px';
   s.style.left = Math.round(r.left - a.left - k.anchor.clientLeft + 14) + 'px';
 }
 function seals() {
   [].forEach.call(D.querySelectorAll('.kc-card'), function (card) {
     var s = card.querySelector('.kc-seal');
     if (s && s._kc) { place(s); return; }
     if (card.dataset.kcSeal && !s) delete card.dataset.kcSeal;
     if (card.dataset.kcSeal) return;
     var photo = photoIn(card);
     if (!photo) return;
     var leaves = card.querySelectorAll('*'), src = null, p = null;
     for (var i = 0; i < leaves.length && !p; i++) {
       if (leaves[i].childElementCount === 0 && (p = parse(leaves[i].textContent))) src = leaves[i];
     }
     if (!p) return;
     card.dataset.kcSeal = '1';
     var anchor = /^(IMG|PICTURE|VIDEO)$/.test(photo.tagName) ? photo.parentElement : photo;
     if (getComputedStyle(anchor).position === 'static') anchor.style.position = 'relative';
     s = D.createElement('div');
     s.className = 'kc-seal';
     s.setAttribute('aria-hidden', 'true');
     s.innerHTML = (p.wd ? '<span class="kc-seal-wd"></span>' : '') + '<span class="kc-seal-day"></span><span class="kc-seal-mo"></span>';
     if (p.wd) s.querySelector('.kc-seal-wd').textContent = p.wd.slice(0, 3);
     s.querySelector('.kc-seal-day').textContent = String(+p.d);
     s.querySelector('.kc-seal-mo').textContent = MO[p.mo.slice(0, 3).toLowerCase()];
     s._kc = { anchor: anchor, photo: photo };
     anchor.appendChild(s);
     place(s);
     // The pill's text stays readable to screen readers; only its look is folded into the seal
     if (HIDE_PILL && p.only) (src.closest('.kc-pill') || src).classList.add('kc-seal-src');
   });
 }
 var prev = window.KCFOJ_wow;
 window.KCFOJ_wow = function () {
   if (prev) prev();
   try { seals(); } catch (e) { if (window.console) console.warn('KCFOJ seals:', e); }
 };
})();
/* ===== Part 7 (add-on): manuscript layouts for the About page =====
  Styles three patterns you type in Square as ordinary text:
  1. Epigraph: a short quote (a quote block, or a paragraph in quotation
     marks followed by a short name line like "C. G. Jung").
  2. Timeline: paragraphs or list items that start with a year and a
     separator, like "1988: First gathering", under a heading containing
     Began, History, Decades, Years, Timeline or Milestones.
  3. Vocabulary: lines like "Shadow: the parts of ourselves we do not see",
     under a heading containing Vocabulary, Lexicon or Glossary.
  Paste at the very end of the file, after Part 6. */
(function () {
 var D = document;
 var css = `
.kc-epigraph{max-width:30em!important;margin:0 auto 1.2em!important;padding:0!important;border:0!important;background:none!important;box-shadow:none!important;text-align:center!important;font:italic 400 clamp(20px,2.4vw,26px)/1.45 'Playfair Display',Georgia,serif!important;color:var(--kc-ink)!important;text-wrap:balance}
.kc-epigraph *{font:inherit!important;text-align:inherit!important;color:inherit!important;margin:0!important}
.kc-epigraph::before{content:"\\2726";display:block;margin:0 auto .55em;font:normal 12px/1 Georgia,serif;color:var(--kc-gold)}
.kc-epigraph-by{text-align:center!important;margin:0 auto 2.4em!important;font:500 11px/1.4 'Libre Franklin',system-ui,sans-serif!important;letter-spacing:.3em!important;text-transform:uppercase;color:var(--kc-accent)!important}
.kc-tl-list{list-style:none!important;padding-left:0!important;margin-left:0!important}
.kc-tl{position:relative;list-style:none!important;min-height:2.6em;margin:0!important;padding:.55em 0 .55em 104px!important;text-align:left!important}
.kc-tl::before{content:"";position:absolute;left:86px;top:0;bottom:0;width:1px;background:rgba(168,132,79,.55)}
.kc-tl::after{content:"";position:absolute;left:82px;top:1.05em;width:9px;height:9px;background:var(--kc-accent);transform:rotate(45deg);box-shadow:0 0 0 3px var(--kc-cream)}
.kc-tl-year{position:absolute;left:0;top:.45em;width:70px;text-align:right;font:400 1.3em/1.25 'Playfair Display',Georgia,serif;font-variant-numeric:lining-nums tabular-nums;color:var(--kc-accent)}
.kc-lex{position:relative;min-height:2.9em;margin:0!important;padding:.8em 0 .8em 172px!important;border-bottom:1px solid rgba(168,132,79,.35);text-align:left!important}
.kc-lex-term{position:absolute;left:0;top:.62em;width:152px;font:italic 400 1.15em/1.3 'Playfair Display',Georgia,serif;color:var(--kc-accent)}
@media (max-width:600px){.kc-tl{padding-left:80px!important}.kc-tl::before{left:64px}.kc-tl::after{left:60px}.kc-tl-year{width:52px;font-size:1.1em}.kc-lex{padding-left:0!important}.kc-lex-term{position:static;display:block;width:auto;margin-bottom:.2em}}
`;
 var tag = D.createElement('style');
 tag.textContent = css;
 (D.head || D.documentElement).appendChild(tag);
 var YEAR = /^((?:1[89]|20)\d0s|(?:1[89]|20)\d\d)\s*[\u00B7\u2022:|\-\u2013\u2014]\s*(?=\S)/;
 var TERM = /^([A-Z][A-Za-z'\-]*(?:\s+[A-Za-z'\-]+){0,3})\s*(?::|\s[\-\u2013\u2014])\s+(?=\S)/;
 var QUOTED = /^["\u201C\u2018'][\s\S]{8,}["\u201D\u2019']$/;
 function skip(el) { return !!el.closest('header, footer, nav, form, .kc-card, .kc-shadow, .kc-band, .kc-lb, .kc-veil, .kc-seal'); }
 // Removes the first n characters of an element's text, across any bold or italic wrappers
 function peel(el, n) {
   var w = D.createTreeWalker(el, NodeFilter.SHOW_TEXT), t;
   while (n > 0 && (t = w.nextNode())) {
     var len = t.nodeValue.length;
     if (len <= n) { n -= len; t.nodeValue = ''; } else { t.nodeValue = t.nodeValue.slice(n); n = 0; }
   }
 }
 // Moves a matched label (year or term) into its own span at the start of the line
 function label(el, re, cls) {
   var raw = el.textContent, lead = raw.match(/^\s*/)[0].length, m = raw.slice(lead).match(re);
   if (!m) return false;
   peel(el, lead + m[0].length);
   var s = D.createElement('span');
   s.className = cls;
   s.textContent = m[1];
   el.insertBefore(s, el.firstChild);
   return true;
 }
 function about() {
   var els = [].filter.call(D.querySelectorAll('h1, h2, h3, h4, p, li, blockquote'), function (el) { return !skip(el) && el.textContent.trim(); });
   var mode = null;
   els.forEach(function (el, i) {
     if (el.closest('.kc-epigraph') && !el.classList.contains('kc-epigraph')) return;
     var t = el.textContent.trim(), k = el.dataset.kcAbout;
     // Square sometimes redraws text; if our label went missing, set the line up again
     if (k === 'tl' && !el.querySelector('.kc-tl-year')) k = el.dataset.kcAbout = '';
     if (k === 'lex' && !el.querySelector('.kc-lex-term')) k = el.dataset.kcAbout = '';
     if (/^H[1-4]$/.test(el.tagName)) {
       mode = /vocabulary|lexicon|glossary/i.test(t) ? 'lex' : /began|history|decades|years|timeline|milestones/i.test(t) ? 'tl' : null;
       return;
     }
     if (k) return;
     if (mode === 'tl' && label(el, YEAR, 'kc-tl-year')) {
       el.dataset.kcAbout = 'tl';
       el.classList.add('kc-tl');
       if (el.tagName === 'LI' && el.parentElement) el.parentElement.classList.add('kc-tl-list');
       return;
     }
     if (mode === 'lex' && t.length > 12 && label(el, TERM, 'kc-lex-term')) {
       el.dataset.kcAbout = 'lex';
       el.dataset.kcInitial = 'skip';          // keeps Part 4 from giving a definition an initial
       el.classList.remove('kc-initial');
       el.classList.add('kc-lex');
       return;
     }
     var next = null;
     for (var j = i + 1; j < els.length && !next; j++) if (!el.contains(els[j])) next = els[j];
     var byLine = next && !/^H[1-4]$/.test(next.tagName) && !next.dataset.kcAbout && next.textContent.trim().length <= 48;
     if (t.length <= 220 && (el.tagName === 'BLOCKQUOTE' || (QUOTED.test(t) && byLine))) {
       el.dataset.kcAbout = 'epi';
       el.classList.add('kc-epigraph');
       if (byLine) { next.dataset.kcAbout = 'by'; next.classList.add('kc-epigraph-by'); }
     }
   });
 }
 var prev = window.KCFOJ_wow;
 window.KCFOJ_wow = function () {
   // Runs before the other parts so definitions are marked before Part 4 looks for initials
   try { about(); } catch (e) { if (window.console) console.warn('KCFOJ about:', e); }
   if (prev) prev();
 };
})();
/* ===== Part 8 (add-on): Shadow quote rotation =====
  A first visit keeps the Shadow section's original quote. Each later visit
  shows the next quote in the list, and it stays the same for that whole
  visit. Edit QUOTES to change the set; the first entry is the default.
  Paste at the very end of the file, after Part 7. */
(function () {
 var D = document;
 var QUOTES = [
   'Who looks outside, dreams; who looks inside, awakes.',                                             // Letter to Fanny Bowditch, 22 October 1916 (Letters, vol. 1)
   'One does not become enlightened by imagining figures of light, but by making the darkness conscious.', // "The Philosophical Tree," Alchemical Studies, CW 13, para. 335
   'Knowing your own darkness is the best method for dealing with the darknesses of other people.',       // Letter to Kendig B. Cully, 25 September 1937 (Letters, vol. 1)
   'When an inner situation is not made conscious, it happens outside, as fate.',                         // Aion, CW 9ii, para. 126
   'Everything that irritates us about others can lead us to an understanding of ourselves.'              // Memories, Dreams, Reflections
 ];
 var css = `
.kc-shadow-q.kc-q-long{font-size:clamp(28px,4.8vw,60px)!important;max-width:19ch!important}
`;
 var tag = D.createElement('style');
 tag.textContent = css;
 (D.head || D.documentElement).appendChild(tag);
 // One quote per visit: the first visit gets the default, later visits step through the list
 var idx = null;
 function pick() {
   try {
     var now = sessionStorage.getItem('kcQuoteNow');
     if (now !== null && QUOTES[+now]) return +now;
     var visits = +(localStorage.getItem('kcQuoteVisits') || 0);
     var i = visits % QUOTES.length;
     localStorage.setItem('kcQuoteVisits', String(visits + 1));
     sessionStorage.setItem('kcQuoteNow', String(i));
     return i;
   } catch (e) { return 0; }
 }
 function rotate() {
   var q = D.querySelector('.kc-shadow-q');
   if (!q || q.dataset.kcQuote) return;
   if (idx === null) idx = pick();
   q.dataset.kcQuote = String(idx);
   if (idx === 0) return; // the original quote stays exactly as it is
   for (var n = q.firstChild; n; n = n.nextSibling) {
     if (n.nodeType === 3) {
       n.nodeValue = QUOTES[idx];
       q.classList.toggle('kc-q-long', QUOTES[idx].length > 70);
       return;
     }
   }
 }
 var prev = window.KCFOJ_wow;
 window.KCFOJ_wow = function () {
   if (prev) prev();
   try { rotate(); } catch (e) { if (window.console) console.warn('KCFOJ quotes:', e); }
 };
})();

/* ===== Part 9 (add-on): tappable word band =====
   Tap or click a word in the drifting band under the banner to open a short
   definition card. The band pauses while you hover it or read a card.
   Edit DEFS to change the wording. Paste at the very end, after Part 8. */
(function () {
  var D = document;
  var DEFS = {
    'dreams': 'For Jung, a spontaneous self-portrait of the psyche\u2019s actual situation, told in symbols. Dreams often show what the waking mind overlooks.',
    'shadow': 'The parts of ourselves we do not see or would rather not own. Left unacknowledged, they tend to meet us in other people.',
    'archetypes': 'Inborn patterns of experience, such as the mother, the hero or the wise old man, that take shape in images across cultures and centuries.',
    'individuation': 'The lifelong process of becoming the whole person one is, by bringing what was unconscious into awareness.',
    'the self': 'The center and the whole of the psyche, often pictured as a mandala.',
    'symbol': 'For Jung, the best possible expression of something not yet fully known. A sign points to what we already know; a symbol points beyond it.',
    'anima': 'Jung\u2019s name for the feminine inner figure in a man\u2019s psyche, a bridge between consciousness and the unconscious. Its counterpart in a woman is the animus.',
    'myth': 'The shared stories in which the archetypes speak. Jung saw myth and dream as two voices of the same deep layer of the psyche.'
  };
  var css = `
.kc-band span{cursor:pointer;transition:color .3s ease}
.kc-band .kc-w{font:inherit!important;color:inherit!important;text-decoration:underline dotted rgba(168,132,79,.55);text-decoration-thickness:1px;text-underline-offset:.2em}
.kc-band:hover .kc-band-track,.kc-band.kc-held .kc-band-track{animation-play-state:paused}
.kc-band span.kc-on,.kc-band span:hover{color:var(--kc-accent)}
.kc-band span.kc-on .kc-w,.kc-band span:hover .kc-w{text-decoration-style:solid}
.kc-def{position:fixed;z-index:2147483200;width:min(320px,calc(100vw - 32px));padding:16px 18px 18px;background:var(--kc-cream);border:1px solid var(--kc-gold);box-shadow:inset 0 0 0 3px var(--kc-cream),inset 0 0 0 4px rgba(168,132,79,.45),0 18px 40px -18px rgba(20,12,10,.6);color:var(--kc-ink);opacity:0;transform:translateY(6px);transition:opacity .25s ease,transform .35s var(--kc-e);pointer-events:none}
.kc-def.kc-show{opacity:1;transform:none;pointer-events:auto}
.kc-def-term{display:block;margin-bottom:6px;font:italic 400 22px/1.2 'Playfair Display',Georgia,serif;color:var(--kc-accent)}
.kc-def-term::after{content:"";display:block;width:44px;height:1px;margin-top:8px;background:var(--kc-gold)}
.kc-def-text{display:block;font:400 15px/1.6 'Libre Franklin',system-ui,sans-serif}
.kc-still .kc-def{transition:none;transform:none}
`;
  var tag = D.createElement('style');
  tag.textContent = css;
  (D.head || D.documentElement).appendChild(tag);

  var card = null, from = null, y0 = 0;
  function close() {
    if (!card) return;
    card.classList.remove('kc-show');
    if (from) { from.classList.remove('kc-on'); var b = from.closest('.kc-band'); if (b) b.classList.remove('kc-held'); }
    from = null;
  }
  function word(span) {
    var w = span.querySelector('.kc-w');
    if (w) return w.textContent.trim();
    var t = '';
    for (var n = span.firstChild; n; n = n.nextSibling) if (n.nodeType === 3) t += n.nodeValue;
    return t.trim();
  }
  // Wraps each word in its own element so the underline skips the gold stars between words
  function mark() {
    [].forEach.call(D.querySelectorAll('.kc-band span'), function (s) {
      if (s.querySelector('.kc-w')) return;
      for (var n = s.firstChild; n; n = n.nextSibling) {
        if (n.nodeType === 3 && n.nodeValue.trim()) {
          var w = D.createElement('b');
          w.className = 'kc-w';
          s.insertBefore(w, n);
          w.appendChild(n);
          return;
        }
      }
    });
  }
  function open(span) {
    var w = word(span), def = DEFS[w.toLowerCase()];
    if (!def) return;
    if (!card) {
      card = D.createElement('div');
      card.className = 'kc-def';
      card.setAttribute('role', 'note');
      card.innerHTML = '<span class="kc-def-term"></span><span class="kc-def-text"></span>';
      D.body.appendChild(card);
    }
    close();
    from = span;
    y0 = window.pageYOffset;
    span.classList.add('kc-on');
    span.closest('.kc-band').classList.add('kc-held');
    card.querySelector('.kc-def-term').textContent = w;
    card.querySelector('.kc-def-text').textContent = def;
    // Above the word when there is room, otherwise below it; always inside the screen
    var r = span.getBoundingClientRect(), cw = card.offsetWidth, ch = card.offsetHeight, vw = D.documentElement.clientWidth;
    var left = Math.max(16, Math.min(vw - cw - 16, r.left + r.width / 2 - cw / 2));
    var top = r.top - ch - 12 >= 12 ? r.top - ch - 12 : r.bottom + 12;
    card.style.left = Math.round(left) + 'px';
    card.style.top = Math.round(top) + 'px';
    requestAnimationFrame(function () { card.classList.add('kc-show'); });
  }

  D.addEventListener('click', function (e) {
    var span = e.target.closest && e.target.closest('.kc-band span');
    if (span) { if (span === from) close(); else open(span); return; }
    if (card && !card.contains(e.target)) close();
  });
  D.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  window.addEventListener('scroll', function () {
    if (from && Math.abs(window.pageYOffset - y0) > 40) close();
  }, { passive: true });
  window.addEventListener('resize', close, { passive: true });

  var prev = window.KCFOJ_wow;
  window.KCFOJ_wow = function () {
    if (prev) prev();
    try { mark(); } catch (e) { if (window.console) console.warn('KCFOJ band words:', e); }
  };
})();

/* ===== Part 10 (add-on): "Tonight" ribbon on the date seals =====
   On the day of an event its date seal gets a crimson-and-gold ribbon
   across its lower edge:
   "Tonight" for events at 4 PM or later, "Today" for earlier ones. The day
   before, it reads "Tomorrow". Needs Part 6. Paste at the very end, after Part 9. */
(function () {
  var D = document;
  var css = `
.kc-seal-flag{position:absolute;left:50%;bottom:-15px;transform:translateX(-50%);padding:3px 8px 3px calc(8px + .22em);white-space:nowrap;background:var(--kc-accent);border:1px solid var(--kc-gold);color:var(--kc-cream);font:600 8.5px/1.25 'Libre Franklin',system-ui,sans-serif;letter-spacing:.22em;text-transform:uppercase;box-shadow:0 4px 10px -4px rgba(20,12,10,.5)}
.kc-seal-flag.kc-now{animation:kcFlag 2.8s ease-in-out infinite}
@keyframes kcFlag{0%,100%{box-shadow:0 4px 10px -4px rgba(20,12,10,.5),0 0 0 0 rgba(168,132,79,0)}50%{box-shadow:0 4px 10px -4px rgba(20,12,10,.5),0 0 0 4px rgba(168,132,79,.3)}}
.kc-still .kc-seal-flag.kc-now{animation:none}
`;
  var tag = D.createElement('style');
  tag.textContent = css;
  (D.head || D.documentElement).appendChild(tag);

  var MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  var DAY = 864e5;
  // Days from today to the event (the seal shows no year, so the nearest matching date is used)
  function daysUntil(m, d) {
    var now = new Date(), today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var ev = new Date(now.getFullYear(), m, d);
    if (ev - today < -180 * DAY) ev.setFullYear(ev.getFullYear() + 1);
    else if (ev - today > 180 * DAY) ev.setFullYear(ev.getFullYear() - 1);
    return Math.round((ev - today) / DAY);
  }
  function flags() {
    [].forEach.call(D.querySelectorAll('.kc-seal'), function (s) {
      if (s.dataset.kcFlag) return;
      s.dataset.kcFlag = '1';
      var dEl = s.querySelector('.kc-seal-day'), mEl = s.querySelector('.kc-seal-mo');
      if (!dEl || !mEl) return;
      var m = MONTHS.indexOf(mEl.textContent.trim().slice(0, 3).toLowerCase()), d = +dEl.textContent;
      if (m < 0 || !d) return;
      var left = daysUntil(m, d), label = '';
      if (left === 1) label = 'Tomorrow';
      else if (left === 0) {
        // The event time, read from the card's own text pieces, like "7:00 PM"
        var card = s.closest('.kc-card'), h = -1, bits = card ? card.querySelectorAll('*') : [];
        for (var i = 0; i < bits.length && h < 0; i++) {
          var t = bits[i].childElementCount ? null : bits[i].textContent.match(/\b(\d{1,2})(?::\d{2})?\s*([AaPp])\.?\s?[Mm]\b/);
          if (t) h = (+t[1] % 12) + (/p/i.test(t[2]) ? 12 : 0);
        }
        label = h >= 16 ? 'Tonight' : 'Today';
      }
      if (!label) return;
      var f = D.createElement('span');
      f.className = 'kc-seal-flag' + (left === 0 ? ' kc-now' : '');
      f.textContent = label;
      s.appendChild(f);
    });
  }

  var prev = window.KCFOJ_wow;
  window.KCFOJ_wow = function () {
    if (prev) prev();
    try { flags(); } catch (e) { if (window.console) console.warn('KCFOJ ribbon:', e); }
  };
})();


/* ===== Part 11 (add-on): Red Book plates as a manuscript spread (v2) =====
   Turns the grid of Red Book plates into a swipeable spread of folio pages
   that tilt gently as they pass the center, with folio numerals beneath.
   Tapping a plate still opens it full screen. Fitted to Square's image
   gallery (grid > image-cell > wrappers > img). If the result ever measures
   wrong, it puts the grid back by itself. Paste at the very end, after Part 10. */
(function () {
  var D = document;
  var still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var css = `
.kc-folio{--kc-page:min(64vw,300px);display:flex!important;flex-wrap:nowrap!important;align-items:flex-start!important;gap:clamp(18px,3vw,34px)!important;overflow-x:auto!important;overflow-y:hidden!important;scroll-snap-type:x mandatory;scroll-behavior:smooth;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:18px calc(50% - var(--kc-page) / 2) 26px!important;margin-left:0!important;margin-right:0!important;max-width:none!important;height:auto!important;perspective:1400px;-webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}
.kc-folio::-webkit-scrollbar{display:none}
.kc-folio:focus-visible{outline:2px solid var(--kc-accent);outline-offset:4px}
.kc-folio-flat{display:contents!important}
.kc-folio-skip{display:none!important}
.kc-folio-page{flex:0 0 var(--kc-page)!important;width:var(--kc-page)!important;max-width:none!important;min-width:0!important;height:auto!important;margin:0!important;position:relative!important;inset:auto!important;scroll-snap-align:center;transform-origin:50% 50%}
.kc-folio-leaf{overflow:visible!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important}
.kc-folio-top{flex:0 0 auto!important;width:100%!important;max-width:none!important;min-width:0!important;height:calc(var(--kc-page) * var(--kc-ratio,1.31))!important;max-height:none!important;min-height:0!important;margin:0!important;position:relative!important}
.kc-folio-fill{flex:1 1 auto!important;width:100%!important;max-width:none!important;min-width:0!important;height:100%!important;max-height:none!important;min-height:0!important;margin:0!important}
.kc-folio-abs{position:absolute!important;inset:0!important}
.kc-folio-img{width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:contain!important;object-position:50% 50%!important}
.kc-folio-no{display:block;margin-top:14px;text-align:center;font:italic 400 14px/1 'Playfair Display',Georgia,serif;letter-spacing:.08em;color:var(--kc-gold);pointer-events:none}
.kc-folio-btn{position:absolute;z-index:3;display:grid;place-items:center;width:44px;height:44px;padding:0;border:1px solid var(--kc-gold);border-radius:50%;background:var(--kc-cream);color:var(--kc-accent);font:400 26px/1 Georgia,serif;cursor:pointer;box-shadow:0 8px 20px -10px rgba(20,12,10,.5);transition:opacity .3s ease}
.kc-folio-btn[disabled]{opacity:0;pointer-events:none}
@media (min-width:900px){.kc-folio{--kc-page:min(24vw,300px)}}
@media (max-width:899px){.kc-folio-btn{display:none}}
.kc-still .kc-folio{scroll-behavior:auto}
.kc-still .kc-folio-btn{transition:none}
`;
  var tag = D.createElement('style');
  tag.textContent = css;
  (D.head || D.documentElement).appendChild(tag);

  var ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi'];
  function holds(el, tiles) { return tiles.filter(function (t) { return el.contains(t); }).length; }

  // Pages lean away and shrink slightly as they move off center, like leaves of a book
  function tilt(box) {
    if (still) return;
    var br = box.getBoundingClientRect(), cx = br.left + br.width / 2;
    [].forEach.call(box.querySelectorAll('.kc-folio-page'), function (p) {
      var r = p.getBoundingClientRect(), k = Math.max(-1, Math.min(1, (r.left + r.width / 2 - cx) / br.width * 2.2));
      // A page that is itself the plate keeps Part 3's hover tilt, so it only fades
      if (p.classList.contains('kc-folio-leaf')) p.style.transform = 'rotateY(' + (-k * 16).toFixed(2) + 'deg) scale(' + (1 - Math.abs(k) * 0.08).toFixed(3) + ')';
      p.style.opacity = (1 - Math.abs(k) * 0.25).toFixed(3);
    });
  }
  function step(box) {
    var ps = box.querySelectorAll('.kc-folio-page');
    return ps.length > 1 ? ps[1].getBoundingClientRect().left - ps[0].getBoundingClientRect().left : box.clientWidth * 0.8;
  }
  function arrows(box) {
    var host = box.parentElement;
    if (!host) return;
    if (!box._kcBtns || !host.contains(box._kcBtns[0])) {
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      box._kcBtns = ['\u2039', '\u203A'].map(function (ch, i) {
        var b = D.createElement('button');
        b.type = 'button';
        b.className = 'kc-folio-btn';
        b.textContent = ch;
        b.setAttribute('aria-label', i ? 'Next plate' : 'Previous plate');
        b.addEventListener('click', function () { box.scrollBy({ left: (i ? 1 : -1) * step(box), behavior: still ? 'auto' : 'smooth' }); });
        host.appendChild(b);
        return b;
      });
    }
    var hr = host.getBoundingClientRect(), br = box.getBoundingClientRect(), top = Math.round(br.top - hr.top + br.height / 2 - 30);
    box._kcBtns[0].style.top = box._kcBtns[1].style.top = top + 'px';
    box._kcBtns[0].style.left = Math.round(br.left - hr.left + 10) + 'px';
    box._kcBtns[1].style.left = Math.round(br.right - hr.left - 54) + 'px';
    box._kcBtns[0].disabled = box.scrollLeft < 4;
    box._kcBtns[1].disabled = box.scrollLeft > box.scrollWidth - box.clientWidth - 4;
  }
  function refresh(box) { tilt(box); arrows(box); }

  function undo(box) {
    box.dataset.kcFolioOff = '1';
    ['kc-folio', 'kc-folio-flat', 'kc-folio-skip', 'kc-folio-page', 'kc-folio-leaf', 'kc-folio-top', 'kc-folio-fill', 'kc-folio-abs', 'kc-folio-img'].forEach(function (c) {
      [].forEach.call(D.querySelectorAll('.' + c), function (el) { el.classList.remove(c); el.style.transform = ''; el.style.opacity = ''; });
    });
    [].forEach.call(D.querySelectorAll('.kc-folio-no, .kc-folio-btn'), function (el) { el.parentNode.removeChild(el); });
    box.removeAttribute('tabindex');
    box.removeAttribute('aria-label');
    box.style.removeProperty('--kc-ratio');
    if (window.console) console.warn('KCFOJ folio: plates measured wrong, grid restored');
  }
  function folio() {
    var box = D.querySelector('.kc-folio');
    if (box) { refresh(box); return; }
    var tiles = [].filter.call(D.querySelectorAll('.kc-tile'), function (t) { return !t.closest('.kc-lb, .kc-card, header, footer, nav'); });
    if (tiles.length < 4) return;
    box = tiles[0].parentElement;
    while (box && box !== D.body && holds(box, tiles) < tiles.length) box = box.parentElement;
    if (!box || box === D.body || box.dataset.kcFolioOff) return;
    // Every child of the gallery must hold exactly one plate; rows of plates are flattened
    var pages = [], flats = [], skips = [], ok = true;
    [].forEach.call(box.children, function (c) {
      var n = holds(c, tiles);
      if (n === 0) { if (c.textContent.trim()) ok = false; else skips.push(c); return; }
      if (n === 1) { pages.push(c); return; }
      flats.push(c);
      [].forEach.call(c.children, function (g) {
        var m = holds(g, tiles);
        if (m === 1) pages.push(g); else if (m > 1 || g.textContent.trim()) ok = false; else skips.push(g);
      });
    });
    if (!ok || pages.length !== tiles.length || pages.some(function (p) { return /^(IMG|PICTURE|VIDEO)$/.test(p.tagName); })) return;
    // Plate shape from the first picture (Red Book plates are tall pages)
    var im0 = tiles[0].tagName === 'IMG' ? tiles[0] : tiles[0].querySelector('img'), ratio = 1.31;
    if (im0 && im0.naturalWidth && im0.naturalHeight) ratio = Math.max(0.6, Math.min(2, im0.naturalHeight / im0.naturalWidth));
    box.style.setProperty('--kc-ratio', ratio.toFixed(3));
    box.classList.add('kc-folio');
    box.setAttribute('tabindex', '0');
    box.setAttribute('aria-label', 'Red Book plates, scroll sideways');
    flats.forEach(function (f) { f.classList.add('kc-folio-flat'); });
    skips.forEach(function (s) { s.classList.add('kc-folio-skip'); });
    pages.forEach(function (p, i) {
      p.classList.add('kc-folio-page');
      if (p.classList.contains('kc-tile')) return; // the plate itself: nothing can hang below it
      p.classList.add('kc-folio-leaf');
      // Make every wrapper between the page and its plate fill the page, so Square's fixed sizes let go
      var t = tiles.filter(function (x) { return p.contains(x); })[0], chain = [];
      for (var n = t.parentElement; n && n !== p; n = n.parentElement) chain.push(n);
      var top = chain.length ? chain[chain.length - 1] : t;
      chain.forEach(function (c) {
        c.classList.add(c === top ? 'kc-folio-top' : 'kc-folio-fill');
        if (c !== top && getComputedStyle(c).position === 'absolute') c.classList.add('kc-folio-abs');
      });
      if (t === top) t.classList.add('kc-folio-top');
      var img = t.tagName === 'IMG' ? t : t.querySelector('img');
      if (t !== top && t !== img) t.classList.add('kc-folio-fill');
      if (img) img.classList.add('kc-folio-img');
      var no = D.createElement('span');
      no.className = 'kc-folio-no';
      no.setAttribute('aria-hidden', 'true');
      no.textContent = 'fol. ' + (ROMAN[i] || i + 1);
      p.appendChild(no);
    });
    // On wide screens, open on the second plate so the spread has a page on each side
    if (pages.length > 2 && window.matchMedia && window.matchMedia('(min-width: 900px)').matches) {
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = step(box);
      box.style.scrollBehavior = '';
    }
    // Self-check: every plate must fill at least half its page, or everything is undone
    var bad = tiles.some(function (x) {
      var pg = x.closest('.kc-folio-page'), a = x.getBoundingClientRect().width, b = pg ? pg.getBoundingClientRect().width : 0;
      return !b || a < b * 0.5;
    });
    if (bad) { undo(box); return; }
    var ticking = false;
    box.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; refresh(box); });
    }, { passive: true });
    requestAnimationFrame(function () { refresh(box); });
  }

  var prev = window.KCFOJ_wow;
  window.KCFOJ_wow = function () {
    if (prev) prev();
    try { folio(); } catch (e) { if (window.console) console.warn('KCFOJ folio:', e); }
  };
})();
