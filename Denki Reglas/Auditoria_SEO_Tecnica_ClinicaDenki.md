# AUDITORÍA SEO TÉCNICA - CLINICADENKI.MX
## Lista de Tareas Críticas para Subir en Google Search Console

**Fecha:** 30 Enero 2026  
**Sitio:** https://clinicadenki.mx  
**Plataforma:** Shopify  

---

## 🚨 DIAGNÓSTICO: POR QUÉ NO SUBE EN GOOGLE

Después de analizar el sitio, identifiqué **múltiples problemas graves** que están impidiendo la indexación y posicionamiento:

### PROBLEMAS CRÍTICOS ENCONTRADOS

| # | Problema | Impacto | Prioridad |
|---|----------|---------|-----------|
| 1 | **Footer dice "© 2024 Glozin store"** | Google puede pensar que es spam/sitio copiado | 🔴 CRÍTICO |
| 2 | **Búsqueda muestra "Potato, Snack, Organic, Fresh"** | Señal de template no personalizado | 🔴 CRÍTICO |
| 3 | **Carrito de compras activo** (no es e-commerce) | Confunde la intención del sitio | 🔴 CRÍTICO |
| 4 | **"Envío gratuito para pedidos superiores"** | Más señales de template genérico | 🔴 CRÍTICO |
| 5 | **Servicios como /products/** | URLs de e-commerce, no de clínica médica | 🟠 ALTO |
| 6 | **Sin Schema MedicalClinic** | Google no entiende que es clínica | 🟠 ALTO |
| 7 | **Sin Schema FAQPage** en las páginas | FAQs no aparecen en rich snippets | 🟠 ALTO |
| 8 | **Blog en /blogs/guia-de-nutricion** | Debería ser /blog | 🟡 MEDIO |
| 9 | **Meta descriptions genéricas** | Baja CTR en resultados | 🟡 MEDIO |
| 10 | **Sin páginas de hubs/categorías** | Arquitectura SEO plana | 🟡 MEDIO |

---

## ✅ LISTA DE TAREAS TÉCNICAS (Por Orden de Prioridad)

### FASE 0: LIMPIEZA URGENTE (Hacer HOY)
*Estas tareas son las más urgentes porque envían señales de spam a Google*

#### Tarea 0.1: Cambiar el footer
**Problema:** El footer dice "© 2024 Glozin store" - esto es del template original
**Ubicación:** Online Store > Themes > Edit code > Sections/footer.liquid
**Acción:**
```liquid
<!-- BUSCAR y REEMPLAZAR -->
© 2024 Glozin store. All rights reserved.

<!-- POR -->
© 2026 Clínica Denki. Todos los derechos reservados.
```
**Verificación:** Revisar que el footer diga Clínica Denki

---

#### Tarea 0.2: Quitar "Búsqueda de tendencias" con productos
**Problema:** La búsqueda muestra "Potato, Snack, Organic, Fresh" - obviamente del template de comida
**Ubicación:** Online Store > Themes > Edit code > Buscar "Potato" o ir a Sections/predictive-search.liquid
**Acción:** Eliminar o reemplazar por términos médicos relevantes:
- Diabetes
- Parkinson
- Nutrición clínica
- Disfagia
**Verificación:** Probar la búsqueda y verificar que no aparezcan estos términos

---

#### Tarea 0.3: Quitar el carrito de compras
**Problema:** Una clínica médica no debería tener carrito de compras visible
**Ubicación:** Online Store > Themes > Edit code > Sections/header.liquid
**Acción:** Ocultar o eliminar el icono del carrito
```css
/* Agregar en theme.css o en el header */
.cart-icon, .header__icon--cart { display: none !important; }
```
**Verificación:** El carrito no debe ser visible en ninguna página

---

#### Tarea 0.4: Quitar "Envío gratuito para pedidos"
**Problema:** Mensaje de e-commerce que no aplica a una clínica
**Ubicación:** Online Store > Themes > Edit code > Buscar "Envío gratuito" 
**Acción:** Eliminar completamente este texto
**Verificación:** No debe aparecer ningún mensaje de envío

---

### FASE 1: SEO TÉCNICO BÁSICO (Semana 1)

#### Tarea 1.1: Verificar/Crear robots.txt
**Ubicación:** Settings > Shipping > Buscar "robots.txt" O ir a clinicadenki.mx/robots.txt
**Contenido requerido:**
```
User-agent: *
Disallow: /admin/
Disallow: /cart/
Disallow: /checkout/
Disallow: /account/
Allow: /

