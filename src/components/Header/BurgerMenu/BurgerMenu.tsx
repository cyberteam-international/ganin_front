'use client';

import { useState } from 'react';
import styles from './BurgerMenu.module.css';

interface BurgerMenuProps {
    onToggle: (isOpen: boolean) => void;
    isOpen: boolean;
}

export default function BurgerMenu({ onToggle, isOpen }: BurgerMenuProps) {
    const handleClick = () => {
        onToggle(!isOpen);
    };

    return (
        <div 
            className={`${styles.burgerMenu} ${isOpen ? styles.active : ''}`}
            onClick={handleClick}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}
