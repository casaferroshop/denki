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

    const isBlogMainContent = (el) =>
        el.classList.contains('post-body-text') ||
        el.classList.contains('post-hero-grid') ||
        el.classList.contains('post-sidebar');

    const observerOptions = {
        threshold: 0,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('fruit-box')) {
                    entry.target.style.transitionDelay = entry.target.dataset.delay || '0ms';
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const activateVisibleReveals = () => {
        const viewHeight = window.innerHeight || document.documentElement.clientHeight;
        document.querySelectorAll('.reveal:not(.active)').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < viewHeight && rect.bottom > 0) {
                el.classList.add('active');
                observer.unobserve(el);
            }
        });
    };

    document.querySelectorAll('.reveal').forEach((el, index) => {
        if (!el.dataset.delay) {
            el.dataset.delay = (index % 3) * 150 + 'ms';
        }
        if (isBlogMainContent(el)) {
            el.classList.add('active');
            return;
        }
        observer.observe(el);
    });

    activateVisibleReveals();
    requestAnimationFrame(activateVisibleReveals);
    window.addEventListener('load', activateVisibleReveals, { once: true });

    let scrollTick = false;
    window.addEventListener('scroll', () => {
        if (!scrollTick) {
            scrollTick = true;
            requestAnimationFrame(() => {
                activateVisibleReveals();
                scrollTick = false;
            });
        }
    }, { passive: true });

    window.addEventListener('resize', activateVisibleReveals, { passive: true });
    setTimeout(activateVisibleReveals, 1000);
    setTimeout(activateVisibleReveals, 3000);

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
