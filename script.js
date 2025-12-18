// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Основные переменные
     // Элементы
  // Элементы меню
  const menuToggle = document.querySelector('.header__menu-toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose = document.querySelector('.mobile-menu-close');
  const body = document.body;
  
  // Проверяем элементы
  if (!menuToggle || !mobileMenu) {
    console.error('Элементы меню не найдены!');
    return;
  }
  
  console.log('✅ Элементы меню найдены');
  
  // Создаем оверлей (темный фон)
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);
  console.log('✅ Оверлей создан');
  
  // Функция открытия меню
  function openMenu() {
    console.log('▶️ Открываем меню');
    
    // Блокируем скролл
    body.classList.add('menu-open');
    body.style.overflow = 'hidden';
    
    // Показываем оверлей
    overlay.classList.add('active');
    
    // Превращаем бургер в крестик
    menuToggle.classList.add('active');
    
    // Показываем меню (с небольшой задержкой для оверлея)
    setTimeout(() => {
      mobileMenu.classList.add('active');
      console.log('✅ Меню открыто справа');
    }, 50);
  }
  
  // Функция закрытия меню
  function closeMenu() {
    console.log('◀️ Закрываем меню');
    
    // Скрываем меню (уедет вправо)
    mobileMenu.classList.remove('active');
    
    // Возвращаем бургер
    setTimeout(() => {
      menuToggle.classList.remove('active');
    }, 200);
    
    // Скрываем оверлей
    overlay.classList.remove('active');
    
    // Разблокируем скролл
    setTimeout(() => {
      body.classList.remove('menu-open');
      body.style.overflow = '';
      console.log('✅ Меню закрыто');
    }, 400);
  }
  
  // Переключение меню
  function toggleMenu() {
    if (mobileMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  }
  
  // ====== ОБРАБОТЧИКИ СОБЫТИЙ ======
  
  // 1. Клик по бургеру
  menuToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('🟣 Клик по бургеру');
    toggleMenu();
  });
  
  // 2. Клик по крестику в меню
  if (menuClose) {
    menuClose.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('❌ Клик по крестику');
      closeMenu();
    });
  }
  
  // 3. Клик по пунктам меню
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('📌 Клик по пункту меню:', this.textContent);
      closeMenu();
      
      // Плавная прокрутка к секции
      const sectionName = this.textContent.trim();
      const sectionMap = {
        'Главная': 'main',
        'О нас': 'about',
        'Услуги': 'services',
        'Контакты': 'contacts'
      };
      
      const sectionId = sectionMap[sectionName];
      if (sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          setTimeout(() => {
            window.scrollTo({
              top: targetSection.offsetTop - 80,
              behavior: 'smooth'
            });
          }, 400);
        }
      }
    });
  });
  
  // 4. Клик по оверлею (темному фону)
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      console.log('🌑 Клик по оверлею');
      closeMenu();
    }
  });
  
  // 5. Закрытие по клавише ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      console.log('⌨️ Нажата ESC');
      closeMenu();
    }
  });
  
  // 6. Закрытие при изменении размера окна
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
      console.log('📱 Ресайз окна, закрываем меню');
      closeMenu();
    }
  });
  
  // 7. Предотвращаем закрытие при клике внутри меню
  mobileMenu.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  
  console.log('✅ Бургер-меню инициализировано');
});

  // Плавное появление элементов при скролле
  const animatedElements = document.querySelectorAll(
    '.service-card, .step-details, .strength-item, .service-title'
  );
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
          entry.target.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }, index * 100);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px) scale(0.9)';
    observer.observe(el);
  });

// Анимация счетчика клиентов
function initCounterAnimation() {
  const counterElement = document.querySelector('.client-count');
  if (!counterElement) return;
  
  // Анимация счетчика при появлении в поле зрения
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counterElement.dataset.animated) {
        counterElement.dataset.animated = 'true';
        startCounterAnimation(counterElement);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(document.querySelector('.client-stats'));
  
  function startCounterAnimation(element) {
    const target = 180;
    let current = 0;
    const duration = 2500; // 2.5 секунды
    const steps = 60;
    const stepTime = duration / steps;
    const increment = target / steps;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
        
        // Эффект при достижении цели
        element.style.transform = 'scale(1.2)';
        setTimeout(() => {
          element.style.transform = 'scale(1)';
          element.style.transition = 'transform 0.3s ease';
        }, 200);
      }
      element.textContent = Math.floor(current);
    }, stepTime);
  }
}
    
    // 2. Закрываем меню при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024 && mobileMenu && mobileMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Открыть меню');
            body.style.overflow = '';
        }
    });
    
    // 3. Анимация подсчета клиентов
    function startCounter() {
        const counterElement = document.querySelector('.client-count');
        if (!counterElement) return;
        
        // Запускаем только на десктопе
        if (window.innerWidth > 768) {
            let count = 0;
            const target = 180;
            const duration = 2000;
            const step = target / (duration / 16.67);
            
            // Ждем пока секция будет видна
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    const startTime = Date.now();
                    
                    function updateCounter() {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        count = Math.floor(progress * target);
                        counterElement.textContent = count;
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counterElement.textContent = target;
                        }
                    }
                    
                    setTimeout(updateCounter, 500);
                    observer.disconnect();
                }
            }, { threshold: 0.5 });
            
            observer.observe(document.querySelector('.strengths-section'));
        } else {
            // На мобильных просто показываем число
            counterElement.textContent = '180';
        }
    }
    
    // 4. Появление секций при скролле
    function showSections() {
        const sections = document.querySelectorAll(
            '.services-section, .parts-help-section, .how-we-work-section, .strengths-section'
        );
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => observer.observe(section));
    }
    
    // 5. Кнопка "Наверх"
    function initScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.setAttribute('aria-label', 'Наверх');
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('show');
                document.querySelector('.header').classList.add('scrolled');
            } else {
                scrollBtn.classList.remove('show');
                document.querySelector('.header').classList.remove('scrolled');
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 6. Плавная прокрутка для якорных ссылок
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        window.scrollTo({
                            top: target.offsetTop - headerHeight,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // 7. Инициализация всех функций
    function initAll() {
        startCounter();
        showSections();
        initScrollToTop();
        initSmoothScroll();
        
        // Запуск счетчика при загрузке если уже видно
        setTimeout(() => {
            const strengthsSection = document.querySelector('.strengths-section');
            if (strengthsSection) {
                const rect = strengthsSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    startCounter();
                }
            }
        }, 100);
        
        // Также запускаем при скролле
        window.addEventListener('scroll', function() {
            const strengthsSection = document.querySelector('.strengths-section');
            if (strengthsSection && !strengthsSection.dataset.counterStarted) {
                const rect = strengthsSection.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    strengthsSection.dataset.counterStarted = 'true';
                    startCounter();
                }
            }
        });
    }
    
    // Инициализация при загрузке
    initAll();
    
    // Оптимизация для планшетов: ленивая загрузка изображений
    function initLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        } else {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Инициализация ленивой загрузки
    initLazyLoading();
    
    // Обработчик изменения ориентации устройства
    window.addEventListener('orientationchange', function() {
        // Обновляем карусель и другие компоненты при повороте
        setTimeout(function() {
            window.dispatchEvent(new Event('resize'));
        }, 300);
    });
;