Sitemap: https://clinicadenki.mx/sitemap.xml
```
**Nota:** Shopify genera robots.txt automáticamente pero verificar que no bloquee páginas importantes

---

#### Tarea 1.2: Verificar Sitemap
**Verificación:** Ir a https://clinicadenki.mx/sitemap.xml
**Acción:** Shopify lo genera automático, pero verificar que incluya:
- Todas las páginas (/pages/*)
- Todos los productos (/products/*)
- Todos los posts del blog (/blogs/*)
**Enviar a Google:**
1. Ir a Google Search Console
2. Sitemaps > Agregar nuevo sitemap
3. Escribir: sitemap.xml
4. Enviar

---

#### Tarea 1.3: Agregar Schema MedicalClinic Global
**Ubicación:** Online Store > Themes > Edit code > Layout/theme.liquid
**Insertar ANTES de </head>:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "Clínica Denki - Nutrición Clínica Especializada",
  "description": "Clínica de nutrición especializada en CDMX. Atención para diabetes, Parkinson, Alzheimer, disfagia y más.",
  "url": "https://clinicadenki.mx",
  "telephone": "+525550150285",
  "email": "denkinutricion@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Pilares 405",
    "addressLocality": "Col. Del Valle Centro",
    "addressRegion": "Benito Juárez, CDMX",
    "postalCode": "03100",
    "addressCountry": "MX"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "19.3758",
    "longitude": "-99.1715"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "medicalSpecialty": ["Dietetics", "ClinicalNutrition"],
  "availableService": [
    {"@type": "MedicalProcedure", "name": "Nutrición para Diabetes"},
    {"@type": "MedicalProcedure", "name": "Nutrición para Parkinson"},
    {"@type": "MedicalProcedure", "name": "Nutrición para Alzheimer"},
    {"@type": "MedicalProcedure", "name": "Nutrición Oncológica"},
    {"@type": "MedicalProcedure", "name": "Nutrición para Disfagia"}
  ],
  "sameAs": [
    "https://www.doctoralia.com.mx/lucy-camberos-luna/nutriologo-clinico/benito-juarez"
  ]
}
</script>
```

---

#### Tarea 1.4: Configurar Google Search Console correctamente
**Acciones:**
1. Verificar propiedad del dominio (si no está hecho)
2. Ir a Indexación > Páginas > Revisar errores
3. Solicitar indexación de páginas importantes manualmente:
   - https://clinicadenki.mx/
   - https://clinicadenki.mx/products/consulta-diabetes
   - https://clinicadenki.mx/products/consulta-parkinson
   - (todas las páginas de servicios)
4. Revisar "Cobertura" para ver páginas excluidas

---

#### Tarea 1.5: Configurar Google Business Profile
**Verificar:** ¿Tiene perfil de Google Business?
**Si no:**
1. Ir a business.google.com
2. Crear perfil para "Clínica Denki"
3. Categoría: "Nutriólogo" o "Clínica de nutrición"
4. Dirección: Pilares 405, Col. Del Valle, CDMX
5. Horarios, fotos, servicios
6. Vincular con el sitio web

**Esto es CRÍTICO para SEO local**

---

### FASE 2: OPTIMIZACIÓN DE CONTENIDO (Semanas 2-3)

#### Tarea 2.1: Optimizar Meta Titles de páginas existentes
**Páginas a optimizar:**

| Página | Meta Title Actual (probable) | Meta Title Nuevo |
|--------|------------------------------|------------------|
| /products/consulta-diabetes | Consulta para Diabetes | Nutrición para Diabetes en CDMX \| Clínica Denki |
| /products/consulta-parkinson | Consulta para Parkinson | Nutrición para Parkinson en CDMX \| Clínica Denki |
| /products/consulta-alzheimer | Consulta para Alzheimer | Nutrición para Alzheimer en CDMX \| Clínica Denki |
| /products/consulta-cancer | Consulta para Cáncer | Nutrición Oncológica en CDMX \| Clínica Denki |
| /products/consulta-infarto-cerebral | Consulta para Infarto | Nutrición Post Infarto Cerebral \| Clínica Denki |
| Home | Clínica Denki | Clínica Denki \| Nutriólogo en CDMX - Del Valle |

**Cómo hacerlo en Shopify:**
Products > [producto] > Search engine listing > Editar

---

#### Tarea 2.2: Optimizar Meta Descriptions
**Cada página debe tener descripción única de 150-160 caracteres**

Ejemplo para Diabetes:
```
Atención nutricional especializada para diabetes tipo 1 y 2 en CDMX. Plan de alimentación personalizado para control glucémico. Consulta en Del Valle o en línea.
```

---

#### Tarea 2.3: Agregar Schema FAQPage a páginas con FAQs
**Para cada página que tenga preguntas frecuentes, agregar:**
(Ver documentos de landings entregados - cada uno tiene su schema)

