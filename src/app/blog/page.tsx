import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Blog.module.css';
import { getArticles, type ArticleItem } from '@/services/blog';
import { buildStrapiURL } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Блог',
  description: 'Статьи и материалы по психологии, зависимостям и восстановлению.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Блог',
    description: 'Статьи и материалы по психологии, зависимостям и восстановлению.',
    url: '/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Блог',
    description: 'Статьи и материалы по психологии, зависимостям и восстановлению.',
  },
};

function coverUrl(cover: ArticleItem['cover']) {
  const url = cover?.formats?.medium?.url || cover?.formats?.small?.url || cover?.url;
  return url ? buildStrapiURL(url) : '/images/default-article.svg';
}

export default async function BlogPage() {
  const list = await getArticles();

  return (
    <section className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Блог</h1>
        {list.length === 0 ? (
          <div>Статей пока нет</div>
        ) : (
          <div className={styles.grid}>
            {list.map((a) => {
              const param = a.documentId || String(a.id);
              return (
                <article key={a.id} className={styles.card}>
                  <Link href={`/blog/${param}`}>
                    <div className={styles.cover}>
                      <Image src={coverUrl(a.cover)} alt={a.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                    </div>
                  </Link>
                  <div className={styles.body}>
                    <h3 className={styles.cardTitle}>{a.title}</h3>
                    {a.excerpt && <p className={styles.excerpt}>{a.excerpt}</p>}
                    <div className={styles.meta}>{a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('ru-RU') : ''}</div>
                    <Link href={`/blog/${param}`} className={styles.readMore}>Читать</Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}