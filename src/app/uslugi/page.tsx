import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Services.module.css';
import { getServices, type ServiceItem, serviceImageUrl } from '@/services/services';

export const metadata: Metadata = {
  title: 'Услуги',
  description: 'Профессиональные психологические услуги: консультирование, психотерапия, работа с зависимостями.',
  alternates: { canonical: '/uslugi' },
  openGraph: {
    title: 'Услуги',
    description: 'Профессиональные психологические услуги: консультирование, психотерапия, работа с зависимостями.',
    url: '/uslugi',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Услуги',
    description: 'Профессиональные психологические услуги: консультирование, психотерапия, работа с зависимостями.',
  },
} as any;

export default async function ServicesPage() {
  const services = await getServices();
  
  if (!services.length) {
    return (
      <section className={styles.page}>
        <div className="container">
          <h1 className={styles.title}>Услуги</h1>
          <div className={styles.emptyState}>
            <p>Список услуг пока недоступен</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Услуги</h1>
        <p className={styles.subtitle}>
          Профессиональная психологическая помощь с индивидуальным подходом к каждому клиенту
        </p>

        <div className={styles.servicesGrid}>
          {services.map((service) => {
            const serviceParam = service.documentId || String(service.id);
            return (
              <article key={service.id} className={styles.serviceCard}>
                <Link href={`/uslugi/${service.slug}`} className={styles.serviceLink}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={serviceImageUrl(service.image)}
                      alt={service.title}
                      width={400}
                      height={240}
                      className={styles.serviceImage}
                    />
                  </div>
                  <div className={styles.serviceContent}>
                    <h2 className={styles.serviceTitle}>{service.title}</h2>
                    <p className={styles.serviceExcerpt}>{service.excerpt}</p>
                    <div className={styles.readMore}>
                      Подробнее <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}