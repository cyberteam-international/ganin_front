'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';

import styles from './Articles.module.css';

interface ArticleData {
    id: number;
    title: string;
    description: string;
    image: string;
    slug: string;
}

export default function Articles() {
    // Статические данные для статей
    const articlesData: ArticleData[] = [
        {
            id: 1,
            title: "Без скандалов и давления: как вести себя с человеком, страдающим от зависимости",
            description: "Как распознать токсичные паттерны поведения и выйти из них...",
            image: "/images/articles/1.jpeg",
            slug: "kak-vesti-sebya-s-chelovekom-stradayushchim-ot-zavisimosti"
        },
        {
            id: 2,
            title: "Алкоголь и депрессия: как разорвать порочный круг",
            description: "Взаимосвязь между употреблением алкоголя и депрессивными состояниями...",
            image: "/images/articles/2.jpeg",
            slug: "alkogol-i-depressiya-kak-razorvat-porochnyj-krug"
        },
        {
            id: 3,
            title: "Квалификация персонала: как найти «того самого» специалиста?",
            description: "Как выстроить здоровые отношения в семье и избежать травматизации...",
            image: "/images/articles/3.jpeg",
            slug: "kak-najti-togo-samogo-specialista"
        },
        {
            id: 4,
            title: "Работа с детскими травмами: путь к исцелению",
            description: "Как проработать детские травмы и восстановить эмоциональное здоровье...",
            image: "/images/articles/1.jpeg",
            slug: "rabota-s-detskimi-travmami-put-k-isceleniyu"
        },
        {
            id: 5,
            title: "Преодоление созависимости: первые шаги",
            description: "Как распознать созависимые отношения и начать путь к освобождению...",
            image: "/images/articles/2.jpeg",
            slug: "preodolenie-sozavisimosti-pervye-shagi"
        },
        {
            id: 6,
            title: "Поиск смысла жизни после кризиса",
            description: "Как найти новые цели и восстановить мотивацию к жизни...",
            image: "/images/articles/3.jpeg",
            slug: "poisk-smysla-zhizni-posle-krizisa"
        }
    ];

    return (
        <section id="articles" className={`${styles.articles} ${styles['dark-section']}`}>
            <div className="container">
                <h2 className={styles['section-title']}>Статьи</h2>
                <Swiper
                    className={styles['articles-swiper']}
                    slidesPerView="auto"
                    spaceBetween={30}
                    centeredSlides={false}
                    loop={articlesData.length > 3}
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
                            allowTouchMove: true,
                            loop: false,
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                            centeredSlides: false,
                            allowTouchMove: true,
                            loop: false,
                        }
                    }}
                >
                    {articlesData.map((article) => (
                        <SwiperSlide key={article.id} className={styles['swiper-slide']}>
                            <Link href={`/blog/${article.slug}`} className={styles['article-card']}>
                                <div className={styles['article-image']}>
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        width={350}
                                        height={200}
                                        className={styles['article-img']}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = '/images/default-article.svg';
                                        }}
                                    />
                                </div>
                                <h3>{article.title}</h3>
                                <p>{article.description}</p>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
