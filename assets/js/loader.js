/**
 * Clínica Denki - Universal Component Loader
 * Supports both Fetch (Production) and JS-Fallback (Local file:// preview)
 */

async function loadComponent(id, componentKey, rootPath) {
    const placeholder = document.getElementById(id);
    if (!placeholder) return;

    let html = "";

    // Try to load fallback script first if doesn't exist to ensure file:// support
    if (!window.DENKI_COMPONENTS) {
        await loadScript(rootPath + 'assets/js/components-data.js');
    }

    // Hybrid Strategy
    try {
        // Attempt Fetch if on server
        if (window.location.protocol !== 'file:') {
            const path = componentKey === 'header' ? 'components/header.html' : 'components/footer.html';
            const response = await fetch(rootPath + path);
            if (response.ok) {
                html = await response.text();
            }
        }
    } catch (err) {
        console.warn(`Denki Loader: Fetch failed for ${componentKey}, using fallback.`);
    }

    // Fallback if fetch failed or file://
    if (!html && window.DENKI_COMPONENTS) {
        html = window.DENKI_COMPONENTS[componentKey];
    }

    if (html) {
        html = html.replace(/\{\{root\}\}/g, rootPath);
        placeholder.outerHTML = html;

        if (id === 'header-placeholder') {
            await initDynamicMenu(rootPath);
            initMobileMenu();
        }
    }
}

async function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = resolve; // Continue even if script fails
        document.head.appendChild(script);
    });
}

async function initDynamicMenu(rootPath) {
    // Ensure menu data is loaded
    if (!window.DENKI_MENU_DATA) {
        await loadScript(rootPath + 'assets/js/menu-data.js');
    }

    const menuData = window.DENKI_MENU_DATA;
    if (!menuData) return;

    // Helper to generate menu items
    const generateItems = (data, isSubLevel = false) => data.map(item => {
        const hasServices = item.services && item.services.length > 0;
        const liClass = hasServices ? (isSubLevel ? 'has-sub-dropdown' : 'has-dropdown') : '';
        const ulClass = isSubLevel ? 'sub-dropdown' : 'dropdown-menu';

        let displayTitle = item.title;
        // Clean and Compact Titles for Top level
        if (!isSubLevel) {
            displayTitle = displayTitle.replace('Nutrición ', '')
                .replace('Consulta a ', '');
        }

        return `
            <li class="${liClass}">
                <a href="${rootPath}${item.url}">${displayTitle}</a>
                ${hasServices ? `
                    <ul class="${ulClass}">
                        ${item.services.map(sub => `<li><a href="${rootPath}${sub.url}">${sub.title}</a></li>`).join('')}
                    </ul>
                ` : ''}
            </li>
        `;
    }).join('');

    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        // 1. Unified Hubs (Specialties + Hospitalaria)
        const clinicalHubs = menuData.especialidades || [];
        const hospitalHubs = (menuData.hospitalaria || []).filter(h =>
            !['Disfagia', 'Nutrición Enteral'].includes(h.title) // Avoid duplicates
        );

        const allHubs = [...clinicalHubs, ...hospitalHubs];

        // Insert directly at the beginning
        navMenu.insertAdjacentHTML('afterbegin', generateItems(allHubs));
    }

    // 2. Ubicaciones
    const ubicacionesDesktop = document.getElementById('menu-ubicaciones');
    if (ubicacionesDesktop && menuData.ubicaciones) {
        ubicacionesDesktop.innerHTML = generateItems(menuData.ubicaciones);
    }

    const ubicacionesMobile = document.getElementById('mobile-ubicaciones-container');
    if (ubicacionesMobile && menuData.ubicaciones) {
        ubicacionesMobile.innerHTML = generateItems(menuData.ubicaciones);
    }
}

function calculateRoot() {
    const path = window.location.pathname;
    const parts = path.split('/');

    const rootIndex = parts.indexOf('LandingsDenki2');
    if (rootIndex !== -1) {
        const stepsUp = parts.length - rootIndex - 2;
        return "../".repeat(Math.max(0, stepsUp));
    }

    let cleanParts = parts.filter(p => p.length > 0);
    if (cleanParts.length > 0 && cleanParts[cleanParts.length - 1].includes('.')) {
        cleanParts.pop();
    }
    return "../".repeat(cleanParts.length);
}

function initMobileMenu() {
    // v2 Fullscreen Overlay Menu
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const close = document.getElementById('mobile-menu-close');
    const links = document.querySelectorAll('.mobile-nav-links a');

    if (toggle && menu) {
        const openMenu = () => {
            menu.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        };

        toggle.addEventListener('click', openMenu);
        if (close) close.addEventListener('click', closeMenu);

        links.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // Desktop dropdown hover/click support (unchanged)
    const dropdownLinks = document.querySelectorAll('.has-dropdown > a, .has-sub-dropdown > a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth < 1000) {
                e.preventDefault();
            }
        });
    });
}

function initBanner() {
    const banner = document.querySelector('.maternity-banner');
    if (!banner) return;
    document.body.classList.add('has-banner');
    const updateBannerHeight = () => {
        const h = banner.offsetHeight;
        document.documentElement.style.setProperty('--banner-h', h + 'px');
    };
    updateBannerHeight();
    window.addEventListener('resize', updateBannerHeight);
}

document.addEventListener('DOMContentLoaded', async () => {
    const root = calculateRoot();
    await loadComponent('header-placeholder', 'header', root);
    initBanner();
    loadComponent('footer-placeholder', 'footer', root);
});
