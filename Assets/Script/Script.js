// ===========================================
// SMOOTH SCROLL NAVIGATION
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================================
    // MOBILE MENU TOGGLE
    // ===========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // ===========================================
    // NAVBAR SCROLL EFFECT
    // ===========================================
    const navbar = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class for styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===========================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ===========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // ===========================================
    // TYPING EFFECT FOR HERO SECTION
    // ===========================================
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        typingElement.style.display = 'inline-block';

        let charIndex = 0;

        function typeText() {
            if (charIndex < text.length) {
                typingElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 50); // Typing speed
            } else {
                // Remove blinking cursor after typing is complete
                setTimeout(() => {
                    typingElement.classList.add('typing-complete');
                }, 500);
            }
        }

        // Start typing after a short delay
        setTimeout(typeText, 500);
    }

    // ===========================================
    // COUNTER ANIMATION FOR STATISTICS
    // ===========================================
    function animateCounter(element, target, duration = 2500, suffix = '') {
        let startTime = null;

        // Easing function for smooth animation (easeOutQuart)
        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function updateCounter(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Apply easing function for smooth animation
            const easedProgress = easeOutQuart(progress);
            const currentValue = Math.floor(easedProgress * target);

            element.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Observe statistics section for counter animation
    const statsSection = document.querySelector('.py-16.bg-teal-dark');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.text-4xl');
                    counters.forEach(counter => {
                        const text = counter.textContent.trim();
                        const numberMatch = text.match(/\d+/);
                        if (numberMatch) {
                            const targetNumber = parseInt(numberMatch[0]);
                            const suffix = text.replace(numberMatch[0], '');

                            counter.textContent = '0' + suffix;
                            animateCounter(counter, targetNumber, 2500, suffix);
                        }
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // ===========================================
    // CARD PARALLAX EFFECT
    // ===========================================
    const projectCards = document.querySelectorAll('.project-card, .card-hover');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===========================================
    // HERO IMAGE FADE IN
    // ===========================================
    const heroImage = document.querySelector('.hero-image-container img');
    if (heroImage) {
        heroImage.addEventListener('load', function () {
            this.style.opacity = '0';
            this.style.transition = 'opacity 1s ease-in-out';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    }

    // ===========================================
    // SKILL CARDS STAGGER ANIMATION
    // ===========================================
    const skillCards = document.querySelectorAll('.skill-card, .bg-champagne');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // ===========================================
    // SMOOTH REVEAL FOR EXPERIENCE TIMELINE
    // ===========================================
    const experienceItems = document.querySelectorAll('#experience .flex');
    experienceItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.2}s`;
    });

    // Re-observe experience items
    experienceItems.forEach(el => observer.observe(el));

    // ===========================================
    // PAGE LOAD ANIMATION
    // ===========================================
    window.addEventListener('load', function () {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // ===========================================
    // ACTIVE NAVIGATION HIGHLIGHT
    // ===========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const footer = document.querySelector('footer');

    function highlightNavigation() {
        let scrollPosition = window.pageYOffset;
        let currentSection = '';

        // Check if we're in the footer area
        if (footer) {
            const footerTop = footer.offsetTop - 100;
            if (scrollPosition >= footerTop) {
                // Remove all highlights when in footer
                navLinks.forEach(link => {
                    link.classList.remove('text-rose');
                });
                return;
            }
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-rose');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('text-rose');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ===========================================
    // CONSOLE MESSAGE
    // ===========================================
    console.log('%c👋 Welcome to Dinda Natasya Artaviana Portfolio', 'color: #e5b3a3; font-size: 16px; font-weight: bold;');
    console.log('%cDesigned with ❤️ and modern web technologies', 'color: #0d2e33; font-size: 12px;');
});
