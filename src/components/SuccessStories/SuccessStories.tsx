'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Import Swiper styles
import 'swiper/css';

import styles from './SuccessStories.module.css';
import { getHelpStories, getStoryUrl, type HelpStory } from '@/services/helpStories';

export default function SuccessStories() {
    const [stories, setStories] = useState<HelpStory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStories = async () => {
            try {
                const data = await getHelpStories();
                setStories(data);
            } catch (error) {
                console.error('Ошибка загрузки историй:', error);
            } finally {
                setLoading(false);
            }
        };

        loadStories();
    }, []);

    if (loading) {
        return (
            <section id="stories" className={styles['success-stories']}>
                <div className="container">
                    <h2 className={styles['section-title']}>Истории спасения</h2>
                    <div>Загрузка...</div>
                </div>
            </section>
        );
    }

    if (stories.length === 0) {
        return (
            <section id="stories" className={styles['success-stories']}>
                <div className="container">
                    <h2 className={styles['section-title']}>Истории спасения</h2>
                    <div>Историй пока нет</div>
                </div>
            </section>
        );
    }

    return (
        <section id="stories" className={styles['success-stories']}>
            <div className="container">
                <h2 className={styles['section-title']}>Истории спасения</h2>
                <Swiper
                    className={styles['stories-swiper']}
                    slidesPerView="auto"
                    spaceBetween={30}
                    centeredSlides={false}
                    loop={stories.length > 3}
                    speed={600}
                    allowTouchMove={true}
                    watchOverflow={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 1.2,
                            spaceBetween: 15,
                            centeredSlides: true,
                        },
                        768: {
                            slidesPerView: 2.2,
                            spaceBetween: 25,
                            centeredSlides: true,
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
                    {stories.map((story) => {
                        const storyUrl = getStoryUrl(story);
                        return (
                            <SwiperSlide key={story.id} className={styles['swiper-slide']}>
                                <div className={styles['story-card']}>
                                    <Link href={`/helpstories/${storyUrl}`} className={styles['story-avatar']}>
                                        <i className="fas fa-user-circle"></i>
                                    </Link>
                                    <Link href={`/helpstories/${storyUrl}`}>
                                        <h3>{story.Title}</h3>
                                    </Link>
                                    {story.zavisimost && <span className={styles['story-tag']}>{story.zavisimost}</span>}
                                    <p>"{story.Short_description}"</p>
                                    <Link 
                                        href={`/helpstories/${storyUrl}`}
                                        className={styles['story-btn']}
                                    >
                                        <span>Подробнее</span>
                                        <i className="fas fa-arrow-right"></i>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
}
