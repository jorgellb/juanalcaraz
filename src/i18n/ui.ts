import type { Lang } from './index';

// Textos compartidos por toda la web (cabecera, menú, modal, cookies…).
// El texto propio de cada página vive en su vista, en src/views/.
export const ui = {
  es: {
    'site.name': 'Juan Alcaraz | Cineasta',
    'site.defaultDescription':
      'Juan Alcaraz, cineasta y director de cine murciano. Dirección de cortometrajes, videoclips, spots publicitarios y proyectos audiovisuales.',
    'site.imageAlt': 'Juan Alcaraz — Cineasta y Director de Cine',

    'person.jobTitle': 'Cineasta y Director de Cine',
    'person.description':
      'Cineasta y director de cine murciano, especializado en cortometrajes, videoclips, spots publicitarios y ficción.',

    'header.logoLabel': 'Juan Alcaraz — Inicio',
    'header.menuOpen': 'Abrir menú',
    'header.menuClose': 'Cerrar menú',
    'header.navLabel': 'Navegación principal',

    'nav.home': 'Inicio',
    'nav.home.sub': 'Home reel',
    'nav.projects': 'Proyectos',
    'nav.projects.sub': 'Projects',
    'nav.filmography': 'Filmografía',
    'nav.filmography.sub': 'Filmography',
    'nav.contact': 'Contacto',
    'nav.contact.sub': 'Write the future',

    'breadcrumb.home': 'Inicio',
    'breadcrumb.projects': 'Proyectos',
    'breadcrumb.filmography': 'Filmografía y Biografía',
    'breadcrumb.contact': 'Contacto',
    'breadcrumb.legal': 'Aviso Legal',
    'breadcrumb.privacy': 'Política de Privacidad',
    'breadcrumb.cookies': 'Política de Cookies',

    'footer.legal': 'AVISO LEGAL',
    'footer.privacy': 'POLÍTICA PRIVACIDAD',
    'footer.cookies': 'POLÍTICA COOKIES',

    'lang.label': 'Idioma',

    'card.view': 'Ver proyecto',
    'card.altBy': 'de Juan Alcaraz',

    'modal.close': 'Cerrar vídeo',
    'modal.player': 'Reproductor de vídeo',
    'modal.videoPrefix': 'Vídeo:',

    'cookies.region': 'Aviso de cookies',
    'cookies.title': 'USO DE COOKIES',
    'cookies.text':
      'Utilizamos cookies propias y de terceros para mejorar la experiencia cinematográfica y ofrecer contenidos visuales integrados.',
    'cookies.more': 'Saber más',
    'cookies.reject': 'RECHAZAR',
    'cookies.accept': 'ACEPTAR',
  },
  en: {
    'site.name': 'Juan Alcaraz | Filmmaker',
    'site.defaultDescription':
      'Juan Alcaraz, filmmaker and film director from Murcia, Spain. Director of short films, music videos, commercials and audiovisual projects.',
    'site.imageAlt': 'Juan Alcaraz — Filmmaker and Film Director',

    'person.jobTitle': 'Filmmaker and Film Director',
    'person.description':
      'Filmmaker and film director from Murcia, Spain, specialising in short films, music videos, commercials and fiction.',

    'header.logoLabel': 'Juan Alcaraz — Home',
    'header.menuOpen': 'Open menu',
    'header.menuClose': 'Close menu',
    'header.navLabel': 'Main navigation',

    'nav.home': 'Home',
    'nav.home.sub': 'The reel',
    'nav.projects': 'Projects',
    'nav.projects.sub': 'Selected work',
    'nav.filmography': 'Filmography',
    'nav.filmography.sub': 'About the director',
    'nav.contact': 'Contact',
    'nav.contact.sub': 'Write the future',

    'breadcrumb.home': 'Home',
    'breadcrumb.projects': 'Projects',
    'breadcrumb.filmography': 'Filmography and Biography',
    'breadcrumb.contact': 'Contact',
    'breadcrumb.legal': 'Legal Notice',
    'breadcrumb.privacy': 'Privacy Policy',
    'breadcrumb.cookies': 'Cookie Policy',

    'footer.legal': 'LEGAL NOTICE',
    'footer.privacy': 'PRIVACY POLICY',
    'footer.cookies': 'COOKIE POLICY',

    'lang.label': 'Language',

    'card.view': 'View project',
    'card.altBy': 'by Juan Alcaraz',

    'modal.close': 'Close video',
    'modal.player': 'Video player',
    'modal.videoPrefix': 'Video:',

    'cookies.region': 'Cookie notice',
    'cookies.title': 'USE OF COOKIES',
    'cookies.text':
      'We use our own and third-party cookies to enhance the cinematic experience and to offer embedded visual content.',
    'cookies.more': 'Learn more',
    'cookies.reject': 'REJECT',
    'cookies.accept': 'ACCEPT',
  },
} as const;

export type UIKey = keyof (typeof ui)['es'];

export function useTranslations(lang: Lang) {
  return (key: UIKey): string => ui[lang][key];
}

// ── Contenido de las colecciones ──────────────────────────────────────────
// Los JSON de src/content están en español. Los títulos de las obras no se
// traducen, pero sí sus categorías y los cargos.

/** Categorías de la página de proyectos (la clave es el valor del JSON) */
const PROJECT_CATEGORIES_EN: Record<string, string> = {
  TODOS: 'ALL',
  FICCIÓN: 'FICTION',
  VIDEOCLIP: 'MUSIC VIDEO',
  PUBLICIDAD: 'ADVERTISING',
  'OTRAS PRODUCCIONES': 'OTHER PRODUCTIONS',
};

export function projectCategory(category: string, lang: Lang): string {
  return lang === 'en' ? (PROJECT_CATEGORIES_EN[category] ?? category) : category;
}

/** Categorías de la filmografía */
const FILM_CATEGORIES_EN: Record<string, string> = {
  cortometraje: 'Short film',
  mediometraje: 'Medium-length film',
  'mediometraje documental': 'Medium-length documentary',
  largometraje: 'Feature film',
  videoclip: 'Music video',
  'lyric video': 'Lyric video',
  'dance video': 'Dance video',
  publicidad: 'Advertising',
  spot: 'Commercial',
  autorretrato: 'Self-portrait',
  videopodcast: 'Video podcast',
  serie: 'Series',
};

export function filmCategory(category: string, lang: Lang): string {
  return lang === 'en' ? (FILM_CATEGORIES_EN[category.toLowerCase()] ?? category) : category;
}

/** Cargos: "Director – Guionista – Co-Productor" se traduce cargo a cargo */
const ROLES_EN: Record<string, string> = {
  director: 'Director',
  'co-director': 'Co-Director',
  guionista: 'Writer',
  'co-guionista': 'Co-Writer',
  productor: 'Producer',
  'co-productor': 'Co-Producer',
  editor: 'Editor',
  'co-editor': 'Co-Editor',
  'primer ayudante de dirección': 'First Assistant Director',
  'segundo ayudante de dirección': 'Second Assistant Director',
  'auxiliar de dirección': 'Directing Department Assistant',
};

export function filmRoles(roles: string, lang: Lang): string {
  if (lang !== 'en') return roles;
  return roles
    .split(/\s+[–-]\s+/)
    .map((role) => ROLES_EN[role.trim().toLowerCase()] ?? role.trim())
    .join(' – ');
}
