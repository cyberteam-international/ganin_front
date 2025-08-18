import type { Metadata } from 'next';

export interface MetaConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  siteName?: string;
}

const defaultConfig = {
  siteName: 'Ганин Вячеслав - Клинический психолог',
  author: 'Ганин Вячеслав',
  ogImage: '/images/general.png',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ganin-psychologist.com'
};

export function generateMetadata(config: MetaConfig): Metadata {
  const {
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage = defaultConfig.ogImage,
    ogType = 'website',
    publishedTime,
    modifiedTime,
    author = defaultConfig.author,
    siteName = defaultConfig.siteName
  } = config;

  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const fullCanonicalUrl = canonicalUrl.startsWith('http') 
    ? canonicalUrl 
    : `${defaultConfig.baseUrl}${canonicalUrl}`;
  const fullOgImage = ogImage.startsWith('http') 
    ? ogImage 
    : `${defaultConfig.baseUrl}${ogImage}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: author }],
    creator: author,
    publisher: siteName,
    
    // Canonical URL
    alternates: {
      canonical: fullCanonicalUrl
    },

    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: fullCanonicalUrl,
      siteName,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'ru_RU',
      type: ogType,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime })
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullOgImage],
      creator: `@${author.replace(/\s+/g, '').toLowerCase()}`
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },

    // Additional meta tags
    other: {
      'article:author': author,
      ...(keywords && { 'article:tag': keywords }),
      'og:locale': 'ru_RU',
      'application-name': siteName
    }
  };

  return metadata;
}

// Предустановленные конфигурации для общих страниц
export const pageConfigs = {
  home: {
    title: 'Главная',
    description: 'Профессиональная психологическая помощь от клинического психолога Ганина Вячеслава. Работа с зависимостями, тревожностью, депрессией. 16 лет опыта.',
    keywords: 'психолог, психотерапия, зависимость, депрессия, тревожность, психологическая помощь, Ганин Вячеслав',
    canonicalUrl: '/'
  },
  
  blog: {
    title: 'Блог',
    description: 'Статьи и материалы по психологии, работе с зависимостями, восстановлению и личностному росту от клинического психолога.',
    keywords: 'психология, статьи, блог, зависимость, восстановление, психотерапия',
    canonicalUrl: '/blog'
  },
  
  services: {
    title: 'Услуги',
    description: 'Профессиональные психологические услуги: консультирование, психотерапия, работа с зависимостями, семейная терапия.',
    keywords: 'психологические услуги, консультирование, психотерапия, семейная терапия, работа с зависимостями',
    canonicalUrl: '/uslugi'
  },
  
  helpStories: {
    title: 'Истории спасения',
    description: 'Реальные истории восстановления и преодоления зависимостей. Опыт клиентов и их путь к выздоровлению.',
    keywords: 'истории выздоровления, зависимость, восстановление, реабилитация, мотивация',
    canonicalUrl: '/helpstories'
  },
  
  education: {
    title: 'Образование',
    description: 'Образование и квалификация клинического психолога Ганина Вячеслава. Дипломы, сертификаты, повышение квалификации.',
    keywords: 'образование психолога, квалификация, дипломы, сертификаты, обучение',
    canonicalUrl: '/education'
  },
  
  contacts: {
    title: 'Контакты',
    description: 'Контактная информация психолога Ганина Вячеслава. Запись на консультацию, адрес, телефон, email.',
    keywords: 'контакты психолога, запись на консультацию, адрес, телефон',
    canonicalUrl: '/contacts'
  },

  faq: {
    title: 'FAQ',
    description: 'Часто задаваемые вопросы и ответы о работе с психологом, консультациях, психотерапии и восстановлении.',
    keywords: 'FAQ, часто задаваемые вопросы, консультация психолога, психотерапия',
    canonicalUrl: '/faq'
  }
};

// Функции для генерации метатегов конкретных типов контента
export function generateArticleMetadata(article: {
  title: string;
  excerpt?: string;
  content?: string;
  publishedAt?: string;
  cover?: any;
  seoURL?: string;
  documentId?: string;
  id: number;
}) {
  const url = article.seoURL || article.documentId || String(article.id);
  const description = article.excerpt || 
    (article.content ? article.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...' : 
    'Статья по психологии от клинического психолога Ганина Вячеслава');
  
  return generateMetadata({
    title: article.title,
    description,
    keywords: 'психология, статья, психотерапия, помощь, развитие',
    canonicalUrl: `/blog/${url}`,
    ogType: 'article',
    publishedTime: article.publishedAt,
    ogImage: article.cover?.formats?.large?.url || article.cover?.url
  });
}

export function generateServiceMetadata(service: {
  title: string;
  excerpt: string;
  content?: string;
  seoURL?: string;
  slug?: string;
  documentId?: string;
  id: number;
}) {
  const url = service.seoURL || service.slug || service.documentId || String(service.id);
  
  return generateMetadata({
    title: service.title,
    description: service.excerpt,
    keywords: 'психологические услуги, консультирование, психотерапия, помощь',
    canonicalUrl: `/uslugi/${url}`,
    ogType: 'website'
  });
}

export function generateStoryMetadata(story: {
  Title: string;
  Short_description?: string;
  zavisimost?: string;
  seoURL?: string;
  documentId?: string;
  id: number;
}) {
  const url = story.seoURL || story.documentId || String(story.id);
  const description = story.Short_description || 
    `История восстановления ${story.zavisimost ? `от ${story.zavisimost.toLowerCase()}` : ''}. Реальный опыт преодоления зависимости.`;
  
  return generateMetadata({
    title: `История ${story.Title}`,
    description,
    keywords: `история выздоровления, ${story.zavisimost || 'зависимость'}, восстановление, мотивация`,
    canonicalUrl: `/helpstories/${url}`,
    ogType: 'article'
  });
}
