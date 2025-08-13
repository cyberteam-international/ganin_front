import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Services.module.css';
import { getMainServicesWithSubs, getMainServiceUrl, getSubServiceUrl, serviceImageUrl, type MainService, type SubService } from '@/services/services';
import { generateMetadata as generateMeta, pageConfigs } from '@/lib/metadata';

export const metadata: Metadata = generateMeta(pageConfigs.services);

export default async function ServicesPage() {
  const servicesWithSubs = await getMainServicesWithSubs();
  
  console.log('=== SERVICES PAGE DEBUG ===');
  console.log('Services with sub-services:', servicesWithSubs);
  console.log('Services summary:', servicesWithSubs.map(s => ({ 
    id: s.id, 
    title: s.title, 
    subServicesCount: s.sub_services.length,
    subServices: s.sub_services.map(sub => ({ id: sub.id, title: sub.title }))
  })));

  if (!servicesWithSubs.length) {
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
          {servicesWithSubs.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <i className={service.icon}></i>
              </div>
              <div className={styles.serviceContent}>
                <h3>
                  <Link href={`/uslugi/${getMainServiceUrl(service)}`} className={styles.serviceTitle}>
                    {service.title}
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </h3>
                <ul>
                  {service.sub_services.map((subService) => (
                    <li key={subService.id}>
                      <Link href={`/uslugi/${getSubServiceUrl(subService)}`}>
                        {subService.image && (
                          <div className={styles.subServiceImage}>
                            <Image
                              src={serviceImageUrl(subService.image)}
                              alt={subService.title}
                              width={40}
                              height={40}
                            />
                          </div>
                        )}
                        <span>{subService.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}