/* ===================== PIXIJS · VENTISCA ===================== */
(() => {
  const esMovil = window.matchMedia('(max-width: 767px)').matches;
  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CANTIDAD = reducido ? 0 : esMovil ? 70 : 180; // menos partículas en móvil

  const app = new PIXI.Application({
    resizeTo: window,
    backgroundAlpha: 0,
    antialias: false,
    resolution: Math.min(window.devicePixelRatio || 1, esMovil ? 1.5 : 2),
    autoDensity: true,
  });
  document.getElementById('nieve').appendChild(app.view);

  // Una sola textura reutilizada = rendimiento
  const g = new PIXI.Graphics().beginFill(0xcfe8ff).drawCircle(0, 0, 4).endFill();
  const textura = app.renderer.generateTexture(g);

  const copos = [];
  for (let i = 0; i < CANTIDAD; i++) {
    const s = new PIXI.Sprite(textura);
    s.anchor.set(0.5);
    s.scale.set(0.15 + Math.random() * 0.6);
    s.alpha = 0.25 + Math.random() * 0.6;
    s.x = Math.random() * app.screen.width;
    s.y = Math.random() * app.screen.height;
    s.vy = 0.4 + Math.random() * 1.4;
    s.fase = Math.random() * Math.PI * 2;
    app.stage.addChild(s);
    copos.push(s);
  }

  // Viento: la ventisca se intensifica con el scroll (expuesto para GSAP)
  window.viento = { fuerza: 1 };

  let t = 0;
  app.ticker.add((delta) => {
    t += 0.01 * delta;
    for (const s of copos) {
      s.y += s.vy * delta * window.viento.fuerza;
      s.x += Math.sin(t + s.fase) * 0.5 + 0.6 * window.viento.fuerza;
      if (s.y > app.screen.height + 10) { s.y = -10; s.x = Math.random() * app.screen.width; }
      if (s.x > app.screen.width + 10) s.x = -10;
    }
  });
})();
