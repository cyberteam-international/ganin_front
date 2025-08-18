import type { Metadata } from 'next';
import styles from './FAQ.module.css';
import { getFAQs } from '@/services/faq';
import FAQAccordion from './FAQAccordion';
import { generateMetadata as generateMeta, pageConfigs } from '@/lib/metadata';

export const metadata: Metadata = generateMeta(pageConfigs.faq);

export default async function FAQPage() {
  const faqs = await getFAQs();

  if (!faqs.length) {
    return (
      <section className={styles.page}>
        <div className="container">
          <h1 className={styles.title}>FAQ</h1>
          <div className={styles.empty}>
            <p>Часто задаваемые вопросы пока отсутствуют.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>FAQ</h1>
        <FAQAccordion items={faqs} />
      </div>
    </section>
  );
}
