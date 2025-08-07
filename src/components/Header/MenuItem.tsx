'use client';

import { useState } from "react";
import Link from "next/link";
import type { IMenuItem } from "../../store/menu.data";
import styles from './MenuItem.module.css';

interface Props {
    menuItem: IMenuItem;
    isActive: boolean;
    onLinkClick?: () => void;
}

export function MenuItem({menuItem, isActive, onLinkClick} : Props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleMainLinkClick = (e: React.MouseEvent) => {
        if (menuItem.hasDropdown && menuItem.subItems) {
            e.preventDefault();
            setIsDropdownOpen(!isDropdownOpen);
        } else if (onLinkClick) {
            onLinkClick();
        }
    };

    const handleSubLinkClick = () => {
        if (onLinkClick) {
            onLinkClick();
        }
        setIsDropdownOpen(false);
    };

    return (
        <li className={`${styles.menuItem} ${isActive ? styles.active : ""} ${menuItem.hasDropdown ? styles.dropdown : ""} ${isDropdownOpen ? styles.dropdownActive : ""}`}>
            <Link 
                href={menuItem.href} 
                onClick={handleMainLinkClick}
                className={styles.mainLink}
            >
                {menuItem.label}
                {menuItem.hasDropdown && (
                    <i className={`fas fa-chevron-down ${styles.chevron}`}></i>
                )}
            </Link>
            
            {menuItem.hasDropdown && menuItem.subItems && (
                <ul className={styles.dropdownMenu}>
                    {menuItem.subItems.map((subItem, index) => (
                        <li key={`${menuItem.href}-${index}`}>
                            <Link 
                                href={subItem.href}
                                onClick={handleSubLinkClick}
                                className={styles.subLink}
                            >
                                {subItem.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}