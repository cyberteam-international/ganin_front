import styles from './AdditionalInfo.module.css';

export default function AdditionalInfo() {
    return (
        <section className={styles['additional-info']}>
            <div className="container">
                <blockquote className={styles['philosophy-quote']}>
                    <p>
                        Моя цель — поддержать тех, кто уже вышел из острого состояния, но хочет не просто выживать, а жить полноценно. 
                        Не занимаюсь острыми психозами, абстинентными синдромами и состояниями, требующими медикаментозного вмешательства или неотложной помощи. 
                        В терапии применяю психокоррекционные методы, которые помогают выявить и изменить глубинные внутренние конфликты, 
                        вернуть контроль над эмоциями и восстановить гармонию с собой.
                    </p>
                </blockquote>
            </div>
        </section>
    );
}
