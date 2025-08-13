'use client';

import { MenuItem } from "../MenuItem";
import { usePathname } from "next/navigation";
import SocialIcons from "../SocialIcons";
import { type IMenuItem } from "@/services/menu";
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    menuItems: IMenuItem[];
    isLoading: boolean;
}

export default function MobileMenu({ isOpen, onClose, menuItems, isLoading }: MobileMenuProps) {
    const pathname = usePathname();

    const handleLinkClick = () => {
        onClose();
    };

    return (
        <div className={`${styles.mobileMenu} ${isOpen ? styles.active : ''}`}>
            {/* Заголовок и кнопка закрытия */}
            <div className={styles.mobileMenuHeader}>
                <h3 className={styles.mobileMenuTitle}>Навигация</h3>
                <div className={styles.mobileMenuClose} onClick={onClose}>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <nav className={styles.navigation}>
                <ul className={styles.navMenu}>
                    {isLoading ? (
                        <li className={styles.loadingItem}>Загрузка меню...</li>
                    ) : (
                        menuItems.map(item => (
                            <MenuItem
                                key={item.href}
                                menuItem={item}
                                isActive={item.isActive(pathname)}
                                onLinkClick={handleLinkClick}
                            />
                        ))
                    )}
                </ul>
            </nav>
            
            {/* Социальные сети в низу меню */}
            <div className={styles.mobileSocialSection}>
                <SocialIcons variant="mobile" />
            </div>
        </div>
    );
}
