document.addEventListener('DOMContentLoaded', function () {
  // ================================
  // BOTÃO "VOLTAR AO TOPO"
  // ================================
  const backToTopBtn = document.querySelector('.btn-back-to-top');

  function toggleBackToTop() {
    if (!backToTopBtn) return;

    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }

  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop(); // estado inicial

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Ou:
      // document.getElementById('topo')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ================================
  // GALERIA - CONTROLE DO CARROSSEL
  // ================================
  const galleryButtons = document.querySelectorAll('.rtech-gallery-thumb-btn');
  const galleryCarouselElement = document.getElementById('galeriaCarousel');

  if (galleryButtons.length && galleryCarouselElement && typeof bootstrap !== 'undefined') {
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

  // Seção "Serviços" para efeito em cascata
  const servicosSection = document.querySelector('section[aria-labelledby="titulo-servicos"]');
  let servicosFeatureCards = [];

  if (servicosSection) {
    servicosFeatureCards = servicosSection.querySelectorAll('.feature-card');

    // Marca os cards de serviço para cascata e define o delay
    servicosFeatureCards.forEach((card, index) => {
      card.classList.add('cascade-item');
      // 70ms entre um card e outro (pode ajustar pra 80/100ms se quiser mais lento)
      card.style.setProperty('--cascade-delay', `${index * 70}ms`);
    });
  }

  if (sections.length) {
    const prefersReducedMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // adiciona classe base em todos os cards de seção
    sections.forEach((section) => {
      section.classList.add('reveal-section');
    });

    if (prefersReducedMotion) {
      // usuário não quer muita animação → mostra tudo direto
      sections.forEach((section) => {
        section.classList.add('is-visible');
      });

      if (servicosSection) {
        servicosSection.classList.add('cascade-active');
      }
    } else {
      // fallback universal: scroll + getBoundingClientRect
      const revealOnScroll = () => {
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const triggerPoint = windowHeight * 0.82; // ~80% da tela

        sections.forEach((section) => {
          if (section.classList.contains('is-visible')) return; // já animou

          const rect = section.getBoundingClientRect();
          const top = rect.top;

          if (top < triggerPoint) {
            section.classList.add('is-visible');

            // Se for a seção de Serviços, ativa a cascata
            if (servicosSection && section === servicosSection) {
              servicosSection.classList.add('cascade-active');
            }
          }
        });
      };

      // roda no load e no scroll/resize
      window.addEventListener('scroll', revealOnScroll);
      window.addEventListener('resize', revealOnScroll);
      revealOnScroll();
    }
  }
});
