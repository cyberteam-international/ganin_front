import Link from 'next/link';
import Image from 'next/image';
import styles from './Services.module.css';
import { getMainServicesWithSubs, getMainServiceUrl, getSubServiceUrl, serviceImageUrl } from '@/services/services';

export default async function Services() {
    const servicesWithSubs = await getMainServicesWithSubs();
    
    // Если нет данных, показываем fallback или ничего
    if (!servicesWithSubs.length) {
        return (
            <section id="services" className={styles.services}>
                <div className="container">
                    <h2 className={styles['section-title']}>Услуги</h2>
                    <div className={styles['services-grid']}>
                        <p>Загрузка услуг...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="services" className={styles.services}>
            <div className="container">
                <h2 className={styles['section-title']}>Услуги</h2>
                <div className={styles['services-grid']}>
                    {servicesWithSubs.map((service) => (
                        <div key={service.id} className={styles['service-card']}>
                            <div className={styles['service-icon']}>
                                <i className={service.icon}></i>
                            </div>
                            <div className={styles['service-content']}>
                                <h3>
                                    <Link href={`/uslugi/${getMainServiceUrl(service)}`}>
                                        {service.title}
                                        <i className="fas fa-arrow-right"></i>
                                    </Link>
                                </h3>
                                <ul>
                                    {service.sub_services.map((subService) => (
                                        <li key={subService.id}>
                                            <Link href={`/uslugi/${getSubServiceUrl(subService)}`}>
                                                {subService.image && (
                                                    <div className={styles['sub-service-image']}>
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
                
                <div className={styles['services-link']}>
                    <Link href="/uslugi" className={styles['all-services-btn']}>
                        Все услуги
                        <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
}
