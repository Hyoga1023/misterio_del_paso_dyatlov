/* ===================== SWEETALERT2 ===================== */
// Colores tomados de la paleta del proyecto (css/style.css)
const SW_BASE = {
  background: '#121b2c',
  color: '#cfe8ff',
  confirmButtonColor: '#e63946',
  cancelButtonColor: '#8aa0b8',
  iconColor: '#ffb703',
  customClass: { popup: 'swal-misterio' },
  backdrop: 'rgba(7,11,20,.88)',
};

/* ---- Alerta de entrada: sube la tensión ---- */
Swal.fire({
  ...SW_BASE,
  title: 'Archivo desclasificado',
  html: 'Lo que vas a leer es una historia real y fue censurada durante décadas.<br>¿Seguro que quieres seguir? Imagenes fuertes, se sugiere discreción',
  icon: 'warning',
  confirmButtonText: 'Entrar al expediente',
  allowOutsideClick: false,
}).then(() => iniciarMusica());

/* ---- Ambos botones: contactar por Teams ---- */
const avisarTeams = () => {
  Swal.fire({
    ...SW_BASE,
    icon: 'info',
    title: 'El desenlace está en Teams',
    html: 'Para conocer el final de esta historia debes <b>contactar a Cesar por Teams</b>.<br>Ahí se confirma tu cuota de Octubre y se te revela el misterio. 🕵️',
    confirmButtonText: 'Ir a Teams',
  });
};
document.getElementById('btnNo').addEventListener('click', avisarTeams);
document.getElementById('btnSi').addEventListener('click', avisarTeams);
