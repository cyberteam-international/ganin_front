import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './HelpStories.module.css';
import successStyles from '@/components/SuccessStories/SuccessStories.module.css';
import { getHelpStories, getStoryUrl } from '@/services/helpStories';
import { generateMetadata as generateMeta, pageConfigs } from '@/lib/metadata';

export const metadata: Metadata = generateMeta(pageConfigs.helpStories);

export default async function HelpStoriesPage() {
  const stories = await getHelpStories();
  return (
    <section className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Истории спасения</h1>
        {stories.length === 0 ? (
          <div>Историй пока нет</div>
        ) : (
          <div className={styles.grid}>
            {stories.map(s => {
              const param = getStoryUrl(s);
              return (
                <article key={s.id} className={successStyles['story-card']}>
                  <Link href={`/helpstories/${param}`} className={successStyles['story-avatar']}>
                    <i className="fas fa-user-circle"></i>
                  </Link>
                  <Link href={`/helpstories/${param}`}>
                    <h3>{s.Title}</h3>
                  </Link>
                  {s.zavisimost && <span className={successStyles['story-tag']}>{s.zavisimost}</span>}
                  {s.Short_description && <p>"{s.Short_description}"</p>}
                  <Link href={`/helpstories/${param}`} className={successStyles['story-btn']}>
                    <span>Подробнее</span>
                    <i className="fas fa-arrow-right" />
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}