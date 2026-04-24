document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       Cursor Glow Effect
       ========================================== */
    const cursorGlow = document.querySelector('.cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Hide cursor glow when it leaves the window
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '1';
    });

    /* ==========================================
       Navigation & Mobile Menu
       ========================================== */
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinksObj = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li a');

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinksObj.classList.toggle('nav-active');
        hamburger.innerHTML = navLinksObj.classList.contains('nav-active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close Mobile Menu on Click & active link styling
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinksObj.classList.remove('nav-active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    /* ==========================================
       Scroll Reveal Animation
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealNav = () => {
        let windowHeight = window.innerHeight;
        let revealTop;
        let revealPoint = 100;

        revealElements.forEach(el => {
            revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealNav);
    revealNav(); // Trigger on load

    /* ==========================================
       Typewriter Effect
       ========================================== */
    const typewriterElement = document.querySelector('.typewriter-text');
    const roles = [
        "AI Enthusiast",
        "Machine Learning Developer",
        "Computer Vision Explorer",
        "Future Software Engineer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at the end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect slightly delayed
    setTimeout(typeEffect, 1500);


    /* ==========================================
       Dynamic Skill Bars
       ========================================== */
    const progressBars = document.querySelectorAll('.progress-line span');
    
    // Animate bars when Skills section comes into view
    const skillsSection = document.getElementById('skills');
    
    let animated = false;
    window.addEventListener('scroll', () => {
        if(!animated) {
            let top = skillsSection.getBoundingClientRect().top;
            if(top < window.innerHeight - 100) {
                progressBars.forEach(bar => {
                    const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
                    // Reset to 0 then animate
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
                animated = true;
            }
        }
    });

    /* ==========================================
       Tilt.js Initialization for Project Cards
       ========================================== */
    // If Tilt.js is loaded from CDN in HTML, initialize it
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    /* ==========================================
       Particles Canvas Background
       ========================================== */
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = Math.min(100, Math.floor(window.innerWidth / 15)); // Responsive amount

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() * 1) - 0.5;
            this.speedY = (Math.random() * 1) - 0.5;
            // Mixed colors for particles (Cyan & Purple variants)
            this.color = Math.random() > 0.5 ? 'rgba(255, 204, 0, 0.3)' : 'rgba(255, 255, 255, 0.2)';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // wrap around bounds
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
});
