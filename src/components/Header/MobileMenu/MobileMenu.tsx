'use client';

import { MENU_ITEMS } from "../../../store/menu.data";
import { MenuItem } from "../MenuItem";
import { usePathname } from "next/navigation";
import SocialIcons from "../SocialIcons";
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
                    {MENU_ITEMS.map(item => (
                        <MenuItem
                            key={item.href}
                            menuItem={item}
                            isActive={item.isActive(pathname)}
                            onLinkClick={handleLinkClick}
                        />
                    ))}
                </ul>
            </nav>
            
            {/* Социальные сети в низу меню */}
            <div className={styles.mobileSocialSection}>
                <SocialIcons variant="mobile" />
            </div>
        </div>
    );
}
