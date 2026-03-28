// ============================================
// LP Hands On Dr. Duprat — JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- AOS Init ----------
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
    disableMutationObserver: true
  });

  // ---------- FAQ Accordion ----------
  const faqItems = document.querySelectorAll('.faq__pergunta');

  faqItems.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const resposta = document.getElementById(btn.getAttribute('aria-controls'));

      // Fecha todos os outros
      faqItems.forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const otherResp = document.getElementById(other.getAttribute('aria-controls'));
          if (otherResp) {
            otherResp.style.maxHeight = '0';
            otherResp.setAttribute('aria-hidden', 'true');
          }
        }
      });

      // Toggle o clicado
      if (expanded) {
        btn.setAttribute('aria-expanded', 'false');
        resposta.style.maxHeight = '0';
        resposta.setAttribute('aria-hidden', 'true');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        resposta.style.maxHeight = resposta.scrollHeight + 'px';
        resposta.setAttribute('aria-hidden', 'false');
      }
    });

    // Keyboard: Enter/Space
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Init: fechar todas as respostas
  document.querySelectorAll('.faq__resposta').forEach(resp => {
    resp.style.maxHeight = '0';
    resp.setAttribute('aria-hidden', 'true');
  });

  // ---------- Counter Animation ----------
  const counters = document.querySelectorAll('.autoridade__num-valor');

  if (counters.length > 0) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 2000;
      const start = performance.now();

      const easeOut = (t) => 1 - Math.pow(1 - t, 3);

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.round(easeOut(progress) * target);

        // Formata número com ponto (1.200, 8.000)
        el.textContent = value.toLocaleString('pt-BR');

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(animateCounter);
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(counters[0].closest('.autoridade__numeros'));
  }

});
