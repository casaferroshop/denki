# Cómo contribuir a Clínica Denki

Este documento explica cómo trabajar en el repositorio sin pisarse el código entre
colaboradores humanos y agentes de IA (Claude, Claude Code). La regla principal
es simple: **nadie hace push directo a `main`**. Todo cambio pasa por una rama
feature y un Pull Request a `develop`.

---

## 1. Estructura de ramas (Git Flow simplificado)

```
main      ←  Producción. Lo que está vivo en clinicadenki.mx.
              Protegida: solo recibe merges desde develop vía PR.
              Vercel deploya esta rama al dominio de producción.

develop   ←  Staging. Rama por defecto del repo.
              Aquí se mezclan features antes de subir a producción.
              Vercel genera preview URL para cada commit y PR.

feature/* ←  Una rama por cambio. Salen de develop y vuelven a develop vía PR.
              Ejemplos:
                feature/contributing-docs
                feature/eeat-foundation
                feature/cancer-de-mama-html
                feature/cancer-de-mama-images
                fix/schema-faq-cancer
                docs/actualizar-readme
```

**Reglas:**

- Nunca trabajar directo en `main` ni en `develop`. Siempre crear `feature/`.
- Una rama = un cambio coherente. No mezclar "nueva landing + fix de bug + cambio
  de footer" en una sola rama.
- Borrar la rama después de que el PR se mergee (GitHub lo hace automático si
  marcas "Delete branch on merge" en Settings).

---

## 2. Convención de nombres de ramas

Prefijo + slug en kebab-case. Tres prefijos en uso:

| Prefijo | Cuándo usarlo | Ejemplos |
|---|---|---|
| `feature/` | Nueva funcionalidad, página o sección | `feature/cancer-mama`, `feature/legal-pages` |
| `fix/` | Corrección de algo que existe | `fix/schema-cie10-diabetes`, `fix/typo-faq-disfagia` |
| `docs/` | Solo documentación (no código del sitio) | `docs/contributing`, `docs/readme-update` |

No usar `master`, `dev`, `prod`, `feat/` u otras variantes. Consistencia mata
confusión.

---

## 3. Convención de mensajes de commit (Conventional Commits)

Formato:

```
tipo(área): descripción corta en imperativo

Cuerpo opcional con más detalle.
```

**Tipos permitidos:**

- `feat:` nueva funcionalidad/página
- `fix:` corrección de bug
- `docs:` documentación
- `style:` cambios de formato (CSS, espaciado) sin alterar funcionalidad
- `refactor:` reorganizar código sin cambiar comportamiento
- `perf:` mejora de performance
- `chore:` mantenimiento (dependencias, gitignore, configuración)

**Áreas comunes:**

- `seo`, `schema`, `landing`, `blog`, `legal`, `home`, `footer`, `nav`,
  `images`, `sitemap`, `vercel`

**Ejemplos:**

```
feat(landing): nueva landing cáncer de mama
fix(schema): corregir CIE-10 en página de diabetes
docs(contributing): documentar flujo Git Flow
chore(gitignore): excluir carpetas de research SEMrush
perf(images): comprimir hero a WebP en landings oncológicas
```

**Por qué importa:** dentro de 4 meses cuando busques "¿cuándo metimos los
schemas YMYL?" el `git log` te lo dice de un vistazo. Sin esta disciplina, el
historial se vuelve ilegible.

---

## 4. Flujo de trabajo paso a paso

Para cualquier cambio, desde el más chico al más grande:

### 4.1 Crear rama desde `develop`

```bash
git checkout develop
git pull origin develop
git checkout -b feature/mi-cambio
```

### 4.2 Hacer cambios y commitearlos

```bash
# editar archivos...
git add archivos-específicos.html
git commit -m "feat(landing): agregar sección FAQ a cáncer de mama"
```

**Tip:** evita `git add .` — usa `git add archivo.html` o `git add carpeta/`
específicamente. Así no se cuelan archivos no deseados.

### 4.3 Subir la rama a GitHub

```bash
git push -u origin feature/mi-cambio
```

