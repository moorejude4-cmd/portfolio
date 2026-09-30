/* KC Friends of Jung: "The Commonplace Book" layer (v3.2.2, stabilization)
   Loaded on every page from Square's Tracking tools, after a small boot block
   (see the Header code snippet that ships with this file). Changes go live once
   GitHub Pages redeploys; no Square republish needed.

   The idea: a living Jungian commonplace book with the visual soul of the
   Red Book. The Commonplace Book is the architecture (vellum, type, rubrics,
   the margin); the Red Book is the visual DNA (initials, mandalas, plates,
   leather); the v2.6 layer is the atmosphere (the arrival, the breathing
   banner, the drifting words, the candle in the dark).

   How it stays steady on Square (new in 3.1.1): the boot block in Header code
   paints the page vellum and holds it until this script has finished styling
   Square's page. Every mark this script puts on Square's own elements lives in
   data-kc attributes, which Square's re-renders leave alone; anything Square
   adds or restyles is repainted before the browser draws the next frame, with
   Square's own color transitions held off for that instant; and a plate
   gallery is only ever seen in its final state.

   Part 0   Words and switches you can edit, plus shared helpers
   Part 1   Type, color and paper, plus pinch zoom on phones
   Part 2   Paints Square's page before each frame; one observer, incremental
   Part 3   The book layer: arrival veil, banner, word band and index line, reveals,
            card and plate tilt, plate viewer, night page
   Part 4   Illuminated initials, chapter numerals, rubric ornaments
   Part 5   Back to top: a mandala drawn inside an ink ring as you read
   Part 6   Event date seals
   Part 7   Manuscript layouts for About (epigraph, timeline, vocabulary)
   Part 8   Night page quote rotation
   Part 9   The Living Margin: glosses on Jung's terms
   Part 10  Today / Tonight / Tomorrow ribbon on the date seals
   Part 11  Plates as a manuscript spread
   Part 12  Colophon, Open at random, and the snail

   Troubleshooting, in the browser console:
     KCFOJ.stats()         how often the page was repainted and re-checked, and how long it took
     KCFOJ_margin()        where each margin note went and why
     KCFOJ.replayIntro()   plays the arrival veil and banner again
   Add #kcdebug to a page address to see how the band under the banner was placed. */
window.KCFOJ_SKIP = !!window.KCFOJ_RUNNING;
window.KCFOJ_RUNNING = true;


/* ===== Part 0: words and switches you can edit ===== */
window.KCFOJ_WORDS = {
  // Switches: true turns a feature on, false turns it off. Everything is on by default.
  features: {
    arrivalVeil: true,       // the opening screen with the drawn mandala, once per visit
    heroBreathing: true,     // the homepage banner surfaces from a blur, then slowly breathes
    heroAtmosphere: true,    // warm light drifting over the banner, with a soft vignette
    heroTone: true,          // warms the banner photo toward the paper
    wordBand: true,          // the drifting band of Jung's words under the banner
    indexLine: true,         // the still index line under it, with Begin Here
    inkReveal: true,         // headings ink in, blocks rise softly as you scroll
    revealParagraphs: true,  // paragraphs rise too, not only headings, cards and plates
    cardTilt: true,          // cards and plates tilt a little under the mouse, like card stock
    folioViewer: true,       // plate galleries become a swipeable spread of folios
    plateViewer: true,       // tapping a plate opens it full screen, as an open book
    nightPage: true,         // the dark night page with a Jung quote, before Contact on the homepage
    shadowLight: true,       // the candle on the night page (false: the quote is simply lit)
    livingMargin: true,      // glosses on Jung's terms, in the margin or on tap
    chapterNumerals: true,   // I, II, III above section headings
    rubricOrnaments: true,   // gold rules and a red star under section headings
    initials: true,          // illuminated first letters
    manicules: true,         // pointing hands on the main button, Begin Here and Open at random
    mandalaNav: true,        // back to top: a mandala drawn inside the ink ring (false: plain ink ring)
    footerMandala: true,     // the footer's mandala, faint under the vellum and leather edge
    dateSeals: true,         // date seals on event photos
    tonightRibbon: true,     // Today / Tonight / Tomorrow on the seals, only when the year is certain
    quoteRotation: true,     // a different night-page quote on later visits
    colophon: true,          // the strip under the footer, with Open at random
    drollerie: true          // the snail in the colophon
  },
  corners: 2,                              // button and card corners in px (v2.6 used 8)
  name: 'Kansas City Friends of Jung',
  since: 'the late 1980s',                 // colophon. STILL A PLACEHOLDER: confirm the founding year, then put it here (e.g. '1988')
  begin: { lead: 'New to Jung, or to us?', link: 'Begin here', url: '/about' }, // point url at a Begin Here page once it exists
  lexiconUrl: '',                          // e.g. '/lexicon' once that page exists; notes then link to it
  randomPages: /^\/s\/stories\/[^\/]+$/,   // which pages "Open the book at random" may choose (stories only)
  index: ['Dreams', 'Shadow', 'Archetypes', 'Individuation', 'The Self', 'Symbol', 'Anima', 'Myth'], // index line and word band
  glossMax: 8,                             // the most terms glossed on one page
  quote: 'Who looks outside, dreams; who looks inside, awakes.',
  by: 'C. G. Jung',

  /* The Living Margin (Part 9). Each entry: the word as shown, the pattern
     that finds it in body text, a plain-language gloss, and pages on this
     site where it came up ("at": [title, address]). Longer phrases come
     first so "collective unconscious" wins over "the unconscious". */
  lexicon: [
    { term: 'Collective unconscious', find: /\bcollective unconscious\b/i,
      def: 'The deepest layer of the psyche, shared by everyone and not built from personal experience. For Jung it is the home of the archetypes.' },
    { term: 'Active imagination', find: /\bactive imagination\b/i,
      def: 'Jung\u2019s method of meeting the images of the unconscious while awake: letting a figure or scene unfold, then answering it as if it were real. Much of the Red Book began this way.',
      at: [['Active Imagination: Conversation with Soul', '/product/active-imagination-conversation-with-soul/19'],
           ['Orphic Mythology, Underworld Journeys and Active Imagination', '/product/orphic-mythology-underworld-journeys-and-active-imagination/KSBPXSIMT3DB3N5SHGUTWXVY']] },
    { term: 'Transcendent function', find: /\btranscendent function\b/i,
      def: 'What can emerge when conscious and unconscious attitudes are held in tension long enough: a third thing, often a symbol, that carries a person forward.' },
    { term: 'Depth psychology', find: /\bdepth psycholog(?:y|ist|ists)\b/i,
      def: 'The family of psychologies, Freud\u2019s and Jung\u2019s among them, that treat the unconscious as a real force in human life.' },
    { term: 'Analytical psychology', find: /\banalytical psychology\b/i,
      def: 'The name Jung gave his own school, to set it apart from Freud\u2019s psychoanalysis.' },
    { term: 'The unconscious', find: /\bthe unconscious\b/i,
      def: 'Everything in the psyche that is active but outside awareness. For Jung it holds not only what we have forgotten or pushed away, but also what has not yet become conscious.',
      at: [['Working with Dreams: An Introduction to the Unconscious', '/product/working-with-dreams-an-introduction-to-the-unconscious-webinar-/GP2JAPZKKYVMDRR274QBD537']] },
    { term: 'The Red Book', find: /\b(?:Red Book|Liber Novus)\b/,
      def: 'Jung\u2019s private illuminated manuscript: the record of his confrontation with the unconscious, begun in 1913 and worked on until about 1930. It was first published in 2009.',
      at: [['Jung\u2019s Relationship to Astrology, with Becca Tarnas', '/product/jung-s-relationship-to-astrology-with-becca-tarnas-phd/XJWPVL75V3HHF3NDFAG7MOG6']] },
    { term: 'Shadow', find: /\bshadows?\b/i,
      def: 'The parts of ourselves we do not see or would rather not own, the unwelcome and the unlived alike. Left unacknowledged, they tend to meet us in other people.',
      at: [['Darkness as a Mirror: Discovering Ourselves in the Shadow', '/s/stories/darkness-as-a-mirror-discovering-ourselves-in-the-shadow']] },
    { term: 'Persona', find: /\bpersonas?\b/i,
      def: 'The face we turn toward the world: a necessary social role that becomes a trap only when we mistake it for the whole of who we are.' },
    { term: 'Anima', find: /\banima\b/i,
      def: 'In Jung\u2019s model, the feminine inner figure in a man\u2019s psyche, a bridge to the unconscious. Its counterpart is the animus; many Jungians today see both at work in everyone.' },
    { term: 'Animus', find: /\banimus\b/i,
      def: 'In Jung\u2019s model, the masculine inner figure in a woman\u2019s psyche, the counterpart of the anima. Many Jungians today see both at work in everyone.' },
    { term: 'Archetype', find: /\barchetyp(?:e|es|al)\b/i,
      def: 'An inborn pattern of experience, such as the mother, the hero or the trickster, that takes shape in images across cultures and centuries.' },
    { term: 'Individuation', find: /\bindividuat(?:ion|ing|ed|e)\b/i,
      def: 'The lifelong process of becoming the whole person one is, by bringing what was unconscious into awareness.',
      at: [['Engaging the Individuation Process in Moments of Everyday Living', '/product/engaging-the-individuation-process-in-moments-of-everyday-living-with-marty-dybicz-ph-d-/34']] },
    { term: 'The Self', find: /\b[Tt]he Self\b/,
      def: 'The center and the whole of the psyche, larger than the ego. Jung found it pictured in images of wholeness: the circle, the mandala, the divine child.' },
    { term: 'Ego', find: /\bego\b/i,
      def: 'The center of consciousness, the part of us that says \u201CI\u201D. For Jung it is only one part of a much larger psyche.' },
    { term: 'Projection', find: /\bprojections?\b/i,
      def: 'Seeing in someone else a quality that belongs, unrecognized, to ourselves. Unusual fascination or irritation is often the clue.' },
    { term: 'Synchronicity', find: /\bsynchronicit(?:y|ies)\b/i,
      def: 'Jung\u2019s word for a meaningful coincidence: events linked by meaning rather than cause. His best-known example is a scarab-like beetle that flew against his window as a patient told him her dream of a golden scarab.' },
    { term: 'Psyche', find: /\bpsyches?\b/i,
      def: 'Jung\u2019s word for the whole of inner life, conscious and unconscious together, which he treated as real in its own right.' },
    { term: 'Mandala', find: /\bmandalas?\b/i,
      def: 'A circular image arranged around a center. In 1918 and 1919 Jung sketched one nearly every morning, and came to see them as pictures of the Self.',
      at: [['Re-membering Your Soul in Times of Chaos', '/product/re-membering-your-soul-in-times-of-chaos-how-mandala-creation-and-shamanism-show-us-a-way/33']] },
    { term: 'Alchemy', find: /\balchem(?:y|ical|ist|ists)\b/i,
      def: 'The old art of turning base matter into gold. Jung read its strange images as a map of psychological transformation, and studied its texts for decades.',
      at: [['The Alchemical Heart, Part I', '/product/the-alchemical-heart-part-i-mystical-psychology-and-the-path-of-the-universal-person-with-david-odorisio-ph-d-/37'],
           ['Part II', '/product/the-alchemical-heart-part-ii-inner-alchemy-and-the-emergence-of-the-universal-person-facilitated-by-david-odorisio-ph-d-/38']] },
    { term: 'Numinous', find: /\bnumin(?:ous|osum|osity)\b/i,
      def: 'Rudolf Otto\u2019s word, taken up by Jung, for the awe-filled, uncanny feeling of meeting something greater than oneself.' },
    { term: 'Daimon', find: /\b(?:daimon|daemon)(?:s|ic)?\b/i,
      def: 'In Greek thought, a guiding spirit between the human and the divine. Jung used the word for the creative force that drives a person toward their own fate.',
      at: [['Bargaining with the Daimon in the Age of AI', '/product/bargaining-with-the-daimon-in-the-age-of-ai/BDCEI4AVW3JM2URS5MFDWV7B']] },
    { term: 'Dreams', find: /\bdreams?\b/i,
      def: 'For Jung, a spontaneous self-portrait of the psyche\u2019s actual situation, told in symbols. Dreams often show what the waking mind overlooks.',
      at: [['Working with Dreams: An Introduction to the Unconscious', '/product/working-with-dreams-an-introduction-to-the-unconscious-webinar-/GP2JAPZKKYVMDRR274QBD537']] },
    { term: 'Symbol', find: /\bsymbols?\b/i,
      def: 'For Jung, the best possible expression of something not yet fully known. A sign points to what we already know; a symbol points beyond it.' },
    { term: 'Myth', find: /\b(?:myths?|mythology|mythologies)\b/i,
      def: 'The shared stories in which the archetypes speak. Jung saw myth and dream as two voices of the same deep layer of the psyche.',
      at: [['The Warrior\u2019s Return: Jungian Psychology and the Odyssey', '/product/the-warrior-s-return-jungian-psychology-the-odyssey-as-a-roadmap-to-guide-our-veterans-home/30'],
           ['The Persephone Experience', '/s/stories/the-persephone-experience']] },
    { term: 'Enantiodromia', find: /\benantiodromia\b/i,
      def: 'Heraclitus\u2019s word, borrowed by Jung, for the way anything pushed to an extreme tends to turn into its opposite.' },
    { term: 'Puer aeternus', find: /\bpuer(?: aeternus)?\b/i,
      def: 'The eternal youth: the pattern of fresh beginnings and endless promise, and its shadow, a life that never quite lands.' },
    { term: 'Trickster', find: /\btricksters?\b/i,
      def: 'The shape-shifting, rule-breaking figure of myth and folklore, from Hermes to Coyote. Jung saw in it the disruptive energy that loosens a rigid order.' }
  ]
};

/* ----- Shared helpers (no need to edit) ----- */
(function () { if (window.KCFOJ_SKIP) return;
  var W = window.KCFOJ_WORDS || (window.KCFOJ_WORDS = {});
  var F = W.features || {};
  // Older settings keep working: indexMotion was v3.0's name for the drifting band
  if (W.indexMotion === true && F.wordBand === undefined) F.wordBand = true;
  if (W.heroTone === false) F.heroTone = false;
  window.KCFOJ_on = function (name) { return F[name] !== false; };

  // Roman numerals for chapters and folios: KCFOJ_roman(4) is "IV", KCFOJ_roman(4, true) is "iv"
  window.KCFOJ_roman = function (n, lower) {
    var v = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], s = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'], out = '';
    n = Math.max(0, Math.floor(n));
    for (var i = 0; i < v.length; i++) while (n >= v[i]) { out += s[i]; n -= v[i]; }
    return lower ? out.toLowerCase() : out;
  };
  window.KCFOJ_esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  };

  // Marks on Square's own elements are words in data attributes (data-kc="cream grain"),
  // never classes: Square rewrites class attributes when it re-renders, but leaves these alone.
  function words(el, attr) { return ' ' + (el.getAttribute(attr) || '') + ' '; }
  window.KCFOJ_has = function (el, w, attr) { return !!el && el.nodeType === 1 && words(el, attr || 'data-kc').indexOf(' ' + w + ' ') > -1; };
  window.KCFOJ_mark = function (el, w, attr) {
    attr = attr || 'data-kc';
    var v = el.getAttribute(attr) || '';
    if ((' ' + v + ' ').indexOf(' ' + w + ' ') > -1) return false;
    el.setAttribute(attr, v ? v + ' ' + w : w);
    return true;
  };
  window.KCFOJ_unmark = function (el, w, attr) {
    attr = attr || 'data-kc';
    var v = el.getAttribute(attr);
    if (v === null) return;
    var n = (' ' + v + ' ').replace(' ' + w + ' ', ' ').trim();
    if (n === v) return;
    if (n) el.setAttribute(attr, n); else el.removeAttribute(attr);
  };

  // Square elements whose inline style this script writes (tilt, folio pages and the like);
  // the observer in Part 2 ignores those style changes, so they never loop back
  var self = window.WeakSet ? new WeakSet() : { add: function () {}, has: function () { return false; } };
  window.KCFOJ_self = self;

  // Every style sheet this script adds is registered, so Part 2 can put one back at once
  // if anything ever removes it
  var sheets = window.KCFOJ_sheets = [];
  window.KCFOJ_style = function (css, id) {
    var t = document.createElement('style');
    t.setAttribute('data-kc-style', id || '');
    t.textContent = css;
    (document.head || document.documentElement).appendChild(t);
    sheets.push(t);
    return t;
  };
  // Rules made on the fly for one element's own values (a footer image, a plate ratio)
  var dyn = null, seenRule = {};
  window.KCFOJ_rule = function (sel, decl) {
    var key = sel + '{' + decl + '}';
    if (seenRule[key]) return;
    seenRule[key] = 1;
    if (!dyn) dyn = window.KCFOJ_style('', 'dyn');
    dyn.textContent += key + '\n';
  };

  // Square's cart, checkout and account pages get colors only: no reveals, glosses or tilt
  window.KCFOJ_commerce = function () {
    return /(^|\/)(cart|checkout|order|orders|account|login|sign-?in|payment)(\/|$)/i.test(location.pathname);
  };
  // Pop-ups and dialogs (Square's newsletter pop-up among them) get the page's colors and nothing
  // else: no reveals, glosses, initials or held galleries. This script never hides, delays or moves them.
  window.KCFOJ_DIALOGS = '[role="dialog"], [aria-modal="true"], dialog, [class~="popup" i], [class~="modal" i], [class^="popup-" i], [class^="modal-" i], [class*="popup__" i], [class*="modal__" i]';

  // The mandala line drawing shared by the arrival veil, the back-to-top device and
  // the night page: two outer rings, twelve petals, an inner ring, eight seeds, a star, a heart.
  window.KCFOJ_mandala = function () {
    var s = [['circle', 'r="104"'], ['circle', 'r="97"']], i;
    for (i = 0; i < 12; i++) s.push(['ellipse', 'rx="17" ry="45" cy="-52" transform="rotate(' + i * 30 + ')"']);
    s.push(['circle', 'r="46"']);
    for (i = 0; i < 8; i++) s.push(['circle', 'r="9" cy="-31" transform="rotate(' + (i * 45 + 22.5) + ')"']);
    s.push(['path', 'd="M0 -24 L7 -7 L24 0 L7 7 L0 24 L-7 7 L-24 0 L-7 -7 Z"']);
    s.push(['circle', 'r="4.5"']);
    return s;
  };

  // One listener each for scroll, resize and keys, shared by every part (scroll and
  // resize are batched to one call per frame). KCFOJ_listen('scroll', fn) adds a handler.
  var B = { scroll: [], resize: [], key: [] }, sq = false, rq = false;
  function fire(list, e) {
    for (var i = 0; i < list.length; i++) { try { list[i](e); } catch (err) { if (window.console) console.warn('KCFOJ:', err); } }
  }
  window.KCFOJ_listen = function (type, fn) { if (B[type]) B[type].push(fn); };
  document.addEventListener('scroll', function () {
    if (sq) return;
    sq = true;
    requestAnimationFrame(function () { sq = false; fire(B.scroll); });
  }, { capture: true, passive: true });
  window.addEventListener('resize', function () {
    if (rq) return;
    rq = true;
    requestAnimationFrame(function () { rq = false; fire(B.resize); });
  }, { passive: true });
  document.addEventListener('keydown', function (e) { fire(B.key, e); }, true);
  // Called after each round of heavier work (Part 2), for parts that need to know
  window.KCFOJ_after = [];
})();

/* ===== Parts 1 and 2: type, color and paper; painting Square's page =====
   Part 1 is the CSS. Part 2 finds Square's gray and white grounds, header,
   buttons, cards, plates and footer by their colors and marks them with
   data-kc words, since Square doesn't publish stable class names.

   How it keeps the page steady:
   - Colors are repainted synchronously, inside the observer, so a section,
     header or button Square has just added or restyled is already vellum and
     rubric when the browser draws it. Nothing waits on a timer. Square's own
     color transitions are held off for that instant, so nothing fades across.
     Late style sheets, Square's theme changes on <html>, blocks that grow into
     sections and elements Square animates are all caught before their frame.
   - The marks live in data-kc attributes. Square rewrites class attributes
     when it re-renders; it leaves these alone, so nothing falls back.
   - Heavier work (cards, plates, footer, and every feature in Parts 3 to 12)
     runs once per frame at most, just before the frame is drawn.
   - The observer ignores its own writes, cools off any element Square is
     animating, and never rescans the whole page for a small change. */
