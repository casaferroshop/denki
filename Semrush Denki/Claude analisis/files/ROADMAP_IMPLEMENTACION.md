# ROADMAP DE IMPLEMENTACIÓN SEO
# Clínica Denki - Plan 6 Meses

## 🎯 OBJETIVO GENERAL
Posicionar a Clínica Denki como referente en nutrición clínica especializada en CDMX, capturando tráfico orgánico de alto valor comercial y generando leads calificados.

---

## 📅 MES 1: FUNDACIÓN Y QUICK WINS

### SEMANA 1-2: Setup Técnico y Local SEO

**Prioridad CRÍTICA:**

✅ **Google My Business**
- [ ] Verificar o reclamar perfil
- [ ] Completar información 100%:
  - Nombre: Clínica Denki
  - Categoría principal: Clínica de nutrición
  - Categorías secundarias: Nutricionista, Clínica médica
  - Dirección exacta
  - Horarios de atención
  - Teléfono y WhatsApp
  - Sitio web
- [ ] Subir mínimo 10 fotos:
  - Fachada
  - Sala de espera
  - Consultorios
  - Equipo médico
  - Logo
- [ ] Crear primera publicación GMB
- [ ] Configurar preguntas y respuestas frecuentes

**Inversión tiempo:** 8 horas
**Responsable:** Raúl + Asistente

✅ **Infraestructura Técnica**
- [ ] Verificar SSL activo
- [ ] Instalar Google Analytics 4
- [ ] Instalar Google Search Console
- [ ] Configurar Google Tag Manager
- [ ] Crear sitemap.xml
- [ ] Configurar robots.txt
- [ ] Verificar velocidad de carga (objetivo: <3s)
- [ ] Verificar mobile-friendly

**Inversión tiempo:** 6 horas
**Responsable:** Desarrollador

✅ **Schema Markup Base**
```json
// En home page
{
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "Clínica Denki",
  "description": "Nutrición clínica especializada en diabetes, cáncer, Parkinson, Alzheimer y enfermedades crónicas",
  "url": "https://clinicadenki.mx",
  "telephone": "+52-XXX-XXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Dirección]",
    "addressLocality": "Ciudad de México",
    "addressRegion": "CDMX",
    "postalCode": "[CP]",
    "addressCountry": "MX"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": [LAT],
    "longitude": [LON]
  },
  "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-14:00",
  "priceRange": "$$",
  "medicalSpecialty": ["Nutrition", "Clinical Nutrition", "Geriatric Nutrition"]
}
```

**Inversión tiempo:** 4 horas
**Responsable:** Desarrollador

---

### SEMANA 3-4: Primeras Landing Pages

**DESARROLLO: 3 Landing Pages Prioritarias**

🏥 **1. Nutrición para Triglicéridos Altos**
- URL: `/servicios/nutricion-metabolica/trigliceridos-altos/`
- Keyword principal: "dieta para triglicéridos altos"
- Keywords secundarias: alimentos triglicéridos, bajar triglicéridos
- Contenido: 2,000 palabras
- FAQs: 7 preguntas
- CTA: 3 posiciones

🏥 **2. Nutrición para Colesterol Alto**
- URL: `/servicios/nutricion-metabolica/colesterol-alto/`
- Keyword principal: "dieta para colesterol alto"
- Keywords secundarias: alimentos colesterol, bajar colesterol
- Contenido: 2,000 palabras
- FAQs: 7 preguntas
- CTA: 3 posiciones

🏥 **3. Nutrición para Diabetes**
- URL: `/servicios/nutricion-metabolica/diabetes/`
- Keyword principal: "nutrición para diabetes"
- Keywords secundarias: dieta diabetes, alimentos diabéticos
- Contenido: 2,500 palabras
- FAQs: 10 preguntas
- CTA: 4 posiciones

**Inversión tiempo por landing:** 12 horas
**Total:** 36 horas
**Responsable:** Copywriter + Nutrióloga (revisión médica)

