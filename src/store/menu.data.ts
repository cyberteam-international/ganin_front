import { PAGES } from "@/config/pages.config";

export interface IMenuItem {
    href: string;
    label: string;
    isActive: (pathname: string) => boolean;
}

export const MENU_ITEMS = [
    {
        href: PAGES.HOME,
        label: "Главная",
        isActive: (pathname: string) => pathname === PAGES.HOME
    },
    {
        href: PAGES.USLUGI,
        label: "Консультирование",
        isActive: (pathname: string) => pathname.startsWith(PAGES.USLUGI)
    },
    {
        href: PAGES.HELPSTORIES,
        label: "Истории спасения",
        isActive: (pathname: string) => pathname === PAGES.HELPSTORIES
    },
    {
        href: PAGES.BLOG,
        label: "Статьи",
        isActive: (pathname: string) => pathname === PAGES.BLOG
    },
    {
        href: PAGES.EDUCATION,
        label: "Образование",
        isActive: (pathname: string) => pathname === PAGES.EDUCATION
    },
    {
        href: PAGES.CONTACTS,
        label: "Контакты",
        isActive: (pathname: string) => pathname === PAGES.CONTACTS
    }   
]