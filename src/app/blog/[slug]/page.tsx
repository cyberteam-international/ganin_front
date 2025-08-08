import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Article.module.css';
import { getArticleBySlug, type ArticleItem } from '@/services/blog';
import { buildStrapiURL } from '@/lib/strapi';

function coverUrl(cover: ArticleItem['cover']) {
  const url = cover?.formats?.large?.url || cover?.formats?.medium?.url || cover?.url;
  return url ? buildStrapiURL(url) : '/images/default-article.svg';
}

type PageProps = { params: { slug: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const a = await getArticleBySlug(params.slug);
  const title = a?.title || 'Статья';
  const description = a?.excerpt || 'Статья блога';
  const ogImage = coverUrl(a?.cover);
  return {
    title,
    description,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      title,
      description,
      url: `/blog/${params.slug}`,
      type: 'article',
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return (
      <section className={styles.page}>
        <div className="container">Статья не найдена</div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className="container">
        <Link href="/blog" className={styles.back}>← Все статьи</Link>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.meta}>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('ru-RU') : ''}</div>
        <div className={styles.cover}>
          <Image src={coverUrl(article.cover)} alt={article.title} fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: article.content || '' }} />
      </div>
    </section>
  );
}
