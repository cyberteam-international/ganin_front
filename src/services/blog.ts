import { fetchStrapi } from '@/lib/strapi';

export interface ArticleCover {
  url?: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface ArticleItem {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  cover?: ArticleCover;
  publishedAt?: string;
  documentId?: string;
}

interface StrapiCollectionResponse<T> {
  data: Array<any>;
  meta?: any;
}

interface StrapiSingleResponse<T> {
  data: any;
  meta?: any;
}

// Minimal renderer for Strapi blocks (heading, paragraph, list)
function blocksToHtml(blocks: any[]): string {
  if (!Array.isArray(blocks)) return '';
  const esc = (s: string) => s.replace(/[&<>"]+/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
  const renderText = (node: any) => {
    const txt = esc(String(node.text ?? ''));
    const bold = node.bold ? `<strong>${txt}</strong>` : txt;
    return node.italic ? `<em>${bold}</em>` : bold;
  };
  const renderChildren = (children: any[]): string => children?.map((ch: any) => (ch.type === 'text' || 'text' in ch ? renderText(ch) : '')).join('') ?? '';
  const renderNode = (node: any): string => {
    switch (node.type) {
      case 'heading': {
        const lvl = Math.min(Math.max(Number(node.level ?? 2), 1), 6);
        return `<h${lvl}>${renderChildren(node.children)}</h${lvl}>`;
      }
      case 'paragraph':
        return `<p>${renderChildren(node.children)}</p>`;
      case 'list': {
        const tag = node.format === 'ordered' ? 'ol' : 'ul';
        const items = (node.children || []).map((li: any) => `<li>${renderChildren(li.children)}</li>`).join('');
        return `<${tag}>${items}</${tag}>`;
      }
      case 'list-item':
        return `<li>${renderChildren(node.children)}</li>`;
      default:
        return '';
    }
  };
  return blocks.map(renderNode).join('\n');
}

function pick<T = any>(obj: any): any {
  // Handle both flattened and attributes-wrapped responses
  return obj?.attributes ? obj.attributes : obj;
}

function mapArticle(a: any): ArticleItem {
  const base = pick(a);
  const id = a?.id ?? base?.id;
  const title = base?.title ?? base?.Title ?? '';
  const slug = base?.slug ?? base?.Slug ?? String(id ?? '');
  const documentId = base?.documentId;
  const cover = base?.cover ?? base?.Cover;

  // Excerpt fallbacks
  const excerpt = base?.excerpt ?? base?.Excerpt ?? base?.Short_description ?? base?.short_description ?? '';

  // Content fallbacks
  let content: string | undefined = base?.content ?? base?.Content;
  if (!content && Array.isArray(base?.Full_description)) {
    content = blocksToHtml(base.Full_description);
  }

  return {
    id,
    title,
    slug,
    excerpt,
    content,
    cover,
    publishedAt: base?.publishedAt ?? base?.createdAt,
    documentId,
  };
}

export async function getArticles(): Promise<ArticleItem[]> {
  const res = await fetchStrapi<StrapiCollectionResponse<any>>('/api/articles?populate=cover');
  const arr = Array.isArray(res?.data) ? res.data.map(mapArticle) : [];
  return arr;
}

export async function getArticleBySlug(param: string): Promise<ArticleItem | null> {
  const raw = (param ?? '').toString();
  const p = decodeURIComponent(raw).trim();
  try {
    // Try /articles/:id or /articles/:documentId
    const single = await fetchStrapi<StrapiSingleResponse<any>>(`/api/articles/${encodeURIComponent(p)}?populate=cover`);
    if (single?.data) return mapArticle(single.data);
  } catch {}

  try {
    // Try by numeric id filter
    if (/^\d+$/.test(p)) {
      const byId = await fetchStrapi<StrapiCollectionResponse<any>>(`/api/articles?filters[id][$eq]=${encodeURIComponent(p)}&populate=cover`);
      if (byId?.data?.[0]) return mapArticle(byId.data[0]);
    }
  } catch {}

  try {
    // Try by documentId filter
    const byDoc = await fetchStrapi<StrapiCollectionResponse<any>>(`/api/articles?filters[documentId][$eq]=${encodeURIComponent(p)}&populate=cover`);
    if (byDoc?.data?.[0]) return mapArticle(byDoc.data[0]);
  } catch {}

  try {
    // Try by slug keys (if model has them)
    const bySlug = await fetchStrapi<StrapiCollectionResponse<any>>(`/api/articles?filters[slug][$eq]=${encodeURIComponent(p)}&populate=cover`);
    if (bySlug?.data?.[0]) return mapArticle(bySlug.data[0]);
  } catch {}

  try {
    const bySlugCap = await fetchStrapi<StrapiCollectionResponse<any>>(`/api/articles?filters[Slug][$eq]=${encodeURIComponent(p)}&populate=cover`);
    if (bySlugCap?.data?.[0]) return mapArticle(bySlugCap.data[0]);
  } catch {}

  return null;
}