**Checklist por landing:**
- [ ] Investigación de keywords
- [ ] Brief de contenido
- [ ] Redacción
- [ ] Revisión médica
- [ ] Optimización SEO on-page
- [ ] Diseño/maquetación
- [ ] Schema markup (Service + FAQ)
- [ ] Imágenes optimizadas
- [ ] Internal linking
- [ ] Publicación
- [ ] Indexación en GSC

---

**ENTREGAS MES 1:**
✅ GMB optimizado y activo
✅ Infraestructura técnica completa
✅ 3 landing pages en producción
✅ Tracking funcionando

**KPIs Mes 1:**
- GMB con mínimo 5 fotos
- 3 landing pages indexadas
- Velocidad <3 segundos
- 100/100 en mobile-friendly test

---

## 📅 MES 2: EXPANSIÓN DE SERVICIOS + CONTENIDO BLOG

### SEMANA 5-6: Más Landing Pages

🏥 **4. Nutrición Geriátrica**
- URL: `/servicios/nutricion-geriatrica/adulto-mayor/`
- Volumen: 90,050/mes
- Prioridad: Alta

🏥 **5. Nutrición para Disfagia**
- URL: `/servicios/nutricion-clinica-hospitalaria/disfagia/`
- Volumen: 60,740/mes
- Prioridad: Alta

**Inversión:** 24 horas total

---

### SEMANA 7-8: Inicio de Blog + Página Local

📝 **Primeros 4 Posts de Blog**

1. **"10 Alimentos que Debes Evitar si Tienes Triglicéridos Altos"**
   - Formato: Lista
   - Palabras: 1,500
   - Keywords: alimentos triglicéridos, evitar triglicéridos
   - Link interno: Landing Triglicéridos

2. **"Dieta Completa para Diabéticos: Menú Semanal 2025"**
   - Formato: Guía práctica
   - Palabras: 2,000
   - Keywords: dieta diabetes, menú diabéticos
   - Link interno: Landing Diabetes

3. **"Qué Comer con Colesterol Alto: Guía Definitiva"**
   - Formato: Guía larga
   - Palabras: 2,500
   - Keywords: qué comer colesterol, alimentos colesterol
   - Link interno: Landing Colesterol

4. **"Nutrición para Adultos Mayores: Todo lo que Debes Saber"**
   - Formato: Guía educativa
   - Palabras: 2,000
   - Keywords: nutrición adulto mayor, alimentación tercera edad
   - Link interno: Landing Geriátrica

**Inversión:** 6 horas por post = 24 horas

📍 **Página Local: CDMX**
- URL: `/ubicaciones/cdmx/`
- Contenido: 1,200 palabras
- Mapa integrado
- Schema LocalBusiness
- Links a todos los servicios
- CTAs prominentes

**Inversión:** 8 horas

---

**ENTREGAS MES 2:**
✅ 5 landing pages totales
✅ 4 posts de blog publicados
✅ 1 página local (CDMX)
✅ Primeras publicaciones GMB (mínimo 4)

**KPIs Mes 2:**
- 1,000 sesiones orgánicas
- 5 keywords rankeando en top 50
- GMB con primeras interacciones
- 10+ páginas indexadas

---

## 📅 MES 3: CONSOLIDACIÓN Y SALUD MENTAL

### SEMANA 9-10: Servicios Complementarios

🏥 **6. Nutrición y Salud Mental**
- URL: `/servicios/nutricion-neurologica/salud-mental/`
- Volumen: 47,260/mes
- Enfoque: Eje intestino-cerebro, microbiota
- Diferenciador: Tendencia al alza

🏥 **7. Nutrición Enteral (Sonda)**
- URL: `/servicios/nutricion-clinica-hospitalaria/sonda-gastrostomia/`
- Volumen: 21,250/mes
- Alta especialización

**Inversión:** 24 horas

---

### SEMANA 11-12: Contenido Blog + Local

📝 **4 Posts Adicionales**

