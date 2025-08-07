'use client';

import Link from "next/link";
import { MENU_ITEMS } from "../../store/menu.data";
import { MenuItem } from "./MenuItem";
import { usePathname } from "next/navigation";
import { match } from "path-to-regexp";
import NeuralBackground from "../NeuralBackground";

export default function Header() {
    const pathname = usePathname();

  return (
    <>
        {/* Глобальный нейронный фон */}
        <NeuralBackground />

    {/* Прелоадер */}
    <div id="preloader" className="preloader">
        <div className="preloader-content">
            <div className="progress-text">
                <span id="progressPercent">0%</span>
            </div>
        </div>
    </div>

    {/* Шапка */}
    <header className="header">
        <div className="container">
            <div className="header-top">
                <div className="logo">
                    <h1>Ганин Вячеслав</h1>
                </div>

                <div className="header-right">
                    <div className="social-icons">
                        <Link href="#" className="social-link vk"><i className="fab fa-vk"></i></Link>
                        <Link href="#" className="social-link telegram"><i className="fab fa-telegram"></i></Link>
                        <Link href="#" className="social-link whatsapp"><i className="fab fa-whatsapp"></i></Link>
                    </div>
                    <div className="burger-menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    {/* Оверлей для мобильного меню */}
    <div className="mobile-overlay"></div>

    {/* Боковое меню */}
    <div className="mobile-menu">
         {/* Заголовок и кнопка закрытия */}
        <div className="mobile-menu-header">
            <h3 className="mobile-menu-title">Навигация</h3>
            <div className="mobile-menu-close">
                <span></span>
                <span></span>
            </div>
        </div>

        <nav className="navigation">
            <ul className="nav-menu">
                {MENU_ITEMS.map( item => (
                    <MenuItem
                        key={item.href}
                        menuItem={item}
                        isActive={!!match(item.href)(pathname)} />
                ))}
            </ul>
        </nav>
        
         {/* Социальные сети в низу меню */}
        <div className="mobile-social-section">
            <div className="mobile-social-icons">
                <Link href="#" className="social-link vk"><i className="fab fa-vk"></i></Link>
                <Link href="#" className="social-link telegram"><i className="fab fa-telegram"></i></Link>
                <Link href="#" className="social-link whatsapp"><i className="fab fa-whatsapp"></i></Link>
            </div>
        </div>
    </div>
    
    </>
  );
}
