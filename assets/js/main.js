// Shared UI Logic for Clínica Denki Landings - Premium Version
document.addEventListener('DOMContentLoaded', () => {
    // Scroll Progress Bar
    const progressContainer = document.getElementById("scroll-progress");
    const header = document.getElementById("main-header");

    const updateScroll = () => {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;

        if (progressContainer) {
            progressContainer.style.width = scrolled + "%";
        }

        // Header scroll effect - use 30px for faster feedback
        if (header) {
            if (winScroll > 30) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    };

    window.addEventListener('scroll', updateScroll);

    // Reveal Animations with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Pulse effect for premium feel on cards
                if (entry.target.classList.contains('fruit-box')) {
                    entry.target.style.transitionDelay = entry.target.dataset.delay || '0ms';
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el, index) => {
        // Auto-staggering if not specified
        if (!el.dataset.delay) {
            el.dataset.delay = (index % 3) * 150 + 'ms';
        }
        observer.observe(el);
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
