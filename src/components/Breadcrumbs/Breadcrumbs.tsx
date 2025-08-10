'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Breadcrumbs.module.css';
import { useEffect, useState } from 'react';

function toTitle(segment: string) {
  const map: Record<string,string> = {
    blog: 'Блог',
    helpstories: 'Истории спасения',
    education: 'Образование'
  };
  return map[segment] || decodeURIComponent(segment).replace(/[-_]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    let attempts = 0; let rafId: number | null = null;
    const header = () => document.querySelector<HTMLElement>('header');
    const apply = () => {
      const hEl = header(); if (!hEl) return;
      const h = hEl.getBoundingClientRect().height;
      if (h > 0) {
        const gap = (window.innerWidth || 0) > 768 ? 8 : 0; // no extra gap on mobile
        setOffset(h + gap);
      } else if (attempts < 40) { attempts++; setTimeout(apply, 100); }
    };
    apply();
    let ro: ResizeObserver | null = null;
    const initRO = () => { const hEl = header(); if (!hEl) return; ro = new ResizeObserver(() => { if (rafId) cancelAnimationFrame(rafId); rafId = requestAnimationFrame(apply); }); ro.observe(hEl); };
    initRO();
    const mo = new MutationObserver(apply); if (document.body) mo.observe(document.body, { attributes: true, attributeFilter: ['class','style'] });
    window.addEventListener('resize', apply);
    return () => { window.removeEventListener('resize', apply); if (ro) ro.disconnect(); mo.disconnect(); if (rafId) cancelAnimationFrame(rafId); };
  }, [pathname]);

  if (!pathname || pathname === '/' || pathname.startsWith('/not-found')) return null;
  const parts = pathname.split('/').filter(Boolean);
  const items = parts.map((part, idx) => {
    const href = '/' + parts.slice(0, idx+1).join('/');
    const isLast = idx === parts.length - 1;
    return { href, label: toTitle(part), isLast };
  });
  return (
    <nav aria-label="breadcrumb" className={`${styles.breadcrumbsWrapper} breadcrumbs-bar`} style={{ marginTop: offset }}>
      <div className={styles.inner}>
        <span className={styles.crumb}><Link href="/">Главная</Link></span>
        {items.map(i => (
          <span key={i.href} className={styles.crumb}>
            <span className={styles.separator}>/</span>{' '}
            {i.isLast ? <span className={styles.current}>{i.label}</span> : <Link href={i.href}>{i.label}</Link>}
          </span>
        ))}
      </div>
    </nav>
  );
}