(function () { if (window.KCFOJ_SKIP) return;
  var W = window.KCFOJ_WORDS || {}, on = window.KCFOJ_on || function () { return true; };
  var mark = window.KCFOJ_mark, has = window.KCFOJ_has, self = window.KCFOJ_self;
  var RAD = Math.max(0, Math.min(24, +W.corners === +W.corners ? +W.corners : 2));
  var GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='g' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .32 0 0 0 0 .23 0 0 0 0 .15 .13 0 0 0 -.03'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23g)'/%3E%3C/svg%3E\")";
  var LEATHER = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='l' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.55' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .95 0 0 0 0 .84 0 0 0 0 .74 .12 0 0 0 -.04'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23l)'/%3E%3C/svg%3E\")";
  // The manicule, a printer's pointing hand
  var HAND = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 20'%3E%3Cpath d='M1 4.6H5.6V15.4H1Z M6.8 5.4C9.2 4.6 12.2 4.1 15.4 4.3L29 5.7C30.9 5.9 30.9 8.9 29 9.1L18.6 9.3C21 9.5 21.2 12.3 18.7 12.6C20.9 13 20.9 15.5 18.5 15.7C20 16.2 19.6 18.3 17.3 18.3L12 18.1C9.9 18 8.3 17.2 6.8 15.9Z'/%3E%3C/svg%3E\")";
  var RULE = 'linear-gradient(rgba(0,0,0,.24),rgba(0,0,0,.24))', BAND = 'linear-gradient(var(--kc-accent),var(--kc-accent))', WASH = 'linear-gradient(rgba(244,237,225,.88),rgba(244,237,225,.88))';
  var BTN = '[data-kc~="btn"]', OUT = '[data-kc~="outline"]';

  var css = `
:root{
  --kc-accent:#8B2A24; --kc-accent-deep:#6A1D19;
  --kc-cream:#F4EDE1; --kc-paper:#F4EDE1; --kc-card:#FBF7F0;
  --kc-ink:#1F1A17; --kc-ink-soft:#4B413B;
  --kc-verd:#4F6B5E; --kc-gold:#A8844F; --kc-night:#1B1412;
  --kc-rule:rgba(31,26,23,.14); --kc-rubric-rule:rgba(139,42,36,.22);
  --kc-serif:'Newsreader','Iowan Old Style','Palatino Linotype',Palatino,Georgia,serif;
  --kc-ui:'Libre Franklin',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
  --kc-mono:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  --kc-versal:'UnifrakturMaguntia','Newsreader',Georgia,serif;
  --kc-radius:${RAD}px; --kc-ease:cubic-bezier(.22,.61,.36,1); --kc-e:cubic-bezier(.2,.7,.2,1);
  --kc-shadow:0 1px 0 rgba(31,26,23,.05),0 16px 32px -22px rgba(31,26,23,.45);
  --kc-lift:0 1px 0 rgba(31,26,23,.05),0 26px 46px -24px rgba(31,26,23,.52);
  --kc-grain:${GRAIN}; --kc-leather:${LEATHER}; --kc-hand:${HAND};
}

/* Type: one bookish serif for reading, a quiet sans for controls */
html{scroll-behavior:smooth}
body{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;font-kerning:normal}
::selection{background:var(--kc-accent);color:#FBF7F0}
h1,h2,h3,h4,h5,h6{font-family:var(--kc-serif)!important;font-optical-sizing:auto;letter-spacing:-.012em!important;text-wrap:balance}
h1,h2{font-weight:420!important}
h3,h4,h5,h6{font-weight:500!important}
:is(h1,h2,h3,h4,h5,h6) :not(svg,svg *,[class*="icon"]){font-family:inherit!important}
p,li,blockquote,dd,dt,figcaption,td,th{font-family:var(--kc-serif)!important;font-optical-sizing:auto}
:is(p,li,blockquote,dd,dt,figcaption,td,th) :not(svg,svg *,[class*="icon"],code,kbd,pre){font-family:inherit!important}
p{line-height:1.68!important;text-wrap:pretty}
a:focus-visible,button:focus-visible,[role="button"]:focus-visible{outline:2px solid var(--kc-accent)!important;outline-offset:3px}

/* Vellum instead of gray or white, with a faint paper grain; a calm header */
[data-kc~="cream"]{background-color:var(--kc-cream)!important}
[data-kc~="grain"]{background-image:var(--kc-grain)!important;background-size:240px 240px!important;background-repeat:repeat!important}
/* Header: Red Book cover edge -> vellum page -> soft entry into hero.
   Keep the oxblood as a deliberate top edge, not a fog through the navigation. */
[data-kc~="header"],
[data-block-purpose="header"]{
  position:relative!important;
  overflow:visible!important;
  background:var(--kc-cream)!important;
  border-bottom:0!important;
  box-shadow:none!important;
}

/* A narrow leather cover edge at the very top. */
[data-block-purpose="header"]::before{
  content:"";
  position:absolute;
  z-index:50;
  pointer-events:none;
  top:0;
  left:0;
  right:0;
  height:24px;
  background-color:#741F1B;
  background-image:
    linear-gradient(to bottom,rgba(35,7,6,.26),rgba(116,31,27,.02)),
    var(--kc-leather);
  background-size:auto,260px 260px;
  background-repeat:no-repeat,repeat;
  box-shadow:
    inset 0 -1px 0 rgba(168,132,79,.34),
    0 1px 0 rgba(255,255,255,.16);
}

/* The vellum page simply dissolves into the hero at the bottom. */
[data-block-purpose="header"]::after{
  content:"";
  position:absolute;
  z-index:40;
  pointer-events:none;
  left:0;
  right:0;
  bottom:-22px;
  height:24px;
  background:linear-gradient(
    to bottom,
    rgba(244,237,225,.96) 0,
    rgba(244,237,225,.70) 32%,
    rgba(244,237,225,.24) 70%,
    rgba(244,237,225,0) 100%
  );
}

@media (max-width:760px){
  [data-block-purpose="header"]::before{
    height:22px;
  }
  [data-block-purpose="header"]::after{
    bottom:-18px;
    height:20px;
  }
}

[data-kc~="rel"]{position:relative!important}
/* Held for an instant while a color is repainted, so Square's own transitions never show a fade */
[data-kc-now],[data-kc-now="deep"] *{transition:none!important}

/* Buttons: one rubric red, set like a printed label: a fine inner rule at rest,
   and on hover the v2.6 lift and glow. The color itself never transitions, so a
   repaint can never be seen fading. */
${BTN}{background-color:var(--kc-accent)!important;border-color:var(--kc-accent)!important;color:#FBF7F0!important;border-radius:var(--kc-radius)!important;font-family:var(--kc-ui)!important;letter-spacing:.05em!important;box-shadow:inset 0 0 0 1px rgba(251,247,240,.14),0 1px 0 rgba(31,26,23,.18)!important;transition:box-shadow .3s var(--kc-ease),transform .3s var(--kc-ease)!important}
[data-kc~="join"]{border-radius:0 var(--kc-radius) var(--kc-radius) 0!important}
${OUT}{background-color:transparent!important;border-color:var(--kc-accent)!important;color:var(--kc-accent)!important;border-radius:var(--kc-radius)!important;font-family:var(--kc-ui)!important;letter-spacing:.05em!important;transition:none!important}
${BTN} *,${OUT} *{color:inherit!important;font-family:inherit!important}

/* The manicule marks the next step: the banner's button, an event's main button,
   Begin Here, Open at random. On hover it leans toward what it points at. */
.kc-hand::before,[data-kc~="hand"]::before{content:""!important;display:inline-block!important;position:static!important;inset:auto!important;transform:none!important;opacity:1!important;border:0!important;box-shadow:none!important;width:1.45em!important;height:.9em!important;margin:0 .55em 0 0!important;vertical-align:-.08em!important;background:currentColor!important;-webkit-mask:var(--kc-hand) center/contain no-repeat;mask:var(--kc-hand) center/contain no-repeat;transition:translate .35s var(--kc-e)}

/* Cards, date pills, plates (mounted inside a fine gold rule), video */
[data-kc~="card"]{border:1px solid var(--kc-rule)!important;border-radius:var(--kc-radius)!important;overflow:hidden!important;background-color:var(--kc-card)!important;box-shadow:var(--kc-shadow)!important;transition:transform .5s var(--kc-ease),box-shadow .5s var(--kc-ease)!important}
[data-kc~="pill"]{background-color:rgba(139,42,36,.08)!important;color:var(--kc-accent)!important;font-family:var(--kc-mono)!important;letter-spacing:.08em!important;border-radius:1px!important}
[data-kc~="tile"]{border-radius:var(--kc-radius)!important;box-shadow:var(--kc-shadow)!important;outline:1px solid rgba(168,132,79,.38);outline-offset:-7px;transition:transform .5s var(--kc-ease),box-shadow .5s var(--kc-ease)!important}
iframe[src*="youtube"],iframe[src*="vimeo"]{border-radius:1px!important;box-shadow:none!important}

/* Video mount: the player sits on a slightly skewed vellum leaf with four small
   manuscript corner marks. No label, caption, border or box-outline around the video. */
[data-block-purpose^="video"] .w-video{
  position:relative!important;
  isolation:isolate!important;
  overflow:visible!important;
  margin:12px 0 24px!important;
  border:0!important;
  outline:0!important;
  border-radius:1px!important;
  background:transparent!important;
  box-shadow:none!important;
  transition:transform .4s var(--kc-ease)!important;
}
[data-block-purpose^="video"] .w-video::before{
  content:""!important;
  position:absolute!important;
  inset:-10px!important;
  z-index:0!important;
  pointer-events:none!important;
  background-color:rgba(251,247,240,.72)!important;
  background-image:var(--kc-grain)!important;
  background-size:240px 240px!important;
  border-radius:2px!important;
  box-shadow:0 18px 42px -25px rgba(20,12,10,.62),0 1px 0 rgba(255,255,255,.55)!important;
  transform:rotate(-.18deg)!important;
  transform-origin:50% 50%!important;
  transition:transform .45s var(--kc-ease),box-shadow .45s var(--kc-ease)!important;
}
[data-block-purpose^="video"] .w-video::after{
  content:""!important;
  position:absolute!important;
  inset:-14px!important;
  z-index:2!important;
  pointer-events:none!important;
  background:
    linear-gradient(var(--kc-gold),var(--kc-gold)) left top/28px 1px no-repeat,
    linear-gradient(var(--kc-gold),var(--kc-gold)) left top/1px 28px no-repeat,
    linear-gradient(var(--kc-gold),var(--kc-gold)) right top/28px 1px no-repeat,
    linear-gradient(var(--kc-gold),var(--kc-gold)) right top/1px 28px no-repeat,
    linear-gradient(var(--kc-accent),var(--kc-accent)) left bottom/22px 1px no-repeat,
    linear-gradient(var(--kc-accent),var(--kc-accent)) left bottom/1px 22px no-repeat,
    linear-gradient(var(--kc-accent),var(--kc-accent)) right bottom/22px 1px no-repeat,
    linear-gradient(var(--kc-accent),var(--kc-accent)) right bottom/1px 22px no-repeat!important;
  opacity:.72!important;
}
[data-block-purpose^="video"] .w-video iframe{
  z-index:1!important;
  border:0!important;
  outline:0!important;
  border-radius:1px!important;
  box-shadow:0 1px 0 rgba(31,26,23,.08)!important;
}
.kc-video-rubric{display:none!important}
@media (hover:hover) and (pointer:fine){
  [data-block-purpose^="video"] .w-video:hover{
    transform:translateY(-1px)!important;
  }
  [data-block-purpose^="video"] .w-video:hover::before{
    transform:rotate(-.18deg) translateY(-1px)!important;
    box-shadow:0 22px 48px -24px rgba(20,12,10,.7),0 1px 0 rgba(255,255,255,.55)!important;
  }
}
@media (max-width:760px){
  [data-block-purpose^="video"] .w-video{
    margin:10px 0 20px!important;
  }
  [data-block-purpose^="video"] .w-video::before{
    inset:-7px!important;
  }
  [data-block-purpose^="video"] .w-video::after{
    inset:-10px!important;
    background:
      linear-gradient(var(--kc-gold),var(--kc-gold)) left top/20px 1px no-repeat,
      linear-gradient(var(--kc-gold),var(--kc-gold)) left top/1px 20px no-repeat,
      linear-gradient(var(--kc-gold),var(--kc-gold)) right top/20px 1px no-repeat,
      linear-gradient(var(--kc-gold),var(--kc-gold)) right top/1px 20px no-repeat,
      linear-gradient(var(--kc-accent),var(--kc-accent)) left bottom/16px 1px no-repeat,
      linear-gradient(var(--kc-accent),var(--kc-accent)) left bottom/1px 16px no-repeat,
      linear-gradient(var(--kc-accent),var(--kc-accent)) right bottom/16px 1px no-repeat,
      linear-gradient(var(--kc-accent),var(--kc-accent)) right bottom/1px 16px no-repeat!important;
  }
}
.kc-still [data-block-purpose^="video"] .w-video,
.kc-still [data-block-purpose^="video"] .w-video::before{transition:none!important}

/* A plate gallery waits out of sight (its space kept) while it becomes a folio spread.
   Part 2 lets it go after 2.6 seconds at most, shown as Square made it. Everything inside
   is hidden too, so nothing Square marks visible can show through. */
[data-kc-hold="1"],[data-kc-hold="1"] *{visibility:hidden!important}

/* Form fields (16px on phones so iOS doesn't zoom in on focus) */
input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=button]),textarea,select{border-color:rgba(31,26,23,.28)!important;color:var(--kc-ink)!important;transition:border-color .25s,box-shadow .25s!important}
input::placeholder,textarea::placeholder{color:rgba(31,26,23,.62)!important}
input:focus,textarea:focus,select:focus{outline:none!important;border-color:var(--kc-accent)!important;box-shadow:0 0 0 3px rgba(139,42,36,.16)!important}
@media (max-width:760px),(hover:none) and (pointer:coarse){input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=button]),textarea,select{font-size:max(16px,1em)!important}}

/* Nav: spaced capitals with a rubric underline that fades in on hover */
nav a:not(${BTN}):not(${OUT}){font-family:var(--kc-ui)!important;text-transform:uppercase;letter-spacing:.14em!important;font-size:.86em;text-decoration:underline!important;text-decoration-color:transparent!important;text-decoration-thickness:1px!important;text-underline-offset:.5em;transition:text-decoration-color .3s,color .3s}

/* Links inside body text */
[data-kc~="prose"] a:not(${BTN}):not(${OUT}){color:var(--kc-accent)!important;text-decoration:underline!important;text-decoration-color:rgba(139,42,36,.4)!important;text-decoration-thickness:1px!important;text-underline-offset:.2em}

/* Footer, like the back board of a bound book: a leather edge with two blind-stamped
   rules, vellum with grain, and the footer's own mandala faint beneath the vellum */
[data-kc~="footbg"],[data-kc~="footsolid"]{background-color:var(--kc-cream)!important;background-image:${RULE},${RULE},${BAND},var(--kc-grain)!important;background-size:100% 1px,100% 1px,100% 12px,240px 240px!important;background-position:0 3px,0 8px,0 0,0 0!important;background-repeat:no-repeat,no-repeat,no-repeat,repeat!important;box-shadow:none!important}
[data-kc~="footbg"][data-kc~="mandala"]{background-image:${RULE},${RULE},${BAND},var(--kc-grain),${WASH},var(--kc-mandala)!important;background-size:100% 1px,100% 1px,100% 12px,240px 240px,100% 100%,var(--kc-mandala-size,cover)!important;background-position:0 3px,0 8px,0 0,0 0,0 0,var(--kc-mandala-pos,50% 50%)!important;background-repeat:no-repeat,no-repeat,no-repeat,repeat,no-repeat,var(--kc-mandala-repeat,no-repeat)!important}
[data-kc~="footimg"]{opacity:0!important}
[data-kc~="footimg"][data-kc~="mandala"]{opacity:.1!important}
[data-kc~="footer"] :is(p,a,span,li,div,small,label,h1,h2,h3,h4,h5,h6):not(${BTN},${OUT},${BTN} *,${OUT} *){color:var(--kc-ink)!important;text-shadow:none!important}

/* Hides the payment icons in the footer. Delete this line to keep them. */
[data-kc~="hide"]{display:none!important}

/* Hover effects, mouse only so phones don't get stuck mid-hover */
@media (hover:hover){
  ${BTN}:not([disabled]):hover{background-color:var(--kc-accent-deep)!important;border-color:var(--kc-accent-deep)!important;transform:translateY(-1px);box-shadow:inset 0 0 0 1px rgba(251,247,240,.18),0 10px 22px -10px rgba(139,42,36,.6)!important}
  .kc-hand:hover::before,[data-kc~="hand"]:hover::before,a:hover>.kc-hand::before,.kc-begin:hover .kc-hand::before{translate:3px 0}
  ${OUT}:hover{background-color:var(--kc-accent)!important;color:#FBF7F0!important}
  [data-kc~="card"]:hover,[data-kc~="tile"]:hover{transform:translateY(-4px);box-shadow:var(--kc-lift)!important}
  nav a:not(${BTN}):not(${OUT}):hover{text-decoration-color:var(--kc-accent)!important}
  [data-kc~="prose"] a:not(${BTN}):not(${OUT}):hover{text-decoration-color:currentColor!important}
  [data-kc~="footer"] a:not(${BTN},${OUT}):hover,[data-kc~="footer"] a:not(${BTN},${OUT}):hover *{color:var(--kc-accent)!important}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}
@media print{.kc-compass,.kc-margin,.kc-def,.kc-band,.kc-snail,.kc-veil,.kc-atmos{display:none!important}[data-kc-hold],[data-kc-hold] *{visibility:visible!important}}
`;
  window.KCFOJ_style(css, 'core');

  // Newsreader for reading, IBM Plex Mono for dates and labels. The Header code snippet
  // already asks for them early; this only adds the link when that snippet is missing.
  function fonts() {
    var h = document.head || document.documentElement;
    if (document.getElementById('kc-fonts') || document.querySelector('link[href*="family=Newsreader"]')) return;
    ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach(function (u) {
      var p = document.createElement('link'); p.rel = 'preconnect'; p.href = u;
      if (/gstatic/.test(u)) p.crossOrigin = 'anonymous';
      h.appendChild(p);
    });
    var l = document.createElement('link');
    l.id = 'kc-fonts'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&family=IBM+Plex+Mono:wght@400;500&display=swap';
    h.appendChild(l);
  }
  // Square's page blocks pinch-to-zoom on phones (maximum-scale=1). This lets people zoom again.
  function zoomable() {
    var m = document.querySelector('meta[name="viewport"]');
    if (!m) return;
    var c = m.getAttribute('content') || '';
    var n = c.split(',').map(function (s) { return s.trim(); }).filter(function (s) { return s && !/^(maximum-scale|user-scalable)\s*=/i.test(s); }).join(', ');
    if (n !== c) m.setAttribute('content', n);
  }
  fonts();
  zoomable();

  var D = document, R = D.documentElement;
  var GRAY = '#C3C2BE', PEACH = '#EBA371', TEALS = ['#006678', '#2A6476', '#8B2A24'], PILL = '#F1F1F1';
  var now = window.performance ? function () { return performance.now(); } : function () { return Date.now(); };

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
  // White, near-white and the old cream all become vellum when they fill the page width
  function paper(c) {
    return c && c.a >= 0.9 && c.r >= 236 && c.g >= 230 && c.b >= 218 && Math.max(c.r, c.g, c.b) - Math.min(c.r, c.g, c.b) <= 20;
  }
  function st(el) { return getComputedStyle(el); }
  function rect(el) { return el.getBoundingClientRect(); }
  function text(el) { return String(el.innerText || el.value || '').trim(); }
  function within(el, sel) { try { return !!el.closest(sel); } catch (e) { return false; } }
  function framed(s) {
    return ['Top', 'Right', 'Bottom', 'Left'].every(function (d) {
      return parseFloat(s['border' + d + 'Width']) >= 0.5 && s['border' + d + 'Style'] !== 'none';
    });
  }
  // Elements this script created, and anything inside them
  var MADE = /(^|\s)kc-(band|frieze|veil|atmos|aurora|vignette|margin|note|def|lb|compass|seal|colophon|shadow|lantern|night-art|folio-no|folio-btn|gloss|key|lex-term|tl-year)(\s|$)/;
  var OURS = '.kc-band, .kc-veil, .kc-atmos, .kc-margin, .kc-def, .kc-lb, .kc-compass, .kc-seal, .kc-colophon, .kc-shadow, .kc-folio-btn, .kc-folio-no, .kc-gloss, #kc-diag';
  function made(n) {
    if (!n || n.nodeType !== 1) return false;
    return MADE.test(n.getAttribute('class') || '') || /^kc-/.test(n.id || '');
  }
  function inOurs(el) { try { return !!el.closest(OURS); } catch (e) { return false; } }
  var PAINTED = /(^| )(cream|header|btn|outline)( |$)/;
  function painted(el) { var v = el.getAttribute('data-kc'); return !!v && PAINTED.test(v); }

  var stats = window.KCFOJ_stats = {
    runs: 0, repaints: 0, observerCalls: 0, records: 0, styleChanges: 0, fullSweeps: 0, heavyPasses: 0,
    paintMs: 0, paintMaxMs: 0, heavyMs: 0, heavyMaxMs: 0, hot: 0, holds: 0, leftAsGrid: 0, sheetsPutBack: 0, lastMs: 0
  };

  // ----- Immediate paint: colors only, read everything first, then write -----
  // While Square's own transition is carrying a background somewhere, judge where it is going
  function bgGoal(el, s) {
    var v = s.backgroundColor;
    if (!el.getAnimations || !/[1-9]/.test(s.transitionDuration || '')) return v;
    try {
      var an = el.getAnimations();
      for (var i = 0; i < an.length; i++) {
        if (an[i].transitionProperty !== 'background-color') continue;
        var k = an[i].effect.getKeyframes(), last = k[k.length - 1];
        if (last && last.backgroundColor) v = last.backgroundColor;
      }
    } catch (e) {}
    return v;
  }
  // Does Square animate this element's colors? Then a repaint holds its transitions off for an instant
  function fades(s) {
    var p = String(s.transitionProperty || '').split(','), d = String(s.transitionDuration || '').split(',');
    for (var i = 0; i < p.length; i++) {
      if ((parseFloat(d[i % d.length]) || 0) > 0 && /^\s*(all|background|border|color|box-shadow|outline)/.test(p[i])) return true;
    }
    return false;
  }
  // A full-width white block too short to count as a section yet is watched, and painted the
  // moment it grows (before that frame is drawn), whatever made it grow
  var thinRO = window.ResizeObserver ? new ResizeObserver(function (ents) {
    var l = [];
    for (var i = 0; i < ents.length; i++) {
      var t = ents[i].target;
      if (!t.isConnected || painted(t)) { thinRO.unobserve(t); t._kcThin = 0; continue; }
      l.push(t);
    }
    if (l.length) paint(l);
  }) : null;
  function thinWatch(el) { if (thinRO && !el._kcThin) { el._kcThin = 1; thinRO.observe(el); } }
  function judgeColor(el, vw, sy) {
    if (painted(el) || made(el) || el.namespaceURI === 'http://www.w3.org/2000/svg' || /^(SCRIPT|STYLE|LINK|META|HEAD|TITLE|NOSCRIPT|TEMPLATE|BR)$/.test(el.tagName)) return null;
    var s = st(el), c = rgb(bgGoal(el, s));
    if (!c || c.a < 0.9) return null;
    var grain = s.backgroundImage === 'none';
    if (near(c, GRAY, 6)) return inOurs(el) ? null : (grain ? 'cream grain' : 'cream');
    if (near(c, PEACH, 8)) {
      var r = rect(el);
      if ((r.top + sy < 220 || /fixed|sticky/.test(s.position)) && r.width > vw * 0.9) return grain ? 'header grain' : 'header';
      return null;
    }
    if (paper(c)) {
      if (el === R || el === D.body) return grain ? 'cream grain' : 'cream';
      if (within(el, 'footer, form, a, button, [data-kc~="card"], [data-kc-zone], ' + OURS)) return null;
      var r2 = rect(el);
      if (r2.width >= vw - 4 && r2.height < 100) thinWatch(el);
      return r2.width >= vw - 4 && r2.height >= 100 ? (grain ? 'cream grain' : 'cream') : null;
    }
    if (TEALS.some(function (t) { return near(c, t, 10); }) && (within(el, 'a, button, [role="button"]') || el.matches('input[type="submit"]'))) {
      var r3 = rect(el);
      if (r3.width >= 60 && r3.height < 120 && text(el).length > 2) {
        return parseFloat(s.borderTopLeftRadius) === 0 && parseFloat(s.borderTopRightRadius) > 0 ? 'btn join' : 'btn';
      }
    }
    return null;
  }
  // Outlined buttons (like the one in the header), judged after the filled ones are marked
  function judgeOutline(el) {
    if (painted(el) || !el.matches('a, button, [role="button"]') || el.classList.contains('kc-gloss') || inOurs(el) || el.querySelector(BTN)) return null;
    var s = st(el), c = rgb(s.backgroundColor), bc = rgb(s.borderTopColor);
    if ((!c || c.a === 0 || (c.r > 200 && c.g > 200 && c.b > 200)) && framed(s) && bc && bc.a > 0 && text(el).length > 2 && rect(el).width >= 60) return 'outline';
    return null;
  }
  // Color marks go on with transitions held off for that instant, then the colors are applied
  // at once and the hold is let go: the change is never animated from Square's color to ours
  var nowList = [];
  // deep: the mark recolors text inside the element too (buttons, the footer, links in body text)
  function markNow(el, w, hold, deep) {
    if (has(el, w)) return;
    if (deep) hold = true;
    else if (hold === undefined) hold = fades(st(el));
    if (hold && el.getAttribute('data-kc-now') !== 'deep') {
      if (!el.hasAttribute('data-kc-now')) nowList.push(el);
      el.setAttribute('data-kc-now', deep ? 'deep' : '');
    }
    mark(el, w);
  }
  window.KCFOJ_markNow = function (el, w, deep) { markNow(el, w, undefined, deep); };
  window.KCFOJ_settle = function () { settle(); };
  function settle() {
    if (!nowList.length) return;
    var i, l = nowList;
    nowList = [];
    for (i = 0; i < l.length; i++) void getComputedStyle(l[i]).backgroundColor;
    for (i = 0; i < l.length; i++) l[i].removeAttribute('data-kc-now');
  }
  // plan: element, words, whether Square animates its colors (read before any writing)
  function apply(plan) {
    for (var i = 0; i < plan.length; i += 3) plan[i + 1].split(' ').forEach(function (w) { markNow(plan[i], w, plan[i + 2], w === 'btn' || w === 'outline'); });
  }
  function paint(list) {
    try { return paintNow(list); } finally { settle(); }
  }
  function paintNow(list) {
    var t0 = now(), vw = R.clientWidth || window.innerWidth, sy = window.pageYOffset, plan = [], i, el, w;
    for (i = 0; i < list.length; i++) {
      el = list[i];
      if (el.nodeType !== 1 || !el.isConnected) continue;
      if ((w = judgeColor(el, vw, sy))) plan.push(el, w, fades(st(el)));
    }
    apply(plan);
    var n = plan.length / 3;
    plan = [];
    for (i = 0; i < list.length; i++) {
      el = list[i];
      if (el.nodeType !== 1 || !el.isConnected || !el.matches) continue;
      if ((w = judgeOutline(el))) plan.push(el, w, fades(st(el)));
    }
    apply(plan);
    n += plan.length / 3;
    settle();
    var ms = now() - t0;
    stats.repaints += n; stats.paintMs += ms; if (ms > stats.paintMaxMs) stats.paintMaxMs = Math.round(ms * 10) / 10;
    return n;
  }
  function everything() { return D.querySelectorAll('html, body, body *'); }
  function expand(roots) {
    var set = new Set(), i, j;
    for (i = 0; i < roots.length; i++) {
      var r = roots[i];
      if (!r || r.nodeType !== 1 || !r.isConnected || set.has(r)) continue;
      set.add(r);
      var all = r.getElementsByTagName('*');
      for (j = 0; j < all.length; j++) set.add(all[j]);
    }
    return Array.from(set);
  }

  // ----- Plate galleries are held out of sight the moment they appear (see Part 11) -----
  function imgsIn(el) { return el.tagName === 'IMG' ? 1 : el.getElementsByTagName('img').length; }
  // A plate carries at most one short caption. A picture with a heading, a form field, a text
  // button or link, a link into the shop or events, a time or a price, or more than one piece
  // of text is a card (an event, a product, a person), not a plate.
  var SHOP = 'a[href*="/product/"], a[href*="/shop/"], a[href*="/events"], a[href*="/cart"]';
  var INLINE = /^(EM|I|B|STRONG|SPAN|A|SMALL|SUP|SUB|ABBR|CITE|MARK|Q|TIME|U|S|CODE|BR|FONT)$/;   // formatting inside one caption
  function plateLike(c) {
    var txt = c.textContent.trim();
    if (txt.length > 80 || c.querySelector('h1, h2, h3, h4, h5, h6, input, select, textarea')) return false;
    if (c.matches(SHOP) || c.querySelector(SHOP) || within(c, SHOP)) return false;
    if (/\d{1,2}:\d{2}|\d\s?[ap]\.?m\b|[$\u00a3\u20ac]\s?\d/i.test(txt)) return false;
    var acts = c.querySelectorAll('a, button, [role="button"]'), i;
    for (i = 0; i < acts.length; i++) if (!acts[i].getElementsByTagName('img').length && acts[i].textContent.trim()) return false;
    if (txt) {
      var holders = [], all = [c].concat([].slice.call(c.getElementsByTagName('*')));
      for (i = 0; i < all.length; i++) {
        for (var n = all[i].firstChild; n; n = n.nextSibling) {
          if (n.nodeType !== 3 || !n.nodeValue.trim()) continue;
          var h = all[i];
          while (h !== c && INLINE.test(h.tagName)) h = h.parentElement;
          if (holders.indexOf(h) < 0) holders.push(h);
          break;
        }
        if (holders.length > 1) return false;
      }
    }
    return true;
  }
  // Only a grid: a slider or carousel is left alone. Its slides are not drawn at all, or sit
  // beside the screen on a track, or are stacked on top of one another to fade.
  function drawn(c) { return c.getClientRects().length > 0; }
  function sliderLike(els) {
    var vw = window.innerWidth, rs = els.map(rect);
    for (var i = 0; i < rs.length; i++) {
      var a = rs[i], b = rs[i - 1];
      if (a.right <= 0 || a.left >= vw) return true;
      if (b && a.height > 20 && b.height > 20) {
        var ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (ox > 0 && oy > 0 && ox * oy > 0.5 * Math.min(a.width * a.height, b.width * b.height)) return true;
      }
    }
    return false;
  }
  // True when every child holds exactly one plate (rows of plates are looked into once)
  function galleryShape(box, n) {
    var pages = [], kids = box.children, i, j;
    for (i = 0; i < kids.length; i++) {
      var c = kids[i], k = imgsIn(c);
      if (c.tagName === 'IMG') return false;
      if (k === 0) { if (c.textContent.trim()) return false; continue; }
      if (k === 1) { if (!plateLike(c) || !drawn(c)) return false; pages.push(c); continue; }
      for (j = 0; j < c.children.length; j++) {
        var g = c.children[j], kg = imgsIn(g);
        if (kg === 1 && g.tagName !== 'IMG') { if (!plateLike(g) || !drawn(g)) return false; pages.push(g); }
        else if (kg > 1 || (kg === 0 && g.textContent.trim()) || g.tagName === 'IMG') return false;
      }
    }
    return pages.length === n && !sliderLike(pages);
  }
  // A held gallery has 2.6 seconds to become a spread once it is near the screen. One further
  // down the page waits out of sight until the reader comes within half a screen of it.
  // Past that it is shown as Square made it, and stays that way.
  function letGo(box) {
    if (box.getAttribute('data-kc-hold') !== '1') return;
    if (!box.closest('[data-block-purpose^="gallery"]')) box.setAttribute('data-kc-folio-off', '1');
    box.setAttribute('data-kc-hold', 'done');
    stats.leftAsGrid++;
  }
  function startClock(box) {
    if (box._kcClock) return;
    box._kcClock = now();
    setTimeout(function () { letGo(box); }, 2600);
  }
  var nearIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (ents) {
    for (var i = 0; i < ents.length; i++) {
      if (!ents[i].isIntersecting) continue;
      nearIO.unobserve(ents[i].target);
      startClock(ents[i].target);
    }
  }, { rootMargin: '50% 0px 50% 0px' }) : null;
  // Part 11 also calls this for any held gallery it finds, so a copy Square made of one is let go too
  function watchHold(box) {
    if (box._kcHeld) return;
    box._kcHeld = true;
    if (nearIO) nearIO.observe(box); else startClock(box);
  }
  window.KCFOJ_watchHold = watchHold;
  // Is the boot block's vellum still over the page?
  function coverUp() {
    if (!R.classList.contains('kc-cover') || R.classList.contains('kc-uncover')) return false;
    try { var c = getComputedStyle(R, '::after'); return c.content !== 'none' && c.visibility !== 'hidden' && +c.opacity > 0.5; } catch (e) { return false; }
  }
  function onScreen(el) { var r = rect(el); return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight; }
  // first: the first look, when Square may already have drawn the page
  function holdGalleries(roots, first) {
    if (!on('folioViewer') || window.KCFOJ_commerce()) return;
    var seen = new Set();
    for (var i = 0; i < roots.length; i++) {
      var root = roots[i];
      if (!root || root.nodeType !== 1 || !root.isConnected) continue;
      var imgs = root.tagName === 'IMG' ? [root] : root.getElementsByTagName('img');
      for (var j = 0; j < imgs.length; j++) {
        var img = imgs[j];
        if (within(img, 'header, footer, nav, [data-kc~="card"], [data-kc-hold], [data-kc-folio-off], [data-kc-f], ' + OURS + ', ' + window.KCFOJ_DIALOGS)) continue;
        for (var a = img.parentElement, up = 0; a && a !== D.body && up < 7; a = a.parentElement, up++) {
          if (seen.has(a)) break;
          seen.add(a);
          var n = a.getElementsByTagName('img').length;
          if (n < 4) continue;
          if (galleryShape(a, n)) {
            // A gallery the visitor may already be looking at is never hidden or changed: it stays
            // Square's grid (this happens only when this script arrives after the page is shown)
            var old = first || !roots.some(function (r) { return r === a || (r.contains && r.contains(a)); });
            if (old && onScreen(a) && !coverUp() && !a.closest('[data-block-purpose^="gallery"]')) {
              a.setAttribute('data-kc-folio-off', '1');
              a.setAttribute('data-kc-hold', 'done');
              stats.leftAsGrid++;
            } else {
              a.setAttribute('data-kc-hold', '1');
              stats.holds++;
              watchHold(a);
            }
          }
          break;
        }
      }
    }
  }

  // ----- Heavier work, at most once per frame, just before the frame is drawn -----
  var heavyDirty = [], fullHeavy = true, lastPath = null, zone = null, foot = null, hq = 0, lastW = window.innerWidth;
  function findFooter(vw) {
    var fs = D.querySelectorAll('footer'), i, n, hit = null;
    for (i = fs.length - 1; i >= 0; i--) if (rect(fs[i]).width >= vw * 0.9) return fs[i];
    var w = D.createTreeWalker(D.body, NodeFilter.SHOW_TEXT);
    while ((n = w.nextNode())) {
      var pe = n.parentElement;
      if (pe && !/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(pe.tagName) && !pe.closest('.kc-colophon') && n.nodeValue.indexOf('\u00A9') > -1) hit = pe;
    }
    for (var el = hit; el && el !== D.body; el = el.parentElement) {
      var r = rect(el);
      if (r.width >= vw * 0.9 && r.height >= 250) return el;
    }
    return null;
  }
  // The footer's own background picture, kept faint beneath our paper
  var mandalaN = 0;
  function keepMandala(el, s) {
    if (!on('footerMandala')) return;
    var u = (s.backgroundImage.match(/url\((?:[^()]|\([^)]*\))*\)/) || [])[0];
    if (!u) return;
    var first = function (v) { return String(v || '').split(',')[0].trim(); };
    var id = el.getAttribute('data-kc-m') || String(++mandalaN);
    el.setAttribute('data-kc-m', id);
    window.KCFOJ_rule('[data-kc-m="' + id + '"]', '--kc-mandala:' + u + ';--kc-mandala-size:' + (first(s.backgroundSize) || 'cover') + ';--kc-mandala-pos:' + (first(s.backgroundPosition) || '50% 50%') + ';--kc-mandala-repeat:' + (first(s.backgroundRepeat) || 'no-repeat'));
    mark(el, 'mandala');
  }
  function footer(vw, sweep) {
    var i, el, r, s;
    if (zone && !zone.isConnected) zone = null;
    if (!zone && sweep) {
      foot = findFooter(vw);
      if (foot) {
        var fr = rect(foot);
        zone = foot;
        for (var up = foot.parentElement, u = 0; up && up !== D.body && u < 3; u++, up = up.parentElement) {
          if (rect(up).height > fr.height * 1.6) break;
          zone = up;
        }
      }
    }
    if (!zone) return;
    if (zone.getAttribute('data-kc-zone') !== '1') zone.setAttribute('data-kc-zone', '1');   // Part 12 hangs the colophon after this
    if (!has(zone, 'footer') && (sweep || !zone.getAttribute('data-kc-bg'))) {
      zone.setAttribute('data-kc-bg', '1');
      var zr = rect(zone), list = [zone].concat([].slice.call(zone.querySelectorAll('*'))), bgEl = null, bgImg = null;
      for (i = 0; i < list.length && !bgEl && !bgImg; i++) {
        el = list[i]; r = rect(el);
        if (r.width < zr.width * 0.8 || r.height < zr.height * 0.5) continue;
        s = st(el);
        if (s.backgroundImage.indexOf('url(') > -1) bgEl = el;
        else if (/^(IMG|PICTURE|VIDEO)$/.test(el.tagName)) bgImg = el;
      }
      if (bgEl) { keepMandala(bgEl, st(bgEl)); markNow(bgEl, 'footbg'); }
      if (bgImg) { markNow(bgImg, 'footimg'); if (on('footerMandala')) markNow(bgImg, 'mandala'); markNow(bgImg.parentElement, 'footsolid'); }
      if (bgEl || bgImg) markNow(zone, 'footer', true, true);
    }
    if (sweep && !zone.getAttribute('data-kc-pay')) {
      var PAY = /visa|master ?card|amex|american express|discover|jcb|apple ?pay|google ?pay|cash ?app|afterpay|diners|union ?pay/i, hits = [];
      var icons = zone.querySelectorAll('img, svg');
      for (i = 0; i < icons.length; i++) {
        el = icons[i];
        var t = [el.getAttribute('alt'), el.getAttribute('aria-label'), el.getAttribute('title'), el.getAttribute('src'), el.querySelector('title') ? el.querySelector('title').textContent : ''].join(' ');
        if (PAY.test(t)) hits.push(el);
      }
      if (hits.length >= 3) {
        zone.setAttribute('data-kc-pay', '1');
        var g = hits[0].parentElement;
        while (g && !hits.every(function (h) { return g.contains(h); })) g = g.parentElement;
        if (g && g !== zone && g !== foot && rect(g).height < 160 && !g.querySelector('input, nav, h1, h2, h3, p') && g.textContent.indexOf('\u00A9') < 0) mark(g, 'hide');
        else hits.forEach(function (h) { mark(h, 'hide'); });
      }
    }
  }
  function cards(vw) {
    if (window.KCFOJ_commerce()) return;   // cart and checkout keep Square's own boxes
    var btns = D.querySelectorAll(BTN), i, s, r;
    for (i = 0; i < btns.length; i++) {
      if (btns[i].closest('[data-kc~="card"]') || inOurs(btns[i]) || within(btns[i], window.KCFOJ_DIALOGS)) continue;
      for (var p = btns[i].parentElement, d = 0; p && p !== D.body && d < 10; d++, p = p.parentElement) {
        s = st(p);
        if (!(framed(s) || s.boxShadow !== 'none')) continue;
        r = rect(p);
        if (r.width >= vw - 8 || r.height >= 1000) break;
        if (r.height > 150) { markNow(p, 'card'); break; }
      }
    }
    var inCards = D.querySelectorAll('[data-kc~="card"] *:not([data-kc~="pill"]):not([class*="kc-seal"])');
    for (i = 0; i < inCards.length; i++) {
      if (near(rgb(st(inCards[i]).backgroundColor), PILL, 4)) markNow(inCards[i], 'pill');
    }
  }
  // Plates: content images the site already rounds get the plate treatment
  function tiles(list, vw) {
    if (window.KCFOJ_commerce()) return;
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      if (el.tagName !== 'IMG' || !el.isConnected) continue;
      if ((zone && zone.contains(el)) || within(el, 'header, footer, nav, [data-kc~="card"], [data-kc~="header"], [data-kc~="tile"], [class*="logo"], ' + BTN + ', ' + OURS + ', ' + window.KCFOJ_DIALOGS)) continue;

      // Square's own gallery is a known plate gallery. Do not make recognition depend on
      // theme details such as rounded corners; those can change in Square at any time.
      var squareGrid = el.closest('[data-block-purpose^="gallery"] .image-gallery .grid');
      if (squareGrid && el.closest('.image-cell')) {
        mark(el, 'tile');
        continue;
      }

      // Fallback for other image galleries elsewhere on the site.
      var r = rect(el);
      if (r.width < 120 || r.width > vw * 0.9) continue;
      for (var n2 = el, target = null, k = 0; n2 && n2 !== D.body && k < 5; k++, n2 = n2.parentElement) {
        var nr = rect(n2);
        if (Math.abs(nr.width - r.width) > 4 || Math.abs(nr.height - r.height) > 4) break;
        if (parseFloat(st(n2).borderTopLeftRadius) > 0) target = n2;
      }
      if (target) mark(target, 'tile');
    }
  }
  // Part 11 asks for a fresh look at one gallery's plates when Square redraws them
  window.KCFOJ_tiles = function (root) { tiles(root.getElementsByTagName('img'), R.clientWidth || window.innerWidth); };
  function heavy() {
    hq = 0;
    if (!D.body) return;
    var t0 = now(), sweep = false, list, vw = R.clientWidth || window.innerWidth;
    zoomable();
    if (location.pathname !== lastPath) { lastPath = location.pathname; fullHeavy = true; zone = null; foot = null; }
    if (fullHeavy) { list = D.body.getElementsByTagName('*'); fullHeavy = false; sweep = true; stats.fullSweeps++; }
    else list = expand(heavyDirty);
    heavyDirty = [];
try {
 var liveHeader = D.querySelector('[data-block-purpose="header"]');
 if (liveHeader && !has(liveHeader, 'header')) {
   markNow(liveHeader, 'header', true, true);
 }
 cards(vw);
 footer(vw, sweep);
 settle();
 tiles(list, vw);
} catch (e) { nowList.forEach(function (x) { x.removeAttribute('data-kc-now'); }); nowList = []; if (window.console) console.warn('KCFOJ core:', e); }
    stats.heavyPasses++; stats.runs++;
    if (window.KCFOJ_wow) window.KCFOJ_wow();
    (window.KCFOJ_after || []).forEach(function (f) { try { f(); } catch (e) { if (window.console) console.warn('KCFOJ:', e); } });
    var ms = now() - t0;
    stats.lastMs = Math.round(ms * 10) / 10; stats.heavyMs += ms; if (ms > stats.heavyMaxMs) stats.heavyMaxMs = stats.lastMs;
  }
  // Before the next frame; in a tab that is out of sight (where frames wait) on a timer instead,
  // so a page opened in the background is finished when you switch to it
  function scheduleHeavy() { if (!hq) hq = D.hidden ? setTimeout(heavy, 16) : requestAnimationFrame(heavy); }
  // Text alone changing (a counter ticking, say) needs the heavier work at most four times a second
  var textAt = 0, textQ = 0;
  function scheduleForText() {
    if (hq || textQ) return;
    var wait = Math.max(0, 250 - (now() - textAt));
    textQ = setTimeout(function () { textQ = 0; textAt = now(); scheduleHeavy(); }, wait);
  }
  window.KCFOJ_schedule = function (full) { if (full) fullHeavy = true; scheduleHeavy(); };

  // ----- The observer -----
  // An element Square changes more than 15 times a second is being animated by Square;
  // it is left alone for three seconds rather than checked on every frame
  var heat = window.WeakMap ? new WeakMap() : null;
  function hot(el) {
    if (!heat) return false;
    var t = now(), h = heat.get(el);
    if (!h) { heat.set(el, { n: 1, t: t, until: 0 }); return false; }
    if (h.until > t) return true;
    if (t - h.t > 1000) { h.n = 1; h.t = t; return false; }
    if (++h.n > 15) { h.until = t + 3000; stats.hot++; return true; }
    return false;
  }
  // Elements Square is animating are still looked at, once per frame, before the frame is drawn
  var hotQ = window.Set ? new Set() : null, hotRaf = 0, hotClass = window.WeakMap ? new WeakMap() : null, hotAll = false;
  function hotCheck() {
    hotRaf = 0;
    var l = [];
    hotQ.forEach(function (el) {
      if (!el.isConnected) return;
      l.push(el);
      // Its class really changed (not only its inline style): what is inside may be recolored too
      var c = el.getAttribute('class') || '';
      if (hotClass && hotClass.get(el) !== c) {
        hotClass.set(el, c);
        var inner = el.getElementsByTagName('*');
        if (inner.length <= 400) for (var j = 0; j < inner.length; j++) l.push(inner[j]);
        else hotAll = true;
      }
    });
    hotQ.clear();
    if (hotAll) { hotAll = false; wholePage(true); }
    if (l.length) paint(l);
  }
  // The parents of anything added: a block that has just grown may now count as a section
  function parentsOf(roots) {
    var out = [], seen = new Set();
    for (var i = 0; i < roots.length; i++) {
      for (var a = roots[i].parentElement; a && a !== R; a = a.parentElement) {
        if (seen.has(a)) break;
        seen.add(a);
        out.push(a);
      }
    }
    return out;
  }
  var htmlOwn = ['kc-boot'];
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) htmlOwn.push('kc-still');
  // A whole-page look when something large changed, always before the next frame. Only if Square
  // keeps restyling large parts of the page nonstop (ten looks inside a second) are further looks
  // spaced 100ms apart, and even then the last change always gets its look.
  var bigSweepQ = 0, sweepAt = -1e9, sweepT = 0, sweepTimes = [];
  function wholePage(inFrame) {
    var t = now();
    while (sweepTimes.length && t - sweepTimes[0] > 1000) sweepTimes.shift();
    var gap = sweepTimes.length >= 10 ? 100 : 0;
    if (inFrame && t - sweepAt >= gap) {
      if (bigSweepQ) { cancelAnimationFrame(bigSweepQ); bigSweepQ = 0; }
      bigSweep();
      return;
    }
    if (bigSweepQ || sweepT) return;
    var wait = gap - (t - sweepAt);
    if (wait <= 0) bigSweepQ = requestAnimationFrame(bigSweep);
    else sweepT = setTimeout(function () { sweepT = 0; bigSweepQ = requestAnimationFrame(bigSweep); }, wait);
  }
  function bigSweep() {
    bigSweepQ = 0; sweepAt = now(); sweepTimes.push(sweepAt); stats.fullSweeps++;
    paint(everything());
  }
  function onSheetLoad() { paint(everything()); scheduleHeavy(); }
  // A style sheet Square links in later is looked for at the start of every frame until it has
  // arrived, so the page is repainted in the same frame the sheet first applies (the load
  // event alone can come a frame late). The load event stays as a backup for hidden tabs.
  function watchSheet(link) {
    var n = 0, done = false;
    function now2() { if (done) return; done = true; onSheetLoad(); }
    link.addEventListener('load', now2);
    (function look() {
      if (done || !link.isConnected) return;
      if (link.sheet) { now2(); return; }
      if (++n < 900) requestAnimationFrame(look);
    })();
  }
  // Square changing the page's own class or inline style (a theme switch, say) is a reason to
  // look at the whole page before the next frame; the marks this script keeps there are not
  var rootSeen = null;
  function rootKey() { return (R.getAttribute('class') || '').replace(/(^|\s)kc-\S+/g, '').trim() + '|' + (R.getAttribute('style') || ''); }
  function sheetText(r) {
    var t = r.target;
    return t && t.tagName === 'STYLE' && !t.hasAttribute('data-kc-style');
  }
  function observe(recs) {
    stats.observerCalls++; stats.records += recs.length;
    var roots = [], changed = [], sheet = false, back = false, texty = false, rootMoved = false, i, j, n;
    for (i = 0; i < recs.length; i++) {
      var r = recs[i];
      if (r.type === 'childList') {
        // New text in one of Square's style elements: new rules, so the whole page is looked at now
        if (sheetText(r)) { sheet = true; continue; }
        var a = r.addedNodes;
        for (j = 0; j < a.length; j++) {
          n = a[j];
          if (n.nodeType === 1) {
            var tag = n.tagName;
            if (tag === 'STYLE' || (tag === 'LINK' && /stylesheet/i.test(n.rel || ''))) {
              if (!n.hasAttribute('data-kc-style')) {
                sheet = true;
                if (tag === 'LINK') watchSheet(n);
              }
              continue;
            }
            if (tag === 'META') { zoomable(); continue; }
            if (/^(SCRIPT|TITLE|NOSCRIPT|TEMPLATE|BASE)$/.test(tag) || made(n) || inOurs(n)) continue;
            roots.push(n);
          } else if (n.nodeType === 3 && n.parentElement && !inOurs(n.parentElement)) {
            heavyDirty.push(n.parentElement); texty = true;
          }
        }
        var gone = r.removedNodes;
        for (j = 0; j < gone.length; j++) {
          n = gone[j];
          if (n.nodeType !== 1) continue;
          if (n.hasAttribute && n.hasAttribute('data-kc-style')) back = true;
          else if (made(n)) texty = true;   // something of ours was taken away: the heavy pass puts it back
        }
      } else {
        var el = r.target;
        if (el === R) {
          // Keep the page-level marks the boot block and reduced motion rely on
          for (j = 0; j < htmlOwn.length; j++) if (!R.classList.contains(htmlOwn[j])) R.classList.add(htmlOwn[j]);
          var key = rootKey();
          if (rootSeen !== null && key !== rootSeen) rootMoved = true;
          rootSeen = key;
          continue;
        }
        if (r.attributeName === 'content') { if (el.tagName === 'META') zoomable(); continue; }
        if (made(el) || inOurs(el)) continue;
        if (r.attributeName === 'style' && self.has(el)) continue;
        if (hot(el)) {
          if (hotQ) { hotQ.add(el); if (!hotRaf) hotRaf = requestAnimationFrame(hotCheck); }
          continue;
        }
        stats.styleChanges++;
        changed.push(el);
      }
    }
    if (back) {
      (window.KCFOJ_sheets || []).forEach(function (t) { if (!t.isConnected) { (D.head || R).appendChild(t); stats.sheetsPutBack++; } });
    }
    var list = null;
    if (sheet) { list = everything(); stats.fullSweeps++; }
    else if (roots.length || changed.length) {
      list = expand(roots).concat(parentsOf(roots));
      for (i = 0; i < changed.length; i++) {
        var c = changed[i];
        if (!c.isConnected) continue;
        list.push(c);
        // A restyled element can recolor what is inside it: look inside small ones now,
        // and sweep the page before the next frame when a large one changes
        var inner = c.getElementsByTagName('*');
        if (inner.length <= 400) for (j = 0; j < inner.length; j++) list.push(inner[j]);
        else rootMoved = true;
      }
    }
    // At most one whole-page look per frame, always before that frame is drawn
    if (rootMoved && !sheet) wholePage(false);
    var fresh = list ? paint(list) : 0;
    if (roots.length) holdGalleries(roots);
    if (roots.length || fresh || sheet) {
      for (i = 0; i < roots.length; i++) heavyDirty.push(roots[i]);
      scheduleHeavy();
    } else if (texty) scheduleForText();
  }
  rootSeen = rootKey();
  var mo = new MutationObserver(observe);
  mo.observe(R, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style', 'content'] });

  // Pictures that finish loading change size, which matters for plates and cards
  D.addEventListener('load', function (e) {
    var t = e.target;
    if (t && t.nodeType === 1 && t.tagName === 'IMG' && !inOurs(t)) { paint(parentsOf([t])); heavyDirty.push(t); scheduleHeavy(); }
  }, true);
  window.addEventListener('load', function () { fullHeavy = true; paint(everything()); scheduleHeavy(); });
  if (D.fonts && D.fonts.addEventListener) D.fonts.addEventListener('loadingdone', scheduleHeavy);
  if (window.KCFOJ_listen) {
    KCFOJ_listen('resize', function () {
      // A new width can change what counts as full width: look again. Height alone
      // (a phone's toolbar sliding away) only needs the layout work.
      if (window.innerWidth !== lastW) { lastW = window.innerWidth; paint(everything()); fullHeavy = true; }
      scheduleHeavy();
    });
  }

  // First look at whatever Square has drawn so far, then the heavier work before the next frame
  if (D.body) {
    paint(everything());
    holdGalleries([D.body], true);
  }
  scheduleHeavy();
})();

