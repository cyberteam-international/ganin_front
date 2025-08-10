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
} as any;

function coverUrl(cover: ArticleItem['cover']) {
  const url = cover?.formats?.medium?.url || cover?.formats?.small?.url || cover?.url;
  return url ? buildStrapiURL(url) : '/images/default-article.svg';
}

export default async function BlogPage() {
  const list = await getArticles();
  if (!list.length) {
    return (
      <section className={styles.page}>
        <div className="container">
          <h1 className={styles.title}>Блог</h1>
          <div>Статей пока нет</div>
        </div>
      </section>
    );
  }
  const [first, ...rest] = list;
  const firstParam = first.documentId || String(first.id);

  return (
    <section className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Блог</h1>

        {/* Featured card (full-width on desktop, normal on mobile) */}
        <article className={`${styles.card} ${styles.featured}`}>
          <Link href={`/blog/${firstParam}`}>
            <div className={styles.cover}>
              <Image src={coverUrl(first.cover)} alt={first.title} fill sizes="(max-width: 1024px) 100vw, 66vw" style={{ objectFit: 'cover' }} />
            </div>
          </Link>
          <div className={styles.body}>
            <h3 className={styles.cardTitle}>{first.title}</h3>
            {first.excerpt && <p className={styles.excerpt}>{first.excerpt}</p>}
            <div className={styles.meta}>{first.publishedAt ? new Date(first.publishedAt).toLocaleDateString('ru-RU') : ''}</div>
            <Link href={`/blog/${firstParam}`} className={styles.readMore}>Читать</Link>
          </div>
        </article>

        {/* Other articles grid */}
        {rest.length > 0 && (
          <div className={styles.grid}>
            {rest.map((a) => {
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