// Mobile Navigation
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navLinks.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    });
});

// Smooth scrolling
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
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
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

// Observe elements for scroll animations
document.querySelectorAll('.work-card, .stat-card, .contact-card, .skill-bubble').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Skill bubbles staggered animation
const skillsSection = document.querySelector('.skills-cloud');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBubbles = entry.target.querySelectorAll('.skill-bubble');
                skillBubbles.forEach((bubble, index) => {
                    setTimeout(() => {
                        bubble.style.opacity = '1';
                        bubble.style.transform = 'translateY(0) scale(1)';
                        bubble.style.animation = 'bounceIn 0.6s ease forwards';
                    }, index * 100);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    });
    skillsObserver.observe(skillsSection);
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    updateCounter();
}

// Trigger counter animation
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    if (!isNaN(target)) {
                        animateCounter(stat, target);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    });
    statsObserver.observe(statsSection);
}

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Work card hover effects
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const overlay = card.querySelector('.work-overlay');
        overlay.style.opacity = '1';
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        const overlay = card.querySelector('.work-overlay');
        overlay.style.opacity = '0';
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Social links hover animation
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Animate hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const profileContainer = document.querySelector('.profile-container, .profile-placeholder');
    
    setTimeout(() => {
        if (heroTitle) heroTitle.style.animation = 'slideInUp 1s ease forwards';
    }, 200);
    
    setTimeout(() => {
        if (heroSubtitle) heroSubtitle.style.animation = 'slideInUp 1s ease forwards';
    }, 400);
    
    setTimeout(() => {
        if (heroDescription) heroDescription.style.animation = 'slideInUp 1s ease forwards';
    }, 600);
    
    setTimeout(() => {
        if (heroButtons) heroButtons.style.animation = 'slideInUp 1s ease forwards';
    }, 800);
    
    setTimeout(() => {
        if (profileContainer) profileContainer.style.animation = 'zoomIn 1s ease forwards';
    }, 1000);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.5);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: translateY(30px) scale(0.3);
        }
        50% {
            opacity: 1;
            transform: translateY(-10px) scale(1.05);
        }
        70% {
            transform: translateY(5px) scale(0.9);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in;
    }
    
    .hero-title,
    .hero-subtitle,
    .hero-description,
    .hero-buttons,
    .profile-container,
    .profile-placeholder {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Cursor trail effect (optional)
let mouseX = 0;
let mouseY = 0;
let trailElements = [];

for (let i = 0; i < 5; i++) {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.width = '10px';
    trail.style.height = '10px';
    trail.style.background = `linear-gradient(135deg, #667eea ${i * 20}%, #764ba2 100%)`;
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9999';
    trail.style.opacity = 1 - (i * 0.2);
    trail.style.transform = 'scale(0)';
    trail.style.transition = 'transform 0.3s ease';
    document.body.appendChild(trail);
    trailElements.push(trail);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    trailElements.forEach((trail, index) => {
        setTimeout(() => {
            trail.style.left = (mouseX - 5) + 'px';
            trail.style.top = (mouseY - 5) + 'px';
            trail.style.transform = 'scale(1)';
            
            setTimeout(() => {
                trail.style.transform = 'scale(0)';
            }, 100);
        }, index * 50);
    });
});