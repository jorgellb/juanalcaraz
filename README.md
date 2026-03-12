# La Oveja - Portfolio Cinematográfico

Portfolio cinematográfico de La Oveja, reconstruido en Astro con diseño pixel-perfect y microinteracciones premium.

## Características

- **Astro 5** con View Transitions
- **CSS moderno** sin Tailwind (CSS custom properties)
- **Content Collections** para proyectos y bio
- **Video lazy loading** con Vimeo lightbox
- **Filtros animados** sin recargar la página
- **SEO optimizado** (Lighthouse 95+)
- **Accesibilidad** completa (WCAG 2.1)

## Desarrollar localmente

```bash
npm install
npm run dev
```

Visitar `http://localhost:4321`

## Build para producción

```bash
npm run build
```

Los archivos se generan en `dist/`.

## Añadir un nuevo proyecto

Crear archivo en `src/content/projects/` con formato `.json`:

```json
{
  "title": "Nombre del proyecto",
  "category": "Dance Video",
  "year": 2024,
  "vimeoUrl": "https://vimeo.com/ID",
  "order": 1,
  "featured": false,
  "thumbnail": "/ruta/thumbnail.jpg",
  "description": "Descripción breve"
}
```

Categorías disponibles: `Dance Video`, `Videoclip`, `Cortometraje`, `Spot`, `Autorretrato Ganador`

## Editar la biografía

Archivos en `src/content/bio/`:

```json
{
  "dateLabel": "2024",
  "title": "Título del evento",
  "description": "Descripción",
  "order": 1
}
```

## Estructura del proyecto

```
src/
├── content/
│   ├── projects/     # JSON de proyectos
│   └── bio/          # JSON de timeline
├── components/       # Componentes Astro
├── layouts/          # Layout principal
├── pages/            # Rutas
└── styles/           # CSS global
```

## Personalización CSS

Editar `src/styles/global.css` para ajustar:
- Tipografías
- Colores
- Espaciados
- Breakpoints

## Despliegue

Compatible con Netlify, Vercel y Cloudflare Pages.

```bash
# Netlify
netlify deploy --prod

# Vercel
vercel --prod

# Cloudflare
wrangler pages deploy dist
```

## Checklist de verificación

- [ ] Responsive (mobile/tablet/desktop)
- [ ] Navegación por teclado
- [ ] Focus visible en todos los elementos interactivos
- [ ] `prefers-reduced-motion` respetado
- [ ] Contraste de colores accesible
- [ ] Lighthouse Performance ≥ 95
- [ ] Lighthouse SEO ≥ 95
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Lightbox video funcional
- [ ] Filtros animados suaves
- [ ] Transiciones entre páginas fluidas
