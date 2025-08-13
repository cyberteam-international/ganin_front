'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';
// Import Swiper styles
import 'swiper/css';
import styles from './Articles.module.css';
import { getArticles, getArticleUrl, type ArticleItem } from '@/services/blog';
import { useEffect, useState } from 'react';
import { buildStrapiURL } from '@/lib/strapi';

function coverUrl(cover: ArticleItem['cover']) {
  const url = cover?.formats?.medium?.url || cover?.formats?.small?.url || cover?.url;
  return url ? buildStrapiURL(url) : '/images/default-article.svg';
}

export default function Articles() {
  const [articlesData, setArticlesData] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getArticles();
        setArticlesData(data);
      } catch (e: any) {
        setError(e.message || 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section id="articles" className={`${styles.articles} ${styles['dark-section']}`}>
      <div className="container">
        <h2 className={styles['section-title']}>Статьи</h2>
        {loading && <div className={styles.loading}><div className={styles['loading-text']}>Загрузка...</div></div>}
        {!loading && error && <div className={styles.loading}><div className={styles['loading-text']}>{error}</div></div>}
        {!loading && !error && articlesData.length === 0 && (
          <div className={styles.loading}><div className={styles['loading-text']}>Статей нет</div></div>
        )}
        {!loading && !error && articlesData.length > 0 && (
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
              320: { slidesPerView: 1.2, spaceBetween: 15, centeredSlides: false },
              768: { slidesPerView: 2.2, spaceBetween: 25, centeredSlides: false },
              1024: { slidesPerView: 3, spaceBetween: 30, centeredSlides: false, allowTouchMove: true, loop: false },
              1200: { slidesPerView: 3, spaceBetween: 30, centeredSlides: false, allowTouchMove: true, loop: false },
            }}
          >
            {articlesData.map((article) => {
              const param = getArticleUrl(article);
              return (
                <SwiperSlide key={article.id} className={styles['swiper-slide']}>
                  <Link href={`/blog/${param}`} className={styles['article-card']}>
                    <div className={styles['article-image']}>
                      <Image
                        src={coverUrl(article.cover)}
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
                    {article.excerpt && <p>{article.excerpt}</p>}
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
}
