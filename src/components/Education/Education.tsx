'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';

import styles from './Education.module.css';

interface EducationData {
    id: number;
    Title: string;
    Description: string;
    Picture?: {
        formats?: {
            thumbnail?: { url: string };
            large?: { url: string };
        };
        url?: string;
    };
}

export default function Education() {
    const [educationData, setEducationData] = useState<EducationData[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalImage, setModalImage] = useState<{ src: string; title: string } | null>(null);

    // Функция загрузки данных с API
    const loadEducationData = async (): Promise<EducationData[]> => {
        try {
            console.log('Загружаем данные образования с API...');
            const response = await fetch('https://integral-authority-03dc069899.strapiapp.com/api/educations/?populate=Picture');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Получены данные с API:', data);
            
            if (data && data.data && Array.isArray(data.data)) {
                console.log(`Загружено ${data.data.length} записей образования`);
                return data.data;
            } else {
                console.warn('Неожиданная структура данных:', data);
                return [];
            }
        } catch (error) {
            console.error('Ошибка загрузки данных образования:', error);
            return [];
        }
    };

    // Функция получения URL изображения
    const getImageUrl = (picture: EducationData['Picture'], type: 'thumbnail' | 'large' = 'thumbnail'): string => {
        const defaultImage = '/images/default-certificate.svg';
        
        if (!picture) return defaultImage;
        
        if (picture.formats) {
            const format = type === 'thumbnail' ? picture.formats.thumbnail : picture.formats.large;
            if (format && format.url) {
                // URL уже содержит полный путь с доменом
                return format.url.startsWith('http') ? format.url : `https://integral-authority-03dc069899.strapiapp.com${format.url}`;
            }
        }
        
        if (picture.url) {
            return picture.url.startsWith('http') ? picture.url : `https://integral-authority-03dc069899.strapiapp.com${picture.url}`;
        }
        
        return defaultImage;
    };

    // Функция открытия модального окна
    const openModal = (education: EducationData) => {
        const largeUrl = getImageUrl(education.Picture, 'large');
        setModalImage({ src: largeUrl, title: education.Title });
    };

    // Функция закрытия модального окна
    const closeModal = () => {
        setModalImage(null);
    };

    // Загрузка данных при монтировании компонента
    useEffect(() => {
        const loadData = async () => {
            const data = await loadEducationData();
            setEducationData(data);
            setLoading(false);
        };
        
        loadData();
    }, []);

    // Обработчик клавиш для закрытия модального окна
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && modalImage) {
                closeModal();
            }
        };

        if (modalImage) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [modalImage]);

    return (
        <section id="education" className={styles.education}>
            <div className="container">
                <h2 className={styles['section-title']}>Образование</h2>
                
                {loading ? (
                    <div className={styles.loading}>
                        <div className={styles['loading-text']}>Загрузка данных...</div>
                    </div>
                ) : educationData.length === 0 ? (
                    <div className={styles.loading}>
                        <div className={styles['loading-text']}>Данные об образовании не найдены</div>
                    </div>
                ) : (
                    <Swiper
                        className={styles['education-swiper']}
                        slidesPerView="auto"
                        spaceBetween={30}
                        centeredSlides={false}
                        loop={educationData.length > 3}
                        speed={600}
                        allowTouchMove={true}
                        watchOverflow={true}
                        breakpoints={{
                            320: {
                                slidesPerView: 1.2,
                                spaceBetween: 15,
                                centeredSlides: false,
                            },
                            768: {
                                slidesPerView: 2.2,
                                spaceBetween: 25,
                                centeredSlides: false,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                                centeredSlides: false,
                                allowTouchMove: false,
                                loop: false,
                            },
                            1200: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                                centeredSlides: false,
                                allowTouchMove: false,
                                loop: false,
                            }
                        }}
                    >
                        {educationData.map((education) => (
                            <SwiperSlide key={education.id} className={styles['swiper-slide']}>
                                <div 
                                    className={styles['education-card']}
                                    onClick={() => openModal(education)}
                                >
                                    <div className={styles['education-image']}>
                                        <Image
                                            src={getImageUrl(education.Picture)}
                                            alt={`Сертификат - ${education.Title}`}
                                            width={300}
                                            height={180}
                                            className={styles['cert-image']}
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/images/default-certificate.svg';
                                            }}
                                        />
                                    </div>
                                    <h3>{education.Title}</h3>
                                    <p>{education.Description}</p>
                                    <button className={styles['education-btn']}>
                                        <span>Смотреть</span>
                                        <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>

            {/* Модальное окно */}
            {modalImage && (
                <div className={`${styles['certificate-modal']} ${styles.active}`}>
                    <div 
                        className={styles['certificate-modal-overlay']}
                        onClick={closeModal}
                    >
                        <div 
                            className={styles['certificate-modal-content']}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                className={styles['certificate-modal-close']}
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                            <div className={styles['certificate-modal-header']}>
                                <h3>{modalImage.title}</h3>
                            </div>
                            <div className={styles['certificate-modal-image']}>
                                <Image
                                    src={modalImage.src}
                                    alt={modalImage.title}
                                    width={800}
                                    height={600}
                                    className={styles['modal-image']}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/images/default-certificate.svg';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
