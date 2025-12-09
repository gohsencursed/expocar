// Анимация появления секций при скролле
document.addEventListener('DOMContentLoaded', function() {
    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Функция для обработки скролла
    function handleScroll() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            if (isElementInViewport(section)) {
                section.classList.add('visible');
            }
        });
    }
    
    // Инициализация при загрузке
    handleScroll();
    
    // Обработка скролла
    window.addEventListener('scroll', handleScroll);
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Учитываем фиксированный хедер
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анимация для статистики при появлении
    const statsCard = document.querySelector('.stats-card');
    if (statsCard) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numberElement = entry.target.querySelector('.stats-card__number-text');
                    if (numberElement) {
                        let count = 0;
                        const target = 180;
                        const increment = target / 50; // 50 шагов анимации
                        
                        const timer = setInterval(() => {
                            count += increment;
                            if (count >= target) {
                                count = target;
                                clearInterval(timer);
                            }
                            numberElement.textContent = Math.floor(count);
                        }, 20);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsCard);
    }
});
<script>
// Анимация при скролле
document.addEventListener('DOMContentLoaded', function() {
    // Эффект появления секций при скролле
    const sections = document.querySelectorAll('.services-section, .parts-help-section, .how-we-work-section, .strengths-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => observer.observe(section));
    
    // Кнопка "Наверх"
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Наверх');
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
            document.querySelector('.header').classList.add('scrolled');
        } else {
            scrollToTopBtn.classList.remove('show');
            document.querySelector('.header').classList.remove('scrolled');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Активная ссылка в навигации
    const navLinks = document.querySelectorAll('.nav__link');
    
    function setActiveLink() {
        const scrollPos = window.scrollY + 100;
        
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // Эффект при наведении на карточки услуг
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Предзагрузка изображений для плавного появления
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
});
</script>