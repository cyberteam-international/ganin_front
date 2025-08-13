import { buildStrapiURL, getFromStrapi } from '@/lib/strapi';

// Функция для конвертации блоков Strapi в HTML (аналогично блогу)
function blocksToHtml(blocks: any[]): string {
  if (!Array.isArray(blocks)) return '';
  
  const renderChildren = (children: any[]): string => {
    if (!Array.isArray(children)) return '';
    return children.map((child: any) => {
      if (child.type === 'text') {
        let text = child.text || '';
        if (child.bold) text = `<strong>${text}</strong>`;
        if (child.italic) text = `<em>${text}</em>`;
        return text;
      }
      return '';
    }).join('');
  };

  const renderNode = (node: any): string => {
    switch (node.type) {
      case 'heading':
        const level = Math.min(Math.max(node.level || 1, 1), 6);
        return `<h${level}>${renderChildren(node.children)}</h${level}>`;
      case 'paragraph':
        return `<p>${renderChildren(node.children)}</p>`;
      case 'list': {
        const tag = node.format === 'ordered' ? 'ol' : 'ul';
        const items = (node.children || []).map((li: any) => `<li>${renderChildren(li.children)}</li>`).join('');
        return `<${tag}>${items}</${tag}>`;
      }
      case 'list-item':
        return `<li>${renderChildren(node.children)}</li>`;
      default:
        return '';
    }
  };
  return blocks.map(renderNode).join('\n');
}

// Функция для получения URL изображения с поддержкой thumbnail
function getImageUrl(image: any): string {
  if (!image) return '/images/default-article.svg';
  
  // Проверяем различные варианты структуры изображения
  const url = image?.formats?.medium?.url || 
              image?.formats?.small?.url || 
              image?.formats?.thumbnail?.url ||
              image?.url;
  
  return url ? buildStrapiURL(url) : '/images/default-article.svg';
}

