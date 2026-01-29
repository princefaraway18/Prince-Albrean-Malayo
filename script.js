// ===== Custom Cursor =====
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // Cursor interaction with links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const animateElements = document.querySelectorAll(
    '.section-header, .about-text, .education-card, .skill-category, .project-card, .certificate-card, .recommendation-card, .contact-item'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Parallax Effect for Hero Background =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.3 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Typing Effect for Hero Title (Optional Enhancement) =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let index = 0;
    const typeSpeed = 50;
    
    setTimeout(() => {
        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout typeWriter, typeSpeed);
            }
        }
        typeWriter();
    }, 1000);
}

// ===== Skill Tags Animation =====
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.05}s`;
    tag.classList.add('fade-in-up');
});

// ===== Project Cards Stagger Animation =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ===== Certificate Cards Hover Effect =====
const certificateCards = document.querySelectorAll('.certificate-card');

certificateCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Recommendations Slider (Simple Version) =====
let currentSlide = 0;
const recommendationCards = document.querySelectorAll('.recommendation-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(n) {
    if (window.innerWidth <= 768) {
        recommendationCards.forEach((card, index) => {
            card.style.display = index === n ? 'block' : 'none';
        });
    }
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + recommendationCards.length) % recommendationCards.length;
        showSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % recommendationCards.length;
        showSlide(currentSlide);
    });

    // Show slider controls on mobile
    function handleResize() {
        if (window.innerWidth <= 768) {
            document.querySelector('.slider-controls').style.display = 'flex';
            showSlide(currentSlide);
        } else {
            document.querySelector('.slider-controls').style.display = 'none';
            recommendationCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
}

// ===== Active Navigation Link Highlighting =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===== Profile Image Upload Handler =====
const profileImage = document.getElementById('profileImage');

// Handle profile image error (fallback to placeholder)
if (profileImage) {
    profileImage.addEventListener('error', function() {
        // Create a placeholder gradient if image fails to load
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 6rem;
            color: white;
            font-weight: bold;
        `;
        placeholder.textContent = 'PAM';
        this.parentElement.appendChild(placeholder);
    });
}

// ===== Social Links Tracking (Optional Analytics) =====
const socialLinks = document.querySelectorAll('.social-link, .social-btn');

socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const platform = this.getAttribute('aria-label') || 'Social';
        console.log(`Clicked on ${platform} link`);
        // Add analytics tracking here if needed
    });
});

// ===== Add Intersection Observer for Fade-in Effects =====
const fadeElements = document.querySelectorAll('.fade-in-up');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    fadeObserver.observe(el);
});

// ===== Performance Optimization: Debounce Scroll Events =====
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedHighlight = debounce(highlightNavigation, 10);
window.addEventListener('scroll', debouncedHighlight);

// ===== Email Link Click Handler =====
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        console.log('Email link clicked');
        // Optional: Add analytics or custom handling
    });
});

// ===== Lazy Loading for Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== Add Scroll Progress Indicator =====
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgress();

// ===== Initialize all animations on page load =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-in-up');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animationPlayState = 'running';
            }, index * 100);
        });
    }, 300);
});

// ===== Console Easter Egg =====
console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #e94560;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #667eea;');
console.log('%cLet\'s connect: princefaraway18@gmail.com', 'font-size: 12px; color: #adb5bd;');
