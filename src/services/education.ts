import { fetchStrapi } from '@/lib/strapi';

export interface EducationItem {
  id: number;
  Title: string;
  Description: string;
  Picture?: {
    formats?: {
      thumbnail?: { url: string };
      large?: { url: string };
    };
    url?: string;
  };
}

interface StrapiResponse<T> {
  data: T[];
  meta?: any;
}

export async function getEducationItems(): Promise<EducationItem[]> {
  const res = await fetchStrapi<StrapiResponse<EducationItem>>('/api/educations/?populate=Picture');
  if (Array.isArray(res?.data)) return res.data;
  return [];
}
