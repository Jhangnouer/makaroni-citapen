// Konfigurasi
const WA_NUMBER = '6281234567890'; // GANTI INI!
const config = {
    waNumber: WA_NUMBER,
    animationDuration: 2000
};

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(() => {
        document.querySelector('.preloader').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.preloader').style.display = 'none';
        }, 500);
    }, 1500);

    // Navbar Mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 30px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }
    });

    // Counter Animation
    animateCounters();

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu
            document.querySelector('.nav-menu').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        });
    });

    // Menu Order
    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const menuCard = this.closest('.menu-card');
            const menuName = menuCard.dataset.menu;
            orderWhatsApp(menuName);
        });
    });

    // Parallax Effect
    window.addEventListener('scroll', parallaxEffect);

    // Animate on Scroll
    initScrollAnimations();

    // Stats Intersection Observer
    observeStats();
});

// WhatsApp Order
function orderWhatsApp(menu = '') {
    let message = 'Halo Makaroni Sedap Premium! 😋%0A%0A';
    if (menu) {
        message += `Saya mau pesan:%0A👉 ${menu}%0A%0A`;
    }
    message += `Alamat lengkap & detail nanti saya kasih ya! 🙏%0ATerima kasih!`;
    
    const whatsappUrl = `https://wa.me/${config.waNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + (current % 1 > 0.5 ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Start when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(counter);
    });
}

// Parallax Effect
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * speed}px)`;
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);

    document.querySelectorAll('.menu-card, .gallery-item, .contact-card, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.95)';
        el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });
}

// Stats Observer
function observeStats() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.hero-stats').forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Intersection Observer for Stats
window.observeStats = function() {
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.7 });
        observer.observe(statsSection);
    }
};

// Window Load
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});