'use client';

import { useState } from 'react';
import styles from './BookingModal.module.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    contact: '',
    name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.contact.trim() || !formData.name.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    setIsSubmitting(true);

    try {
      const message = `🔥 Новая заявка на консультацию!\n\n👤 Имя: ${formData.name}\n📱 Контакт: ${formData.contact}`;
      
      const response = await fetch(`https://api.telegram.org/bot7695065464:AAGbRXvq__5JCYCwWne-GhTKJQYUGfD-GCA/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '-1002821935138',
          text: message,
          parse_mode: 'HTML'
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ contact: '', name: '' });
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 2000);
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        {isSuccess ? (
          <div className={styles.successMessage}>
            <i className="fas fa-check-circle"></i>
            <h3>Заявка отправлена!</h3>
            <p>Мы свяжемся с вами в ближайшее время</p>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Запись на консультацию</h2>
            <p className={styles.subtitle}>Оставьте свои контакты и мы свяжемся с вами</p>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="contact">WhatsApp / Telegram</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="@username или +7(999)123-45-67"
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="name">Ваше имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Введите ваше имя"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Записаться'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
