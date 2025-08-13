'use client';

import { useState } from 'react';
import BookingModal from '@/components/BookingModal';
import styles from './Footer.module.css';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConsultationClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Контакты в один ряд */}
        <div className={styles.footerContactsRow}>
          <div className={`${styles.contactItem} ${styles.contactsHeader}`}>
            <h2 className={styles.contactsTitle}>Контакты</h2>
          </div>
          
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>
              <i className="fas fa-envelope"></i>
            </div>
            <div className={styles.contactDetails}>
              <h3>Email</h3>
              <p><a href="mailto:ganin.vlad@ya.ru">ganin.vlad@ya.ru</a></p>
            </div>
          </div>
          
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>
              <i className="fas fa-clock"></i>
            </div>
            <div className={styles.contactDetails}>
              <h3>Время работы</h3>
              <p>Пн-Пт: 10:00 - 20:00</p>
            </div>
          </div>

          <div className={`${styles.contactItem} ${styles.ctaContact}`}>
            <button className={styles.consultationBtn} onClick={handleConsultationClick}>
              <span>Консультация</span>
              <div className={styles.btnIcon}>
                <i className="fas fa-arrow-right"></i>
              </div>
            </button>
          </div>
        </div>
        
        <div className={styles.footerNavigation}>
          <div className={`${styles.footerNavColumn} ${styles.mainLinksColumn}`}>
            <h3><a href="#hero">Главная</a></h3>
            <h3><a href="#stories">Истории спасения</a></h3>
            <h3><a href="#articles">Статьи</a></h3>
            <h3><a href="#education">Образование</a></h3>
            
            {/* Социальные сети */}
            <div className={styles.footerSocial}>
              <h3>Социальные сети</h3>
              <div className={styles.socialIcons}>
                <a href="#" className={`${styles.socialLink} ${styles.vk}`}>
                  <i className="fab fa-vk"></i>
                </a>
                <a href="#" className={`${styles.socialLink} ${styles.telegram}`}>
                  <i className="fab fa-telegram"></i>
                </a>
                <a href="#" className={`${styles.socialLink} ${styles.whatsapp}`}>
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.footerNavColumn}>
            <h3><a href="#services">Консультирование</a></h3>
            <ul>
              <li><a href="#services">Решение жизненных и личных проблем</a></li>
              <li><a href="#services">Сложные отношения</a></li>
              <li><a href="#services">Проблемы в семье и социализация</a></li>
              <li><a href="#services">Потеря смысла жизни, одиночество</a></li>
              <li><a href="#services">Поддержка в кризисной ситуации</a></li>
              <li><a href="#services">Консультации для родителей</a></li>
            </ul>
          </div>

          <div className={styles.footerNavColumn}>
            <h3><a href="#services">Психотерапия</a></h3>
            <ul>
              <li><a href="#services">Работа с самооценкой</a></li>
              <li><a href="#services">Психосоматика</a></li>
              <li><a href="#services">Детские и юношеские травмы</a></li>
              <li><a href="#services">Выявление внутренних конфликтов</a></li>
              <li><a href="#services">Преодоление негативных установок</a></li>
            </ul>
          </div>

          <div className={styles.footerNavColumn}>
            <h3><a href="#services">Зависимость / созависимость</a></h3>
            <ul>
              <li><a href="#services">Восстановление после лечения</a></li>
              <li><a href="#services">Поддержка после выхода из зависимости</a></li>
              <li><a href="#services">Работа с родственниками зависимых</a></li>
              <li><a href="#services">Восстановление отношений</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; 2025 Ганин Вячеслав. Все права защищены.</p>
        </div>
      </div>
      
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </footer>
  );
}
