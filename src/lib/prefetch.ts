import { getMainServicesWithSubs } from '@/services/services';
import { getEducationItems } from '@/services/education';
import { getArticles } from '@/services/blog';
import { getHelpStories } from '@/services/helpStories';
import { getMenuItems } from '@/services/menu';

export interface HomePageData {
  services: any[];
  education: any[];
  articles: any[];
  helpStories: any[];
  menuItems: any[];
}

// Prefetch all critical data in parallel for homepage
export async function prefetchHomePageData(): Promise<HomePageData> {
  try {
    const [services, education, articles, helpStories, menuItems] = await Promise.all([
      getMainServicesWithSubs().catch(() => []),
      getEducationItems().catch(() => []),
      getArticles().catch(() => []),
      getHelpStories().catch(() => []),
      getMenuItems().catch(() => [])
    ]);

    return {
      services,
      education,
      articles,
      helpStories,
      menuItems
    };
  } catch (error) {
    console.error('Error prefetching homepage data:', error);
    return {
      services: [],
      education: [],
      articles: [],
      helpStories: [],
      menuItems: []
    };
  }
}