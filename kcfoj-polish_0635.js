window.KCFOJ_style(`
/* =========================================================
   KCFOJ — MANUSCRIPT PLATE GALLERY
   Two facing pages per row.
   The existing full-screen folio viewer remains untouched.
   ========================================================= */


/* ----- THE GALLERY / TABLE OF PLATES ----- */

${BOX},
[data-block-purpose^="gallery"] .image-gallery > .grid{
  box-sizing:border-box!important;
  display:grid!important;
  grid-template-columns:repeat(2,minmax(0,1fr))!important;
  width:min(100%,760px)!important;
  max-width:760px!important;
  height:auto!important;
  margin:0 auto!important;
  padding:24px clamp(8px,2.4vw,18px) 38px!important;
  column-gap:clamp(7px,1.5vw,14px)!important;
  row-gap:clamp(26px,5vw,46px)!important;
  align-items:start!important;
  overflow:visible!important;
  overflow-x:visible!important;
  overflow-y:visible!important;
  scroll-snap-type:none!important;
  scroll-behavior:auto!important;
  overscroll-behavior:auto!important;
  perspective:none!important;
  -webkit-mask-image:none!important;
  mask-image:none!important;
  scrollbar-width:none;
}

${BOX}::-webkit-scrollbar{
  display:none;
}


/* ----- SQUARE'S ORIGINAL GALLERY FALLBACK ----- */

[data-block-purpose^="gallery"]
.image-gallery > .grid:not([data-kc-f~="box"]) > .image-cell{
  box-sizing:border-box!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  width:100%!important;
  min-width:0!important;
  max-width:none!important;
  height:auto!important;
  min-height:0!important;
  aspect-ratio:0.765;
  margin:0!important;
  padding:0!important;
  position:relative!important;
  transform:none!important;
  opacity:1!important;
  overflow:visible!important;
}

[data-block-purpose^="gallery"]
.image-gallery > .grid:not([data-kc-f~="box"]) > .image-cell:nth-child(odd){
  transform:rotate(.22deg)!important;
  transform-origin:100% 50%!important;
}

[data-block-purpose^="gallery"]
.image-gallery > .grid:not([data-kc-f~="box"]) > .image-cell:nth-child(even){
  transform:rotate(-.22deg)!important;
  transform-origin:0 50%!important;
}

[data-block-purpose^="gallery"]
.image-gallery > .grid:not([data-kc-f~="box"])
.image-cell > .image-wrapper,

[data-block-purpose^="gallery"]
.image-gallery > .grid:not([data-kc-f~="box"])
.image-cell > .image-wrapper > .w-wrapper.image-wrapper{
  box-sizing:border-box!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  position:relative!important;
  inset:auto!important;
  width:100%!important;
  height:100%!important;
  min-width:0!important;
  min-height:0!important;
  max-width:none!important;
  max-height:none!important;
  margin:0!important;
  padding:0!important;
}

[data-block-purpose^="gallery"]
.image-gallery > .grid:not([data-kc-f~="box"])
.inner-image-wrapper{
  box-sizing:border-box!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  position:relative!important;
  inset:auto!important;
  width:100%!important;
  height:100%!important;
  min-width:0!important;
  min-height:0!important;
  max-width:none!important;
  max-height:none!important;
  margin:0!important;
}

[data-block-purpose^="gallery"]
.image-gallery > .grid:not([data-kc-f~="box"])
.inner-image-wrapper > .image{
  box-sizing:border-box!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  position:relative!important;
  inset:auto!important;
  width:100%!important;
  height:100%!important;
  min-width:0!important;
  min-height:0!important;
  max-width:none!important;
  max-height:none!important;
  margin:0!important;
}

[data-block-purpose^="gallery"]
.image-gallery > .grid:not([data-kc-f~="box"]) img{
  display:block!important;
  width:100%!important;
  height:100%!important;
  max-width:100%!important;
  max-height:100%!important;
  object-fit:contain!important;
  object-position:50% 50%!important;
  aspect-ratio:auto!important;
  margin:0 auto!important;
  border-radius:2px!important;
  transform:none!important;
}


/* ----- PART 11 BUILT FOLIO PAGES ----- */

[data-kc-f~="flat"]{
  display:contents!important;
}

[data-kc-f~="skip"]{
  display:none!important;
}

${PAGE}{
  box-sizing:border-box!important;
  width:100%!important;
  min-width:0!important;
  max-width:none!important;
  height:auto!important;
  min-height:0!important;
  max-height:none!important;
  margin:0!important;
  padding:0!important;
  position:relative!important;
  inset:auto!important;
  scroll-snap-align:none!important;
  transform:none!important;
  transform-origin:50% 50%!important;
  opacity:1!important;
  overflow:visible!important;
  --kc-fade:1!important;
  --kc-lean:none!important;
}

[data-kc-f~="leaf"]{
  box-sizing:border-box!important;
  display:flex!important;
  flex-direction:column!important;
  align-items:stretch!important;
  justify-content:flex-start!important;
  width:100%!important;
  min-width:0!important;
  max-width:none!important;
  height:auto!important;
  overflow:visible!important;
  transform:none!important;
}

[data-kc-f~="top"]{
  box-sizing:border-box!important;
  flex:none!important;
  display:block!important;
  width:100%!important;
  min-width:0!important;
  max-width:none!important;
  height:auto!important;
  min-height:0!important;
  max-height:none!important;
  aspect-ratio:1 / var(--kc-ratio,1.31);
  margin:0!important;
  padding:0!important;
  position:relative!important;
  inset:auto!important;
  overflow:visible!important;
}

[data-kc-f~="fill"]{
  box-sizing:border-box!important;
  width:100%!important;
  height:100%!important;
  min-width:0!important;
  min-height:0!important;
  max-width:none!important;
  max-height:none!important;
  margin:0!important;
  padding:0!important;
}

[data-kc-f~="abs"]{
  position:absolute!important;
  inset:0!important;
}

[data-kc-f~="img"]{
  display:block!important;
  width:100%!important;
  height:100%!important;
  min-width:0!important;
  min-height:0!important;
  max-width:none!important;
  max-height:none!important;
  object-fit:contain!important;
  object-position:50% 50%!important;
  aspect-ratio:auto!important;
  margin:0 auto!important;
  border-radius:2px!important;
}


/* ----- FOLIO NUMBERS ----- */

.kc-folio-no{
  display:block!important;
  margin:10px 0 0!important;
  padding:0!important;
  text-align:center!important;
  font:italic 400 14px/1 var(--kc-serif)!important;
  letter-spacing:.08em!important;
  color:var(--kc-accent)!important;
  opacity:.82!important;
  pointer-events:none!important;
}


/* ----- NO CAROUSEL CONTROLS IN THE OVERVIEW ----- */

.kc-folio-btn{
  display:none!important;
}


/* ----- DESKTOP ----- */

@media (min-width:900px){

  ${BOX},
  [data-block-purpose^="gallery"] .image-gallery > .grid{
    width:min(100%,720px)!important;
    max-width:720px!important;
    padding-top:30px!important;
    padding-bottom:48px!important;
    column-gap:clamp(10px,1.25vw,16px)!important;
    row-gap:46px!important;
  }

}


/* ----- PHONE / SMALL TABLET ----- */

@media (max-width:899px){

  ${BOX},
  [data-block-purpose^="gallery"] .image-gallery > .grid{
    width:100%!important;
    max-width:none!important;
    padding:18px 8px 34px!important;
    column-gap:7px!important;
    row-gap:28px!important;
  }

  .kc-folio-no{
    margin-top:8px!important;
    font-size:12.5px!important;
  }

}


/* ----- VERY SMALL PHONES ----- */

@media (max-width:380px){

  ${BOX},
  [data-block-purpose^="gallery"] .image-gallery > .grid{
    padding-left:6px!important;
    padding-right:6px!important;
    column-gap:5px!important;
    row-gap:24px!important;
  }

}


/* Reduced motion: overview never needs animation anyway */
.kc-still ${BOX}{
  scroll-behavior:auto!important;
}
`, 'folio');
