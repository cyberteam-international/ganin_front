import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../HelpStories.module.css';
import { getHelpStory, getHelpStories, getStoryUrl, storyToHtml } from '@/services/helpStories';
import { generateStoryMetadata } from '@/lib/metadata';

interface PageProps { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const story = await getHelpStory(id);
  
  if (!story) {
    return {
      title: 'История не найдена',
      description: 'Запрашиваемая история не найдена'
    };
  }
  
  return generateStoryMetadata(story);
}

export default async function HelpStoryPage({ params }: PageProps) {
  const { id } = await params;
  const story = await getHelpStory(id);
  if (!story) {
    return <section className={styles.page}><div className="container">История не найдена</div></section>;
  }
  const others = (await getHelpStories()).filter(s => getStoryUrl(s) !== getStoryUrl(story)).slice(0,6);
  return (
    <section className={styles.page}>
      <div className="container">
        <Link href="/helpstories" className={styles.back}>← Все истории</Link>
        <h1 className={styles.title}>{story.Title}</h1>
        {story.zavisimost && <div className={styles.tag}>{story.zavisimost}</div>}
        <div className={styles.singleWrapper}>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: storyToHtml(story) }} />
          <aside className={styles.sidebar}>
            <div className={styles.sidebarTitle}>Другие истории</div>
            <div className={styles.otherList}>
              {others.map(o => {
                const param = getStoryUrl(o);
                return (
                  <Link key={o.id} href={`/helpstories/${param}`} className={styles.otherItem}>
                    <div className={styles.otherMeta}>
                      <div className={styles.otherAvatar}><i className="fas fa-user-circle" /></div>
                      <div className={styles.otherText}>
                        <h4>{o.Title}</h4>
                        {o.zavisimost && <span className={styles.tag}>{o.zavisimost}</span>}
                      </div>
                    </div> 
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