export interface SubService {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  seoURL?: string;
  service_id?: number; // ID основной услуги
  image?: {
    id: number;
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
}

export interface MainService {
  id: number;
  title: string;
  icon: string;
  font_awesome_icon_css_classes?: string;
  slug?: string;
  seoURL?: string;
  sub_services: SubService[];
}

export interface ServiceItem {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  seoURL?: string;
  image?: {
    id: number;
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  publishedAt?: string;
}

export async function getMainServices(): Promise<MainService[]> {
  try {
    console.log('Fetching main services from /api/services...');
    const services = await getFromStrapi<{ data: any[] }>('/api/services?populate=*');
    console.log('Main services response:', services);
    
    return services?.data?.map((service: any) => ({
      id: service.id,
      title: service.title || service.Title,
      slug: service.slug || service.Slug || String(service.id),
      seoURL: service.seoURL,
      icon: service.font_awesome_icon_css_classes || service.icon || service.Icon || "fas fa-cog",
      font_awesome_icon_css_classes: service.font_awesome_icon_css_classes,
      sub_services: [] // Подуслуги загружаются отдельно
    })) || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getMainServicesWithSubs(): Promise<MainService[]> {
  try {
    // Попробуем несколько вариантов populate
    console.log('Trying to fetch services with sub-services...');
    
    let services;
    try {
      console.log('Attempt 1: /api/services?populate=sub_services');
      services = await getFromStrapi<{ data: any[] }>('/api/services?populate=sub_services');
    } catch (error) {
      console.log('Attempt 1 failed, trying with populate[sub_services]=*');
      services = await getFromStrapi<{ data: any[] }>('/api/services?populate[sub_services]=*');
    }
    
    console.log('Services response:', services);
    
    if (!services?.data) {
      console.log('No services data received');
      return [];
    }
    
    return services.data.map((service: any) => {
      console.log('Processing service:', service);
      console.log('Service sub_services field:', service.sub_services);
      
      // Проверяем разные возможные структуры для sub_services
      let subServicesData = service.sub_services?.data || service.sub_services || [];
      console.log('Sub-services data for service', service.id, ':', subServicesData);
      
      // Обрабатываем подуслуги если они есть
      const subServices = Array.isArray(subServicesData) ? subServicesData.map((subService: any) => {
        console.log('Processing sub-service:', subService);
        return {
          id: subService.id,
          title: subService.title || subService.Title,
          slug: subService.slug || subService.Slug || String(subService.id),
          seoURL: subService.seoURL,
          service_id: service.id, // Связь уже установлена через populate
          excerpt: subService.excerpt || subService.Excerpt || subService.description || subService.Description || '',
          content: subService.content || subService.Content || '',
          image: subService.image || subService.Image || subService.Thumbnail
        };
      }) : [];
      
      console.log(`Service "${service.title}" (ID: ${service.id}) has ${subServices.length} sub-services:`, subServices);
      
      return {
        id: service.id,
        title: service.title || service.Title,
        slug: service.slug || service.Slug || String(service.id),
        seoURL: service.seoURL,
        icon: service.font_awesome_icon_css_classes || service.icon || service.Icon || "fas fa-cog",
        font_awesome_icon_css_classes: service.font_awesome_icon_css_classes,
        sub_services: subServices
      };
    }) || [];
  } catch (error) {
    console.error('Error fetching services with subs:', error);
    return [];
  }
}

export async function getSubServices(): Promise<SubService[]> {
  try {
    console.log('Fetching sub-services from /api/sub-services...');
    const subServices = await getFromStrapi<{ data: any[] }>('/api/sub-services?populate=*');
    console.log('Sub-services response:', subServices);
    
    return subServices?.data?.map((subService: any) => {
      console.log('Processing sub-service:', subService);
      
      // Получаем контент из разных возможных полей
      let content = subService.content || subService.Content || '';
      
      // Если есть Full_description как блоки, конвертируем в HTML
      if (!content && Array.isArray(subService.Full_description)) {
        content = blocksToHtml(subService.Full_description);
      }
      
      // Получаем excerpt из разных полей
      const excerpt = subService.excerpt || 
                     subService.Excerpt || 
                     subService.description || 
                     subService.Description ||
                     subService.Short_description ||
                     '';
      
      // Используем ID как slug если нет slug поля
      const slug = subService.slug || subService.Slug || String(subService.id);
      
      // Получаем service_id из разных возможных мест
      const serviceId = subService.service?.data?.id || 
                       subService.service_id || 
                       subService.Service?.id ||
                       subService.service?.id ||
                       null;
      
      console.log('Sub-service mapping:', {
        id: subService.id,
        title: subService.title || subService.Title,
        service_id: serviceId,
        rawService: subService.service
      });
      
      return {
        id: subService.id,
        title: subService.title || subService.Title,
        slug: slug,
        seoURL: subService.seoURL,
        service_id: serviceId,
        excerpt: excerpt,
        content: content,
        image: subService.image || subService.Image || subService.Thumbnail
      };
    }) || [];
  } catch (error) {
    console.error('Error fetching sub-services:', error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  console.log('Searching for service with slug:', slug);
  
  try {
    // Сначала попробуем найти среди sub-services
    try {
      console.log('Searching in sub-services...');
      const subServicesResponse = await getFromStrapi<{ data: any[] }>('/api/sub-services?populate=*');
      const subService = subServicesResponse?.data?.find(s => 
        s.seoURL === slug || s.slug === slug || s.Slug === slug || String(s.id) === slug
      );
      
      if (subService) {
        console.log('Found in sub-services:', subService);
        
        // Получаем контент из разных возможных полей
        let content = subService.content || subService.Content || '';
        
        // Если есть Full_description как блоки, конвертируем в HTML
        if (!content && Array.isArray(subService.Full_description)) {
          content = blocksToHtml(subService.Full_description);
        }
        
        // Получаем excerpt из разных полей
        const excerpt = subService.excerpt || 
                       subService.Excerpt || 
                       subService.description || 
                       subService.Description ||
                       subService.Short_description ||
                       '';
        
        return {
          id: subService.id,
          documentId: subService.documentId,
          title: subService.title || subService.Title,
          slug: subService.slug || subService.Slug || String(subService.id),
          seoURL: subService.seoURL,
          excerpt: excerpt,
          content: content,
          image: subService.image || subService.Image || subService.Thumbnail,
          publishedAt: subService.publishedAt || subService.createdAt
        };
      }
    } catch (e) {
      console.log('Sub-services search failed:', e);
    }

    // Потом попробуем найти среди основных services
    try {
      console.log('Searching in main services...');
      const servicesResponse = await getFromStrapi<{ data: any[] }>('/api/services?populate=*');
      const service = servicesResponse?.data?.find(s => 
        s.seoURL === slug || s.slug === slug || s.Slug === slug || String(s.id) === slug
      );
      
      if (service) {
        console.log('Found in main services:', service);
        
        // Получаем контент из разных возможных полей
        let content = service.content || service.Content || '';
        
        // Если есть Full_description как блоки, конвертируем в HTML
        if (!content && Array.isArray(service.Full_description)) {
          content = blocksToHtml(service.Full_description);
        }
        
        // Получаем excerpt из разных полей
        const excerpt = service.excerpt || 
                       service.Excerpt || 
                       service.description || 
                       service.Description ||
                       service.Short_description ||
                       '';
        
        return {
          id: service.id,
          documentId: service.documentId,
          title: service.title || service.Title,
          slug: service.slug || service.Slug || String(service.id),
          seoURL: service.seoURL,
          excerpt: excerpt,
          content: content,
          image: service.image || service.Image || service.Thumbnail,
          publishedAt: service.publishedAt || service.createdAt
        };
      }
    } catch (e) {
      console.log('Main services search failed:', e);
    }

    return null;
  } catch (error) {
    console.error('Error fetching sub-service:', error);
    
    // Fallback для тестирования - возвращаем статическую услугу
    if (slug === '1' || slug === 'kodirovanie-ot-alkogolizma') {
      return {
        id: 1,
        documentId: '1',
        title: 'Кодирование от алкоголизма действенными методами',
        slug: 'kodirovanie-ot-alkogolizma',
        excerpt: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
        content: '<h2>Эффективные методы кодирования</h2><p>Наша клиника предлагает современные и проверенные методы кодирования от алкогольной зависимости. Мы используем как медикаментозные, так и психотерапевтические подходы.</p><h3>Преимущества нашего подхода:</h3><ul><li>Индивидуальный подбор метода</li><li>Комплексная поддержка</li><li>Высокая эффективность</li><li>Безопасность процедур</li></ul>',
        image: undefined,
        publishedAt: new Date().toISOString()
      };
    }
    
    return null;
  }
}

export function serviceImageUrl(image?: ServiceItem['image']) {
  return getImageUrl(image);
}

export function getServiceUrl(service: ServiceItem): string {
  return service.seoURL || service.slug || service.documentId || String(service.id);
}

export function getMainServiceUrl(service: MainService): string {
  return service.seoURL || service.slug || String(service.id);
}

export function getSubServiceUrl(service: SubService): string {
  return service.seoURL || service.slug || String(service.id);
}
