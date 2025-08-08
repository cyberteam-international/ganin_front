'use client';

import Image from 'next/image';
import styles from './EducationCard.module.css';
import { buildStrapiURL } from '@/lib/strapi';

export interface EducationCardProps {
  title: string;
  description: string;
  picture?: {
    formats?: {
      thumbnail?: { url: string };
      large?: { url: string };
    };
    url?: string;
  };
  onClick?: () => void;
}

const getImageUrl = (picture: EducationCardProps['picture'], type: 'thumbnail' | 'large' = 'thumbnail'): string => {
  const fallback = '/images/default-certificate.svg';
  if (!picture) return fallback;
  const fmt = picture.formats?.[type]?.url;
  if (fmt) return buildStrapiURL(fmt);
  if (picture.url) return buildStrapiURL(picture.url);
  return fallback;
};

export default function EducationCard({ title, description, picture, onClick }: EducationCardProps) {
  return (
    <div className={styles.card} onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(); }}>
      <div className={styles.imageWrap}>
        <Image
          src={getImageUrl(picture)}
          alt={`Сертификат - ${title}`}
          width={300}
          height={180}
          className={styles.image}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/default-certificate.svg';
          }}
        />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>
      <button className={styles.btn} type="button">Смотреть</button>
    </div>
  );
}