(La primera vez usa `-u` para que la rama local se vincule a la remota; después
basta `git push`.)

### 4.4 Abrir Pull Request en GitHub

1. Ve a `https://github.com/casaferroshop/denki`
2. GitHub debe ofrecer un banner amarillo: "feature/mi-cambio had recent pushes
   — Compare & pull request". Clic ahí.
3. Verifica que el PR va a `develop` (no a `main`).
4. Escribe título y descripción claras.
5. Asignar reviewer si hay más de una persona.

### 4.5 Verificar preview de Vercel

Una vez abierto el PR, Vercel publica una URL de preview en los checks del PR
(tipo `denki-git-feature-mi-cambio-tuusername.vercel.app`). **Siempre abrir la
preview** y verificar visualmente que el cambio se ve bien antes de mergear.

### 4.6 Mergear a `develop`

Una vez aprobado y verificado, mergear desde la UI de GitHub. Estilo recomendado:

- **Squash and merge** para features pequeñas (un solo commit limpio en
  `develop`)
- **Merge commit** si la feature tuvo múltiples commits significativos que vale
  la pena conservar individualmente

Después de mergear, marcar **Delete branch** para borrar la rama feature.

### 4.7 Promover de `develop` a `main` (producción)

Cuando `develop` está estable (varias features mergeadas, probadas en preview):

1. Abrir PR de `develop` → `main`
2. Título: `release: <fecha o número>`
3. En la descripción, listar las features que entran a producción
4. Verificar preview de `develop` (que es prácticamente lo mismo que va a salir)
5. Mergear

Esto debe pasar regularmente, no acumular muchas semanas de cambios sin promover.

---

## 5. Trabajo paralelo con agentes de IA (Claude / Claude Code / Antigravity)

El repo está pensado para trabajar en paralelo entre el humano (Raul), un agente
de razonamiento/código (Claude) y un agente de generación de imágenes
(Antigravity). Para evitar caos, hay un **contrato** entre las partes.

### 5.1 División de tareas

**Claude (razonamiento + código + integración estructural):**
- Estructura HTML completa de páginas
- Schema markup JSON-LD
- Copy SEO (title, meta, alt text)
- Manifests de imágenes (contratos)
- Verificación de integración (paths, nombres de archivo, schemas válidos)

**Antigravity (operado por Raul) — generación de imágenes:**
- Generar imágenes a partir del prompt del manifest
- Iterar 2-3 variantes y elegir la mejor

**Raul (humano):**
- Aprobar manifests antes de ejecución
- Comprimir imágenes (TinyPNG / WebP)
- Subir imágenes al repo en la rama correspondiente
- Validar visualmente que las imágenes encajan en contexto
- Decidir merges a `develop` y a `main`
- Tomar fotos reales cuando se requieran (Sobre Nosotros, instalaciones)

**Mario (humano, si aplica):**
- Aprobar PRs como reviewer
- Decisiones de arquitectura

### 5.2 Contrato de manifest para imágenes

Antes de generar cualquier landing nueva con imágenes, Claude produce un
`manifest.yaml` que es la verdad única. Una vez aprobado, **no se cambia**.

```yaml
landing: cancer-de-mama
url: /nutricion-oncologica/cancer-de-mama/
images:
  - id: hero
    filename: hero-mama.png
    path: /assets/img/cancer/hero-mama.png
    alt: "Consulta de nutrición clínica para paciente con cáncer de mama en Clínica Denki, Del Valle CDMX"
    above_fold: true
    prompt: "[PROMPT MAESTRO + scene específica]"
  - id: desafios
    filename: desafios-mama.png
    path: /assets/img/cancer/desafios-mama.png
    alt: "..."
    above_fold: false
    prompt: "..."
```

Con el manifest aprobado, las dos ramas corren en paralelo:

```
feature/cancer-mama-html      ← Claude genera HTML con paths del manifest
feature/cancer-mama-images    ← Raul genera imágenes con prompts del manifest
```

Ambas mergean a `develop`. Si los archivos coinciden con los paths del manifest,
la integración es automática.

### 5.3 Estilo visual de imágenes