---

### FASE 3: ESTRUCTURA DE URLs (Semanas 3-4)

#### Tarea 3.1: Crear páginas nuevas con URLs correctas
En lugar de /products/, crear /pages/ con los templates nuevos:
- /pages/nutricion-metabolica-diabetes
- /pages/nutricion-neurologica-parkinson
- etc.

#### Tarea 3.2: Configurar Redirects 301
**Ubicación:** Online Store > Navigation > URL Redirects

| URL Antigua | URL Nueva |
|-------------|-----------|
| /products/consulta-diabetes | /pages/nutricion-metabolica-diabetes |
| /products/consulta-parkinson | /pages/nutricion-neurologica-parkinson |
| /products/consulta-alzheimer | /pages/nutricion-neurologica-alzheimer |
| /products/consulta-cancer | /pages/nutricion-oncologica-cancer |
| /products/consulta-infarto-cerebral | /pages/nutricion-neurologica-infarto-cerebral |

**IMPORTANTE:** Hacer DESPUÉS de crear las páginas nuevas

---

### FASE 4: BLOG Y CONTENIDO (Semanas 4-6)

#### Tarea 4.1: Renombrar el blog
**Problema:** Blog está en /blogs/guia-de-nutricion
**Solución:** Shopify no permite cambiar fácilmente el handle del blog, opciones:
1. Crear nuevo blog llamado "blog" y mover posts
2. Dejar como está pero asegurar que el contenido sea bueno
3. Configurar redirect si se crea nuevo blog

#### Tarea 4.2: Optimizar posts existentes
El blog ya tiene contenido sobre diabetes, parkinson, etc. Verificar que cada post tenga:
- Meta title optimizado (50-60 chars)
- Meta description (150-160 chars)
- H1 único
- Imágenes con alt text
- Links internos a páginas de servicios

---

## 📊 CHECKLIST DE VERIFICACIÓN

### Verificar en Google Search Console (después de 1-2 semanas):
- [ ] Sitemap enviado y procesado
- [ ] Páginas indexadas aumentando
- [ ] Errores de cobertura disminuyendo
- [ ] Sin errores de robots.txt

### Verificar con herramientas:
- [ ] Google Rich Results Test (schemas válidos)
- [ ] PageSpeed Insights (velocidad > 50 mobile)
- [ ] Mobile-Friendly Test

### Verificar manualmente:
- [ ] Footer dice "Clínica Denki" no "Glozin"
- [ ] Sin carrito visible
- [ ] Sin mensajes de "envío gratuito"
- [ ] Sin "Potato, Snack, Organic" en búsqueda
- [ ] Google Business Profile activo

---

## 🔗 HERRAMIENTAS ÚTILES

1. **Google Search Console:** https://search.google.com/search-console
2. **Google Rich Results Test:** https://search.google.com/test/rich-results
3. **PageSpeed Insights:** https://pagespeed.web.dev/
4. **Schema Validator:** https://validator.schema.org/
5. **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly

---

## ⏰ CRONOGRAMA SUGERIDO

| Semana | Tareas | Responsable |
|--------|--------|-------------|
| **HOY** | 0.1-0.4 (Limpieza urgente) | Programador |
| Semana 1 | 1.1-1.5 (SEO técnico) | Programador |
| Semana 2 | 2.1-2.3 (Meta tags) | Programador + PM |
| Semana 3-4 | 3.1-3.2 (URLs y redirects) | Programador |
| Semana 4-6 | 4.1-4.2 (Blog) | Copywriter |
| Continuo | Monitoreo Search Console | PM |

---

## 🎯 MÉTRICAS DE ÉXITO

**En 30 días:**
- Errores de "Glozin" y e-commerce eliminados
- Schema MedicalClinic activo
- Sitemap enviado a Google
- Al menos 10 páginas indexadas

**En 60 días:**
- Todas las páginas principales indexadas
- Aparecer en búsquedas por "clínica denki"
- Google Business Profile con reseñas

**En 90 días:**
- Tráfico orgánico aumentando
- Posiciones para keywords de cola larga
- Nuevas páginas (hubs, landings) indexadas

---

## ⚠️ ADVERTENCIA IMPORTANTE

El sitio tiene señales claras de ser un **template de e-commerce no personalizado** (Glozin, carrito, envío, Potato/Snack). Google puede estar penalizando o ignorando el sitio por estas razones.

**La limpieza de Fase 0 es CRÍTICA y debe hacerse ANTES de cualquier otra optimización SEO.**

---

*Documento generado para Clínica Denki - Proyecto SEO*
