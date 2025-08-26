// Enhanced JavaScript for BSA website
document.addEventListener('DOMContentLoaded', function() {
    console.log('BSA Website loaded successfully! 🚀');
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Initialize typing effect after a delay
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 150);
        }
    }, 1000);
    
    // Animated counter for stats
  function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      const suffix = target >= 100 ? '%' : '+';
      element.textContent = target + suffix;
    }
  }
  updateCounter();
}


    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate stat numbers when they come into view
                if (entry.target.classList.contains('stat')) {
                    const statNumber = entry.target.querySelector('.stat-number');
                    const text = statNumber.textContent;
                    
                    if (text.includes('100%')) {
                        animateCounter(statNumber, 100);
                    } else if (text.includes('1+')) {
                        animateCounter(statNumber, 1);
                    } else if (text.includes('24/7')) {
                        statNumber.textContent = '24/7';
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Service cards hover effect with 3D tilt
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // Matrix rain effect (lightweight version)
  function createMatrixRain() {
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = 'アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワヲン';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 0.5;

    }
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  loop();
}
window.addEventListener('load', createMatrixRain);

    
    // Initialize matrix effect after page load
    setTimeout(createMatrixRain, 2000);
    
    // Add glitch effect to logo on hover
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.5s infinite';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    }
    
    // Particle system for floating elements
    function createParticles() {
        const particleContainer = document.querySelector('.floating-elements');
        if (!particleContainer) return;
        
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#00f5ff';
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = '0 0 10px #00f5ff';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Animation
            particle.style.animation = `particle-float ${5 + Math.random() * 5}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particleContainer.appendChild(particle);
        }
    }
    
    // Add particle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-float {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.7;
            }
            25% {
                transform: translate(20px, -30px) scale(1.2);
                opacity: 1;
            }
            50% {
                transform: translate(-15px, -60px) scale(0.8);
                opacity: 0.5;
            }
            75% {
                transform: translate(30px, -30px) scale(1.1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize particles
    setTimeout(createParticles, 3000);
    
    // Add cyberpunk welcome message
    setTimeout(() => {
        const welcomeMsg = `
┌─┐ ┬ ┬┌┐ ┌─┐┬─┐┌─┐┌─┐┌─┐┬ ┬┬─┐┬┌┬┐┬ ┬  ┌─┐─┐ ┬┌─┐┌─┐┬─┐┌┬┐
│   └┬┘├┴┐├┤ ├┬┘└─┐├┤ │  │ │├┬┘│ │ └┬┘  ├┤ ┌┴┬┘├─┘├┤ ├┬┘ │ 
└─┘  ┴ └─┘└─┘┴└─└─┘└─┘└─┘└─┘┴└─┴ ┴  ┴   └─┘┴ └─┴  └─┘┴└─ ┴ 

Welcome to BSA - Building Superior Applications! 🔐
        `;
        
        console.log('%c' + welcomeMsg, 'color: #00f5ff; font-family: monospace; font-size: 10px;');
        console.log('%cSystemStatus: SECURE ✅ | Services: ACTIVE 🟢 | Ready for deployment! 🚀', 'color: #39ff14; font-weight: bold;');
    }, 1500);
    
    // Contact form enhancement (if you add a form later)
    const contactButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Easter egg: Konami code for special effect
   let konamiCode = [];
const konamiSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow-bg 2s ease-in-out';
        console.log('%c🎉 KONAMI CODE ACTIVATED! Welcome, Elite Hacker! 🎉', 'color: #ff0080; font-size: 20px; font-weight: bold;');
        setTimeout(() => {
            document.body.style.animation = 'none';
        }, 2000);
    }
});
    
    // Add rainbow background animation for easter egg
    const easterEggStyle = document.createElement('style');
    easterEggStyle.textContent = `
        @keyframes rainbow-bg {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(easterEggStyle);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`%cBSA Website loaded in ${Math.round(loadTime)}ms ⚡`, 'color: #39ff14; font-weight: bold;');
});