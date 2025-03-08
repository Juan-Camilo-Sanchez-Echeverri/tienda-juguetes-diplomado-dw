document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (contactForm.checkValidity()) {
      alert('Formulario enviado correctamente.');
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    } else {
      event.stopPropagation();
      contactForm.classList.add('was-validated');
    }
  });
});
