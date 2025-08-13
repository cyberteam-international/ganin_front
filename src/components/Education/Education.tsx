'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './Education.module.css';
import EducationCard from '@/components/EducationCard';
import { getEducationItems } from '@/services/education';
import type { EducationItem } from '@/services/education';
import { buildStrapiURL } from '@/lib/strapi';

export default function Education() {
  const [educationData, setEducationData] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<{ src: string; title: string } | null>(null);

  const handleOpenModal = (item: EducationItem) => {
    const largeUrl = item.Picture?.formats?.large?.url || item.Picture?.url || '';
    setModalImage({ src: buildStrapiURL(largeUrl), title: item.Title });
  };
  const handleCloseModal = () => setModalImage(null);

  useEffect(() => {
    (async () => {
      try {
        const list = await getEducationItems();
        setEducationData(list);
      } catch (e: any) {
        setError(e.message || 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape' && modalImage) handleCloseModal(); };
    if (modalImage) { document.addEventListener('keydown', onEsc); return () => document.removeEventListener('keydown', onEsc); }
  }, [modalImage]);

  return (
    <section id="education" className={styles.education}>
      <div className="container">
        <h2 className={styles['section-title']}>Образование</h2>
        {loading && <div className={styles.loading}><div className={styles['loading-text']}>Загрузка данных...</div></div>}
        {!loading && error && <div className={styles.loading}><div className={styles['loading-text']}>{error}</div></div>}
        {!loading && !error && educationData.length === 0 && (
          <div className={styles.loading}><div className={styles['loading-text']}>Данные об образовании не найдены</div></div>
        )}
        {!loading && !error && educationData.length > 0 && (
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
              320: { slidesPerView: 1.2, spaceBetween: 15, centeredSlides: true },
              768: { slidesPerView: 2.2, spaceBetween: 25, centeredSlides: true },
              1024: { slidesPerView: 3, spaceBetween: 30, centeredSlides: false, allowTouchMove: true, loop: false },
              1200: { slidesPerView: 3, spaceBetween: 30, centeredSlides: false, allowTouchMove: true, loop: false },
            }}
          >
            {educationData.map((item) => (
              <SwiperSlide key={item.id} className={styles['swiper-slide']}>
                <EducationCard
                  title={item.Title}
                  description={item.Description}
                  picture={item.Picture}
                  onClick={() => handleOpenModal(item)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      {modalImage && (
        <div className={`${styles['certificate-modal']} ${styles.active}`}>
          <div className={styles['certificate-modal-overlay']} onClick={handleCloseModal}>
            <div className={styles['certificate-modal-content']} onClick={(e) => e.stopPropagation()}>
              <button className={styles['certificate-modal-close']} onClick={handleCloseModal}>&times;</button>
              <div className={styles['certificate-modal-header']}>
                <h3>{modalImage.title}</h3>
              </div>
              <div className={styles['certificate-modal-image']}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={modalImage.src} alt={modalImage.title} className={styles['modal-image']} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