/* ===== Part 3: the book layer =====
   The arrival veil, the homepage banner (surfacing from a blur, breathing,
   warm drifting light), the band under it (drifting words above the still
   index line and Begin Here), one reveal system (headings ink in, blocks rise),
   card and plate tilt, the plate viewer opened as a book spread, and the night
   page, where a candle carries a quote and a hidden mandala out of the dark.
   It also lifts the boot block's vellum cover once the page is ready.
   Words and switches live in Part 0. */
(function () { if (window.KCFOJ_SKIP) return;
  var W = window.KCFOJ_WORDS || {}, on = window.KCFOJ_on || function () { return true; };
  var listen = window.KCFOJ_listen || function () {};
  var mark = window.KCFOJ_mark, unmark = window.KCFOJ_unmark, has = window.KCFOJ_has, self = window.KCFOJ_self;
  var KC = {
    name: W.name || 'Kansas City Friends of Jung',
    quote: W.quote || 'Who looks outside, dreams; who looks inside, awakes.',
    by: W.by || 'C. G. Jung',
    words: W.index || ['Dreams', 'Shadow', 'Archetypes', 'Individuation', 'The Self', 'Symbol', 'Anima', 'Myth']
  };
  var D = document, R = D.documentElement;
  function mq(q) { return !!(window.matchMedia && window.matchMedia(q).matches); }
  var still = mq('(prefers-reduced-motion: reduce)');
  // A mouse or trackpad, read when needed (a touch screen gets taps and scrolls instead of hovers)
  function fine() { return mq('(hover: hover) and (pointer: fine)'); }
  var roman = window.KCFOJ_roman || function (n) { return String(n); };
  var esc = window.KCFOJ_esc || function (s) { return String(s); };
  var mandala = window.KCFOJ_mandala || function () { return []; };
  var now = window.performance ? function () { return performance.now(); } : function () { return Date.now(); };
  var HERO = 'data-kc-hero';

  var css = `
html.kc-lock{overflow:hidden}

/* 1. Arrival: vellum, a mandala drawn in gold with a rubric heart, the name beneath */
.kc-veil{position:fixed;inset:0;z-index:2147483600;background-color:var(--kc-cream);background-image:var(--kc-grain);background-size:240px 240px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;padding:24px;cursor:pointer;transition:opacity 1.1s cubic-bezier(.7,0,.2,1),transform 1.3s cubic-bezier(.7,0,.2,1),filter 1.1s ease}
.kc-veil svg{width:min(46vw,230px);height:auto;overflow:visible;animation:kcTurn 5s var(--kc-e) both}
.kc-draw{fill:none;stroke:var(--kc-gold);stroke-width:1.15;stroke-linecap:round;stroke-dasharray:var(--l,700);stroke-dashoffset:var(--l,700);animation:kcDraw 1.5s cubic-bezier(.6,0,.2,1) forwards}
.kc-draw.kc-heart{stroke:var(--kc-accent);stroke-width:1.4}
.kc-veil-name{font:400 clamp(13px,2vw,17px)/1.5 var(--kc-serif);letter-spacing:.34em;text-indent:.34em;text-transform:uppercase;color:var(--kc-ink);text-align:center;opacity:0;transform:translateY(8px);animation:kcRise 1.2s 1s var(--kc-e) forwards}
.kc-veil-name::before{content:"";display:block;width:36px;height:1px;margin:0 auto 18px;background:var(--kc-accent)}
.kc-veil.kc-go{opacity:0;transform:translateY(-4%) scale(1.02);filter:blur(8px);pointer-events:none}
@keyframes kcDraw{to{stroke-dashoffset:0}}
@keyframes kcRise{to{opacity:1;transform:none}}
@keyframes kcTurn{from{transform:rotate(-40deg) scale(.92)}to{transform:none}}

/* 2. The banner: warmed toward the paper, surfacing from a blur on arrival, then breathing
   slowly under a drifting warm light and a soft vignette. One filter chain carries both the
   tone and the blur, so the two never fight. */
[${HERO}~="wrap"]{overflow:clip!important}
[${HERO}~="tone"]{--kc-tone:1;filter:sepia(calc(.2 * var(--kc-tone,1))) saturate(calc(1 - .12 * var(--kc-tone,1))) contrast(calc(1 + .03 * var(--kc-tone,1)))}
[${HERO}~="flat"]{--kc-tone:0}
[${HERO}~="pre"]{filter:blur(18px) sepia(calc(.2 * var(--kc-tone,1))) saturate(.5) contrast(calc(1 + .03 * var(--kc-tone,1)));transform:scale(1.14);opacity:.35}
[${HERO}~="rise"]{animation:kcSurface 2.8s var(--kc-e) both}
[${HERO}~="rise"][${HERO}~="soft"]{animation-name:kcSurfaceSoft}
[${HERO}~="breathe"]{transform-origin:50% 60%;animation:kcBreathe 24s ease-in-out infinite alternate}
[${HERO}~="rise"][${HERO}~="breathe"]{animation:kcSurface 2.8s var(--kc-e) both,kcBreathe 24s 2.8s ease-in-out infinite alternate}
@keyframes kcSurface{from{filter:blur(18px) sepia(calc(.2 * var(--kc-tone,1))) saturate(.5) contrast(calc(1 + .03 * var(--kc-tone,1)));transform:scale(1.14);opacity:.35}to{filter:blur(0px) sepia(calc(.2 * var(--kc-tone,1))) saturate(calc(1 - .12 * var(--kc-tone,1))) contrast(calc(1 + .03 * var(--kc-tone,1)));transform:scale(1);opacity:1}}
@keyframes kcSurfaceSoft{from{filter:blur(18px) sepia(calc(.2 * var(--kc-tone,1))) saturate(.5) contrast(calc(1 + .03 * var(--kc-tone,1)));opacity:.35}to{filter:blur(0px) sepia(calc(.2 * var(--kc-tone,1))) saturate(calc(1 - .12 * var(--kc-tone,1))) contrast(calc(1 + .03 * var(--kc-tone,1)));opacity:1}}
@keyframes kcBreathe{from{transform:scale(1)}to{transform:scale(1.06)}}
.kc-atmos{position:absolute;z-index:1;overflow:hidden;pointer-events:none}
.kc-aurora{position:absolute;inset:0;overflow:hidden;pointer-events:none;mix-blend-mode:soft-light;opacity:.7;animation:kcGlow 19s ease-in-out infinite alternate;animation-delay:var(--kc-t,0s)}
.kc-aurora::before{content:"";position:absolute;inset:-35%;background:radial-gradient(38% 46% at 32% 36%,rgba(214,168,98,.85),transparent 70%),radial-gradient(42% 52% at 68% 64%,rgba(139,42,36,.7),transparent 70%),radial-gradient(30% 40% at 54% 26%,rgba(255,244,226,.9),transparent 70%);animation:kcDrift 26s ease-in-out infinite alternate;animation-delay:var(--kc-t,0s)}
.kc-vignette{position:absolute;inset:0;pointer-events:none;box-shadow:inset 0 0 160px rgba(20,12,10,.34),inset 0 -70px 90px -50px rgba(20,12,10,.3)}
@keyframes kcDrift{from{transform:translate3d(-9%,-6%,0) rotate(0deg)}to{transform:translate3d(9%,6%,0) rotate(8deg)}}
@keyframes kcGlow{from{opacity:.55}to{opacity:.85}}
[${HERO}~="rest"],[${HERO}~="rest"] .kc-aurora,[${HERO}~="rest"] .kc-aurora::before,[${HERO}~="rest"]>[${HERO}~="breathe"]{animation-play-state:paused!important}
@media (max-width:760px){.kc-aurora,.kc-aurora::before{animation:none}.kc-aurora{opacity:.62}.kc-vignette{box-shadow:inset 0 0 90px rgba(20,12,10,.3)}}
.kc-still .kc-aurora,.kc-still .kc-aurora::before{animation:none}

/* 3. The band under the banner: drifting words above, the still index line below */
.kc-band{position:relative;box-sizing:border-box;border-block:1px solid var(--kc-rubric-rule);background-color:var(--kc-cream);background-image:var(--kc-grain);background-size:240px 240px}
.kc-band.kc-band-in{animation:kcBandIn 1.1s var(--kc-e) both}
@keyframes kcBandIn{from{opacity:0}to{opacity:1}}
.kc-frieze{position:relative;overflow:hidden;padding-block:clamp(12px,2vw,20px);-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.kc-band-track{display:flex;width:max-content;animation:kcMarq 70s linear infinite}
.kc-fw{display:inline-flex;align-items:center;padding-inline:.45em;white-space:nowrap;font:italic 400 clamp(22px,3.4vw,40px)/1.15 var(--kc-serif);color:var(--kc-accent);cursor:pointer;text-decoration:underline dotted rgba(168,132,79,.55);text-decoration-thickness:1px;text-underline-offset:.2em;transition:color .3s ease}
.kc-fw:hover,.kc-fw.kc-on{color:var(--kc-accent-deep);text-decoration-style:solid}
.kc-band-track i{font-style:normal;color:var(--kc-gold);font-size:clamp(11px,1.7vw,20px);align-self:center;padding-inline:.45em}
.kc-frieze:hover .kc-band-track,.kc-band.kc-held .kc-band-track{animation-play-state:paused}
@keyframes kcMarq{to{transform:translateX(-50%)}}
.kc-frieze+.kc-band-row{border-top:1px solid rgba(139,42,36,.12)}
.kc-band-row{box-sizing:border-box;max-width:1180px;margin:0 auto;padding:clamp(10px,1.4vw,16px) clamp(16px,4vw,48px);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px 32px}
.kc-index{display:flex;flex-wrap:wrap;align-items:baseline;row-gap:0}
.kc-index-lab{font:500 10px/1 var(--kc-mono);letter-spacing:.24em;text-transform:uppercase;color:var(--kc-verd);margin-right:16px}
.kc-term{all:unset;box-sizing:border-box;cursor:pointer;font:italic 400 clamp(17px,1.5vw,20px)/1.35 var(--kc-serif);color:var(--kc-accent);padding:6px 1px;text-decoration:underline;text-decoration-color:transparent;text-decoration-thickness:1px;text-underline-offset:.24em;transition:text-decoration-color .25s}
.kc-term:hover,.kc-term[aria-expanded="true"]{text-decoration-color:currentColor}
.kc-term:focus-visible{outline:2px solid var(--kc-accent);outline-offset:2px}
.kc-term:disabled{cursor:default}
.kc-index>i{font-style:normal;color:var(--kc-gold);padding:0 .55em;font-size:15px}
.kc-begin{display:inline-flex;flex-wrap:wrap;align-items:baseline;gap:.2em .55em;padding:6px 0;font:400 15px/1.35 var(--kc-serif)!important;color:var(--kc-ink-soft)!important;text-decoration:none!important}
.kc-begin b{font-weight:500;color:var(--kc-accent);white-space:nowrap;text-decoration:underline;text-decoration-color:rgba(139,42,36,.4);text-decoration-thickness:1px;text-underline-offset:.22em}
.kc-begin:hover b{text-decoration-color:currentColor}
.kc-band.kc-band-inset{margin-bottom:clamp(28px,6vw,44px);background:none}
.kc-band.kc-band-inset .kc-band-row{padding-inline:0}
/* On phones the drifting words stay the atmosphere, and the index becomes one quiet row
   you can slide sideways: still every word, still tap for its gloss */
@media (max-width:760px){
  .kc-frieze{padding-block:9px}
  .kc-fw{font-size:clamp(20px,5.6vw,25px)}
  .kc-band-row{display:block;padding-top:4px;padding-bottom:8px}
  .kc-index{flex-wrap:nowrap;align-items:center;overflow-x:auto;overflow-y:hidden;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding-right:30px;-webkit-mask-image:linear-gradient(90deg,#000 calc(100% - 38px),transparent);mask-image:linear-gradient(90deg,#000 calc(100% - 38px),transparent)}
  .kc-index::-webkit-scrollbar{display:none}
  .kc-index-lab{position:sticky;left:0;z-index:1;align-self:stretch;display:flex;align-items:center;margin-right:6px;padding-right:10px;background-color:var(--kc-cream);background-image:var(--kc-grain);background-size:240px 240px}
  .kc-term{flex:0 0 auto;white-space:nowrap;display:inline-flex;align-items:center;min-height:44px;padding:0 2px;font-size:17px}
  .kc-index>i{flex:0 0 auto;padding:0 .45em}
  .kc-begin{padding:2px 0 0;font-size:14px!important}
}
.kc-still .kc-band.kc-band-in,.kc-still .kc-band-track{animation:none}

/* 4. One reveal system: headings are inked in from the left and settle from a slight blur;
   paragraphs, cards and plates rise softly into place */
[data-kc-rv="wait-b"]{opacity:0;transform:translateY(22px)}
[data-kc-rv="wait-b"]:focus-within{opacity:1;transform:none}
[data-kc-rv="in-b"]{opacity:1;transform:none;transition:opacity 1.2s var(--kc-e),transform 1.2s var(--kc-e)!important}
[data-kc-rv="wait-h"]{-webkit-mask-image:linear-gradient(90deg,#000 40%,transparent 60%);mask-image:linear-gradient(90deg,#000 40%,transparent 60%);-webkit-mask-size:250% 100%;mask-size:250% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:100% 0;mask-position:100% 0;filter:blur(6px)}
[data-kc-rv="in-h"]{-webkit-mask-image:linear-gradient(90deg,#000 40%,transparent 60%);mask-image:linear-gradient(90deg,#000 40%,transparent 60%);-webkit-mask-size:250% 100%;mask-size:250% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:0 0;mask-position:0 0;filter:blur(0);transition:-webkit-mask-position 1.6s var(--kc-e),mask-position 1.6s var(--kc-e),filter 1.4s var(--kc-e)!important}
@media print{[data-kc-rv]{opacity:1!important;transform:none!important;filter:none!important;-webkit-mask:none!important;mask:none!important}}

/* 5. Cards and plates tilt a little under the mouse, with a paper sheen */
[data-kc~="sheen"]::after{content:"";position:absolute;inset:0;z-index:1;border-radius:inherit;pointer-events:none;background:radial-gradient(circle at var(--mx,50%) var(--my,30%),rgba(255,250,240,.5),transparent 58%);opacity:0;transition:opacity .4s;mix-blend-mode:soft-light}
[data-kc~="card"][data-kc~="sheen"]::after{background:radial-gradient(circle at var(--mx,50%) var(--my,30%),rgba(255,250,240,.34),transparent 62%)}
@media (hover:hover){[data-kc~="sheen"]:hover::after{opacity:1}}
[data-kc-g]{cursor:zoom-in}

/* 6. The plate viewer, opened like a book: a caption leaf on the left, the plate on the right */
.kc-lb{position:fixed;inset:0;z-index:2147483500;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:64px 70px;background-color:#16100E;background-image:var(--kc-leather);background-size:260px 260px;opacity:0;transition:opacity .45s ease;cursor:zoom-out}
.kc-lb.kc-open{opacity:1}
.kc-lb-book{position:relative;display:flex;align-items:stretch;max-width:100%;max-height:100%;perspective:2000px;cursor:default;transform:scale(.97) translateY(12px);transition:transform .7s var(--kc-e)}
.kc-lb.kc-open .kc-lb-book{transform:none}
.kc-lb-leaf{flex:0 0 clamp(220px,24vw,330px);box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;gap:18px;padding:clamp(24px,3vw,40px) clamp(20px,2.4vw,34px);background-color:var(--kc-cream);background-image:var(--kc-grain);background-size:240px 240px;border-radius:3px 0 0 3px;box-shadow:inset -22px 0 26px -20px rgba(31,26,23,.4);transform-origin:100% 50%;transform:rotateY(32deg);opacity:.15;transition:transform .9s var(--kc-e),opacity .6s ease}
.kc-lb.kc-open .kc-lb-leaf{transform:none;opacity:1}
.kc-lb-head{font:500 10px/1.5 var(--kc-mono);letter-spacing:.22em;text-transform:uppercase;color:var(--kc-verd)}
.kc-lb-fol{display:block;font:italic 400 clamp(30px,3.2vw,44px)/1 var(--kc-serif);color:var(--kc-accent)}
.kc-lb-fol::after{content:"";display:block;width:44px;height:1px;margin-top:16px;background:var(--kc-gold)}
.kc-lb-cap{font:italic 400 16px/1.55 var(--kc-serif);color:var(--kc-ink-soft);text-wrap:pretty}
.kc-lb-page{position:relative;flex:1 1 auto;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;box-sizing:border-box;padding:clamp(16px,2.2vw,30px);background-color:var(--kc-card);background-image:var(--kc-grain);background-size:240px 240px;border-radius:0 3px 3px 0;box-shadow:inset 22px 0 26px -20px rgba(31,26,23,.34),0 40px 90px -30px rgba(0,0,0,.8)}
.kc-lb img{display:block;max-width:100%;max-height:calc(100vh - 200px);object-fit:contain;outline:1px solid rgba(168,132,79,.5);outline-offset:6px;transition:opacity .18s ease;cursor:default}
.kc-lb-mcap{display:none;margin-top:16px;text-align:center;font:italic 400 15px/1.5 var(--kc-serif);color:var(--kc-ink-soft)}
.kc-lb-mcap b{font-weight:400;color:var(--kc-accent);margin-right:.5em}
.kc-lb button{position:absolute;display:grid;place-items:center;width:46px;height:46px;padding:0;border-radius:50%;border:1px solid rgba(244,237,225,.3);background:rgba(22,15,13,.5);color:#F4EDE1;font:300 26px/1 Georgia,serif;cursor:pointer;transition:background .25s,border-color .25s}
.kc-lb button:hover{background:rgba(244,237,225,.12);border-color:rgba(244,237,225,.6)}
.kc-lb button:focus-visible{outline:2px solid var(--kc-gold);outline-offset:3px}
.kc-lb-x{top:max(12px,env(safe-area-inset-top));right:12px}
.kc-lb-prev,.kc-lb-next{top:50%;margin-top:-23px}
.kc-lb-prev{left:12px}.kc-lb-next{right:12px}
.kc-lb-count{position:absolute;left:0;right:0;bottom:max(18px,env(safe-area-inset-bottom));text-align:center;color:rgba(244,237,225,.62);font:400 11px/1 var(--kc-mono);letter-spacing:.24em}
@media (max-width:899px){.kc-lb-leaf{display:none}.kc-lb-page{border-radius:3px;box-shadow:0 40px 90px -30px rgba(0,0,0,.8)}.kc-lb-mcap{display:block}.kc-lb img{max-height:calc(100vh - 230px)}}
@media (max-width:600px){.kc-lb{padding:60px 12px 86px}.kc-lb .kc-lb-prev,.kc-lb .kc-lb-next{top:auto;bottom:max(14px,env(safe-area-inset-bottom));margin-top:0}.kc-lb .kc-lb-prev{left:16px}.kc-lb .kc-lb-next{right:16px}.kc-lb-count{bottom:calc(max(14px,env(safe-area-inset-bottom)) + 17px)}}
.kc-still .kc-lb-book,.kc-still .kc-lb-leaf{transition:none;transform:none}

/* 7. The night page: red-black leather, a candle, the quote coming out of the dark,
   and a mandala in the leather that only the candle shows. On touch screens the whole
   quote stays faintly readable (about a quarter strength) and the candle brings parts
   of it up to full. */
.kc-shadow{position:relative!important;overflow:hidden!important;background-color:var(--kc-night)!important;background-image:var(--kc-leather)!important;background-size:260px 260px!important;min-height:clamp(420px,72vh,680px)!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;padding:clamp(72px,11vw,140px) 24px!important;margin:0!important;--x:50%;--y:50%;--kc-r:220px;--kc-qbase:.07}
@media (hover:none),(pointer:coarse){.kc-shadow{--kc-qbase:.28}}
.kc-shadow::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle min(calc(var(--kc-r) * 1.7), 380px) at var(--x) var(--y),rgba(255,210,150,.16),rgba(255,210,150,.05) 45%,transparent 72%)}
.kc-shadow::after{content:"";position:absolute;inset:clamp(10px,1.6vw,20px);border:1px solid rgba(168,132,79,.22);outline:1px solid rgba(168,132,79,.12);outline-offset:-7px;pointer-events:none}
.kc-night-art{position:absolute;left:50%;top:50%;width:min(94vw,760px);aspect-ratio:1;transform:translate(-50%,-50%);pointer-events:none;opacity:.42;-webkit-mask-image:radial-gradient(circle calc(var(--kc-r) * 1.3) at var(--ax,50%) var(--ay,50%),#000 0%,rgba(0,0,0,.4) 40%,transparent 70%);mask-image:radial-gradient(circle calc(var(--kc-r) * 1.3) at var(--ax,50%) var(--ay,50%),#000 0%,rgba(0,0,0,.4) 40%,transparent 70%)}
.kc-night-art svg{display:block;width:100%;height:100%;overflow:visible}
.kc-night-art svg *{fill:none;stroke:var(--kc-gold);stroke-width:.55}
.kc-shadow-q{position:relative;margin:0;max-width:15ch;text-align:center;font:italic 400 clamp(34px,6.2vw,76px)/1.12 var(--kc-serif);letter-spacing:-.01em;text-wrap:balance;color:transparent;background:radial-gradient(circle var(--kc-r) at var(--qx,50%) var(--qy,50%),#F6EEDF 0%,rgba(246,238,223,.6) 38%,rgba(246,238,223,var(--kc-qbase,.07)) 72%);-webkit-background-clip:text;background-clip:text}
.kc-shadow-by{display:block;margin-top:1.3em;font:400 11px/1.4 var(--kc-mono);font-style:normal;letter-spacing:.3em;text-transform:uppercase}
.kc-shadow-hint{position:absolute;left:0;right:0;bottom:28px;padding:0 16px;text-align:center;font:400 10px/1.4 var(--kc-mono);letter-spacing:.28em;text-transform:uppercase;color:rgba(244,237,225,.5);transition:opacity .8s}
.kc-shadow.kc-used .kc-shadow-hint{opacity:0}
.kc-lantern{position:absolute;left:var(--x);top:var(--y);width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;background:#FFE2B3;box-shadow:0 0 18px 6px rgba(255,205,140,.45);pointer-events:none;opacity:0;transition:opacity .4s}
@media (hover:hover) and (pointer:fine){.kc-shadow:not(.kc-lit){cursor:none}.kc-shadow:not(.kc-lit):hover .kc-lantern{opacity:1}}
.kc-lit .kc-shadow-q{color:#F6EEDF;background:none}
.kc-lit .kc-night-art{opacity:.08;-webkit-mask-image:none;mask-image:none}
.kc-lit .kc-shadow-hint{display:none}
`;
  window.KCFOJ_style(css, 'book');
  if (still) R.classList.add('kc-still');

  function rect(el) { return el.getBoundingClientRect(); }
  function mk(t, cls, html) { var e = D.createElement(t); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }
  function chrome(el) { return !!el.closest('header, footer, nav, .kc-lb, .kc-band, .kc-shadow, [data-kc~="footer"], [data-kc~="header"], .kc-margin, .kc-def, .kc-colophon, .kc-veil'); }
  function overlay(el) { try { return !!el.closest(window.KCFOJ_DIALOGS); } catch (e) { return false; } }
  function inside(a, b) { var x = a.left + a.width / 2, y = a.top + a.height / 2; return x >= b.left && x <= b.right && y >= b.top && y <= b.bottom; }
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

  // 0. The boot block's vellum cover comes off once Square's page is drawn in our colors,
  //    its style sheets and fonts are in, and the heavier work has run once. It never waits
  //    past 2.6 seconds into the page, or 1.5 seconds after this script arrives, and the boot
  //    block takes it off by itself after 3 seconds.
  var began = now();
  function covered() {
    if (!R.classList.contains('kc-cover') || R.classList.contains('kc-uncover')) return false;
    var at = window.KCFOJ_bootAt;   // when the boot block put the cover on
    return typeof at !== 'number' || now() - at < 2950;
  }
  function uncover(instant) {
    window.KCFOJ_coverDone = true;  // the boot block stops guarding the cover
    if (window.KCFOJ_bootMO) { window.KCFOJ_bootMO.disconnect(); window.KCFOJ_bootMO = null; }
    if (!R.classList.contains('kc-cover')) return;
    if (instant || still) { R.classList.remove('kc-cover', 'kc-uncover'); return; }
    R.classList.add('kc-uncover');
    setTimeout(function () { R.classList.remove('kc-cover', 'kc-uncover'); }, 320);
  }
  function pageReady() {
    var st = window.KCFOJ_stats || {};
    if (!st.heavyPasses || !D.body) return now() - began > 1500;
    if (now() > 2600 || now() - began > 1500) return true;
    if (D.body.getElementsByTagName('*').length < 25 || !D.querySelector('header, footer, nav, main, [data-kc-zone]')) return false;
    var links = D.querySelectorAll('link[rel~="stylesheet"]');
    for (var i = 0; i < links.length; i++) if (!links[i].sheet && !links[i].disabled && links[i].media !== 'print') return false;
    if (D.fonts && D.fonts.status === 'loading' && now() < 1800) return false;
    return true;
  }
  function coverCheck() { if (covered() && !veilUp && pageReady()) uncover(); }
  window.KCFOJ_after.push(coverCheck);
  if (covered()) (function poll() { coverCheck(); if (covered()) setTimeout(poll, 120); })();

  // 1. Arrival veil: once per visit, lifted by a tap, a key, a scroll, or after a few seconds.
  //    With the boot block in place it takes over from the vellum cover in the same frame.
  var veilUp = false, queue = [], arrival = false, liftVeil = null;
  function whenClear(fn) { if (veilUp) queue.push(fn); else fn(); }
  listen('key', function () { if (veilUp && liftVeil) liftVeil(); });
  function mandalaSVG(cls) {
    var s = '<svg viewBox="-110 -110 220 220" aria-hidden="true" focusable="false">', d = 0, shapes = mandala();
    shapes.forEach(function (x, i) {
      var heart = i >= shapes.length - 2;
      s += '<' + x[0] + (cls ? ' class="' + cls + (heart ? ' kc-heart' : '') + '" style="animation-delay:' + (d += 0.03).toFixed(2) + 's"' : '') + ' ' + x[1] + '/>';
    });
    return s + '</svg>';
  }
  function showVeil(force) {
    var seen = false;
    try { seen = sessionStorage.getItem('kcVeil') === '1'; sessionStorage.setItem('kcVeil', '1'); } catch (e) {}
    if (still || (seen && !force)) return;
    // Without the cover, a page the visitor can already see is never covered up again
    if (!force && !covered() && now() > 1500) return;
    arrival = true;               // the first page of a visit: the banner surfaces from a blur
    if (!on('arrivalVeil')) return;
    var v = mk('div', 'kc-veil', mandalaSVG('kc-draw'));
    var nm = mk('div', 'kc-veil-name'); nm.textContent = KC.name; v.appendChild(nm);
    v.setAttribute('aria-hidden', 'true');
    R.appendChild(v);
    uncover(true);
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
      ['wheel', 'touchmove'].forEach(function (ev) { window.removeEventListener(ev, lift); });
      setTimeout(function () { if (v.parentNode) v.parentNode.removeChild(v); }, 1400);
    }
    // A tap lifts it through its own click, so the tap never lands on a link underneath;
    // a swipe, the mouse wheel or any key lifts it too
    v.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); lift(); });
    window.addEventListener('wheel', lift, { passive: true });
    window.addEventListener('touchmove', lift, { passive: true });
    liftVeil = lift;
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

  // 2. The banner: warmed toward the paper; on arrival it surfaces from a blur, then breathes
  var heroEl = null, heroSoft = false, heroIO = null, heroHost = null, atmos = null, atmosT0 = 0;
  // Only clip a small, plain box around the banner: never the page, never anything that scrolls
  function safeWrap(w, r) {
    if (!w || w === D.body || w === R || !(window.CSS && CSS.supports && CSS.supports('overflow', 'clip'))) return false;
    var s = getComputedStyle(w), wr = rect(w);
    if (/auto|scroll|overlay/.test(s.overflowY + s.overflowX)) return false;
    if (w.scrollHeight > w.clientHeight + 4) return false;
    return wr.height <= r.height * 1.25 && wr.height <= window.innerHeight * 1.3;
  }
  var HEROWORDS = ['tone', 'flat', 'pre', 'rise', 'breathe', 'soft', 'wrap', 'rest'];
  function clearHero(el) { HEROWORDS.forEach(function (w) { unmark(el, w, HERO); }); }
  function surface(force) {
    if (!heroEl) return;
    ['pre', 'rise', 'breathe', 'soft'].forEach(function (w) { unmark(heroEl, w, HERO); });
    mark(heroEl, 'tone', HERO);
    if (!on('heroTone')) mark(heroEl, 'flat', HERO);
    if (still || !on('heroBreathing')) return;
    var breathe = !heroSoft;
    var firstLook = arrival || force;
    if (!firstLook) {
      // Coming back to the homepage later in the visit: no blur (nothing blinks), just the breathing
      if (breathe) mark(heroEl, 'breathe', HERO);
      return;
    }
    mark(heroEl, 'pre', HERO);
    whenClear(function () {
      unmark(heroEl, 'pre', HERO);
      void heroEl.offsetWidth;
      mark(heroEl, 'rise', HERO);
      mark(heroEl, breathe ? 'breathe' : 'soft', HERO);
    });
  }
  // The warm light and vignette cover the banner picture only, never the band or header below it
  function fitAtmos() {
    if (!atmos || !heroEl || !D.contains(atmos)) return;
    var wrap = atmos.parentElement, top, left;
    if (heroEl.offsetParent === wrap) { top = heroEl.offsetTop; left = heroEl.offsetLeft; }
    else {
      var hr = rect(heroEl), wr = rect(wrap);
      top = hr.top - wr.top - wrap.clientTop; left = hr.left - wr.left - wrap.clientLeft;
    }
    atmos.style.top = Math.round(top) + 'px';
    atmos.style.left = Math.round(left) + 'px';
    atmos.style.width = heroEl.offsetWidth + 'px';
    atmos.style.height = heroEl.offsetHeight + 'px';
  }
  listen('resize', fitAtmos);
  // Pieces of ours that came back inside a page Square restored from its memory are dropped,
  // so each appears once and works
  function strays(sel, keep) {
    [].forEach.call(D.querySelectorAll(sel), function (x) { if (x !== keep && x.parentNode) x.parentNode.removeChild(x); });
  }
  function hero() {
    if (heroEl && D.contains(heroEl)) {
      if (atmos && !D.contains(atmos) && heroEl.parentElement) placeAtmos(heroEl.parentElement);
      fitAtmos();
      return;
    }
    heroEl = null;
    strays('.kc-atmos', null);
    [].forEach.call(D.querySelectorAll('[' + HERO + ']'), clearHero);
    var vw = R.clientWidth || window.innerWidth, all = D.body.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      // Square puts the banner inside the page's <header>, so only the nav bar itself is off limits
      if (el.closest('nav, a, button, [data-kc~="header"], .kc-lb, [data-kc~="card"], [data-kc~="tile"], .kc-shadow, .kc-band, .kc-veil') || has(el, 'grain') || overlay(el)) continue;
      var r = rect(el);
      if (r.width < vw - 6 || r.height < 160 || r.height > window.innerHeight * 1.25 || r.top + window.scrollY > 700) continue;
      if (!/^(IMG|PICTURE|VIDEO)$/.test(el.tagName) && getComputedStyle(el).backgroundImage.indexOf('url(') < 0) continue;
      var wrap = el.parentElement;
      heroSoft = !safeWrap(wrap, r);
      heroEl = el;
      heroHost = heroSoft ? el : wrap;
      if (!heroSoft) {
        mark(wrap, 'wrap', HERO);
        if (getComputedStyle(wrap).position === 'static') mark(wrap, 'rel');
        if (on('heroAtmosphere')) placeAtmos(wrap);
      }
      // Rest the animations while the banner is off screen
      if ('IntersectionObserver' in window) {
        if (heroIO) heroIO.disconnect();
        heroIO = new IntersectionObserver(function (e) { if (e[0].isIntersecting) unmark(heroHost, 'rest', HERO); else mark(heroHost, 'rest', HERO); });
        heroIO.observe(heroHost);
      }
      surface(false);
      return;
    }
  }
  function placeAtmos(wrap) {
    if (!atmos) {
      atmos = mk('div', 'kc-atmos', '<div class="kc-aurora"></div><div class="kc-vignette"></div>');
      atmos.setAttribute('aria-hidden', 'true');
      atmosT0 = now();
    }
    // If Square redraws the banner, the light carries on where it was rather than starting over
    atmos.style.setProperty('--kc-t', (-(now() - atmosT0) / 1000).toFixed(2) + 's');
    wrap.appendChild(atmos);
    fitAtmos();
  }

  // 3. The band under the banner: drifting words (decoration; tap one for its gloss)
  //    above the still index line (the working version, with Begin Here)
  var bandEl = null, bandFails = 0, bandTimer = 0, bandT0 = 0, bandShown = false, H = 'h1, h2, h3, h4', diag = [];
  function bandHTML() {
    var out = '';
    if (on('wordBand')) {
      var w = KC.words.map(function (x) { return '<span class="kc-fw">' + esc(x) + '</span><i>\u2726</i>'; }).join('');
      out += '<div class="kc-frieze" aria-hidden="true"><div class="kc-band-track">' + w + w + w + w + '</div></div>';
    }
    if (on('indexLine')) {
      var items = KC.words.map(function (x, i) {
        return (i ? '<i aria-hidden="true">\u00B7</i>' : '') + '<button type="button" class="kc-term" aria-expanded="false">' + esc(x) + '</button>';
      }).join('');
      var b = W.begin || {};
      var begin = b.url ? '<a class="kc-begin" href="' + esc(b.url) + '"><span>' + esc(b.lead || '') + '</span><b' + (on('manicules') ? ' class="kc-hand"' : '') + '>' + esc(b.link || 'Begin here') + '</b></a>' : '';
      out += '<div class="kc-band-row"><div class="kc-index" role="group" aria-label="A few of Jung\u2019s words. Choose one for a short definition."><span class="kc-index-lab" aria-hidden="true">Index</span>' + items + '</div>' + begin + '</div>';
    }
    return out;
  }
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
    box.textContent = 'KCFOJ debug (v3.1.2) page ' + location.pathname + '\n' + diag.join('\n');
  }
  function band() {
    if (!heroEl || bandFails >= 12 || (bandEl && D.contains(bandEl))) return;
    var html = bandHTML();
    if (!html) return;
    strays('.kc-band', bandEl);
    if (!bandEl) { bandEl = mk('div', 'kc-band', html); bandShown = false; }
    // Measure the banner without its breathing zoom, which makes it look taller than it is
    self.add(heroEl);
    var ot = heroEl.style.getPropertyValue('transform'), op = heroEl.style.getPropertyPriority('transform');
    heroEl.style.setProperty('transform', 'none', 'important');
    var hb = rect(heroEl).bottom;
    if (ot) heroEl.style.setProperty('transform', ot, op); else heroEl.style.removeProperty('transform');
    var hs = D.querySelectorAll(H), h = null, spots = [], i, a, k, why;
    for (i = 0; i < hs.length; i++) {
      if (chrome(hs[i]) || rect(hs[i]).height === 0) continue;
      if (rect(hs[i]).top >= hb - 2) { h = hs[i]; break; }
    }
    diag = ['try ' + (bandFails + 1) + ' | screen ' + window.innerWidth + 'x' + window.innerHeight,
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
        if (!why) {
          bandFails = 0;
          // Inside a content column (as on phones) it needs air before the heading below it
          bandEl.classList.toggle('kc-band-inset', rect(bandEl).width < (R.clientWidth || window.innerWidth) - 4);
          // It fades in the first time only; if Square redraws around it, it simply stays,
          // and the drifting words carry on from where they were
          var track = bandEl.querySelector('.kc-band-track');
          if (!bandShown) {
            bandShown = true; bandT0 = now();
            if (!still) bandEl.classList.add('kc-band-in');
          } else {
            bandEl.classList.remove('kc-band-in');
            if (track) track.style.animationDelay = (-(now() - bandT0) / 1000).toFixed(2) + 's';
          }
          showDiag();
          return;
        }
      }
    }
    if (bandEl.parentNode) bandEl.parentNode.removeChild(bandEl);
    bandFails++;
    showDiag();
    clearTimeout(bandTimer);
    if (bandFails < 12) bandTimer = setTimeout(function () { if (window.KCFOJ_schedule) window.KCFOJ_schedule(); }, 1200);
  }

  // 4. The manicule marks the next step: the banner's button, or the main button on an event page
  function hands() {
    if (!on('manicules') || window.KCFOJ_commerce()) return;
    var pick = null, btns = D.querySelectorAll('[data-kc~="btn"]'), i;
    if (heroEl) {
      var hb = rect(heroEl);
      for (i = 0; i < btns.length && !pick; i++) if (!btns[i].closest('nav') && inside(rect(btns[i]), hb)) pick = btns[i];
    } else if (/^\/product\//.test(location.pathname)) {
      for (i = 0; i < btns.length && !pick; i++) if (!chrome(btns[i]) && !overlay(btns[i]) && !btns[i].closest('[data-kc~="card"]') && rect(btns[i]).height) pick = btns[i];
    }
    if (!pick || pick.getAttribute('data-kc-hand') || pick.tagName === 'INPUT') return;
    var h0 = rect(pick).height;
    mark(pick, 'hand');
    // If the hand would wrap the button onto two lines, leave it plain
    if (rect(pick).height > h0 + 3) { unmark(pick, 'hand'); pick.setAttribute('data-kc-hand', 'no'); }
    else pick.setAttribute('data-kc-hand', '1');
  }

  // 5. One reveal system for everything you haven't seen yet. Content already on screen is
  //    left alone (so nothing blinks), except under the arrival veil, where it is revealed as the veil lifts.
  var io = null, watching = window.WeakSet ? new WeakSet() : null;
  function watch(el) { if (watching) watching.add(el); whenClear(function () { io.observe(el); }); }
  if (!still && on('inkReveal') && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(function (ents) {
      var vis = ents.filter(function (e) { return e.isIntersecting; }).map(function (e) { return e.target; });
      vis.sort(function (a, b) { var ra = rect(a), rb = rect(b); return (ra.top - rb.top) || (ra.left - rb.left); });
      vis.forEach(function (el, i) {
        io.unobserve(el);
        var delay = Math.min(i, 6) * 90, st = el.getAttribute('data-kc-rv') || '';
        self.add(el);
        el.style.transitionDelay = delay + 'ms';
        el.setAttribute('data-kc-rv', st === 'wait-h' ? 'in-h' : 'in-b');
        setTimeout(function () {
          el.setAttribute('data-kc-rv', 'done'); el.style.transitionDelay = '';
          if (window.KCFOJ_relayout) window.KCFOJ_relayout();   // margin notes settle beside the text
        }, 1900 + delay);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
  }
  function reveal() {
    if (!io || window.KCFOJ_commerce()) return;
    var fold = window.innerHeight;
    var sel = 'h1, h2, h3, iframe, form, [data-kc~="card"], [data-kc~="tile"]' + (on('revealParagraphs') ? ', p' : '');
    [].forEach.call(D.querySelectorAll(sel), function (el) {
      var was = el.getAttribute('data-kc-rv');
      if (was !== null) {
        // A copy Square made of a block that was still waiting is watched too, so it never stays unseen
        if (watching && /^wait/.test(was) && !watching.has(el)) watch(el);
        return;
      }
      if (chrome(el) || overlay(el)) return;
      if (!has(el, 'card') && el.closest('[data-kc~="card"]')) return;
      if (!has(el, 'tile') && el.closest('[data-kc~="tile"]')) return;
      if (el.tagName !== 'FORM' && el.closest('form')) return;
      if (el.closest('[data-kc-hold]')) return;   // a gallery is shown once, already final: its plates never fade in
      if (el.tagName === 'P' && el.closest('li, blockquote, [data-kc-about]')) return;
      var r = rect(el);
      if (r.height === 0) return;
      if (r.top < fold && !veilUp) { el.setAttribute('data-kc-rv', 'skip'); return; }
      el.setAttribute('data-kc-rv', /^H[12]$/.test(el.tagName) ? 'wait-h' : 'wait-b');
      watch(el);
    });
  }

  // 6. Cards and plates tilt a little under the mouse, like card stock, with a paper sheen
  function tilt() {
    if (!on('cardTilt') || still || !fine() || window.KCFOJ_commerce()) return;
    [].forEach.call(D.querySelectorAll('[data-kc~="card"], [data-kc~="tile"]'), function (t) {
      if (t.getAttribute('data-kc-tilt') || t.closest('.kc-lb') || overlay(t)) return;
      t.setAttribute('data-kc-tilt', '1');
      self.add(t);
      var plate = has(t, 'tile'), ax = plate ? 8 : 4, ay = plate ? 10 : 5, lift = plate ? 6 : 4, grow = plate ? 1.02 : 1;
      if (t.tagName !== 'IMG') {
        if (getComputedStyle(t).position === 'static') mark(t, 'rel');
        mark(t, 'sheen');
      }
      var raf = 0, px = 0, py = 0;
      t.addEventListener('pointermove', function (e) {
        if (e.pointerType && e.pointerType !== 'mouse') return;   // fingers and pens never tilt
        var r = rect(t);
        px = (e.clientX - r.left) / r.width - 0.5; py = (e.clientY - r.top) / r.height - 0.5;
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = 0;
          t.style.transition = 'transform .15s ease-out, box-shadow .3s';
          t.style.transform = 'perspective(900px) rotateX(' + (-py * ax).toFixed(2) + 'deg) rotateY(' + (px * ay).toFixed(2) + 'deg) translateY(-' + lift + 'px) scale(' + grow + ')';
          t.style.setProperty('--mx', ((px + 0.5) * 100).toFixed(1) + '%');
          t.style.setProperty('--my', ((py + 0.5) * 100).toFixed(1) + '%');
        });
      });
      t.addEventListener('pointerleave', function () {
        if (raf) { cancelAnimationFrame(raf); raf = 0; }
        t.style.transition = 'transform .8s cubic-bezier(.2,.7,.2,1), box-shadow .5s';
        t.style.transform = '';
      });
    });
  }

  // 7. The plate viewer: opened like a book, with the caption on the left leaf.
  //    Arrows, swipes and the keyboard move between plates; Escape closes; focus comes back.
  var lb = null, lbList = [], lbI = 0, lbFrom = null;
  function imgOf(t) { return t.tagName === 'IMG' ? t : t.querySelector('img'); }
  function headOf(t) {
    // The title of the section the plates sit in, as a running head
    var hs = D.querySelectorAll('h1, h2'), best = '';
    for (var i = 0; i < hs.length; i++) {
      if (hs[i].compareDocumentPosition(t) & 4) { if (!chrome(hs[i])) best = hs[i].textContent.trim(); } else break;
    }
    return best.slice(0, 60);
  }
  function lbShow() {
    var t = lbList[lbI], im = lb.querySelector('.kc-lb-page img'), src = imgOf(t), alt = src ? (src.getAttribute('alt') || '').trim() : '';
    if (/^(image|photo|picture|img)[\s_-]*\d*$/i.test(alt)) alt = '';
    im.src = src ? (src.currentSrc || src.src) : '';
    im.alt = alt;
    var fol = 'fol. ' + roman(lbI + 1, true);
    lb.querySelector('.kc-lb-fol').textContent = fol;
    lb.querySelector('.kc-lb-cap').textContent = alt;
    lb.querySelector('.kc-lb-head').textContent = headOf(t) || KC.name;
    lb.querySelector('.kc-lb-mcap').innerHTML = '<b></b><span></span>';
    lb.querySelector('.kc-lb-mcap b').textContent = fol;
    lb.querySelector('.kc-lb-mcap span').textContent = alt;
    lb.querySelector('.kc-lb-count').textContent = fol + '  /  ' + roman(lbList.length, true);
  }
  function lbStep(d) {
    lbI = (lbI + d + lbList.length) % lbList.length;
    var im = lb.querySelector('.kc-lb-page img');
    im.style.opacity = 0;
    setTimeout(function () { lbShow(); im.style.opacity = 1; }, 180);
  }
  function lbOpen_() { return !!(lb && lb.classList.contains('kc-open')); }
  function lbClose() {
    lb.classList.remove('kc-open');
    R.classList.remove('kc-lock');
    setTimeout(function () { if (!lb.classList.contains('kc-open') && lb.parentNode) lb.parentNode.removeChild(lb); }, 450);
    if (lbFrom && lbFrom.focus) lbFrom.focus();
  }
  function lbOpen(list, i, from) {
    lbList = list; lbI = Math.max(0, i); lbFrom = from;
    if (!lb) {
      lb = mk('div', 'kc-lb',
        '<div class="kc-lb-book">' +
          '<div class="kc-lb-leaf"><span class="kc-lb-head"></span><span class="kc-lb-fol"></span><span class="kc-lb-cap"></span></div>' +
          '<figure class="kc-lb-page" style="margin:0"><img alt=""><figcaption class="kc-lb-mcap"></figcaption></figure>' +
        '</div>' +
        '<button type="button" class="kc-lb-x" aria-label="Close">\u00D7</button><button type="button" class="kc-lb-prev" aria-label="Previous plate">\u2039</button><button type="button" class="kc-lb-next" aria-label="Next plate">\u203A</button><div class="kc-lb-count" aria-live="polite"></div>');
      lb.setAttribute('role', 'dialog');
      lb.setAttribute('aria-modal', 'true');
      lb.setAttribute('aria-label', 'Plate viewer');
      lb.addEventListener('click', function (e) {
        if (e.target.closest('.kc-lb-prev')) return lbStep(-1);
        if (e.target.closest('.kc-lb-next')) return lbStep(1);
        if (e.target.closest('.kc-lb-x') || !e.target.closest('.kc-lb-book')) lbClose();
      });
      var sx = 0;
      lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
      lb.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) lbStep(dx < 0 ? 1 : -1); });
    }
    D.body.appendChild(lb);
    lbShow();
    R.classList.add('kc-lock');
    requestAnimationFrame(function () { requestAnimationFrame(function () { lb.classList.add('kc-open'); lb.querySelector('.kc-lb-x').focus(); }); });
  }
  listen('key', function (e) {
    if (!lbOpen_()) return;
    if (e.key === 'Escape') { e.preventDefault(); lbClose(); }
    else if (e.key === 'ArrowRight') lbStep(1);
    else if (e.key === 'ArrowLeft') lbStep(-1);
    else if (e.key === 'Tab') {
      // Keep focus inside the viewer while it is open
      var b = [].filter.call(lb.querySelectorAll('button'), function (x) { return x.offsetParent !== null; });
      if (!b.length) return;
      var i = b.indexOf(D.activeElement);
      e.preventDefault();
      b[(i + (e.shiftKey ? -1 : 1) + b.length) % b.length].focus();
    }
  });
  function gallery() {
    if (!on('plateViewer')) return;
    [].forEach.call(D.querySelectorAll('[data-kc~="tile"]'), function (t) {
      if (t.getAttribute('data-kc-g') || t.closest('.kc-lb') || overlay(t)) return;
      t.setAttribute('data-kc-g', '1');
      if (!t.hasAttribute('tabindex') && !t.closest('a, button')) { t.setAttribute('tabindex', '0'); t.setAttribute('role', 'button'); t.setAttribute('aria-label', 'Open plate'); }
      function open(e) {
        var a = t.closest('a[href]');
        if (a && !/^(#|javascript)/i.test(a.getAttribute('href'))) return;
        e.preventDefault(); e.stopPropagation();
        var list = [].slice.call(D.querySelectorAll('[data-kc~="tile"]'));
        lbOpen(list, list.indexOf(t), t);
      }
      t.addEventListener('click', open);
      t.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') open(e); });
    });
  }

  // 8. The night page: a dark band where a candle follows your cursor, or your scroll,
  //    lighting the quote and a mandala hidden in the leather. Its measurements are taken
  //    once and kept; on a touch screen it only moves when you scroll or touch, and rests
  //    once it arrives.
  var shadowEl = null, lanternDirty = function () {}, lanternNow = null;
  listen('scroll', function () { if (lanternNow) lanternNow.scroll(); });
  listen('resize', function () { if (lanternNow) lanternNow.resize(); });
  function lanternStop() { if (lanternNow) lanternNow.stop(); lanternNow = null; lanternDirty = function () {}; }
  function lantern(sec) {
    var q = sec.querySelector('.kc-shadow-q'), art = sec.querySelector('.kc-night-art');
    lanternStop();
    if (still || !on('shadowLight')) { sec.classList.add('kc-lit'); return; }
    var mouse = fine();
    var x = 0.3, y = 0.5, tx = 0.3, ty = 0.5, rr = 150, rt = 150, inside2 = false, live = false, raf = 0, G = null;
    function measure() {
      var r = rect(sec), rq = rect(q), sx = window.pageXOffset, sy = window.pageYOffset;
      G = { left: r.left + sx, top: r.top + sy, w: r.width || 1, h: r.height || 1, ql: rq.left - r.left, qt: rq.top - r.top, qw: rq.width, qh: rq.height, al: 0, at: 0 };
      if (art) { var ra = rect(art); G.al = ra.left - r.left; G.at = ra.top - r.top; }
    }
    lanternDirty = function () { G = null; wake(); };
    function wake() { if (live && !raf) raf = requestAnimationFrame(tick); }
    function tick(t) {
      raf = 0;
      if (!D.contains(sec)) return;
      if (!G) measure();
      var vh = window.innerHeight, top = G.top - window.pageYOffset;
      var base = Math.max(140, Math.min(260, window.innerWidth * 0.22));
      rt = base;
      if (!inside2) {
        var p = Math.min(1, Math.max(0, (vh - top) / (vh + G.h)));
        if (mouse) {
          tx = 0.14 + 0.72 * p + 0.05 * Math.sin(t / 1300);
          ty = 0.5 + 0.16 * Math.sin(p * Math.PI * 2 + t / 2100);
        } else {
          tx = 0.14 + 0.72 * p;
          ty = 0.5 + 0.16 * Math.sin(p * Math.PI * 2);
          // 1 when the quote sits mid-screen, easing to 0 as it moves away
          var mid = (top + G.qt + G.qh / 2) / vh, near = Math.max(0, 1 - Math.abs(mid - 0.5) / 0.32);
          near = near * near * (3 - 2 * near);
          var qx = (G.ql + G.qw / 2) / G.w, qy = (G.qt + G.qh / 2) / G.h;
          tx += (qx - tx) * near; ty += (qy - ty) * near;
          rt = base + (Math.hypot(G.qw, G.qh) / 2 / 0.4 - base) * near;
        }
      }
      var k = inside2 ? 0.2 : 0.07;
      x += (tx - x) * k; y += (ty - y) * k; rr += (rt - rr) * 0.08;
      var px = x * G.w, py = y * G.h;
      sec.style.setProperty('--kc-r', Math.round(rr) + 'px');
      sec.style.setProperty('--x', px.toFixed(1) + 'px');
      sec.style.setProperty('--y', py.toFixed(1) + 'px');
      q.style.setProperty('--qx', (px - G.ql).toFixed(1) + 'px');
      q.style.setProperty('--qy', (py - G.qt).toFixed(1) + 'px');
      if (art) {
        art.style.setProperty('--ax', (px - G.al).toFixed(1) + 'px');
        art.style.setProperty('--ay', (py - G.at).toFixed(1) + 'px');
      }
      // A mouse keeps the candle gently drifting while it is in view; elsewhere it rests once it arrives
      var moving = Math.abs(tx - x) > 0.0006 || Math.abs(ty - y) > 0.0006 || Math.abs(rt - rr) > 0.6;
      if (live && (mouse || inside2 || moving)) raf = requestAnimationFrame(tick);
    }
    var io = null, ro = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(function (e) {
        live = e[e.length - 1].isIntersecting;
        if (live) { G = null; wake(); }
      });
      io.observe(sec);
    } else { sec.classList.add('kc-lit'); }
    if (window.ResizeObserver) { ro = new ResizeObserver(function () { G = null; wake(); }); ro.observe(sec); }
    lanternNow = {
      scroll: function () { if (live) { if (!mouse) sec.classList.add('kc-used'); wake(); } },
      resize: function () { G = null; wake(); },
      stop: function () { live = false; if (raf) cancelAnimationFrame(raf); raf = 0; if (io) io.disconnect(); if (ro) ro.disconnect(); }
    };
    function spot(cx, cy) {
      if (!G) measure();
      tx = (cx + window.pageXOffset - G.left) / G.w; ty = (cy + window.pageYOffset - G.top) / G.h;
    }
    // A mouse carries the candle directly. On phones it follows the scroll and settles on the
    // quote, and a finger can carry it too. Whichever is actually used decides.
    sec.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      mouse = true; inside2 = true; sec.classList.add('kc-used');
      spot(e.clientX, e.clientY); wake();
    });
    sec.addEventListener('pointerleave', function (e) { if (!e.pointerType || e.pointerType === 'mouse') { inside2 = false; wake(); } });
    var touch = function (e) {
      var tp = e.touches[0];
      if (!tp) return;
      mouse = false; inside2 = true; sec.classList.add('kc-used');
      spot(tp.clientX, tp.clientY); wake();
    };
    sec.addEventListener('touchstart', touch, { passive: true });
    sec.addEventListener('touchmove', touch, { passive: true });
    sec.addEventListener('touchend', function () { inside2 = false; wake(); }, { passive: true });
    sec.addEventListener('touchcancel', function () { inside2 = false; wake(); }, { passive: true });
  }
  function shadow() {
    if (shadowEl && D.contains(shadowEl)) return;
    var hs = D.querySelectorAll('h1, h2, h3'), anchor = null;
    for (var i = 0; i < hs.length; i++) {
      if (/contact/i.test(hs[i].textContent) && !chrome(hs[i]) && !overlay(hs[i])) { anchor = sectionOf(hs[i]); break; }
    }
    if (!anchor) return;
    strays('.kc-shadow', null);
    shadowEl = mk('section', 'kc-shadow', '<div class="kc-night-art" aria-hidden="true">' + mandalaSVG('') + '</div><div class="kc-lantern"></div><blockquote class="kc-shadow-q"></blockquote><div class="kc-shadow-hint"></div>');
    shadowEl.setAttribute('aria-label', 'A quotation');
    var q = shadowEl.querySelector('.kc-shadow-q');
    q.textContent = KC.quote;
    var by = mk('cite', 'kc-shadow-by'); by.textContent = KC.by; q.appendChild(by);
    var hint = shadowEl.querySelector('.kc-shadow-hint');
    hint.textContent = fine() ? 'Move your light through the dark' : 'Scroll or drag to carry the light';
    hint.setAttribute('aria-hidden', 'true');
    anchor.parentElement.insertBefore(shadowEl, anchor);
    lantern(shadowEl);
  }

  function unstick() {
    if (R.classList.contains('kc-lock') && !lbOpen_()) R.classList.remove('kc-lock');
  }
  setInterval(unstick, 1500);
  listen('scroll', unstick);
  listen('key', unstick);

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
    var first = lastPath === null;
    lastPath = location.pathname;
    if (!first) arrival = false;
    heroEl = null; heroSoft = false;
    if (heroIO) { heroIO.disconnect(); heroIO = null; }
    [].forEach.call(D.querySelectorAll('[' + HERO + ']'), clearHero);
    [].forEach.call(D.querySelectorAll('.kc-atmos'), function (x) { x.parentNode.removeChild(x); });
    atmos = null;
    if (bandEl && bandEl.parentNode) bandEl.parentNode.removeChild(bandEl);
    bandEl = null; bandFails = 0; bandShown = false; clearTimeout(bandTimer);
    if (shadowEl && shadowEl.parentNode) shadowEl.parentNode.removeChild(shadowEl);
    shadowEl = null; lanternStop();
  }
  window.KCFOJ_wow = function () {
    if (!D.body) return;
    routeCheck();
    var home = isHome();
    [home && hero, home && band, home && on('nightPage') && shadow, hands, tilt, gallery, reveal].forEach(function (f) {
      if (!f) return;
      try { f(); } catch (e) { if (window.console) console.warn('KCFOJ book:', e); }
    });
    // Anything that moved the page may have moved the night page too
    lanternDirty();
  };
  window.KCFOJ = {
    version: '3.2.2',
    replayIntro: function () { window.scrollTo(0, 0); showVeil(true); surface(true); },
    stats: function () {
      var s = window.KCFOJ_stats || {}, out = {};
      for (var k in s) out[k] = typeof s[k] === 'number' ? Math.round(s[k] * 10) / 10 : s[k];
      out.cover = R.classList.contains('kc-cover') ? 'on' : (R.classList.contains('kc-boot') ? 'lifted' : 'no boot block');
      out.heldGalleries = D.querySelectorAll('[data-kc-hold="1"]').length;
      out.folios = D.querySelectorAll('[data-kc-f~="box"]').length;
      return out;
    }
  };
})();

