/* ===================== AUDIO DE FONDO ===================== */
const VOLUMEN = 0.2; // sube o baja aquí (0 a 1)
const musica = new Audio('audio/musica-miedo.mp3');
musica.loop = true;
musica.volume = 0;

const btnMusica = document.getElementById('btnMusica');

function sonar() {
  musica.play()
    .then(() => gsap.to(musica, { volume: VOLUMEN, duration: 4 })) // entra suave
    .catch(() => {});
  btnMusica.textContent = '🔊';
}

function callar() {
  gsap.to(musica, { volume: 0, duration: 1, onComplete: () => musica.pause() });
  btnMusica.textContent = '🔇';
}

// Se llama desde el primer SweetAlert (el clic cumple la regla de autoplay del navegador)
function iniciarMusica() {
  btnMusica.hidden = false;
  sonar();
}

btnMusica.addEventListener('click', () => (musica.paused ? sonar() : callar()));