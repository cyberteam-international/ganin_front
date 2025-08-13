import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Services.module.css';
import { getMainServices, getSubServices, getMainServiceUrl, getSubServiceUrl, serviceImageUrl, type MainService, type SubService } from '@/services/services';
import { generateMetadata as generateMeta, pageConfigs } from '@/lib/metadata';

export const metadata: Metadata = generateMeta(pageConfigs.services);

export default async function ServicesPage() {
  const [mainServices, subServices] = await Promise.all([
    getMainServices(),
    getSubServices()
  ]);
  
  // Группируем подуслуги по основным услугам (можно добавить связь через service_id в будущем)
  // Пока используем простое распределение по порядку
  const servicesWithSubs = mainServices.map((service, index) => {
    const startIndex = index * Math.ceil(subServices.length / mainServices.length);
    const endIndex = startIndex + Math.ceil(subServices.length / mainServices.length);
    return {
      ...service,
      sub_services: subServices.slice(startIndex, endIndex)
    };
  });

  if (!mainServices.length) {
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