/* ===== Part 4: illuminated initials, chapter numerals, rubric ornaments =====
   Each section heading carries a small rubric numeral above it (I, II, III,
   so a page reads as chapters; page titles get a pilcrow) and, from v2.6, a
   rubric ornament beneath it: two gold rules and a red star. The first long
   paragraph after a heading opens with an illuminated initial. */
(function () { if (window.KCFOJ_SKIP) return;
  var D = document, on = window.KCFOJ_on || function () { return true; }, mark = window.KCFOJ_mark;
  var roman = window.KCFOJ_roman || function (n) { return String(n); };
  var STAR = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M6 0L7.6 4.4 12 6 7.6 7.6 6 12 4.4 7.6 0 6 4.4 4.4z' fill='%238B2A24'/%3E%3C/svg%3E\")";
  var css = `
[data-kc-initial="1"]::first-letter{float:left;font-family:var(--kc-versal);font-weight:400;font-style:normal;font-size:3.6em;line-height:.82;color:var(--kc-accent);padding:.1em .12em .03em;margin:.06em .16em 0 0;border:1px solid rgba(168,132,79,.75);background:rgba(139,42,36,.05)}
[data-kc-r~="num"]::before{content:attr(data-kc-no);display:block;width:max-content;margin:0 auto .8em;padding:0 44px;font:500 12px/1 var(--kc-serif);font-style:normal;letter-spacing:.32em;text-indent:.32em;text-transform:none;color:var(--kc-accent);background:linear-gradient(var(--kc-accent),var(--kc-accent)) left center/30px 1px no-repeat,linear-gradient(var(--kc-accent),var(--kc-accent)) right center/30px 1px no-repeat}
[data-kc-r~="num"][data-kc-r~="left"]::before{margin-left:0;padding-left:0;text-indent:0;background:linear-gradient(var(--kc-accent),var(--kc-accent)) right center/30px 1px no-repeat}
[data-kc-r~="num"][data-kc-no="\\00B6"]::before{font-size:15px;letter-spacing:0;text-indent:0}
[data-kc-r~="orn"]::after{content:"";display:block;width:clamp(110px,16vw,150px);height:12px;margin:.55em auto 0;background:linear-gradient(var(--kc-gold),var(--kc-gold)) left center/calc(50% - 15px) 1px no-repeat,linear-gradient(var(--kc-gold),var(--kc-gold)) right center/calc(50% - 15px) 1px no-repeat,${STAR} center/10px 10px no-repeat}
[data-kc-r~="orn"][data-kc-r~="left"]::after{margin-left:0}
`;
  window.KCFOJ_style(css, 'initials');

  function skip(el) { return !!el.closest('header, footer, nav, form, blockquote, li, a, button, .kc-lb, .kc-band, .kc-shadow, [data-kc~="footer"], [data-kc~="header"], [data-kc~="card"], .kc-margin, .kc-def, .kc-colophon, [data-kc-about="lex"], .kc-veil, ' + window.KCFOJ_DIALOGS); }
  function left(el) { return /^(left|start|justify)$/.test(getComputedStyle(el).textAlign); }
  function fontOnce() {
    if (D.getElementById('kc-initial-font')) return;
    var l = D.createElement('link');
    l.id = 'kc-initial-font'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap&text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    D.head.appendChild(l);
  }

  function illuminate() {
    if (window.KCFOJ_commerce()) return;
    var n = 0, nums = on('chapterNumerals'), orns = on('rubricOrnaments');
    if (nums || orns) {
      [].forEach.call(D.querySelectorAll('h1, h2, h3'), function (h) {
        if (skip(h)) return;
        if (!h.hasAttribute('data-kc-r')) {
          var s = getComputedStyle(h), t = h.textContent.trim();
          if (parseFloat(s.fontSize) < 28 || t.length < 2 || t.length > 60 || /^(right|end)$/.test(s.textAlign)) return;
          mark(h, 'rubric', 'data-kc-r');
          if (left(h)) mark(h, 'left', 'data-kc-r');
          if (nums) mark(h, 'num', 'data-kc-r');
          // The ornament goes under section headings (not page titles), as in v2.6
          if (orns && h.tagName !== 'H1') mark(h, 'orn', 'data-kc-r');
        }
        if (!nums || !/(^| )rubric( |$)/.test(h.getAttribute('data-kc-r') || '')) return;
        var no = h.tagName === 'H2' ? roman(++n) : '\u00B6';
        if (h.getAttribute('data-kc-no') !== no) h.setAttribute('data-kc-no', no);
      });
    }
    if (!on('initials')) return;
    // The first long, left-aligned paragraph after each heading opens with an illuminated initial
    var armed = true;
    [].forEach.call(D.querySelectorAll('h1, h2, h3, h4, p'), function (el) {
      if (skip(el)) return;
      if (el.tagName !== 'P') { armed = true; return; }
      if (!armed || el.hasAttribute('data-kc-initial')) { if (el.hasAttribute('data-kc-initial')) armed = false; return; }
      var t = el.textContent.trim();
      if (t.length < 160 || !/^[A-Za-z]/.test(t) || !left(el)) return;
      el.setAttribute('data-kc-initial', '1');
      armed = false;
      fontOnce();
    });
  }

  var prev = window.KCFOJ_wow;
  window.KCFOJ_wow = function () {
    if (prev) prev();
    try { illuminate(); } catch (e) { if (window.console) console.warn('KCFOJ initials:', e); }
  };
})();