Todas las imágenes nuevas deben seguir el estilo establecido (acuarela suave +
sketch a lápiz, paleta blanco + mint green + neutros desaturados). Ver
`docs/BRIEF_VISUAL_ANTIGRAVITY.md` para el prompt maestro y los arquetipos.

Excepción: fotos reales en Sobre Nosotros y Contacto.

---

## 6. Qué NO se sube al repo

Ver `.gitignore` para la lista completa. Los grupos principales:

- **Materiales de trabajo internos:** `MisHubs/`, `MisLandings/`, `MisBlogs/`,
  `MisLandingLocales/`, `Denki Reglas/` — borradores en Word, no parte del sitio.
- **Research de keywords:** `Semrush Denki/`, archivos `*.csv` y `*.xlsx` — datos
  para nuestro trabajo, no para el público.
- **Archivos del sistema operativo:** `.DS_Store`, `Thumbs.db`.
- **Configuración de IDE/agentes:** `.vscode/`, `.idea/`, `.claude/`, `.agent/`.
- **Variables de entorno:** `.env`, `.env.local`.

**Nunca subir:** credenciales, llaves API, fotos de pacientes sin consentimiento
firmado, datos médicos reales identificables.

---

## 7. Optimización de imágenes antes de subir

Las imágenes nuevas deben pesar menos de 200KB. Recomendado: convertir a WebP
manteniendo PNG como fallback.

**Opción fácil (web):** subir el PNG a [tinypng.com](https://tinypng.com), bajar
el comprimido.

**Opción terminal:**
```bash
brew install webp
cwebp -q 80 hero-mama.png -o hero-mama.webp
```

Después en el HTML:
```html
<picture>
  <source srcset="/assets/img/cancer/hero-mama.webp" type="image/webp">
  <img src="/assets/img/cancer/hero-mama.png" alt="..." loading="lazy">
</picture>
```

(`loading="lazy"` para todas las imágenes que no son above-the-fold.)

---

## 8. Checklist antes de abrir un PR

- [ ] La rama sale de `develop` actualizado (`git pull origin develop` antes de
      crearla)
- [ ] Los commits siguen Conventional Commits
- [ ] No se incluyen archivos del `.gitignore` (`git status` antes del push para
      verificar)
- [ ] Si se agregaron imágenes: comprimidas, con alt text, lazy load si no son
      above-the-fold
- [ ] Si se agregó una landing: schema YMYL presente, fecha de revisión visible,
      validada en [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Si se agregó URL nueva: agregada a `sitemap.xml`
- [ ] El preview de Vercel se ve bien

---

## 9. Convenciones internas del sitio Denki

- **Tono editorial:** clínico, no comercial. Nada de "milagro", "garantizado",
  "el mejor". Citar fuentes médicas (ESPEN, ASPEN, NCCN, OMS).
- **EEAT médico:** toda página clínica lleva fecha de revisión visible + autor
  identificado + link al aviso médico.
- **Imágenes humanas:** expresiones calmadas y dignas, nunca eufóricas ni
  dramáticas. Sujetos diversos (edad, género, fenotipo mexicano).
- **CTAs primarios:** WhatsApp `+525550150285` y Doctoralia. Sin formularios de
  marketing-agresivo.

---

## 10. Cuando algo sale mal

**"Hice push directo a `main` por error":** no debería ser posible (branch
protection lo bloquea). Si pasó, avisar inmediatamente a Raul.

**"Mi PR rompió producción":** revertir el merge en GitHub (botón "Revert" en el
PR mergeado). Eso crea un PR inverso que devuelve el estado anterior.

**"Hay conflictos al mergear":** no resolver desde la línea de comandos sin
entender qué pasa. Mejor pedir ayuda. Los conflictos típicos son de dos personas
editando la misma línea — se resuelven a mano eligiendo cuál versión queda.

**"No sé si esta tarea requiere PR o no":** sí. Todo cambio al sitio requiere PR.
Ningún cambio es lo suficientemente trivial como para saltarse el flujo.

---

**Última actualización:** Mayo 2026
**Mantenido por:** Raul Bolaños — Clínica Denki
