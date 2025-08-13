import { getFromStrapi } from "@/lib/strapi";

export interface StrapiSubMenu {
  id: number;
  Sub_link_text: string;
  Sub_link_url: string;
}

export interface StrapiMenuItem {
  id: number;
  documentId: string;
  Text: string;
  URL: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Sub_links: StrapiSubMenu[];
}

export interface StrapiMenuResponse {
  data: StrapiMenuItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ISubMenuItem {
  href: string;
  label: string;
}

export interface IMenuItem {
  href: string;
  label: string;
  isActive: (pathname: string) => boolean;
  subItems?: ISubMenuItem[];
  hasDropdown?: boolean;
}

export async function getMenuItems(): Promise<IMenuItem[]> {
  try {
    const response = await getFromStrapi<StrapiMenuResponse>('/api/header-menus?populate=*');
    
    return response.data.map((item: StrapiMenuItem) => ({
      href: item.URL,
      label: item.Text,
      isActive: (pathname: string) => {
        if (item.URL === '/') {
          return pathname === '/';
        }
        return pathname.startsWith(item.URL);
      },
      hasDropdown: item.Sub_links && item.Sub_links.length > 0,
      subItems: item.Sub_links && item.Sub_links.length > 0 
        ? item.Sub_links.map((subItem: StrapiSubMenu) => ({
            href: subItem.Sub_link_url,
            label: subItem.Sub_link_text
          }))
        : undefined
    }));
  } catch (error) {
    console.error('Error fetching menu items:', error);
    // Fallback to static menu items in case of error
    return [];
  }
}
