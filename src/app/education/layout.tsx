import type { Metadata } from 'next';
import { generateMetadata as generateMeta, pageConfigs } from '@/lib/metadata';

export const metadata: Metadata = generateMeta(pageConfigs.education);

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
