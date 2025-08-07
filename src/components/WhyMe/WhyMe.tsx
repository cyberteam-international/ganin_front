import Image from 'next/image';
import styles from './WhyMe.module.css';

export default function WhyMe() {
    return (
        <section id="why-me" className={`${styles['why-me']} ${styles['dark-section']}`}>
            <div className="container">
                <h2 className={styles['section-title']}>Почему именно я?</h2>
                <div className={styles['why-me-circle-layout']}>
                    {/* Пункты по кругу */}
                    <div className={`${styles['circle-point']} ${styles['point-1']}`}>
                        <div className={styles['point-content']}>
                            <h3>Психоаналитический подход</h3>
                            <p>Работаю в рамках психоаналитического и философского подходов, где внимание сосредоточено не на симптомах, а на глубинных причинах и смыслах происходящего.</p>
                        </div>
                    </div>
                    
                    <div className={`${styles['circle-point']} ${styles['point-2']} ${styles['photo-card']}`}>
                        <div className={styles['point-content']}>
                            <div className={styles['photo-container']}>
                                <Image 
                                    src="/images/whyme.png" 
                                    alt="Ганин Вячеслав - Клинический психолог" 
                                    className={styles['circular-photo']}
                                    width={280}
                                    height={280}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className={`${styles['circle-point']} ${styles['point-3']}`}>
                        <div className={styles['point-content']}>
                            <h3>Внутренние изменения</h3>
                            <p>Не «лечу» в медицинском смысле, не назначаю препаратов и не играю в упрощенные схемы. Моя работа — не про контроль, а про осознание, контакт и внутренние изменения.</p>
                        </div>
                    </div>
                    
                    <div className={`${styles['circle-point']} ${styles['point-4']}`}>
                        <div className={styles['point-content']}>
                            <h3>Постоянное развитие</h3>
                            <p>Постоянно обучаюсь, анализирую, исследую как в рамках классического образования, так и в самостоятельной практике.</p>
                        </div>
                    </div>
                    
                    <div className={`${styles['circle-point']} ${styles['point-5']}`}>
                        <div className={styles['point-content']}>
                            <h3>Глубинная работа</h3>
                            <p><strong>Я работаю с теми, кто уже прошел через внешние попытки «починить себя» и готов всерьез задать вопрос: а что на самом деле со мной происходит?</strong></p>
                        </div>
                    </div>
                    
                    <div className={`${styles['circle-point']} ${styles['point-6']}`}>
                        <div className={styles['point-content']}>
                            <h3>Первая встреча</h3>
                            <p>Жду вас на первой встрече, где мы вместе разберемся в причинах вашего текущего состояния и найдем оптимальную стратегию восстановления контроля над собственной жизнью.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
