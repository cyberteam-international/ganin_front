import type { Metadata } from 'next';
import { generateMetadata as generateMeta, pageConfigs } from '@/lib/metadata';

export const metadata: Metadata = generateMeta(pageConfigs.contacts);

export default function ContactsPage() {
  return (
    <div>
      <h1>Контакты</h1>
      <p>Свяжитесь с клиническим психологом Ганиным Вячеславом для записи на консультацию.</p>
    </div>
  );
}