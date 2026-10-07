/* ===================== GSAP + SCROLLTRIGGER ===================== */
gsap.registerPlugin(ScrollTrigger);

/* ---- Barra de progreso (barata, va en todos los dispositivos) ---- */
gsap.to('#progreso', {
  scaleX: 1, ease: 'none',
  scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
});

/* ---- Ventisca más fuerte según avanzas (conecta con PixiJS) ---- */
gsap.to(window.viento, {
  fuerza: 3.2, ease: 'none',
  scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1 },
});

const mm = gsap.matchMedia();

/* ============== ESCRITORIO: pin + scrub + linterna ============== */
mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
  // Hero: se queda fijo y se desvanece mientras entras al misterio
  gsap.timeline({
    scrollTrigger: { trigger: '#hero', start: 'top top', end: '+=70%', pin: true, scrub: 1 },
  })
    .to('.titulo', { scale: 1.25, filter: 'blur(6px)', opacity: 0.1, ease: 'none' }, 0)
    .to('.sub, .scroll, .hero .sello', { opacity: 0, y: -40, ease: 'none' }, 0);

  // Capítulos: entrada con scrub suave
  gsap.utils.toArray('.capitulo').forEach((cap) => {
    gsap.from(cap.children, {
      y: 70, opacity: 0, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: cap, start: 'top 75%', end: 'top 30%', scrub: 1 },
    });
  });

  // Linterna: sigue al mouse con quickTo (ligero)
  const lint = document.getElementById('linterna');
  const qx = gsap.quickTo(lint, '--x', { duration: 0.4, ease: 'power3' });
  const qy = gsap.quickTo(lint, '--y', { duration: 0.4, ease: 'power3' });
  const mover = (e) => { qx(e.clientX + 'px'); qy(e.clientY + 'px'); };
  window.addEventListener('mousemove', mover);

  return () => window.removeEventListener('mousemove', mover);
});

/* ============== MÓVIL: sin pin ni scrub, solo fades ligeros ============== */
mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
  gsap.from('.hero > *', { y: 30, opacity: 0, stagger: 0.2, duration: 1 });

  gsap.utils.toArray('.capitulo').forEach((cap) => {
    gsap.from(cap.children, {
      y: 40, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: cap, start: 'top 85%', toggleActions: 'play none none none', once: true },
    });
  });
});

/* ============== TODOS: tarjeta final (suspenso) ============== */
mm.add('(prefers-reduced-motion: no-preference)', () => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '#expediente', start: 'top 70%', once: true },
  });
  tl.from('.tarjeta', { scale: 0.9, opacity: 0, duration: 0.8, ease: 'back.out(1.6)' })
    .from('.sello.rojo', { scale: 3, opacity: 0, rotate: -15, duration: 0.4, ease: 'power4.in' }, '-=0.3')
    .from('.barra', { scaleX: 0, transformOrigin: 'left', stagger: 0.25, duration: 0.5 })
    .from('.aviso, .botones', { y: 20, opacity: 0, stagger: 0.2 });

  // Las barras "tiemblan" como si algo quisiera salir
  gsap.to('.barra', {
    x: 'random(-2, 2)', duration: 0.08, repeat: -1, repeatRefresh: true, yoyo: true, ease: 'none',
  });
});
