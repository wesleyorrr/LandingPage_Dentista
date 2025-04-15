document.addEventListener('DOMContentLoaded', function() {
  // Menu mobile
  const mobileMenuBtn = document.querySelector('.mobile-menu');
  const navList = document.querySelector('.nav-list');
  
  mobileMenuBtn.addEventListener('click', function() {
    navList.classList.toggle('active');
  });
  
  // Carrossel principal
  const carouselInner = document.querySelector('.carousel-inner');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  
  let currentIndex = 0;
  let interval;
  const totalItems = carouselItems.length;
  
  // Criar indicadores
  function createIndicators() {
    indicatorsContainer.innerHTML = '';
    carouselItems.forEach((_, index) => {
      const indicator = document.createElement('span');
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });
  }
  
  createIndicators();
  const indicators = document.querySelectorAll('.carousel-indicators span');
  
  function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Atualizar indicadores
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  }
  
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetInterval();
  }
  
  function startInterval() {
    interval = setInterval(nextSlide, 5000);
  }
  
  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }
  
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });
  
  // Iniciar carrossel
  updateCarousel();
  startInterval();
  
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      item.classList.toggle('active');
      
      // Fechar outros itens
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
    });
  });
  
  // Função para enviar para WhatsApp
  window.enviarParaWhatsapp = function() {
    const mensagem = document.getElementById('duvidaInput').value;
    if (!mensagem.trim()) {
      alert('Por favor, digite sua dúvida antes de enviar.');
      return;
    }
    
    const telefone = '5538999999999';
    const texto = `Olá, gostaria de tirar uma dúvida sobre o plano odontológico: ${mensagem}`;
    const link = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;
    window.open(link, '_blank');
  };
  
  // Suavizar scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Fechar menu mobile se aberto
        if (navList.classList.contains('active')) {
          navList.classList.remove('active');
        }
      }
    });
  });
});