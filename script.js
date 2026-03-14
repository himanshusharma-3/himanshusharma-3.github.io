// ============================================================
// SPLASH SCREEN FUNCTIONALITY - REMOVED
// ============================================================

// ============================================================
// STARFIELD BACKGROUND ANIMATION
// ============================================================

function createStarfield() {
    const container = document.getElementById('stars-container');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 2 + 0.5;
        const duration = Math.random() * 3 + 2;
        
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDuration = duration + 's';
        star.style.animationDelay = Math.random() * 3 + 's';
        
        container.appendChild(star);
    }

    // Recreate stars when window is resized (with debouncing)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            container.innerHTML = '';
            createStarfield();
        }, 200);
    });
}

// ============================================================
// INTERACTIVE IMAGE HOVER EFFECT
// ============================================================

function setupImageHoverEffect() {
    const wrapper = document.getElementById('imageWrapper');
    const overlay = document.getElementById('imageOverlay');

    if (!wrapper || !overlay) return;

    let mouseX = wrapper.offsetWidth / 2;
    let mouseY = wrapper.offsetHeight / 2;

    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        // Bigger reveal radius
        const radius = 110;
        
        // Show image-2 in circle using clip-path
        overlay.style.clipPath = `circle(${radius}px at ${mouseX}px ${mouseY}px)`;

        // Hide image-1 in circle
        document.getElementById('mainImage').style.opacity = '0';

        // Add subtle glow effect following cursor
        const x = (mouseX / rect.width) * 100;
        const y = (mouseY / rect.height) * 100;
        
        wrapper.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, rgba(0, 245, 255, 0.15) 0%, rgba(157, 78, 221, 0.05) 100%)`;
    });

    wrapper.addEventListener('mouseleave', () => {
        // Show image-1 again
        overlay.style.clipPath = 'circle(0px at 50% 50%)';
        document.getElementById('mainImage').style.opacity = '1';
        wrapper.style.backgroundImage = 'linear-gradient(135deg, rgba(157, 78, 221, 0.1), rgba(0, 245, 255, 0.05))';
    });
}

// ============================================================
// SMOOTH SCROLL PADDING FOR FIXED NAVBAR
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================================
// SCROLL ANIMATIONS - FADE IN ON SCROLL
// ============================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${index * 0.1}s`;
            entry.target.classList.add('section-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach((section, index) => {
    section.classList.add('section-scroll-animate');
    observer.observe(section);
});

// ============================================================
// MOBILE MENU TOGGLE
// ============================================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ============================================================
// MOUSE CURSOR POSITION TRACKING
// ============================================================

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    document.documentElement.style.setProperty('--mouse-x', x + 'px');
    document.documentElement.style.setProperty('--mouse-y', y + 'px');
});

// ============================================================
// PARALLAX EFFECT ON SECTIONS
// ============================================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
}, { passive: true });

// ============================================================
// INIT FUNCTION
// ============================================================

function init() {
    createStarfield();
    setupImageHoverEffect();
    
    console.log('✨ Portfolio website initialized successfully!');
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
