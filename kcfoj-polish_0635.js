/* KC Friends of Jung: premium polish + the "oh wow" layer (v2).
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
input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=button]),textarea,select{border-color:rgba(31,42,46,.28)!important;color:var(--kc-ink)!important;transition:border-color .25s,box-shadow .25s!important}
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
    }, Math.max(150, 800 - (Date.now() - last)));
  }
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('load', schedule, true);
  window.addEventListener('resize', schedule);
  schedule();
})();

/* ===== Part 3: the "oh wow" layer =====
   Arrival veil, breathing hero, scroll reveals, word band,
   Red Book viewer, Shadow section and paper grain.
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
:root{--kc-gold:#A8844F;--kc-night:#0E1517;--kc-deep:#2A6476;--kc-paper:#F5F0E7;--kc-e:cubic-bezier(.2,.7,.2,1)}
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
.kc-hero-wrap{overflow:hidden!important}
.kc-hero-pre{filter:blur(18px) saturate(.5);transform:scale(1.14);opacity:.35}
.kc-hero{transform-origin:50% 60%;animation:kcSurface 2.8s var(--kc-e) both,kcBreathe 22s 2.8s ease-in-out infinite alternate}
.kc-hero-soft{animation:kcSurfaceSoft 2.4s var(--kc-e) both}
@keyframes kcSurface{from{filter:blur(18px) saturate(.5);transform:scale(1.14);opacity:.35}to{filter:blur(0) saturate(1);transform:scale(1);opacity:1}}
@keyframes kcSurfaceSoft{from{filter:blur(18px);opacity:.35}to{filter:blur(0);opacity:1}}
@keyframes kcBreathe{from{transform:scale(1)}to{transform:scale(1.07)}}
.kc-aurora{position:absolute;inset:-25%;z-index:1;pointer-events:none;mix-blend-mode:soft-light;opacity:.7;background:radial-gradient(38% 46% at 22% 32%,rgba(235,163,113,.95),transparent 70%),radial-gradient(42% 52% at 78% 68%,rgba(0,102,120,.85),transparent 70%),radial-gradient(30% 40% at 58% 18%,rgba(255,244,226,.9),transparent 70%);animation:kcDrift 24s ease-in-out infinite alternate}
@keyframes kcDrift{from{transform:translate(-5%,-3%) rotate(0deg)}to{transform:translate(6%,5%) rotate(10deg)}}

/* 3. Scroll reveals and the word band */
.kc-rv.kc-rv,.kc-rv-h.kc-rv-h{transition:opacity 1.2s var(--kc-e),transform 1.2s var(--kc-e),filter 1.4s var(--kc-e)!important}
.kc-rv{opacity:0;transform:translateY(28px)}
.kc-rv-h{opacity:0;filter:blur(10px);transform:translateY(.4em)}
.kc-rv.kc-in{opacity:1;transform:none}
.kc-rv-h.kc-in{opacity:1;filter:blur(0);transform:none}
.kc-band{position:relative;overflow:hidden;border-block:1px solid rgba(42,100,118,.18);padding-block:clamp(14px,2.2vw,22px)}
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
.kc-shadow{position:relative;overflow:hidden;background:var(--kc-night);min-height:clamp(420px,72vh,680px);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:clamp(72px,11vw,140px) 24px;--x:50%;--y:50%;--kc-r:220px}
.kc-shadow::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle calc(var(--kc-r) * 1.7) at var(--x) var(--y),rgba(255,214,160,.17),rgba(255,214,160,.05) 45%,transparent 72%)}
.kc-shadow-q{position:relative;margin:0;max-width:15ch;text-align:center;font:italic 400 clamp(34px,6.4vw,78px)/1.12 'Playfair Display',Georgia,serif;letter-spacing:-.01em;text-wrap:balance;color:transparent;background:radial-gradient(circle var(--kc-r) at var(--qx,50%) var(--qy,50%),#F8F1E4 0%,rgba(248,241,228,.6) 38%,rgba(248,241,228,.07) 72%);-webkit-background-clip:text;background-clip:text}
.kc-shadow-by{display:block;margin-top:1.2em;font:500 11px/1.4 'Libre Franklin',system-ui,sans-serif;font-style:normal;letter-spacing:.36em;text-transform:uppercase}
.kc-shadow-hint{position:absolute;left:0;right:0;bottom:24px;padding:0 16px;text-align:center;font:500 10px/1.4 system-ui,sans-serif;letter-spacing:.34em;text-transform:uppercase;color:rgba(246,240,230,.32);transition:opacity .8s}
.kc-shadow.kc-used .kc-shadow-hint{opacity:0}
.kc-lantern{position:absolute;left:var(--x);top:var(--y);width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;background:#FFE2B3;box-shadow:0 0 18px 6px rgba(255,205,140,.45);pointer-events:none;opacity:0;transition:opacity .4s}
@media (hover:hover) and (pointer:fine){.kc-shadow{cursor:none}.kc-shadow:hover .kc-lantern{opacity:1}}
.kc-lit .kc-shadow-q{color:#F8F1E4;background:none}

/* 6. Paper grain */
.kc-grain{position:fixed;inset:0;z-index:2147483000;pointer-events:none;opacity:.06;background:url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .18 0 0 0 0 .13 0 0 0 0 .08 0 0 0 1.6 -.55'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>") repeat;background-size:180px}

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
    setTimeout(lift, 2400);
  }

  // 2. Hero: surfaces from a blur, then slowly breathes under a drifting aurora
  var heroEl = null, heroSoft = false;
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
    if (heroEl) return;
    var vw = window.innerWidth, all = D.body.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.closest('header, nav, .kc-veil, .kc-header, .kc-lb')) continue;
      var r = rect(el);
      if (r.width < vw * 0.9 || r.height < 160 || r.top + window.scrollY > 700) continue;
      if (!/^(IMG|PICTURE|VIDEO)$/.test(el.tagName) && getComputedStyle(el).backgroundImage.indexOf('url(') < 0) continue;
      var wrap = el.parentElement;
      heroSoft = !wrap || rect(wrap).height > r.height * 1.6;
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
  var bandEl = null;
  function band() {
    if (!heroEl || (bandEl && D.contains(bandEl))) return;
    var sec = sectionOf(heroEl);
    if (!sec) return;
    var w = KC.words.map(function (x) { return '<span>' + x + '<i>✦</i></span>'; }).join('');
    bandEl = mk('div', 'kc-band', '<div class="kc-band-track">' + w + w + w + w + '</div>');
    bandEl.setAttribute('aria-hidden', 'true');
    sec.parentElement.insertBefore(bandEl, sec.nextSibling);
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
    var x = 0.3, y = 0.5, tx = 0.3, ty = 0.5, inside = false, live = false, raf = 0;
    function tick(t) {
      var r = rect(sec), rq = rect(q), vh = window.innerHeight;
      if (!inside) {
        var p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        tx = 0.14 + 0.72 * p + 0.05 * Math.sin(t / 1300);
        ty = 0.5 + 0.16 * Math.sin(p * Math.PI * 2 + t / 2100);
      }
      var k = inside ? 0.2 : 0.07;
      x += (tx - x) * k; y += (ty - y) * k;
      var px = x * r.width, py = y * r.height;
      sec.style.setProperty('--kc-r', Math.round(Math.max(140, Math.min(260, window.innerWidth * 0.22))) + 'px');
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
    shadowEl.querySelector('.kc-shadow-hint').textContent = fine ? 'Move your light through the dark' : 'Scroll to carry the light';
    anchor.parentElement.insertBefore(shadowEl, anchor);
    lantern(shadowEl);
  }

  // 6. Paper grain
  function grain() { if (!D.querySelector('.kc-grain')) D.body.appendChild(mk('div', 'kc-grain')); }

  showVeil(false);
  window.KCFOJ_wow = function () {
    if (!D.body) return;
    [grain, hero, band, shadow, gallery, reveal].forEach(function (f) {
      try { f(); } catch (e) { if (window.console) console.warn('KCFOJ wow:', e); }
    });
  };
  window.KCFOJ = { replayIntro: function () { window.scrollTo(0, 0); showVeil(true); surface(); } };
})();