/* ===== Part 5: back to top, a mandala inside an ink ring =====
   A small vellum device in the corner. As you read down the page a rubric
   ring closes around it and, inside, v2.6's gold mandala draws itself line
   by line: petals clockwise, then the inner ring and the star. At the end
   its heart turns red. Point at it (or reach it with the keyboard) and a
   hand points up; tap it to return to the top. With mandalaNav off in
   Part 0 it is the plain ink ring with the hand. */
(function () { if (window.KCFOJ_SKIP) return;
 var D = document, R = D.documentElement, on = window.KCFOJ_on || function () { return true; };
 var listen = window.KCFOJ_listen || function () {};
 var SIDE = 'right'; // change to 'left' if something else lives in that corner
 var still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 var css = `
.kc-compass{position:fixed;${SIDE}:max(16px,env(safe-area-inset-${SIDE},0px));bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:2147483300;width:52px;height:52px;padding:0;margin:0;border:0;border-radius:50%;background:var(--kc-card);box-shadow:0 10px 24px -14px rgba(31,26,23,.55),0 0 0 1px rgba(168,132,79,.4);cursor:pointer;opacity:0;transform:translateY(10px) scale(.92);pointer-events:none;transition:opacity .5s ease,transform .6s var(--kc-e),box-shadow .5s ease;-webkit-tap-highlight-color:transparent}
.kc-compass.kc-on{opacity:1;transform:none;pointer-events:auto}
.kc-compass svg{display:block;width:100%;height:100%}
.kc-compass .kc-ring-ghost{fill:none;stroke:rgba(168,132,79,.3);stroke-width:1.4}
.kc-compass .kc-ring{fill:none;stroke:var(--kc-accent);stroke-width:2.4;stroke-linecap:round}
.kc-compass .kc-cg>*{fill:none;stroke:var(--kc-gold);stroke-width:2;stroke-linecap:round}
.kc-compass .kc-cg-ghost{opacity:.2}
.kc-compass .kc-mand{transition:opacity .35s ease}
.kc-compass .kc-cdot{fill:var(--kc-gold);opacity:.35;transition:fill .6s ease,opacity .6s ease}
.kc-compass .kc-up{fill:var(--kc-accent);opacity:0;transition:opacity .35s ease}
.kc-compass.kc-done .kc-cdot{fill:var(--kc-accent);opacity:1}
.kc-compass.kc-done{box-shadow:0 10px 24px -12px rgba(31,26,23,.5),0 0 0 1px var(--kc-gold),0 0 18px -2px rgba(168,132,79,.55)}
@media (hover:hover){.kc-compass.kc-on:hover{transform:translateY(-2px)}.kc-compass:hover .kc-up{opacity:1}.kc-compass:hover .kc-mand,.kc-compass:hover .kc-cdot{opacity:.12}}
.kc-compass:focus-visible .kc-up{opacity:1}
.kc-compass:focus-visible .kc-mand,.kc-compass:focus-visible .kc-cdot{opacity:.12}
.kc-compass.kc-plain .kc-mand,.kc-compass.kc-plain .kc-cdot{display:none}
.kc-compass.kc-plain .kc-up{opacity:.75}
.kc-compass.kc-plain.kc-done .kc-up{opacity:1}
@media (max-width:600px){.kc-compass{width:46px;height:46px}}
.kc-lock .kc-compass{opacity:0;pointer-events:none}
.kc-still .kc-compass,.kc-still .kc-compass *{transition:none!important}
@media print{.kc-compass{display:none}}
`;
 window.KCFOJ_style(css, 'compass');
 var HAND = 'M1 4.6H5.6V15.4H1Z M6.8 5.4C9.2 4.6 12.2 4.1 15.4 4.3L29 5.7C30.9 5.9 30.9 8.9 29 9.1L18.6 9.3C21 9.5 21.2 12.3 18.7 12.6C20.9 13 20.9 15.5 18.5 15.7C20 16.2 19.6 18.3 17.3 18.3L12 18.1C9.9 18 8.3 17.2 6.8 15.9Z';
 // v2.6's compass mandala, drawn inside the ring: twelve petals, an inner ring, a star
 function shapes() {
   var s = '';
   for (var i = 0; i < 12; i++) s += '<ellipse rx="6.4" ry="16" cy="-20.5" transform="rotate(' + i * 30 + ')"/>';
   return s + '<circle r="17"/><path d="M0 -10L3 -3 10 0 3 3 0 10 -3 3 -10 0 -3 -3Z"/>';
 }
 var plain = !on('mandalaNav');
 var btn = D.createElement('button');
 btn.type = 'button';
 btn.id = 'kc-compass';
 btn.className = 'kc-compass' + (plain ? ' kc-plain' : '');
 btn.title = 'Back to top';
 btn.setAttribute('aria-label', 'Back to top');
 btn.setAttribute('aria-hidden', 'true');
 btn.tabIndex = -1;
 btn.innerHTML = '<svg viewBox="-50 -50 100 100" aria-hidden="true" focusable="false">' +
   '<circle class="kc-ring-ghost" r="45"/><circle class="kc-ring" r="45" transform="rotate(-90)"/>' +
   '<g class="kc-mand"><g class="kc-cg kc-cg-ghost">' + shapes() + '</g><g class="kc-cg kc-cg-ink">' + shapes() + '</g></g>' +
   '<circle class="kc-cdot" r="3.6"/>' +
   '<path class="kc-up" transform="rotate(-90) scale(' + (plain ? 1.3 : 1.15) + ') translate(-16 -11)" d="' + HAND + '"/></svg>';
 var ring = null, L = 283, ink = [], lens = [], lastP = -1, inner = null, ticking = false;
 function measure() {
   ring = btn.querySelector('.kc-ring');
   try { L = Math.ceil(ring.getTotalLength()) + 1; } catch (e) {}
   ring.style.strokeDasharray = L;
   ring.style.strokeDashoffset = L;
   ink = [].slice.call(btn.querySelectorAll('.kc-cg-ink > *'));
   lens = ink.map(function (el) { var n = 0; try { n = el.getTotalLength(); } catch (e) {} return Math.ceil(n || 120) + 1; });
   ink.forEach(function (el, i) { el.style.strokeDasharray = lens[i]; el.style.strokeDashoffset = lens[i]; });
   lastP = -1;
 }
 // The ring closes steadily; the petals take their turns clockwise, then the inner ring and the star
 function draw(p) {
   if (p === lastP || !ring) return;
   lastP = p;
   ring.style.strokeDashoffset = (L * (1 - p)).toFixed(1);
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
   var show = w.p >= 0 && w.top > 140 && !D.querySelector('.kc-veil:not(.kc-go)') && !window.KCFOJ_commerce();
   if (show !== btn.classList.contains('kc-on')) {
     btn.classList.toggle('kc-on', show);
     btn.setAttribute('aria-hidden', show ? 'false' : 'true');
     btn.tabIndex = show ? 0 : -1;
   }
   draw(w.p < 0 ? 0 : Math.min(1, w.p));
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
 listen('scroll', update);
 listen('resize', function () { findScroller(); update(); });
 var prev = window.KCFOJ_wow;
 window.KCFOJ_wow = function () {
   if (prev) prev();
   try { mount(); } catch (e) { if (window.console) console.warn('KCFOJ back to top:', e); }
 };
 if (D.readyState !== 'loading') mount(); else D.addEventListener('DOMContentLoaded', mount);
})();

/* ===== Part 6: event date seals =====
  A date seal on the corner of each event photo: weekday, a large rubric
  day number and the month in small capitals, framed in gold. */
(function () { if (window.KCFOJ_SKIP) return;
 var D = document, on = window.KCFOJ_on || function () { return true; }, mark = window.KCFOJ_mark;
 var HIDE_PILL = true; // false keeps Square's own date pill under the photo as well
 var css = `
.kc-seal{position:absolute;z-index:2;display:flex;flex-direction:column;align-items:center;min-width:62px;padding:7px 9px 8px;background:var(--kc-card);border:1px solid var(--kc-gold);box-shadow:inset 0 0 0 3px var(--kc-card),inset 0 0 0 4px rgba(168,132,79,.5),0 12px 26px -12px rgba(20,12,10,.6);color:var(--kc-ink);text-align:center;pointer-events:none;transform-origin:50% 60%;transition:transform .5s var(--kc-e)}
.kc-seal-wd{font:500 9px/1 var(--kc-mono);letter-spacing:.2em;text-transform:uppercase;color:var(--kc-verd);margin:1px 0 4px .2em}
.kc-seal-day{font:400 34px/.95 var(--kc-serif);font-variant-numeric:lining-nums;color:var(--kc-accent)}
.kc-seal-mo{font:500 11px/1 var(--kc-serif);letter-spacing:.2em;text-transform:uppercase;margin-top:5px;padding:5px 0 0 .2em;border-top:1px solid rgba(168,132,79,.6)}
@media (max-width:600px){.kc-seal{min-width:56px;padding:6px 8px 7px}.kc-seal-day{font-size:30px}}
@media (hover:hover){[data-kc~="card"]:hover .kc-seal{transform:rotate(-3deg) scale(1.03)}}
.kc-still .kc-seal{transition:none}
.kc-still [data-kc~="card"]:hover .kc-seal{transform:none}
[data-kc~="sealsrc"]{position:absolute!important;width:1px!important;height:1px!important;margin:-1px!important;padding:0!important;border:0!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;clip-path:inset(50%)!important;white-space:nowrap!important}
`;
 window.KCFOJ_style(css, 'seals');
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
   var rest = t.slice(m[0].length);
   p.only = /^[\s,.]*(\d{4})?[\s,.]*$/.test(rest);
   var y = rest.match(/^[\s,.]*(\d{4})\b/);
   p.y = y ? +y[1] : null;             // a year written right after the date, as in "Oct 8, 2026"
   return p;
 }
 function photoIn(card) {

  var direct = card.querySelector('.featured-event__image img, .featured-event__image [style*="background-image"]');

  if (direct) return direct;

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
   if (!on('dateSeals')) return;
   [].forEach.call(D.querySelectorAll('[data-kc~="card"]'), function (card) {
     var s = card.querySelector('.kc-seal');
     if (s && s._kc) { place(s); return; }
     if (card.getAttribute('data-kc-seal') && !s) card.removeAttribute('data-kc-seal');
     if (card.getAttribute('data-kc-seal')) return;
     var photo = photoIn(card);
     if (!photo) return;
     var leaves = card.querySelectorAll('*'), src = null, p = null;
     for (var i = 0; i < leaves.length && !p; i++) {
       if (leaves[i].childElementCount === 0 && (p = parse(leaves[i].textContent))) src = leaves[i];
     }
     if (!p) return;
     card.setAttribute('data-kc-seal', '1');
     var anchor = /^(IMG|PICTURE|VIDEO)$/.test(photo.tagName) ? photo.parentElement : photo;
     if (getComputedStyle(anchor).position === 'static') mark(anchor, 'rel');
     s = D.createElement('div');
     s.className = 'kc-seal';
     s.setAttribute('aria-hidden', 'true');
     s.innerHTML = (p.wd ? '<span class="kc-seal-wd"></span>' : '') + '<span class="kc-seal-day"></span><span class="kc-seal-mo"></span>';
     if (p.wd) s.querySelector('.kc-seal-wd').textContent = p.wd.slice(0, 3);
     s.querySelector('.kc-seal-day').textContent = String(+p.d);
     s.querySelector('.kc-seal-mo').textContent = MO[p.mo.slice(0, 3).toLowerCase()];
     // The parsed date travels with the seal, for the ribbon in Part 10
     s._kc = { anchor: anchor, photo: photo, card: card, p: p, src: src };
     anchor.appendChild(s);
     place(s);
     // The pill's text stays readable to screen readers; only its look is folded into the seal
     if (HIDE_PILL && p.only) mark(src.closest('[data-kc~="pill"]') || src, 'sealsrc');
   });
 }
 var prev = window.KCFOJ_wow;
 window.KCFOJ_wow = function () {
   if (prev) prev();
   try { seals(); } catch (e) { if (window.console) console.warn('KCFOJ seals:', e); }
 };
})();

