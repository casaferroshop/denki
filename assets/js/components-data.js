window.DENKI_COMPONENTS = {
    header: `
<div class="maternity-banner">
    🍼 <strong>Aviso:</strong> Clínica Denki cierra temporalmente por maternidad. Regresamos en <strong>julio 2026</strong>. Para consultas: <a href="https://wa.me/525550150285">WhatsApp</a>
</div>
<header id="main-header">
    <nav class="container">
        <a href="{{root}}index.html" class="logo">
            <img src="{{root}}assets/img/logo-mobile.png" alt="Clínica Denki Logo">
        </a>

        <!-- Desktop Navigation -->
        <ul class="nav-links" id="nav-menu">
            <!-- Clinical Hubs injected dynamically here -->

            <!-- Ubicaciones: Desktop Only -->
            <li class="has-dropdown d-none-mobile">
                <a href="#">Ubicaciones</a>
                <ul class="dropdown-menu" id="menu-ubicaciones"></ul>
            </li>

            <!-- Mobile Only: Ubicaciones Injection -->
            <li id="mobile-ubicaciones-container" class="d-none-desktop"></li>

            <li><a href="{{root}}blog/">Blog</a></li>
            <li><a href="{{root}}pages/nosotros">Nosotros</a></li>
        </ul>

        <!-- Action Buttons (always visible) -->
        <div class="nav-actions">
            <a href="https://wa.me/525550150285" class="btn btn-primary btn-sm">Agendar</a>
            <button id="mobile-menu-toggle" class="mobile-toggle" aria-label="Abrir menú">
                <span class="hamburger"></span>
            </button>
        </div>
    </nav>
</header>

<!-- Mobile Fullscreen Overlay Menu -->
<div id="mobile-menu" class="mobile-menu-overlay">
    <div class="mobile-menu-content">
        <button id="mobile-menu-close" class="close-btn" aria-label="Cerrar menú">&times;</button>
        <ul class="mobile-nav-links">
            <li class="mobile-section-title"><strong>Especialidades</strong></li>
            <li><a href="{{root}}nutricion-metabolica/">Nutrición Metabólica</a></li>
            <li><a href="{{root}}nutricion-cardiovascular/">Nutrición Cardiovascular</a></li>
            <li><a href="{{root}}nutricion-neurologica/">Nutrición Neurológica</a></li>
            <li><a href="{{root}}nutricion-oncologica/">Nutrición Oncológica</a></li>
            <li><a href="{{root}}nutricion-geriatrica/">Nutrición Geriátrica</a></li>
            <li><a href="{{root}}nutricion-clinica/">Nutrición Clínica</a></li>
            <li><hr></li>
            <li class="mobile-section-title"><strong>Hospitalaria</strong></li>
            <li><a href="{{root}}nutricion-clinica/disfagia/">Disfagia</a></li>
            <li><a href="{{root}}nutricion-clinica/enteral-sonda/">Nutrición Enteral</a></li>
            <li><a href="{{root}}nutricion-clinica/domicilio/">Consulta a Domicilio</a></li>
            <li><a href="{{root}}nutricion-clinica/hospitalaria/">Nutrición Hospitalaria</a></li>
            <li><hr></li>
            <li class="mobile-section-title"><strong>Ubicaciones</strong></li>
            <li><a href="{{root}}ubicaciones/cdmx/">CDMX</a></li>
            <li><hr></li>
            <li><a href="{{root}}blog/">Blog</a></li>
            <li><a href="{{root}}pages/nosotros">Nosotros</a></li>
            <li style="margin-top: 1.5rem;"><a href="https://wa.me/525550150285" class="btn btn-whatsapp" style="display: inline-block; padding: 1rem 2rem;">WhatsApp: (55) 5015 0285</a></li>
        </ul>
    </div>
</div>`,
    footer: `
<footer>
    <div class="container">
        <div class="f-grid">
            <div class="f-info">
                <a href="{{root}}index.html" class="logo" style="margin-bottom: 1.5rem; display: block;">
                    <img src="{{root}}assets/img/logo-mobile.png" alt="Clínica Denki Logo" style="height: 40px;">
                </a>
                <p style="color: #99aab5; line-height: 1.7;">Nutrición clínica de alta especialidad basada en evidencia científica. PhD Lucy Anita Camberos Luna.</p>
                <div style="margin-top: 1.5rem;">
                    <p style="color: #99aab5; font-size: 0.9rem;">📍 Pilares 405, Entrada por Casa Ferro, Del Valle Centro, CDMX</p>
                    <p style="color: #99aab5; font-size: 0.9rem;">📞 (55) 5015 0285</p>
                </div>
            </div>
            <div>
                <h4 class="f-title">Especialidades</h4>
                <ul class="f-links">
                    <li><a href="{{root}}nutricion-metabolica/">Nutrición Metabólica</a></li>
                    <li><a href="{{root}}nutricion-cardiovascular/">Nutrición Cardiovascular</a></li>
                    <li><a href="{{root}}nutricion-neurologica/">Nutrición Neurológica</a></li>
                    <li><a href="{{root}}nutricion-oncologica/">Nutrición Oncológica</a></li>
                    <li><a href="{{root}}nutricion-geriatrica/">Nutrición Geriátrica</a></li>
                    <li><a href="{{root}}nutricion-clinica/">Nutrición Clínica</a></li>
                </ul>
            </div>
            <div>
                <h4 class="f-title">Ubicaciones</h4>
                <ul class="f-links">
                    <li><a href="{{root}}ubicaciones/cdmx/">CDMX General</a></li>
                </ul>
                <h4 class="f-title" style="margin-top: 2rem;">Recursos</h4>
                <ul class="f-links">
                    <li><a href="{{root}}blog/">Blog de Nutrición</a></li>
                    <li><a href="{{root}}pages/nosotros">Sobre Clínica Denki</a></li>
                </ul>
            </div>
            <div>
                <h4 class="f-title">Legal</h4>
                <ul class="f-links">
                    <li><a href="#">Aviso de Privacidad</a></li>
                    <li><a href="#">Términos y Condiciones</a></li>
                </ul>
                <div style="margin-top: 2rem;">
                    <a href="https://wa.me/525550150285" class="btn btn-whatsapp" style="padding: 0.7rem 1.5rem; font-size: 0.85rem;">Agendar Cita</a>
                </div>
            </div>
        </div>
        <div class="f-bottom">
            &copy; 2026 Clínica Denki. Todos los derechos reservados.
        </div>
    </div>
</footer>`
};
