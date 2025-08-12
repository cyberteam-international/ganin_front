import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Service.module.css';
import { getServiceBySlug, getServices, type ServiceItem, serviceImageUrl } from '@/services/services';
import WhyMe from '@/components/WhyMe';
import Education from '@/components/Education';
import SuccessStories from '@/components/SuccessStories';

type PageProps = { params: Promise<{ id_uslugi: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id_uslugi } = await params;
  const service = await getServiceBySlug(id_uslugi);
  const title = service?.title || 'Услуга';
  const description = service?.excerpt || 'Профессиональная психологическая помощь';
  const ogImage = serviceImageUrl(service?.image);
  
  return {
    title,
    description,
    alternates: { canonical: `/uslugi/${id_uslugi}` },
    openGraph: { 
      title, 
      description, 
      url: `/uslugi/${id_uslugi}`, 
      type: 'article', 
      images: ogImage ? [{ url: ogImage }] : undefined 
    },
    twitter: { 
      card: 'summary_large_image', 
      title, 
      description, 
      images: ogImage ? [ogImage] : undefined 
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { id_uslugi } = await params;
  const service = await getServiceBySlug(id_uslugi);
  
  if (!service) {
    return (
      <section className={styles.page}>
        <div className="container">
          <div className={styles.notFound}>Услуга не найдена</div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Первый экран - Герой */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <Link href="/uslugi" className={styles.backLink}>
                ← Все услуги
              </Link>
              <h1 className={styles.heroTitle}>{service.title}</h1>
              <p className={styles.heroDescription}>{service.excerpt}</p>
              <button className={styles.consultationBtn}>
                Бесплатная консультация
              </button>
            </div>
            <div className={styles.heroImage}>
              <Image
                src={serviceImageUrl(service.image)}
                alt={service.title}
                width={500}
                height={400}
                className={styles.serviceImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Секция с контентом */}
      <section className={styles.content}>
        <div className="container">
          <div 
            className={styles.contentBody}
            dangerouslySetInnerHTML={{ __html: service.content }}
          />
        </div>
      </section>

      {/* Блок "Этапы лечения" */}
      <section className={styles.treatmentStages}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Этапы лечения</h2>
          <div className={styles.stagesGrid}>
            <div className={styles.stage}>
              <div className={styles.stageIcon}>
                <i className="fas fa-search"></i>
              </div>
              <h3 className={styles.stageTitle}>Диагностика</h3>
              <p className={styles.stageDescription}>
                Комплексная оценка состояния и выявление основных проблем
              </p>
            </div>
            <div className={styles.stage}>
              <div className={styles.stageIcon}>
                <i className="fas fa-clipboard-list"></i>
              </div>
              <h3 className={styles.stageTitle}>Подбор программ</h3>
              <p className={styles.stageDescription}>
                Индивидуальный подбор реабилитационных и профилактических программ
              </p>
            </div>
            <div className={styles.stage}>
              <div className={styles.stageIcon}>
                <i className="fas fa-check-circle"></i>
              </div>
              <h3 className={styles.stageTitle}>Закрепление результата</h3>
              <p className={styles.stageDescription}>
                Регулярный контроль и поддержка для устойчивого результата
              </p>
            </div>
            <div className={styles.stage}>
              <div className={styles.stageIcon}>
                <i className="fas fa-credit-card"></i>
              </div>
              <h3 className={styles.stageTitle}>Оплата</h3>
              <p className={styles.stageDescription}>
                Прозрачная система оплаты и гибкие варианты расчета
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Переиспользуемые компоненты */}
      <WhyMe />
      <Education />
      <SuccessStories />
    </>
  );
}