/* ===== Part 7: manuscript layouts for the About page =====
  Styles three patterns you type in Square as ordinary text:
  1. Epigraph: a short quote (a quote block, or a paragraph in quotation
     marks followed by a short name line like "C. G. Jung").
  2. Timeline: paragraphs or list items that start with a year and a
     separator, like "1988: First gathering", under a heading containing
     Began, History, Decades, Years, Timeline or Milestones.
  3. Vocabulary: lines like "Shadow: the parts of ourselves we do not see",
     under a heading containing Vocabulary, Lexicon or Glossary. Each term
     gets an anchor (#kc-shadow), so a Lexicon page built this way can be
     linked from the margin notes: set lexiconUrl in Part 0. */
(function () { if (window.KCFOJ_SKIP) return;
 var D = document, mark = window.KCFOJ_mark;
 var EPI = '[data-kc-about="epi"]', BY = '[data-kc-about="by"]', TL = '[data-kc-about="tl"]', LEX = '[data-kc-about="lex"]';
 var css = `
${EPI}{max-width:30em!important;margin:0 auto 1.2em!important;padding:0!important;border:0!important;background:none!important;box-shadow:none!important;text-align:center!important;font:italic 400 clamp(20px,2.4vw,26px)/1.45 var(--kc-serif)!important;color:var(--kc-ink)!important;text-wrap:balance}
${EPI} *{font:inherit!important;text-align:inherit!important;color:inherit!important;margin:0!important}
${EPI}::before{content:"\\2766";display:block;margin:0 auto .5em;font:normal 16px/1 var(--kc-serif);color:var(--kc-accent)}
${BY}{text-align:center!important;margin:0 auto 2.4em!important;font:400 11px/1.4 var(--kc-mono)!important;letter-spacing:.28em!important;text-transform:uppercase;color:var(--kc-accent)!important}
[data-kc~="tllist"]{list-style:none!important;padding-left:0!important;margin-left:0!important}
${TL}{position:relative;list-style:none!important;min-height:2.6em;margin:0!important;padding:.55em 0 .55em 104px!important;text-align:left!important}
${TL}::before{content:"";position:absolute;left:86px;top:0;bottom:0;width:1px;background:rgba(168,132,79,.55)}
${TL}::after{content:"";position:absolute;left:82px;top:1.05em;width:9px;height:9px;background:var(--kc-accent);transform:rotate(45deg);box-shadow:0 0 0 3px var(--kc-cream)}
.kc-tl-year{position:absolute;left:0;top:.45em;width:70px;text-align:right;font:400 1.3em/1.25 var(--kc-serif);font-variant-numeric:lining-nums tabular-nums;color:var(--kc-accent)}
${LEX}{position:relative;min-height:2.9em;margin:0!important;padding:.8em 0 .8em 172px!important;border-bottom:1px solid rgba(168,132,79,.35);text-align:left!important;scroll-margin-top:120px}
${LEX}:target{background:rgba(139,42,36,.05)}
.kc-lex-term{position:absolute;left:0;top:.62em;width:152px;font:italic 400 1.15em/1.3 var(--kc-serif);color:var(--kc-accent)}
@media (max-width:600px){${TL}{padding-left:80px!important}${TL}::before{left:64px}${TL}::after{left:60px}.kc-tl-year{width:52px;font-size:1.1em}${LEX}{padding-left:0!important}.kc-lex-term{position:static;display:block;width:auto;margin-bottom:.2em}}
`;
 window.KCFOJ_style(css, 'about');
 var YEAR = /^((?:1[89]|20)\d0s|(?:1[89]|20)\d\d)\s*[\u00B7\u2022:|\-\u2013\u2014]\s*(?=\S)/;
 var TERM = /^([A-Z][A-Za-z'\-]*(?:\s+[A-Za-z'\-]+){0,3})\s*(?::|\s[\-\u2013\u2014])\s+(?=\S)/;
 var QUOTED = /^["\u201C\u2018'][\s\S]{8,}["\u201D\u2019']$/;
 function skip(el) { return !!el.closest('header, footer, nav, form, [data-kc~="card"], .kc-shadow, .kc-band, .kc-lb, .kc-seal, .kc-margin, .kc-def, .kc-colophon, .kc-veil, ' + window.KCFOJ_DIALOGS); }
 function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
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
   return m[1];
 }
 function about() {
   if (window.KCFOJ_commerce()) return;
   var els = [].filter.call(D.querySelectorAll('h1, h2, h3, h4, p, li, blockquote'), function (el) { return !skip(el) && el.textContent.trim(); });
   var mode = null;
   els.forEach(function (el, i) {
     if (el.closest(EPI) && el.getAttribute('data-kc-about') !== 'epi') return;
     var t = el.textContent.trim(), k = el.getAttribute('data-kc-about') || '';
     // Square sometimes redraws text; if our label went missing, set the line up again
     if (k === 'tl' && !el.querySelector('.kc-tl-year')) { el.removeAttribute('data-kc-about'); k = ''; }
     if (k === 'lex' && !el.querySelector('.kc-lex-term')) { el.removeAttribute('data-kc-about'); k = ''; }
     if (/^H[1-4]$/.test(el.tagName)) {
       mode = /vocabulary|lexicon|glossary/i.test(t) ? 'lex' : /began|history|decades|years|timeline|milestones/i.test(t) ? 'tl' : null;
       return;
     }
     if (k) return;
     if (mode === 'tl' && label(el, YEAR, 'kc-tl-year')) {
       el.setAttribute('data-kc-about', 'tl');
       if (el.tagName === 'LI' && el.parentElement) mark(el.parentElement, 'tllist');
       return;
     }
     var term = mode === 'lex' && t.length > 12 && label(el, TERM, 'kc-lex-term');
     if (term) {
       el.setAttribute('data-kc-about', 'lex');
       el.setAttribute('data-kc-initial', 'skip');   // keeps Part 4 from giving a definition an initial
       if (!el.id) el.id = 'kc-' + slug(term);
       return;
     }
     var next = null;
     for (var j = i + 1; j < els.length && !next; j++) if (!el.contains(els[j])) next = els[j];
     var byLine = next && !/^H[1-4]$/.test(next.tagName) && !next.getAttribute('data-kc-about') && next.textContent.trim().length <= 48;
     if (t.length <= 220 && (el.tagName === 'BLOCKQUOTE' || (QUOTED.test(t) && byLine))) {
       el.setAttribute('data-kc-about', 'epi');
       if (byLine) next.setAttribute('data-kc-about', 'by');
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

/* ===== Part 8: night page quote rotation =====
  A first visit keeps the night page's original quote. Each later visit
  shows the next quote in the list, and it stays the same for that whole
  visit. Edit QUOTES to change the set; the first entry is the default. */
(function () { if (window.KCFOJ_SKIP) return;
 var D = document, on = window.KCFOJ_on || function () { return true; };
 var QUOTES = [
   'Who looks outside, dreams; who looks inside, awakes.',                                             // Letter to Fanny Bowditch, 22 October 1916 (Letters, vol. 1)
   'One does not become enlightened by imagining figures of light, but by making the darkness conscious.', // "The Philosophical Tree," Alchemical Studies, CW 13, para. 335
   'Knowing your own darkness is the best method for dealing with the darknesses of other people.',       // Letter to Kendig B. Cully, 25 September 1937 (Letters, vol. 1)
   'When an inner situation is not made conscious, it happens outside, as fate.',                         // Aion, CW 9ii, para. 126
   'Everything that irritates us about others can lead us to an understanding of ourselves.'              // Memories, Dreams, Reflections
 ];
 window.KCFOJ_style('.kc-shadow-q.kc-q-long{font-size:clamp(28px,4.8vw,60px)!important;max-width:19ch!important}', 'quotes');
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
   if (!q || q.dataset.kcQuote || !on('quoteRotation')) return;
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

/* ===== Part 9: the Living Margin =====
   Jung's vocabulary is glossed where it first appears in the body text of
   each page. On wide screens the glosses sit in the margin beside the line,
   lettered a, b, c like a scholar's apparatus, with links to programs and
   essays on this site where the idea came up. On phones, or wherever the
   margin is taken, tap the word for the same note. The words in the index
   line, and the drifting words above it, open these notes too.
   Terms and wording live in Part 0. */
(function () { if (window.KCFOJ_SKIP) return;
  var D = document, R = D.documentElement, W = window.KCFOJ_WORDS || {};
  var on = window.KCFOJ_on || function () { return true; }, listen = window.KCFOJ_listen || function () {};
  var mark = window.KCFOJ_mark, has = window.KCFOJ_has;
  var LEX = (W.lexicon || []).filter(function (e) { return e && e.term && e.find && e.def; });
  var MAX = W.glossMax || 8, PER = 2, GAP = 40, EDGE = 20, WIDE = 1100, NOTE = 250;
  var css = `
.kc-gloss{cursor:pointer;text-decoration:underline dotted;text-decoration-color:rgba(139,42,36,.55);text-decoration-thickness:1px;text-underline-offset:.22em;border-radius:1px;transition:text-decoration-color .25s}
.kc-gloss:hover,.kc-gloss[aria-expanded="true"]{text-decoration-style:solid;text-decoration-color:var(--kc-accent)}
.kc-gloss:focus-visible{outline:2px solid var(--kc-accent);outline-offset:2px}
.kc-gloss-m{text-decoration-color:rgba(139,42,36,.32)}
.kc-key{display:inline-block;margin-left:.1em;font:italic 500 .66em/0 var(--kc-serif);color:var(--kc-accent);vertical-align:super;letter-spacing:0}
.kc-key:empty{display:none}
.kc-margin{position:absolute;left:0;top:0;width:100%;height:0;z-index:4;pointer-events:none}
.kc-note{position:absolute;box-sizing:border-box;padding:1px 0 3px 14px;border-left:1px solid rgba(139,42,36,.3);font:400 13.5px/1.45 var(--kc-serif);color:var(--kc-ink-soft);text-align:left;text-wrap:pretty;pointer-events:auto;animation:kcNoteIn .9s var(--kc-e) both;transition:opacity .8s var(--kc-e)}
.kc-note.kc-note-l{padding:1px 14px 3px 0;border-left:0;border-right:1px solid rgba(139,42,36,.3);text-align:right}
.kc-note[hidden]{display:none}
.kc-note.kc-note-wait{opacity:0;pointer-events:none}
@keyframes kcNoteIn{from{opacity:0}to{opacity:1}}
.kc-note-key{font:italic 500 13px/1 var(--kc-serif);color:var(--kc-accent);margin-right:.4em}
.kc-note-term{font-weight:600;color:var(--kc-accent);margin-right:.2em}
.kc-note-def{font-style:italic}
.kc-note-at{display:block;margin-top:.4em;font:400 12.5px/1.4 var(--kc-serif);font-style:normal;color:var(--kc-verd)}
.kc-note-lab{margin-right:.6em;font:500 9px/1.2 var(--kc-mono);letter-spacing:.18em;text-transform:uppercase}
.kc-def .kc-note-lab{display:block;margin-bottom:.3em}
.kc-note-sep{color:rgba(79,107,94,.6)}
.kc-note a,.kc-def a{color:var(--kc-verd)!important;text-decoration:underline!important;text-decoration-color:rgba(79,107,94,.45)!important;text-decoration-thickness:1px!important;text-underline-offset:.18em}
.kc-note a:hover,.kc-def a:hover{text-decoration-color:currentColor!important}
.kc-note.kc-hi{animation:kcHi 1.8s ease}
@keyframes kcHi{0%,30%{background:rgba(139,42,36,.1)}100%{background:rgba(139,42,36,0)}}
.kc-def{position:fixed;z-index:2147483200;box-sizing:border-box;width:min(340px,calc(100vw - 32px));padding:18px 20px 20px;background:var(--kc-card);border:1px solid rgba(168,132,79,.8);box-shadow:inset 0 0 0 3px var(--kc-card),inset 0 0 0 4px rgba(168,132,79,.35),0 18px 40px -18px rgba(20,12,10,.6);color:var(--kc-ink);text-align:left;opacity:0;transform:translateY(6px);transition:opacity .25s ease,transform .35s var(--kc-e);outline:none}
.kc-def.kc-show{opacity:1;transform:none}
.kc-def[hidden]{display:none}
.kc-def-term{display:block;margin:0 30px 8px 0;font:italic 400 22px/1.2 var(--kc-serif);color:var(--kc-accent)}
.kc-def-term::after{content:"";display:block;width:44px;height:1px;margin-top:9px;background:var(--kc-gold)}
.kc-def-text{display:block;font:400 16px/1.55 var(--kc-serif);color:var(--kc-ink)}
.kc-def .kc-note-at{font-size:14px}
.kc-def-x{position:absolute;top:8px;right:8px;width:32px;height:32px;display:grid;place-items:center;padding:0;border:0;border-radius:50%;background:none;color:var(--kc-ink-soft);font:300 24px/1 Georgia,serif;cursor:pointer}
.kc-def-x:hover{color:var(--kc-accent)}
.kc-still .kc-def{transition:none;transform:none}
.kc-still .kc-note{animation:none;transition:none}
`;
  window.KCFOJ_style(css, 'margin');

  var esc = window.KCFOJ_esc || function (s) { return String(s); };
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function here() { return location.pathname.replace(/\/+$/, ''); }
  var OFF = 'header, footer, nav, form, a, button, [role="button"], h1, h2, h3, h4, h5, h6, blockquote, code, pre, textarea, [data-kc~="card"], .kc-band, .kc-shadow, .kc-lb, .kc-margin, .kc-def, .kc-colophon, [data-kc-about], .kc-seal, .kc-veil, [data-kc-zone], ' + window.KCFOJ_DIALOGS;
  var TAPS = '.kc-gloss, .kc-term, .kc-fw';

  var glosses = [], layer = null, card = null, cardFrom = null, y0 = 0, lastPath = null, uid = 0, kbd = false;

  // Links to places on this site where the idea came up, and to the Lexicon page if there is one
  function refs(e) {
    var out = [];
    (e.at || []).forEach(function (a) {
      if (a && a[1] && a[1].replace(/\/+$/, '') !== here()) out.push('<a href="' + esc(a[1]) + '">' + esc(a[0]) + '</a>');
    });
    var more = W.lexiconUrl ? '<a href="' + esc(W.lexiconUrl) + '#kc-' + slug(e.term) + '">More in the Lexicon</a>' : '';
    if (!out.length && !more) return '';
    return '<span class="kc-note-at">' + (out.length ? '<span class="kc-note-lab">At KCFOJ</span>' + out.join('<span class="kc-note-sep"> \u00B7 </span>') : '') + (more ? (out.length ? '<br>' : '') + more : '') + '</span>';
  }
  function entryIndex(word) {
    for (var k = 0; k < LEX.length; k++) if (LEX[k].find.test(word)) return k;
    return -1;
  }
  function textLen(box) {
    var n = box.textContent.length;
    [].forEach.call(box.querySelectorAll('.kc-key'), function (s) { n -= s.textContent.length; });
    return n;
  }

  // 1. Find first uses of each term in body text and mark them (at most two per paragraph)
  function glossBox(box, used) {
    var w = D.createTreeWalker(box, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) { var p = n.parentElement; return p && !p.closest('a, button, [role="button"], .kc-gloss, code, sup, sub, script, style') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; }
    }), nodes = [], n, added = 0, here2 = 0;
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      while (node && node.nodeValue && glosses.length < MAX && here2 < PER) {
        var best = null;
        for (var k = 0; k < LEX.length; k++) {
          if (used[k]) continue;
          var m = LEX[k].find.exec(node.nodeValue);
          if (m && (!best || m.index < best.m.index)) best = { k: k, m: m };
        }
        if (!best) break;
        used[best.k] = 1;
        var mid = node.splitText(best.m.index), after = mid.splitText(best.m[0].length);
        var span = D.createElement('span');
        span.className = 'kc-gloss';
        span.setAttribute('role', 'button');
        span.setAttribute('tabindex', '0');
        span.setAttribute('aria-expanded', 'false');
        span.setAttribute('data-kc-k', String(best.k));
        mid.parentNode.insertBefore(span, mid);
        span.appendChild(mid);
        var sup = D.createElement('sup');
        sup.className = 'kc-key';
        sup.setAttribute('aria-hidden', 'true');
        span.appendChild(sup);
        glosses.push({ k: best.k, span: span, note: null });
        here2++; added++;
        node = after;
      }
    });
    return added;
  }
  function scan() {
    var changed = false;
    if (window.KCFOJ_commerce()) return false;
    // Forget glosses that Square has redrawn away, so the term can be found again
    glosses = glosses.filter(function (g) {
      if (D.contains(g.span)) return true;
      if (g.note && g.note.parentNode) g.note.parentNode.removeChild(g.note);
      changed = true;
      return false;
    });
    var used = {}, gloss = on('livingMargin');
    glosses.forEach(function (g) { used[g.k] = 1; });
    // Glossed words that came back in a page Square restored from its memory are taken up again
    [].forEach.call(D.querySelectorAll('.kc-gloss'), function (sp) {
      if (glossOf(sp)) return;
      var k = +sp.getAttribute('data-kc-k');
      if (!gloss || !LEX[k] || used[k] || glosses.length >= MAX) {
        var key = sp.querySelector('.kc-key');
        if (key) sp.removeChild(key);
        while (sp.firstChild) sp.parentNode.insertBefore(sp.firstChild, sp);
        sp.parentNode.removeChild(sp);
        return;
      }
      sp.classList.remove('kc-gloss-m');
      sp.removeAttribute('aria-describedby');
      sp.setAttribute('aria-expanded', 'false');
      used[k] = 1;
      glosses.push({ k: k, span: sp, note: null });
      changed = true;
    });
    var boxes = D.querySelectorAll('p, li');
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i];
      if (box.closest(OFF)) continue;
      var len = textLen(box);
      if (len < 20) continue;
      // Links in body text turn rubric without fading from Square's color (Part 2 holds their transitions)
      if (!has(box, 'prose')) { if (window.KCFOJ_markNow) window.KCFOJ_markNow(box, 'prose', true); else mark(box, 'prose'); }
      if (!gloss || len < 60 || glosses.length >= MAX || box.getAttribute('data-kc-scan') === String(len)) continue;
      box.setAttribute('data-kc-scan', String(len));
      if (glossBox(box, used)) changed = true;
    }
    if (window.KCFOJ_settle) window.KCFOJ_settle();
    // Reading order (the margin letters follow it)
    glosses.sort(function (a, b) { return a.span.compareDocumentPosition(b.span) & 4 ? -1 : 1; });
    // Words in the index line and the drifting band open the same notes
    [].forEach.call(D.querySelectorAll('.kc-term:not([data-kc-k]), .kc-fw:not([data-kc-k])'), function (t) {
      var k = entryIndex(t.textContent.trim());
      if (k < 0) { if (t.tagName === 'BUTTON') t.disabled = true; t.setAttribute('data-kc-k', ''); return; }
      t.setAttribute('data-kc-k', String(k));
    });
    return changed;
  }

  // 2. Margin notes, placed beside the line on wide screens when the margin is free
  function ensureLayer() {
    if (layer && D.contains(layer)) return;
    layer = D.createElement('div');
    layer.className = 'kc-margin';
    D.body.appendChild(layer);
    glosses.forEach(function (g) { if (g.note) layer.appendChild(g.note); });
  }
  function noteFor(g) {
    if (g.note) return g.note;
    var e = LEX[g.k], n = D.createElement('div');
    n.className = 'kc-note';
    n.setAttribute('role', 'note');
    n.id = 'kc-note-' + (++uid);
    n.hidden = true;
    n.innerHTML = '<span class="kc-note-key" aria-hidden="true"></span><span class="kc-note-term"></span> <span class="kc-note-def"></span>' + refs(e);
    n.querySelector('.kc-note-term').textContent = e.term;
    n.querySelector('.kc-note-def').textContent = e.def;
    layer.appendChild(n);
    g.note = n;
    return n;
  }
  function park(g) {
    if (g.note) { g.note.hidden = true; g.note.style.visibility = ''; }
    g.span.classList.remove('kc-gloss-m');
    g.span.removeAttribute('aria-describedby');
  }
  function fixedish(el) {
    for (var a = el; a && a !== D.body; a = a.parentElement) if (/fixed|sticky/.test(getComputedStyle(a).position)) return true;
    return false;
  }
  var OBST = 'img, picture, video, iframe, svg, canvas, p, h1, h2, h3, h4, h5, h6, li, a, button, input, textarea, select, blockquote, figure, table, [role="img"]';
  function obstacles() {
    var out = [], els = D.querySelectorAll(OBST), sx = window.pageXOffset, sy = window.pageYOffset;
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.closest('.kc-margin, .kc-def, .kc-compass, header, nav, .kc-veil')) continue;
      var r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      out.push({ el: el, x1: r.left + sx, y1: r.top + sy, x2: r.right + sx, y2: r.bottom + sy });
    }
    return out;
  }
  function blocked(obst, x, y, w, h) {
    for (var i = 0; i < obst.length; i++) {
      var o = obst[i];
      if (o.x1 < x + w && o.x2 > x && o.y1 < y + h && o.y2 > y && !fixedish(o.el)) return o.el;
    }
    return null;
  }
  // For troubleshooting: KCFOJ_margin() in the browser console lists where each note went and why
  var log = [];
  window.KCFOJ_margin = function () { return log; };
  function who(el) { return el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '') + ' "' + el.textContent.trim().slice(0, 24) + '"'; }
  // False when the page scrolls inside a box rather than the window; notes would drift there
  function windowScrolls() {
    var se = D.scrollingElement || R;
    if (se.scrollHeight - window.innerHeight > 40) return true;
    var c = D.querySelectorAll('body, body > *, body > * > *, main');
    for (var i = 0; i < c.length; i++) {
      var s = getComputedStyle(c[i]);
      if (/auto|scroll/.test(s.overflowY) && c[i].scrollHeight - c[i].clientHeight > 40) return false;
    }
    return true;
  }
  function layout() {
    if (!glosses.length) return;
    ensureLayer();
    var vw = R.clientWidth, wide = vw >= WIDE && windowScrolls();
    var lr = layer.getBoundingClientRect(), sx = window.pageXOffset, sy = window.pageYOffset;
    var ox = lr.left + sx, oy = lr.top + sy, obst = null, bottom = { r: -1e9, l: -1e9 };
    log = [];
    glosses.forEach(function (g) {
      var t = LEX[g.k].term;
      if (!wide) { park(g); log.push(t + ': tap card (screen under ' + WIDE + 'px or page scrolls in a box)'); return; }
      var box = g.span.closest('p, li') || g.span.parentElement, br = box.getBoundingClientRect(), sr = g.span.getBoundingClientRect();
      if (!sr.height) { park(g); return; }
      var roomR = vw - br.right - GAP - EDGE, roomL = br.left - GAP - EDGE, line = sr.top + sy - 3;
      if (roomR < 190 && roomL < 190) { park(g); log.push(t + ': tap card (no free margin beside its paragraph)'); return; }
      var n = noteFor(g);
      if (!obst) obst = obstacles();
      // Try both margins, as in a glossed manuscript; take whichever keeps the note nearest its line
      var best = null, hit = null;
      ['r', 'l'].forEach(function (side) {
        var room = side === 'r' ? roomR : roomL;
        if (room < 190) return;
        var w = Math.min(NOTE, room);
        n.classList.toggle('kc-note-l', side === 'l');
        n.style.width = w + 'px';
        n.style.visibility = 'hidden';
        n.hidden = false;
        var x = side === 'r' ? br.right + GAP + sx : br.left - GAP - w + sx, y = Math.max(line, bottom[side] + 14), h = n.offsetHeight;
        var b = blocked(obst, x, y, w, h);
        if (b) { hit = hit || b; return; }
        if (!best || y < best.y - 24) best = { side: side, x: x, y: y, w: w, h: h };
      });
      if (!best) { park(g); log.push(t + ': tap card (margin blocked by ' + who(hit) + ')'); return; }
      var side = best.side, x = best.x, y = best.y, h = best.h;
      n.classList.toggle('kc-note-l', side === 'l');
      n.style.width = best.w + 'px';
      // A paragraph still waiting to rise into view keeps its note hidden until it arrives
      n.classList.toggle('kc-note-wait', !!box.closest('[data-kc-rv^="wait"]'));
      log.push(t + ': margin, ' + (side === 'r' ? 'right' : 'left') + ', y ' + Math.round(y) + ' to ' + Math.round(y + h));
      n.style.left = Math.round(x - ox) + 'px';
      n.style.top = Math.round(y - oy) + 'px';
      n.style.visibility = '';
      bottom[side] = y + h;
      g.span.classList.add('kc-gloss-m');
      g.span.setAttribute('aria-describedby', n.id);
    });
    // Only words whose note sits in the margin carry a letter (a, b, c) tying them to it
    var i = 0;
    glosses.forEach(function (g) {
      var L = g.span.classList.contains('kc-gloss-m') ? String.fromCharCode(97 + i++) : '', sup = g.span.querySelector('.kc-key');
      if (sup && sup.textContent !== L) sup.textContent = L;
      if (g.note) { var nk = g.note.querySelector('.kc-note-key'); if (nk.textContent !== L) nk.textContent = L; }
    });
  }
  var raf = 0;
  function queue() { if (!raf) raf = requestAnimationFrame(function () { raf = 0; try { layout(); } catch (e) { if (window.console) console.warn('KCFOJ margin:', e); } }); }
  window.KCFOJ_relayout = queue;

  // 3. The note card, for phones, for words whose margin is taken, and for the index and band words
  function ensureCard() {
    if (card && D.contains(card)) return;
    card = D.createElement('div');
    card.className = 'kc-def';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'false');
    card.tabIndex = -1;
    card.hidden = true;
    card.innerHTML = '<button type="button" class="kc-def-x" aria-label="Close">\u00D7</button><span class="kc-def-term"></span><span class="kc-def-text"></span><span class="kc-def-refs"></span>';
    D.body.appendChild(card);
  }
  function closeCard(quiet) {
    if (!card || card.hidden) return;
    var back = card.contains(D.activeElement);
    card.classList.remove('kc-show');
    card.hidden = true;
    if (cardFrom) {
      cardFrom.setAttribute('aria-expanded', 'false');
      cardFrom.classList.remove('kc-on');
      var b = cardFrom.closest('.kc-band');
      if (b) b.classList.remove('kc-held');
      if (!quiet && back && cardFrom.focus && !cardFrom.closest('[aria-hidden="true"]')) cardFrom.focus({ preventScroll: true });
    }
    cardFrom = null;
  }
  function openCard(el) {
    var e = LEX[+el.getAttribute('data-kc-k')];
    if (!e) return;
    ensureCard();
    closeCard(true);
    cardFrom = el;
    y0 = window.pageYOffset;
    el.setAttribute('aria-expanded', 'true');
    if (el.classList.contains('kc-fw')) el.classList.add('kc-on');
    var b = el.closest('.kc-band');
    if (b) b.classList.add('kc-held');       // the drifting words pause while you read
    card.querySelector('.kc-def-term').textContent = e.term;
    card.querySelector('.kc-def-text').textContent = e.def;
    card.querySelector('.kc-def-refs').innerHTML = refs(e);
    card.setAttribute('aria-label', e.term);
    card.hidden = false;
    // Above the word when there is room, otherwise below it; always inside the screen
    var r = el.getBoundingClientRect(), cw = card.offsetWidth, ch = card.offsetHeight, vw = R.clientWidth, vh = window.innerHeight;
    var left = Math.max(16, Math.min(vw - cw - 16, r.left + r.width / 2 - cw / 2));
    var top = r.top - ch - 12 >= 12 ? r.top - ch - 12 : Math.min(r.bottom + 12, vh - ch - 12);
    card.style.left = Math.round(left) + 'px';
    card.style.top = Math.round(Math.max(12, top)) + 'px';
    requestAnimationFrame(function () { card.classList.add('kc-show'); });
    if (kbd) card.focus({ preventScroll: true });
  }
  function glossOf(el) { for (var i = 0; i < glosses.length; i++) if (glosses[i].span === el) return glosses[i]; return null; }
  function activate(t) {
    var k = t.getAttribute('data-kc-k');
    if (k === '' || k === null) return;
    var g = glossOf(t);
    if (g && g.note && !g.note.hidden && !g.note.classList.contains('kc-note-wait')) {
      // The note is already in the margin: point to it
      g.note.classList.remove('kc-hi'); void g.note.offsetWidth; g.note.classList.add('kc-hi');
      return;
    }
    if (t === cardFrom) closeCard(); else openCard(t);
  }

  listen('key', function (e) {
    kbd = true;
    if (e.key === 'Escape') { closeCard(); return; }
    var t = e.target;
    if ((e.key === 'Enter' || e.key === ' ') && t && t.classList && t.classList.contains('kc-gloss')) { e.preventDefault(); activate(t); }
  });
  D.addEventListener('pointerdown', function () { kbd = false; }, true);
  D.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest(TAPS);
    if (t) { e.preventDefault(); activate(t); return; }
    if (card && !card.hidden) {
      if (e.target.closest && e.target.closest('.kc-def-x')) closeCard();
      else if (!card.contains(e.target)) closeCard(true);
    }
  });
  listen('scroll', function () {
    if (cardFrom && Math.abs(window.pageYOffset - y0) > 40) closeCard(true);
  });
  listen('resize', function () { closeCard(true); queue(); });
  if (window.ResizeObserver) new ResizeObserver(queue).observe(R);
  if (D.fonts && D.fonts.addEventListener) D.fonts.addEventListener('loadingdone', queue);

  var prev = window.KCFOJ_wow;
  window.KCFOJ_wow = function () {
    if (prev) prev();
    try {
      if (location.pathname !== lastPath) {
        lastPath = location.pathname;
        closeCard(true);
        glosses.forEach(function (g) { if (g.note && g.note.parentNode) g.note.parentNode.removeChild(g.note); });
        glosses = [];
      }
      if (LEX.length && scan()) queue();
    } catch (e) { if (window.console) console.warn('KCFOJ margin:', e); }
  };
})();

