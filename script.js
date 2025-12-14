// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Form submission handler
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Simple form validation
    const inputs = this.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#2ecc71';
        }
    });

    if (isValid) {
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Reset border colors
            inputs.forEach(input => {
                input.style.borderColor = '#e9ecef';
            });
        }, 1000);
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const toggleBtn = document.querySelector('.mobile-menu-toggle');

    navMenu.classList.toggle('active');

    // Change icon when menu is active
    if (navMenu.classList.contains('active')) {
        toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// Close mobile menu when clicking a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link, .appointment-btn');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            const toggleBtn = document.querySelector('.mobile-menu-toggle');

            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
});

// Combined DOMContentLoaded functionality
document.addEventListener('DOMContentLoaded', function() {
    // Device-specific map links
    const directionsLink = document.querySelector('.directions-link');

    if (directionsLink) {
        // Check if user is on iOS device
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        if (isIOS) {
            // Use Apple Maps for iOS devices
            directionsLink.href = 'https://maps.apple.com/place?place-id=I1370C9699A4EE604&address=Sehit+Ismail+Basaran+Cd.+4C%2C+06360+Altindag+Ankara%2C+T%C3%BCrkiye&coordinate=39.970372%2C32.928872&name=Filizdent+A%C4%9F%C4%B1z+ve+Di%C5%9F+Sa%C4%9Fl%C4%B1%C4%9F%C4%B1+Poliklini%C4%9Fi&_provider=9902';
        }
        // Keep Google Maps link for all other devices
    }

    // Video loading fallback
    const video = document.querySelector('.hero-video');

    if (video) {
        video.addEventListener('error', function() {
            // Video failed to load, show fallback image
            document.querySelector('.hero-fallback').style.display = 'block';
        });

        video.addEventListener('loadeddata', function() {
            // Video loaded successfully, hide fallback
            document.querySelector('.hero-fallback').style.display = 'none';
        });
    }
});
