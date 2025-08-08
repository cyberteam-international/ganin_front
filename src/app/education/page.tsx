'use client';

import { useEffect, useState } from 'react';
import styles from './EducationGrid.module.css';
import EducationCard from '@/components/EducationCard';
import { getEducationItems } from '@/services/education';
import type { EducationItem } from '@/services/education';
import { buildStrapiURL } from '@/lib/strapi';

export default function EducationPage() {
  const [items, setItems] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const list = await getEducationItems();
        setItems(list);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const openModal = (item: EducationItem) => {
    const largeUrl = item.Picture?.formats?.large?.url || item.Picture?.url || '';
    setModalImage({ src: buildStrapiURL(largeUrl), title: item.Title });
  };
  const closeModal = () => setModalImage(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape' && modalImage) closeModal(); };
    if (modalImage) { document.addEventListener('keydown', onEsc); return () => document.removeEventListener('keydown', onEsc); }
  }, [modalImage]);

  return (
    <section className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Образование</h1>
        {loading ? (
          <div>Загрузка данных...</div>
        ) : items.length === 0 ? (
          <div>Данные об образовании не найдены</div>
        ) : (
          <div className={styles.grid}>
            {items.map((item) => (
              <EducationCard
                key={item.id}
                title={item.Title}
                description={item.Description}
                picture={item.Picture}
                onClick={() => openModal(item)}
              />
            ))}
          </div>
        )}
      </div>

      {modalImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeModal}>&times;</button>
            <h3 style={{ textAlign: 'center', marginBottom: 16 }}>{modalImage.title}</h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={modalImage.src} alt={modalImage.title} className={styles.largeImage} />
          </div>
        </div>
      )}
    </section>
  );
}