document.addEventListener('DOMContentLoaded', function () {
  const backToTopBtn = document.querySelector('.btn-back-to-top');
  if (!backToTopBtn) return;

  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }

  // Mostra/oculta ao rolar
  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop(); // estado inicial

  // Voltar suavemente para o topo
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Se preferir rolar até o id="topo", poderia usar:
    // document.getElementById('topo')?.scrollIntoView({ behavior: 'smooth' });
  });
});
