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


  // ================================
  // GALERIA - CONTROLE DO CARROSSEL
  // ================================
  const galleryButtons = document.querySelectorAll('.rtech-gallery-thumb-btn');
  const galleryCarouselElement = document.getElementById('galeriaCarousel');

  if (galleryButtons.length && galleryCarouselElement) {
    const galleryCarousel = new bootstrap.Carousel(galleryCarouselElement, {
      interval: false,
      ride: false
    });

    galleryButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        const index = Number(this.getAttribute('data-bs-index')) || 0;
        galleryCarousel.to(index);
      });
    });
  }

  // ==========================================
  // ANIMAÇÃO DE ENTRADA DOS SECTIONS (.section-card)
  // ==========================================
  const sections = document.querySelectorAll('.section-card');

  if (sections.length) {
    const prefersReducedMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Adiciona a classe base em todos os cards de seção
    sections.forEach((section) => {
      section.classList.add('reveal-section');
    });

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              // Mostrou uma vez, não precisa observar de novo
              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.18 // quando ~18% do card aparecer na tela
        }
      );

      sections.forEach((section) => observer.observe(section));
    } else {
      // Sem suporte ou com redução de movimento: tudo já visível
      sections.forEach((section) => {
        section.classList.add('is-visible');
      });
    }
  }

});
