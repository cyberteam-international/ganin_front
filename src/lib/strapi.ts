export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://integral-authority-03dc069899.strapiapp.com';

export const buildStrapiURL = (path: string) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `${STRAPI_URL}${path}`;
};

export async function fetchStrapi<T = any>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(buildStrapiURL(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}) as Record<string, string>,
    },
    // Force fresh data to fix missing updates in home sections
    cache: 'no-store',
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Strapi request failed ${res.status}: ${text}`);
  }

  return res.json();
}

export const getStrapiMediaURL = (url?: string) => (url ? buildStrapiURL(url) : '');

export async function getFromStrapi<T = any>(path: string): Promise<T> {
  return fetchStrapi<T>(path);
}