5. "Microbiota Intestinal y Salud Mental: La Conexión que Debes Conocer"
6. "Cómo Controlar la Diabetes con Alimentación: Guía Paso a Paso"
7. "Alimentos para Bajar el Colesterol Naturalmente"
8. "Nutrición para Adultos Mayores: Prevenir la Sarcopenia"

**Inversión:** 24 horas

📍 **Página Local: Benito Juárez**
- URL: `/ubicaciones/benito-juarez/`
- Enfoque: Nuestra ubicación principal
- Mencionar colonias: Del Valle, Nápoles, Narvarte
- Mapa con indicaciones
- Fotos del consultorio

**Inversión:** 8 horas

---

**ENTREGAS MES 3:**
✅ 7 landing pages totales
✅ 8 posts de blog totales
✅ 2 páginas locales
✅ Campaña reseñas GMB iniciada

**KPIs Mes 3:**
- 3,000-5,000 sesiones orgánicas
- 10 keywords en top 20
- 3-5 conversiones orgánicas
- GMB en top 10 para "nutrióloga benito juárez"

---

## 📅 MES 4: COMPLETAR SERVICIOS PRINCIPALES

### SEMANA 13-16: Últimas Landing Pages Core

🏥 **8. Nutrición para Cáncer**
- Requiere revisión médica exhaustiva
- Tono sensible y empático
- Fuentes médicas citadas

🏥 **9. Nutrición Hospitalaria**
🏥 **10. Nutrición para Alzheimer**
🏥 **11. Nutrición para Parkinson**

**Inversión:** 48 horas total

📝 **8 Posts de Blog**
- 2 posts/semana
- Mezcla de temas (metabólico, geriátrico, neurológico)
- Enfoque en keywords de alto volumen

---

**ENTREGAS MES 4:**
✅ 11 landing pages de servicios
✅ 16 posts de blog totales
✅ Todas las categorías de blog activas

**KPIs Mes 4:**
- 8,000-10,000 sesiones orgánicas
- 20 keywords en top 20
- 10-15 conversiones orgánicas
- 50+ páginas indexadas

---

## 📅 MES 5: OPTIMIZACIÓN Y PÁGINAS LOCALES

### SEMANA 17-20: Expansión Local + Optimizaciones

📍 **Páginas Locales Adicionales**
- Roma-Condesa
- Página "Consulta a Domicilio"
- Optimizar páginas existentes con datos reales de GMB

**A/B Testing:**
- Headlines en landing pages
- CTAs
- Formularios
- Ubicación de teléfono/WhatsApp

**Optimización On-Page:**
- Actualizar contenido de páginas viejas
- Agregar internal links
- Mejorar meta descriptions
- Actualizar imágenes

📝 **8 Posts de Blog**
- Enfoque en long-tail keywords
- Actualizar posts antiguos con nuevos datos

---

**ENTREGAS MES 5:**
✅ 4 páginas locales totales
✅ 24 posts de blog totales
✅ Todas las landing pages optimizadas
✅ Sistema de A/B testing implementado

**KPIs Mes 5:**
- 12,000-15,000 sesiones orgánicas
- 30 keywords en top 20
- 15-20 conversiones orgánicas
- GMB en top 5 para búsquedas locales principales

---

## 📅 MES 6: SCALE Y MEDICIÓN

### SEMANA 21-24: Contenido Masivo + Análisis

📝 **12 Posts de Blog**
- 3 posts/semana
- Formatos variados (listas, guías, casos de estudio)
- Énfasis en conversión

**Acciones:**
- Análisis completo de performance
- Identificar páginas ganadoras
- Identificar oportunidades no exploradas
- Plan de contenido para siguientes 6 meses
- Reportes de ROI

**Link Building:**
- Guest posts en blogs de salud
- Colaboraciones con médicos
- Directorios médicos
- Citas locales (NAP consistency)

---

**ENTREGAS MES 6:**
✅ 36+ posts de blog totales
✅ 11-12 landing pages
✅ 4 páginas locales
✅ Reporte completo de 6 meses
✅ Plan estratégico meses 7-12