/* ===== Part 10: Today / Tonight / Tomorrow ribbon on the date seals =====
   On the day of an event its date seal gets a rubric ribbon across its
   lower edge: "Tonight" for events at 4 PM or later, "Today" for earlier
   ones. The day before, it reads "Tomorrow". Needs Part 6.

   The ribbon appears only when the event's year is certain:
   1. a machine-readable <time datetime="2026-10-08T19:00"> on the card, or
   2. a four-digit year written with that date on the card ("Oct 8, 2026",
      "8 Oct 2026", "2026-10-08" or "10/8/2026").
   Otherwise there is no ribbon, so an archived event can never read "Today".
   If the seal shows a weekday, it must agree with the date as well. */
(function () { if (window.KCFOJ_SKIP) return;
  var D = document, on = window.KCFOJ_on || function () { return true; };
  window.KCFOJ_style(
    '.kc-seal-flag{position:absolute;left:50%;bottom:-15px;transform:translateX(-50%);padding:3px 8px 3px calc(8px + .2em);white-space:nowrap;background:var(--kc-accent);border:1px solid var(--kc-gold);color:var(--kc-card);font:500 8.5px/1.25 var(--kc-mono);letter-spacing:.2em;text-transform:uppercase;box-shadow:0 4px 10px -4px rgba(20,12,10,.5)}\n' +
    '.kc-seal-flag.kc-now{animation:kcFlag 2.8s ease-in-out infinite}\n' +
    '@keyframes kcFlag{0%,100%{box-shadow:0 4px 10px -4px rgba(20,12,10,.5),0 0 0 0 rgba(168,132,79,0)}50%{box-shadow:0 4px 10px -4px rgba(20,12,10,.5),0 0 0 4px rgba(168,132,79,.3)}}\n' +
    '.kc-still .kc-seal-flag.kc-now{animation:none}', 'ribbon');

  var MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  var DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  var DAY = 864e5;
  var MN = '(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\\.?';
  // Each pattern also refuses a year that runs on into more digits
  var WRITTEN = [
    [new RegExp(MN + '\\s*(\\d{1,2})(?:st|nd|rd|th)?,?\\s*(\\d{4})(?!\\d)', 'ig'), function (m) { return [MONTHS.indexOf(m[1].slice(0, 3).toLowerCase()), +m[2], +m[3]]; }],
    [new RegExp('(?:^|\\D)(\\d{1,2})(?:st|nd|rd|th)?\\s*' + MN + ',?\\s*(\\d{4})(?!\\d)', 'ig'), function (m) { return [MONTHS.indexOf(m[2].slice(0, 3).toLowerCase()), +m[1], +m[3]]; }],
    [/(?:^|\D)(\d{4})-(\d{1,2})-(\d{1,2})(?!\d)/g, function (m) { return [+m[2] - 1, +m[3], +m[1]]; }],
    [/(?:^|\D)(\d{1,2})\/(\d{1,2})\/(\d{4})(?!\d)/g, function (m) { return [+m[1] - 1, +m[2], +m[3]]; }]
  ];
  // The card's words with a space between every piece of text (so "2026" and a button's
  // "Register" never run together), leaving out the seal itself
  function wordsOf(card) {
    var out = [], w = D.createTreeWalker(card, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) if (!(n.parentElement && n.parentElement.closest('.kc-seal'))) out.push(n.nodeValue);
    return out.join(' ').replace(/\s+/g, ' ');
  }
  // The year written on the card with this same month and day, or null
  function writtenYear(txt, mo, d) {
    for (var i = 0; i < WRITTEN.length; i++) {
      var re = WRITTEN[i][0], m;
      re.lastIndex = 0;
      while ((m = re.exec(txt))) {
        var x = WRITTEN[i][1](m);
        if (x[0] === mo && x[1] === d) return x[2];
      }
    }
    return null;
  }
  // The hour of the event from text like "7:00 PM", or -1
  function hourIn(card) {
    var bits = card ? card.querySelectorAll('*') : [];
    for (var i = 0; i < bits.length; i++) {
      var t = bits[i].childElementCount ? null : bits[i].textContent.match(/\b(\d{1,2})(?::\d{2})?\s*([AaPp])\.?\s?[Mm]\b/);
      if (t) return (+t[1] % 12) + (/p/i.test(t[2]) ? 12 : 0);
    }
    return -1;
  }
  function eventDate(s) {
    var k = s._kc;
    if (!k || !k.p) return null;
    var mo = MONTHS.indexOf(k.p.mo.slice(0, 3).toLowerCase()), d = +k.p.d, y = null, h = -1, card = k.card;
    if (mo < 0 || !d) return null;
    // 1. A machine-readable date on the card
    var times = card ? card.querySelectorAll('time[datetime]') : [];
    for (var i = 0; i < times.length && y === null; i++) {
      var m = (times[i].getAttribute('datetime') || '').match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/);
      if (m && +m[2] - 1 === mo && +m[3] === d) { y = +m[1]; if (m[4]) h = +m[4]; }
    }
    // 2. A four-digit year written with this date (on the pill itself, or elsewhere on the card)
    if (y === null && k.p.y) y = k.p.y;
    if (y === null && card) y = writtenYear(wordsOf(card), mo, d);
    // 3. Otherwise the year is not certain, and there is no ribbon
    if (y === null) return null;
    var ev = new Date(y, mo, d);
    if (ev.getMonth() !== mo || ev.getDate() !== d) return null;
    if (k.p.wd && DAYS[ev.getDay()] !== k.p.wd.slice(0, 3).toLowerCase()) return null;
    return { date: ev, hour: h >= 0 ? h : hourIn(card) };
  }
  // Each seal is labelled for one day; on a later day (a tab left open overnight, a page
  // brought back from the browser's memory) it is looked at again
  function flags() {
    if (!on('tonightRibbon')) return;
    var n = new Date(), today = new Date(n.getFullYear(), n.getMonth(), n.getDate()), key = String(+today);
    [].forEach.call(D.querySelectorAll('.kc-seal'), function (s) {
      if (s.getAttribute('data-kc-flag') === key) return;
      s.setAttribute('data-kc-flag', key);
      [].forEach.call(s.querySelectorAll('.kc-seal-flag'), function (f) { f.parentNode.removeChild(f); });
      var e = eventDate(s);
      if (!e) return;
      var left = Math.round((e.date - today) / DAY), label = '';
      if (left === 1) label = 'Tomorrow';
      else if (left === 0) label = e.hour >= 16 ? 'Tonight' : 'Today';
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
  function again() { if (!D.hidden && window.KCFOJ_schedule) window.KCFOJ_schedule(); }
  D.addEventListener('visibilitychange', again);
  window.addEventListener('pageshow', function (e) { if (e.persisted) again(); });
  (function midnight() {
    var n = new Date(), next = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 0, 0, 30);
    setTimeout(function () { again(); midnight(); }, Math.min(next - n, 864e5));
  })();
})();

/* ===== Part 11: plates as a manuscript spread =====
   Turns a gallery grid of plates into a swipeable spread of folio pages
   that lean gently as they pass the center, with folio numerals beneath.
   Tapping a plate still opens it full screen.

   No one ever sees the grid turn into the spread. Part 2 holds each gallery
   that could become a spread out of sight (its space kept) the moment Square
   adds it. Here the spread is built and checked while it is hidden, and the
   gallery is shown once, already in its final state: the spread if every
   check passes, otherwise Square's own grid, untouched. A gallery that is not
   ready within 2.6 seconds of coming near the screen is shown as Square's grid
   and stays that way. If Square later redraws the plates inside a spread, the
   spread is rebuilt before the next frame, or Square's grid comes back. */
(function () { if (window.KCFOJ_SKIP) return;
  var D = document, on = window.KCFOJ_on || function () { return true; };
  var mark = window.KCFOJ_mark, unmark = window.KCFOJ_unmark, has = window.KCFOJ_has, self = window.KCFOJ_self;
  var still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var roman = window.KCFOJ_roman || function (n) { return String(n); };
  var F = 'data-kc-f', BOX = '[data-kc-f~="box"]', PAGE = '[data-kc-f~="page"]';
  window.KCFOJ_style(`
${BOX}{--kc-page:min(64vw,300px);display:flex!important;flex-wrap:nowrap!important;align-items:flex-start!important;gap:clamp(18px,3vw,34px)!important;overflow-x:auto!important;overflow-y:hidden!important;scroll-snap-type:x mandatory;scroll-behavior:smooth;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:18px calc(50% - var(--kc-page) / 2) 26px!important;margin-left:0!important;margin-right:0!important;max-width:none!important;height:auto!important;perspective:1400px;-webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}
${BOX}::-webkit-scrollbar{display:none}
${BOX}:focus-visible{outline:2px solid var(--kc-accent);outline-offset:4px}
[data-kc-f~="flat"]{display:contents!important}
[data-kc-f~="skip"]{display:none!important}
${PAGE}{flex:0 0 var(--kc-page)!important;width:var(--kc-page)!important;max-width:none!important;min-width:0!important;height:auto!important;margin:0!important;position:relative!important;inset:auto!important;scroll-snap-align:center;transform-origin:50% 50%;opacity:var(--kc-fade,1)!important}
[data-kc-f~="leaf"]{overflow:visible!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;transform:var(--kc-lean,none)!important}
[data-kc-f~="top"]{flex:0 0 auto!important;width:100%!important;max-width:none!important;min-width:0!important;height:calc(var(--kc-page) * var(--kc-ratio,1.31))!important;max-height:none!important;min-height:0!important;margin:0!important;position:relative!important}
[data-kc-f~="fill"]{flex:1 1 auto!important;width:100%!important;max-width:none!important;min-width:0!important;height:100%!important;max-height:none!important;min-height:0!important;margin:0!important}
[data-kc-f~="abs"]{position:absolute!important;inset:0!important}
[data-kc-f~="img"]{display:block!important;visibility:visible!important;opacity:1!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:contain!important;object-position:50% 50%!important;aspect-ratio:auto!important}\n${BOX} .mimage-lazyLoad,${BOX} .mimage-lazyLoad img{visibility:visible!important;opacity:1!important}
.kc-folio-no{display:block;margin-top:14px;text-align:center;font:italic 400 14px/1 var(--kc-serif);letter-spacing:.08em;color:var(--kc-accent);opacity:.8;pointer-events:none}
.kc-folio-btn{position:absolute;z-index:3;display:grid;place-items:center;width:44px;height:44px;padding:0;border:1px solid var(--kc-gold);border-radius:50%;background:var(--kc-card);color:var(--kc-accent);font:400 26px/1 Georgia,serif;cursor:pointer;box-shadow:0 8px 20px -10px rgba(20,12,10,.5);transition:opacity .3s ease}
.kc-folio-btn[disabled]{opacity:0;pointer-events:none}
@media (min-width:900px){${BOX}{--kc-page:min(24vw,300px)}}
@media (max-width:899px){.kc-folio-btn{display:none}}
.kc-still ${BOX}{scroll-behavior:auto}
.kc-still .kc-folio-btn{transition:none}
`, 'folio');

  function holds(el, tiles) { return tiles.filter(function (t) { return el.contains(t); }).length; }

  // Pages lean away and shrink slightly as they move off center, like leaves of a book
  function tilt(box) {
    if (still) return;
    var br = box.getBoundingClientRect(), cx = br.left + br.width / 2;
    [].forEach.call(box.querySelectorAll(PAGE), function (p) {
      var r = p.getBoundingClientRect(), k = Math.max(-1, Math.min(1, (r.left + r.width / 2 - cx) / br.width * 2.2));
      // A page that is itself the plate keeps its own hover tilt (Part 3), so it only fades.
      // Both go through custom properties: Square's own inline styles on the page are never touched.
      self.add(p);
      if (has(p, 'leaf', F)) p.style.setProperty('--kc-lean', 'rotateY(' + (-k * 16).toFixed(2) + 'deg) scale(' + (1 - Math.abs(k) * 0.08).toFixed(3) + ')');
      p.style.setProperty('--kc-fade', (1 - Math.abs(k) * 0.25).toFixed(3));
    });
  }
  function step(box) {
    var ps = box.querySelectorAll(PAGE);
    return ps.length > 1 ? ps[1].getBoundingClientRect().left - ps[0].getBoundingClientRect().left : box.clientWidth * 0.8;
  }
  function arrows(box) {
    var host = box.parentElement;
    if (!host) return;
    if (!box._kcBtns || !host.contains(box._kcBtns[0])) {
      if (getComputedStyle(host).position === 'static') mark(host, 'rel');
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

  // Puts one gallery back exactly as Square made it: only what this part wrote is taken back
  function putBack(el, name, v) { if (v === null || v === undefined) el.removeAttribute(name); else el.setAttribute(name, v); }
  function undo(box) {
    var els = [box].concat([].slice.call(box.querySelectorAll('[' + F + ']')));
    els.forEach(function (el) {
      el.removeAttribute(F); el.removeAttribute('data-kc-ratio');
      el.style.removeProperty('--kc-lean'); el.style.removeProperty('--kc-fade');
    });
    [].forEach.call(box.querySelectorAll('.kc-folio-no'), function (el) { el.parentNode.removeChild(el); });
    if (box._kcBtns) box._kcBtns.forEach(function (b) { if (b.parentNode) b.parentNode.removeChild(b); });
    box._kcBtns = null;
    if (box._kcAttrs) { putBack(box, 'tabindex', box._kcAttrs[0]); putBack(box, 'aria-label', box._kcAttrs[1]); box._kcAttrs = null; }
    box.setAttribute('data-kc-folio-off', '1');
  }
  function realPlateImage(im) {
    if (!im) return false;
    var src = im.currentSrc || im.getAttribute('src') || '';
    return !!(im.complete && im.naturalWidth && src && !/^data:image\/svg\+xml/i.test(src));
  }
  function wakePlateImages(imgs) {
    imgs.forEach(function (im) {
      try {
        im.loading = 'eager';
        im.setAttribute('loading', 'eager');
        im.setAttribute('fetchpriority', 'high');
      } catch (e) {}
      // If Square exposes a conventional lazy-source attribute, promote it now.
      var a = ['data-src', 'data-lazy-src', 'data-original', 'data-image-src'];
      for (var i = 0; i < a.length; i++) {
        var u = im.getAttribute(a[i]);
        if (u && !/^data:/i.test(u)) {
          if ((im.currentSrc || im.src || '').indexOf(u) < 0) im.src = u;
          break;
        }
      }
    });
  }

  // 'ok' when the spread is built and checked, 'wait' while its pictures are still arriving,
  // 'no' when this gallery should stay as Square's grid
  function build(box) {
    var imgs = [].slice.call(box.getElementsByTagName('img'));
    wakePlateImages(imgs);
    if (imgs.length < 4) return 'no';
    // Square initially paints some gallery images as SVG placeholders. If the folio is
    // built at that moment, those off-axis pages can stay blank forever. Wait until
    // Square has supplied the real image source for every plate.
    if (imgs.some(function (im) { return !realPlateImage(im); })) return 'wait';
    var tiles = [].filter.call(box.querySelectorAll('[data-kc~="tile"]'), function (t) { return !t.closest('.kc-lb'); });
    if (tiles.length !== imgs.length && window.KCFOJ_tiles) {
      window.KCFOJ_tiles(box);
      tiles = [].filter.call(box.querySelectorAll('[data-kc~="tile"]'), function (t) { return !t.closest('.kc-lb'); });
    }
    if (tiles.length !== imgs.length) return 'no';
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
    if (!ok || pages.length !== tiles.length || pages.some(function (p) { return /^(IMG|PICTURE|VIDEO)$/.test(p.tagName); })) return 'no';
    // Plate shape from the first picture (manuscript plates are tall pages)
    var im0 = tiles[0].tagName === 'IMG' ? tiles[0] : tiles[0].querySelector('img'), ratio = 1.31;
    if (im0 && im0.naturalWidth && im0.naturalHeight) ratio = Math.max(0.6, Math.min(2, im0.naturalHeight / im0.naturalWidth));
    var rk = ratio.toFixed(3);
    window.KCFOJ_rule('[data-kc-ratio="' + rk + '"]', '--kc-ratio:' + rk);
    box.setAttribute('data-kc-ratio', rk);
    mark(box, 'box', F);
    if (!box._kcAttrs) box._kcAttrs = [box.getAttribute('tabindex'), box.getAttribute('aria-label')];
    box.setAttribute('tabindex', '0');
    box.setAttribute('aria-label', 'Plates, scroll sideways');
    flats.forEach(function (f) { mark(f, 'flat', F); });
    skips.forEach(function (s) { mark(s, 'skip', F); });
    pages.forEach(function (p, i) {
      mark(p, 'page', F);
      if (has(p, 'tile')) return; // the plate itself: nothing can hang below it
      mark(p, 'leaf', F);
      // Make every wrapper between the page and its plate fill the page, so Square's fixed sizes let go
      var t = tiles.filter(function (x) { return p.contains(x); })[0], chain = [];
      for (var n = t.parentElement; n && n !== p; n = n.parentElement) chain.push(n);
      var top = chain.length ? chain[chain.length - 1] : t;
      chain.forEach(function (c) {
        mark(c, c === top ? 'top' : 'fill', F);
        if (c !== top && getComputedStyle(c).position === 'absolute') mark(c, 'abs', F);
      });
      if (t === top) mark(t, 'top', F);
      var img = t.tagName === 'IMG' ? t : t.querySelector('img');
      if (t !== top && t !== img) mark(t, 'fill', F);
      if (img) mark(img, 'img', F);
      var no = D.createElement('span');
      no.className = 'kc-folio-no';
      no.setAttribute('aria-hidden', 'true');
      no.textContent = 'fol. ' + roman(i + 1, true);
      p.appendChild(no);
    });
    // On wide screens, open on the second plate so the spread has a page on each side
    if (pages.length > 2 && window.matchMedia && window.matchMedia('(min-width: 900px)').matches) {
      self.add(box);
      var sb = box.style.scrollBehavior;
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = step(box);
      box.style.scrollBehavior = sb;
    }
    // Self-check: every plate must fill at least half its page, or the grid comes back untouched
    var bad = tiles.some(function (x) {
      var pg = x.closest(PAGE), a = x.getBoundingClientRect().width, b = pg ? pg.getBoundingClientRect().width : 0;
      return !b || a < b * 0.5;
    });
    if (bad) { undo(box); if (window.console) console.warn('KCFOJ folio: plates measured wrong, grid kept'); return 'no'; }
    if (!box._kcScroll) {
      box._kcScroll = true;
      var ticking = false;
      box.addEventListener('scroll', function () {
        if (ticking || !has(box, 'box', F)) return;
        ticking = true;
        requestAnimationFrame(function () { ticking = false; refresh(box); });
      }, { passive: true });
    }
    refresh(box);
    return 'ok';
  }
  // Every picture in a built spread still sits on a page of its own
  function intact(box) {
    var imgs = box.getElementsByTagName('img');
    if (!imgs.length || box.querySelectorAll(PAGE).length !== imgs.length) return false;
    for (var i = 0; i < imgs.length; i++) if (!imgs[i].closest(PAGE)) return false;
    return true;
  }
  function leftAsGrid() { if (window.KCFOJ_stats) window.KCFOJ_stats.leftAsGrid++; }
  function attempt(box) {
    var r = 'no';
    try { r = build(box); } catch (e) { try { undo(box); } catch (e2) {} if (window.console) console.warn('KCFOJ folio:', e); }
    return r;
  }
  function folio() {
    // Square exposes its gallery with a stable block purpose and .image-gallery > .grid.
    // Prefer that semantic hook over the generic gallery heuristic so the folio survives
    // normal Square layout/content changes. build() still validates the structure before keeping it.
    if (on('folioViewer') && !window.KCFOJ_commerce()) {
      [].forEach.call(D.querySelectorAll('[data-block-purpose^="gallery"] .image-gallery .grid'), function (box) {
        if (has(box, 'box', F)) return;
        var imgs = [].slice.call(box.getElementsByTagName('img'));
        var cells = [].slice.call(box.children).filter(function (c) { return c.querySelectorAll && c.querySelectorAll('img').length === 1; });
        wakePlateImages(imgs);
        if (imgs.length < 4 || cells.length !== imgs.length || imgs.some(function (im) { return !realPlateImage(im); })) return;

        // This is Square's explicit gallery block, so a stale/transient "off" classification
        // must never permanently block the folio treatment.
        box.removeAttribute('data-kc-folio-off');

        // Seed the plate marks directly from the semantic gallery before build() validates it.
        if (window.KCFOJ_tiles) window.KCFOJ_tiles(box);

        if (attempt(box) === 'ok') box.setAttribute('data-kc-hold', 'done');
      });
    }
    var held = D.querySelectorAll('[data-kc-hold="1"]');
    [].forEach.call(held, function (box) {
      if (!on('folioViewer')) { box.setAttribute('data-kc-hold', 'done'); return; }
      if (window.KCFOJ_watchHold) window.KCFOJ_watchHold(box);
      var r = attempt(box);
      if (r === 'wait') return;           // still hidden; Part 2 shows the grid if this takes too long
      if (r === 'no') {
        if (!box.closest('[data-block-purpose^="gallery"]')) box.setAttribute('data-kc-folio-off', '1');
        leftAsGrid();
      }
      box.setAttribute('data-kc-hold', 'done');   // shown now, in its final state
    });
    [].forEach.call(D.querySelectorAll(BOX), function (box) {
      if (intact(box)) { refresh(box); return; }
      // Square redrew the plates: put its grid back, look at the plates again, and rebuild,
      // all before the next frame. If the spread cannot be rebuilt at once, the grid stays.
      undo(box);
      box.removeAttribute('data-kc-folio-off');
      if (window.KCFOJ_tiles) window.KCFOJ_tiles(box);
      if (attempt(box) !== 'ok') {
        undo(box); leftAsGrid();
        if (window.console) console.info('KCFOJ folio: Square redrew the plates; its grid is shown');
      }
    });
  }

  var prev = window.KCFOJ_wow;
  window.KCFOJ_wow = function () {
    if (prev) prev();
    try { folio(); } catch (e) { if (window.console) console.warn('KCFOJ folio:', e); }
  };
})();

/* ===== Part 12: the colophon, Open at random, and the snail =====
   A last strip under the footer, as at the back of a book: who keeps it,
   what it is set in, and a link that opens a random story from the archive.
   That link reads the site's own sitemap, so new stories join in by
   themselves. It only ever chooses story pages (randomPages in Part 0):
   never events, products, memberships, donations or anything in the shop.
   A small snail lives here too; medieval scribes drew them in the margins.
   Tap it. */
(function () { if (window.KCFOJ_SKIP) return;
  var D = document, R = D.documentElement, W = window.KCFOJ_WORDS || {}, on = window.KCFOJ_on || function () { return true; };
  var css = `
.kc-colophon{position:relative;box-sizing:border-box;width:100%;padding:30px clamp(16px,4vw,48px) 36px;background-color:var(--kc-cream);background-image:var(--kc-grain);background-size:240px 240px;border-top:1px solid var(--kc-rubric-rule);text-align:center}
.kc-colo-in{max-width:40em;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:12px}
.kc-colo-text{margin:0!important;font:italic 400 15.5px/1.6 var(--kc-serif)!important;color:var(--kc-ink-soft)!important;text-wrap:balance}
.kc-random{font:500 15px/1.3 var(--kc-serif)!important;color:var(--kc-accent)!important;text-decoration:underline!important;text-decoration-color:rgba(139,42,36,.4)!important;text-decoration-thickness:1px!important;text-underline-offset:.22em}
.kc-random:hover{text-decoration-color:currentColor!important}
.kc-colo-set{margin:4px 0 0!important;font:400 10px/1.5 var(--kc-mono)!important;letter-spacing:.18em;text-transform:uppercase;color:var(--kc-ink-soft)!important}
.kc-snail{all:unset;box-sizing:border-box;cursor:pointer;display:block;width:50px;height:30px;padding:1px 2px;color:var(--kc-accent);border-radius:4px;animation:kcCrawl 64s linear infinite}
.kc-snail:focus-visible{outline:2px solid var(--kc-accent);outline-offset:3px}
.kc-snail svg{display:block;width:100%;height:100%;overflow:visible}
@keyframes kcCrawl{0%{transform:translateX(-26px)}49.9%{transform:translateX(26px)}50%{transform:translateX(26px) scaleX(-1)}99.9%{transform:translateX(-26px) scaleX(-1)}100%{transform:translateX(-26px)}}
.kc-still .kc-snail{animation:none}
.kc-snail-note{margin:0!important;max-width:30em;font:italic 400 14.5px/1.55 var(--kc-serif)!important;color:var(--kc-verd)!important}
.kc-snail-note[hidden]{display:none}
`;
  window.KCFOJ_style(css, 'colophon');

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function snail() {
    var p = [], cx = 17.2, cy = 14.6;
    for (var i = 0; i <= 90; i++) {
      var t = i / 90, a = 1.745 + t * 2.3 * 6.2832, r = 9.4 * (1 - t) + 1.1 * t;
      p.push((cx + r * Math.cos(a)).toFixed(2) + ' ' + (cy + r * Math.sin(a)).toFixed(2));
    }
    return '<svg viewBox="0 0 48 28" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M' + p.join(' L') + '"/>' +
      '<path d="M2.4 25.4C9 26.4 29 26.3 36.8 25C40.3 24.4 42.6 22.5 42.5 19.9C42.4 17.6 40.6 16.4 38.6 16.7C36.5 17 35.3 18.8 34.9 20.8C34.5 22.4 31.2 23.4 27.4 23.2"/>' +
      '<path d="M2.4 25.4C4.6 24.9 6.8 24 8.6 22.4"/><path d="M38.6 16.7L39.6 9.4M40.9 17.2L44.2 10.9"/>' +
      '<circle cx="39.7" cy="8.7" r=".95" fill="currentColor" stroke="none"/><circle cx="44.5" cy="10.2" r=".95" fill="currentColor" stroke="none"/></svg>';
  }
  function build() {
    var c = D.createElement('div');
    c.className = 'kc-colophon';
    c.innerHTML =
      '<div class="kc-colo-in">' +
      (on('drollerie') ?
      '<button type="button" class="kc-snail" aria-label="A snail in the margin" aria-expanded="false" aria-controls="kc-snail-note">' + snail() + '</button>' +
      '<p class="kc-snail-note" id="kc-snail-note" hidden>Snails crawl through the margins of many medieval manuscripts, sometimes squaring off against knights in armor. Scholars still argue about why. You found this one.</p>' : '') +
      '<p class="kc-colo-text">' + esc(W.name || 'Kansas City Friends of Jung') + ' has gathered for lectures, conversation and inquiry since ' + esc(W.since || 'the late 1980s') + '. This site is its commonplace book.</p>' +
      '<a class="kc-random" href="/s/stories"><span' + (on('manicules') ? ' class="kc-hand"' : '') + '>Open the book at random</span></a>' +
      '<p class="kc-colo-set">Set in Newsreader and IBM Plex Mono, with initials in UnifrakturMaguntia</p>' +
      '</div>';
    var sn = c.querySelector('.kc-snail');
    if (sn) sn.addEventListener('click', function () {
      var n = c.querySelector('.kc-snail-note'), open = n.hidden;
      n.hidden = !open;
      this.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    c.querySelector('.kc-random').addEventListener('click', randomPage);
    return c;
  }
  // A random story, read from the sitemap
  var POOL = W.randomPages instanceof RegExp ? W.randomPages : /^\/s\/stories\/[^\/]+$/;
  function randomPage(e) {
    e.preventDefault();
    var now = location.pathname, fallback = ['/s/stories'];
    function go(list) {
      list = list.filter(function (u) { return u !== now; });
      location.href = list.length ? list[Math.floor(Math.random() * list.length)] : '/s/stories';
    }
    if (!window.fetch) return go(fallback);
    fetch('/sitemap.xml', { credentials: 'same-origin' }).then(function (r) { return r.text(); }).then(function (x) {
      var urls = (x.match(/<loc>[^<]+<\/loc>/g) || []).map(function (l) {
        try { return new URL(l.replace(/<\/?loc>/g, '').replace(/&amp;/g, '&')).pathname; } catch (err) { return ''; }
      }).filter(function (p) { return POOL.test(p); });
      go(urls.length ? urls : fallback);
    }).catch(function () { go(fallback); });
  }

  var col = null, lastZone = null;
  function colophon() {
    if (!on('colophon')) return;
    var zone = D.querySelector('[data-kc-zone]');
    if (!zone || !zone.parentElement) return;
    if (col && D.contains(col) && zone === lastZone) return;
    lastZone = zone;
    if (!col) col = build();
    zone.parentElement.insertBefore(col, zone.nextSibling);
    // If Square's layout squeezes it beside the footer, it goes to the very end of the page instead
    var cr = col.getBoundingClientRect(), zr = zone.getBoundingClientRect();
    if (cr.width < R.clientWidth * 0.9 || cr.top < zr.bottom - 2) D.body.appendChild(col);
  }

  var prev = window.KCFOJ_wow;
  window.KCFOJ_wow = function () {
    if (prev) prev();
    try { colophon(); } catch (e) { if (window.console) console.warn('KCFOJ colophon:', e); }
  };
})();

// end of kcfoj-polish v3.1.2
// (padding: losing these last lines in a copy and paste does no harm)
