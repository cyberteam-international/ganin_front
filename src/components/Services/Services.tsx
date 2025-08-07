import styles from './Services.module.css';

export default function Services() {
    return (
        <section id="services" className={styles.services}>
            <div className="container">
                <h2 className={styles['section-title']}>Услуги</h2>
                <div className={styles['services-grid']}>
                    <div className={styles['service-card']}>
                        <div className={styles['service-icon']}>
                            <i className="fas fa-comments"></i>
                        </div>
                        <div className={styles['service-content']}>
                            <h3>
                                Консультирование 
                                <i className="fas fa-arrow-right"></i>
                            </h3>
                            <ul>
                                <li><a href="#service-1">Решение жизненных и личных проблем</a></li>
                                <li><a href="#service-2">Сложные отношения</a></li>
                                <li><a href="#service-3">Проблемы в семье и социализация</a></li>
                                <li><a href="#service-4">Потеря смысла жизни, одиночество</a></li>
                                <li><a href="#service-5">Поддержка в кризисной ситуации</a></li>
                                <li><a href="#service-6">Консультации для родителей</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className={styles['service-card']}>
                        <div className={styles['service-icon']}>
                            <i className="fas fa-heart"></i>
                        </div>
                        <div className={styles['service-content']}>
                            <h3>
                                Психотерапия 
                                <i className="fas fa-arrow-right"></i>
                            </h3>
                            <ul>
                                <li><a href="#service-7">Работа с самооценкой</a></li>
                                <li><a href="#service-8">Психосоматика</a></li>
                                <li><a href="#service-9">Детские и юношеские травмы</a></li>
                                <li><a href="#service-10">Выявление внутренних конфликтов</a></li>
                                <li><a href="#service-11">Преодоление негативных установок</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className={styles['service-card']}>
                        <div className={styles['service-icon']}>
                            <i className="fas fa-hands-helping"></i>
                        </div>
                        <div className={styles['service-content']}>
                            <h3>
                                Зависимость / Cозависимость 
                                <i className="fas fa-arrow-right"></i>
                            </h3>
                            <ul>
                                <li><a href="#service-12">Восстановление после лечения</a></li>
                                <li><a href="#service-13">Поддержка после выхода из зависимости</a></li>
                                <li><a href="#service-14">Работа с родственниками зависимых</a></li>
                                <li><a href="#service-15">Восстановление отношений</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
