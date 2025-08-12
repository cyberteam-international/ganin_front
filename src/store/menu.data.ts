import { PAGES } from "@/config/pages.config";

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

export const MENU_ITEMS: IMenuItem[] = [
    {
        href: PAGES.HOME,
        label: "Главная",
        isActive: (pathname: string) => pathname === PAGES.HOME
    },
    {
        href: PAGES.USLUGI,
        label: "Услуги",
        isActive: (pathname: string) => pathname.startsWith(PAGES.USLUGI)
    },
    {
        href: "/consulting",
        label: "Консультирование",
        isActive: (pathname: string) => pathname.startsWith("/consulting"),
        hasDropdown: true,
        subItems: [
            { href: "/consulting/life-problems", label: "Решение жизненных и личных проблем" },
            { href: "/consulting/relationships", label: "Сложные отношения" },
            { href: "/consulting/family", label: "Проблемы в семье и социализация" },
            { href: "/consulting/loneliness", label: "Потеря смысла жизни, одиночество" },
            { href: "/consulting/crisis", label: "Поддержка в кризисной ситуации" },
            { href: "/consulting/parents", label: "Консультации для родителей" }
        ]
    },
    {
        href: "/psychotherapy",
        label: "Психотерапия",
        isActive: (pathname: string) => pathname.startsWith("/psychotherapy"),
        hasDropdown: true,
        subItems: [
            { href: "/psychotherapy/self-esteem", label: "Работа с самооценкой" },
            { href: "/psychotherapy/psychosomatics", label: "Психосоматика" },
            { href: "/psychotherapy/trauma", label: "Детские и юношеские травмы" },
            { href: "/psychotherapy/conflicts", label: "Выявление внутренних конфликтов" },
            { href: "/psychotherapy/negative-beliefs", label: "Преодоление негативных установок" }
        ]
    },
    {
        href: "/addiction",
        label: "Зависимость/созависимость",
        isActive: (pathname: string) => pathname.startsWith("/addiction"),
        hasDropdown: true,
        subItems: [
            { href: "/addiction/recovery", label: "Восстановление после лечения" },
            { href: "/addiction/support", label: "Поддержка после выхода из зависимости" },
            { href: "/addiction/relatives", label: "Работа с родственниками зависимых" },
            { href: "/addiction/relationships", label: "Восстановление отношений" }
        ]
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
    }
]