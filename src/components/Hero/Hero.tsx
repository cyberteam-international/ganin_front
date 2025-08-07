import Button from '@/components/ui/Button/Button';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section id="hero" className={styles.hero}>
            <div className="container">
                <div className={styles['hero-content']}>
                    <div className={styles['hero-image']}>
                        <Image 
                            src="/images/general.png" 
                            alt="Ганин Вячеслав - Клинический психолог" 
                            className={styles['hero-photo']}
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                    <div className={styles['hero-text']}>
                        <p className={styles.subtitle}>Клинический психолог</p>
                        <h1 className={styles['main-title']}>Ганин Вячеслав</h1>
                        <div className={styles.description}>
                            <p>Магистр психологии, психоаналитик, педагог-психолог.</p>
                            <p>Помощь при зависимости, созависимости, тревожности, чувстве вины и других психологических проблемах. Помогаю восстановить устойчивость и наладить отношения с собой и окружающими.</p>
                        </div>
                        
                        <div className={styles['hero-cta']}>
                            <Button variant="hero">
                                Записаться
                            </Button>
                        </div>
                    </div>
                </div>
                
                <div className={styles.stats}>
                    <div className={styles['stat-item']}>
                        <div className={styles['stat-number']}>16 лет</div>
                        <div className={styles['stat-label']}>профессиональной практики</div>
                    </div>
                    <div className={styles['stat-item']}>
                        <div className={styles['stat-number']}>12+ лет</div>
                        <div className={styles['stat-label']}>образования и повышения квалификации</div>
                    </div>
                    <div className={styles['stat-item']}>
                        <div className={styles['stat-number']}>9000+</div>
                        <div className={styles['stat-label']}>часов консультаций и терапии</div>
                    </div>
                    <div className={styles['stat-item']}>
                        <div className={styles['stat-number']}>600+</div>
                        <div className={styles['stat-label']}>довольных клиентов</div>
                    </div>
                    <div className={styles['stat-item']}>
                        <div className={styles['stat-number']}>95%</div>
                        <div className={styles['stat-label']}>клиентов рекомендуют</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
