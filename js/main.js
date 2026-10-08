document.addEventListener('DOMContentLoaded', () => {
  // 1. Cabecera: se compacta y muestra sombra al bajar
  const cabecera = document.querySelector('.site-header');
  const alBajar = () => cabecera.classList.toggle('scrolled', window.scrollY > 10);
  alBajar();
  window.addEventListener('scroll', alBajar, { passive: true });

  // 2. Menú: marca el enlace de la sección que estás viendo
  const enlaces = document.querySelectorAll('.site-header nav a');
  if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        enlaces.forEach((a) => {
          const activo = a.getAttribute('href') === '#' + entrada.target.id;
          if (activo) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    enlaces.forEach((a) => {
      const seccion = document.querySelector(a.getAttribute('href'));
      if (seccion) observador.observe(seccion);
    });
  }

  // 3. Formulario de pedido: valida y muestra confirmación
  const form = document.getElementById('form-pedido');
  const mensaje = document.getElementById('mensaje');

  form.addEventListener('submit', (evento) => {
    evento.preventDefault(); // evita que la página se recargue

    let todoValido = true;
    form.querySelectorAll('[required]').forEach((campo) => {
      const esValido = campo.checkValidity();
      campo.classList.toggle('error', !esValido);
      if (!esValido) todoValido = false;
    });

    // Reinicia la animación del mensaje en cada envío
    mensaje.className = '';
    void mensaje.offsetWidth;

    if (todoValido) {
      mensaje.className = 'ok';
      mensaje.textContent = 'Gracias, ' + form.nombre.value + '. Recibimos tu pedido.';
      form.reset();
    } else {
      mensaje.className = 'mal';
      mensaje.textContent = 'Revisa los campos marcados y vuelve a enviar.';
    }
  });
});