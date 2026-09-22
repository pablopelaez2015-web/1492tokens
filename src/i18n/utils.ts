import { ui, defaultLang, type Lang, type UIKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey, vars?: Record<string, string | number>): string {
    let s: string = (ui[lang] as any)[key] ?? (ui[defaultLang] as any)[key] ?? key;
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
    return s;
  };
}

/** Rutas de cada página por idioma. Las claves son los slugs en español. */
export const routes = {
  es: {
    home: '/',
    what: '/que-es',
    event: '/proximo-evento',
    talks: '/charlas',
    speak: '/quiero-hablar',
    cities: '/ciudades',
    about: '/sobre',
    privacy: '/privacidad',
    legal: '/aviso-legal',
    unsubscribe: '/baja',
  },
  en: {
    home: '/en/',
    what: '/en/what-it-is',
    event: '/en/next-event',
    talks: '/en/talks',
    speak: '/en/give-a-talk',
    cities: '/en/cities',
    about: '/en/about',
    privacy: '/en/privacy',
    legal: '/en/legal-notice',
    unsubscribe: '/en/unsubscribe',
  },
} as const;

export type RouteKey = keyof typeof routes.es;

export function useRoutes(lang: Lang) {
  return function r(key: RouteKey): string {
    return routes[lang][key];
  };
}

/** Devuelve la ruta equivalente en el otro idioma (para el selector). */
export function switchLangPath(lang: Lang, key: RouteKey): { lang: Lang; path: string } {
  const other: Lang = lang === 'es' ? 'en' : 'es';
  return { lang: other, path: routes[other][key] };
}

export function formatDate(iso: string | null, lang: Lang): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(d);
}
