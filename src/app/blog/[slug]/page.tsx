import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Article.module.css';
import { getArticleBySlug, getArticles, type ArticleItem } from '@/services/blog';
import { buildStrapiURL } from '@/lib/strapi';

function coverUrl(cover: ArticleItem['cover']) {
  const url = cover?.formats?.large?.url || cover?.formats?.medium?.url || cover?.url;
  return url ? buildStrapiURL(url) : '/images/default-article.svg';
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  const title = a?.title || 'Статья';
  const description = a?.excerpt || 'Статья блога';
  const ogImage = coverUrl(a?.cover);
  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title, description, url: `/blog/${slug}`, type: 'article', images: ogImage ? [{ url: ogImage }] : undefined },
    twitter: { card: 'summary_large_image', title, description, images: ogImage ? [ogImage] : undefined },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    return (
      <section className={styles.page}>
        <div className="container">Статья не найдена</div>
      </section>
    );
  }

  const others = (await getArticles()).filter((a) => (a.documentId || String(a.id)) !== (article.documentId || String(article.id))).slice(0, 6);

  return (
    <section className={styles.page}>
      <div className="container">
        <Link href="/blog" className={styles.back}>← Все статьи</Link>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.meta}>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('ru-RU') : ''}</div>

        <div className={styles.wrapper}>
          <div>
            <div className={styles.cover}>
              <Image src={coverUrl(article.cover)} alt={article.title} fill sizes="(max-width: 1024px) 100vw, 66vw" style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: article.content || '' }} />
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarTitle}>Другие статьи</div>
            <div className={styles.otherList}>
              {others.map((a) => {
                const param = a.documentId || String(a.id);
                return (
                  <Link key={a.id} href={`/blog/${param}`} className={styles.otherItem}>
                    <div className={styles.otherThumb}>
                      <Image src={coverUrl(a.cover)} alt={a.title} fill sizes="96px" style={{ objectFit: 'cover' }} />
                    </div>
                    <div className={styles.otherTitle}>{a.title}</div>
                  </Link>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