**KPIs Mes 6:**
- 20,000+ sesiones orgánicas
- 40+ keywords en top 20
- 30+ conversiones orgánicas
- GMB en top 3 para búsquedas locales principales
- 5+ reseñas de 5 estrellas

---

## 📊 RECURSOS NECESARIOS

### EQUIPO

**Desarrollo:**
- Desarrollador web: 20 horas/mes (Meses 1-2)
- Mantenimiento: 5 horas/mes (Meses 3-6)

**Contenido:**
- Copywriter SEO: 60 horas/mes
- Nutrióloga (revisión): 10 horas/mes
- Diseñador (imágenes): 8 horas/mes

**SEO/Marketing:**
- Especialista SEO: 15 horas/mes
- Community manager (GMB): 5 horas/mes

### HERRAMIENTAS

**Esenciales (Gratis):**
- Google Analytics 4
- Google Search Console
- Google My Business
- Google Tag Manager

**Recomendadas (Pago):**
- SEMrush o Ahrefs: $99-199/mes
- Rank tracking: $29/mes
- Canva Pro: $12/mes
- Hotjar o Clarity: Gratis/Bajo costo

### PRESUPUESTO MENSUAL ESTIMADO

**Mes 1-2 (Setup):**
- Desarrollo: $800-1,200
- Contenido: $2,400-3,000
- Herramientas: $100
- **Total: $3,300-4,300**

**Mes 3-6 (Operación):**
- Desarrollo: $200
- Contenido: $2,400-3,000
- Herramientas: $100
- **Total: $2,700-3,300/mes**

---

## 🎯 MÉTRICAS DE ÉXITO POR FASE

### FASE 1 (Meses 1-2): Fundación
- ✅ Infraestructura técnica completa
- ✅ GMB optimizado y con interacciones
- ✅ 5 landing pages de alto valor
- ✅ Primeros 1,000 visitantes orgánicos

### FASE 2 (Meses 3-4): Crecimiento
- ✅ 11 landing pages completas
- ✅ 16 posts de blog publicados
- ✅ 5,000+ visitantes orgánicos/mes
- ✅ Primeras conversiones orgánicas constantes

### FASE 3 (Meses 5-6): Escala
- ✅ 36+ piezas de contenido
- ✅ 15,000+ visitantes orgánicos/mes
- ✅ 30+ conversiones/mes
- ✅ Posicionamiento local top 3

---

## 🚨 RIESGOS Y MITIGACIONES

**Riesgo 1: Competencia médica fuerte**
- Mitigación: Enfoque en especialización (nutrición clínica vs nutrición general)
- Diferenciador: Experiencia en casos complejos

**Riesgo 2: Contenido médico requiere precisión**
- Mitigación: Proceso de revisión por nutrióloga certificada
- Citar fuentes médicas autorizadas

**Riesgo 3: Google E-E-A-T en salud**
- Mitigación: Mostrar credenciales
- Biografías detalladas del equipo
- Certificaciones visibles

**Riesgo 4: Demora en resultados SEO**
- Mitigación: Quick wins con GMB y local SEO
- Expectativas claras: resultados sólidos a 6 meses

---

## ✅ CHECKLIST DE INICIO INMEDIATO

**Esta semana:**
- [ ] Reclamar/verificar Google My Business
- [ ] Subir 10 fotos a GMB
- [ ] Instalar Google Analytics 4
- [ ] Instalar Google Search Console
- [ ] Crear sitemap.xml
- [ ] Solicitar reseñas a 5 pacientes actuales

**Próximas 2 semanas:**
- [ ] Desarrollar landing de Triglicéridos
- [ ] Desarrollar landing de Colesterol
- [ ] Desarrollar landing de Diabetes
- [ ] Crear primera publicación GMB
- [ ] Configurar Schema markup básico

**Este mes:**
- [ ] Publicar 3 landing pages
- [ ] Publicar 2 posts de blog
- [ ] Optimizar home page
- [ ] Configurar tracking de conversiones

---

*Roadmap creado por Agente SEO - Clínica Denki*
*Plan flexible: ajustar según recursos y prioridades del negocio*
