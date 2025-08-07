'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import styles from './SuccessStories.module.css';

interface StoryData {
    id: number;
    name: string;
    story: string;
    slug: string;
}

export default function SuccessStories() {
    // Статические данные для историй
    const storiesData: StoryData[] = [
        {
            id: 1,
            name: "Взуценко Николай",
            story: "Благодаря работе с Вячеславом Вячеславовичем я смог преодолеть зависимость и наладить отношения с семьёй. Сейчас моя жизнь кардинально изменилась...",
            slug: "vzucenko-nikolay"
        },
        {
            id: 2,
            name: "Нестеров Глеб",
            story: "После потери работы впал в глубокую депрессию. Терапия помогла мне не только справиться с состоянием, но и найти новый смысл жизни...",
            slug: "nesterov-gleb"
        },
        {
            id: 3,
            name: "Пруцкиенко Мария",
            story: "Работа с детскими травмами дала мне возможность наконец-то полюбить себя и выстроить здоровые отношения с партнёром...",
            slug: "pruckienko-mariya"
        },
        {
            id: 4,
            name: "Константинов Андрей",
            story: "Проблемы с алкоголем разрушали мою карьеру и семью. После курса терапии я не только избавился от зависимости, но и смог восстановить доверие близких...",
            slug: "konstantinov-andrey"
        },
        {
            id: 5,
            name: "Соколова Елена",
            story: "Панические атаки мешали мне нормально жить и работать. Благодаря профессиональной помощи я научилась справляться со стрессом и вернула контроль над своей жизнью...",
            slug: "sokolova-elena"
        }
    ];

    const handleReadMore = (story: StoryData) => {
        // Здесь можно добавить логику для открытия модального окна или перехода на страницу истории
        console.log(`Читать подробнее: ${story.name}`);
    };

    return (
        <section id="stories" className={styles['success-stories']}>
            <div className="container">
                <h2 className={styles['section-title']}>Истории спасения</h2>
                <Swiper
                    className={styles['stories-swiper']}
                    slidesPerView="auto"
                    spaceBetween={30}
                    centeredSlides={false}
                    loop={storiesData.length > 3}
                    speed={600}
                    allowTouchMove={true}
                    watchOverflow={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 1.2,
                            spaceBetween: 15,
                            centeredSlides: false,
                        },
                        768: {
                            slidesPerView: 2.2,
                            spaceBetween: 25,
                            centeredSlides: false,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                            centeredSlides: false,
                            allowTouchMove: false,
                            loop: false,
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                            centeredSlides: false,
                            allowTouchMove: false,
                            loop: false,
                        }
                    }}
                >
                    {storiesData.map((story) => (
                        <SwiperSlide key={story.id} className={styles['swiper-slide']}>
                            <div className={styles['story-card']}>
                                <div className={styles['story-avatar']}>
                                    <i className="fas fa-user-circle"></i>
                                </div>
                                <h3>{story.name}</h3>
                                <p>"{story.story}"</p>
                                <button 
                                    className={styles['story-btn']}
                                    onClick={() => handleReadMore(story)}
                                >
                                    <span>Подробнее</span>
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
