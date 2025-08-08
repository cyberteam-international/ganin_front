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
    ...init,
    // Next.js fetch caching can be controlled here if needed
    // cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Strapi request failed ${res.status}: ${text}`);
  }

  return res.json();
}

export const getStrapiMediaURL = (url?: string) => (url ? buildStrapiURL(url) : '');
