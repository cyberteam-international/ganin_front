'use client';

import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SocialIcons from "./SocialIcons";
import BurgerMenu from "./BurgerMenu";
import MobileMenu from "./MobileMenu";
import MobileOverlay from "./MobileOverlay";
import { getMenuItems, type IMenuItem } from "@/services/menu";
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();

    // Загрузка данных меню
    useEffect(() => {
        const loadMenuItems = async () => {
            try {
                setIsLoading(true);
                const items = await getMenuItems();
                setMenuItems(items);
            } catch (error) {
                console.error('Error loading menu items:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadMenuItems();
    }, []);

    // Отслеживание скролла
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Управление скроллом body при открытом меню
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const handleMenuToggle = (isOpen: boolean) => {
        setIsMenuOpen(isOpen);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    const scrolledClass = (isScrolled || pathname !== '/') ? styles.scrolled : '';

    return (
        <>
            {/* Шапка */}
            <header className={`${styles.header} ${scrolledClass}`}>
                <div className="container">
                    <div className={styles.headerTop}>
                        <div className={styles.logo}>
                            <Link href="/">
                                <span>Ганин Вячеслав</span>
                            </Link>
                        </div>

                        <div className={styles.headerRight}>
                            <SocialIcons variant="desktop" />
                            <BurgerMenu onToggle={handleMenuToggle} isOpen={isMenuOpen} />
                        </div>
                    </div>
                </div>
            </header>

            {/* Оверлей для мобильного меню */}
            <MobileOverlay isOpen={isMenuOpen} onClose={handleMenuClose} />

            {/* Боковое меню */}
            <MobileMenu 
                isOpen={isMenuOpen} 
                onClose={handleMenuClose} 
                menuItems={menuItems}
                isLoading={isLoading}
            />
        </>
    );
}
