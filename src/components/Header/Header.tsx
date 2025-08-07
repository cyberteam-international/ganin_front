'use client';

import { useState, useEffect } from "react";
import SocialIcons from "./SocialIcons";
import BurgerMenu from "./BurgerMenu";
import MobileMenu from "./MobileMenu";
import MobileOverlay from "./MobileOverlay";
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

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

    return (
        <>
            {/* Шапка */}
            <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
                <div className="container">
                    <div className={styles.headerTop}>
                        <div className={styles.logo}>
                            <h1>Ганин Вячеслав</h1>
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
            <MobileMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
        </>
    );
}
