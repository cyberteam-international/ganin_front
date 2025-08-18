import { fetchStrapi } from '@/lib/strapi';

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  documentId?: string;
}

interface StrapiCollectionResponse<T> {
  data: Array<any>;
  meta?: any;
}

/**
 * Получить список всех FAQ записей
 */
export async function getFAQs(): Promise<FAQItem[]> {
  try {
    const response = await fetchStrapi<StrapiCollectionResponse<FAQItem>>('/api/faqs');

    if (!response?.data) return [];

    return response.data.map((item: any) => ({
      id: item.id,
      question: item.Question || '',
      answer: item.Answer || '',
      documentId: item.documentId,
    }));
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}
