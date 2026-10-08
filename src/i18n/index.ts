import routes from './routes.json';

export const LANGS = ['es', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'es';

export type RouteKey = keyof typeof routes;

/** Nombre de cada idioma escrito en ese mismo idioma */
export const LANG_NAMES: Record<Lang, string> = { es: 'Español', en: 'English' };

/** Etiquetas de idioma para <html lang>, Open Graph y schema.org */
export const LANG_TAGS: Record<Lang, { html: string; og: string; schema: string }> = {
  es: { html: 'es', og: 'es_ES', schema: 'es-ES' },
  en: { html: 'en', og: 'en_US', schema: 'en' },
};

// El español vive en la raíz (las URLs de siempre) y el inglés bajo /en/
const withSlash = (path: string) => (path.endsWith('/') ? path : `${path}/`);

export function getLang(pathname: string): Lang {
  return withSlash(pathname).startsWith('/en/') ? 'en' : 'es';
}

/** Qué página es esta ruta, sea cual sea su idioma (null si no está en el mapa, p. ej. el 404) */
export function getRouteKey(pathname: string): RouteKey | null {
  const path = withSlash(pathname);
  const lang = getLang(path);
  const match = (Object.keys(routes) as RouteKey[]).find((key) => routes[key][lang] === path);
  return match ?? null;
}

export function localizedPath(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

/** La misma página en otro idioma; si no tiene equivalente, la portada de ese idioma */
export function switchLangPath(pathname: string, lang: Lang): string {
  return localizedPath(getRouteKey(pathname) ?? 'home', lang);
}
