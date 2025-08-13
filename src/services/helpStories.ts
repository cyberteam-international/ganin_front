import { fetchStrapi } from '@/lib/strapi';

export interface HelpStory {
  id: number;
  documentId?: string;
  Title: string;
  Short_description?: string;
  Description?: any[]; // blocks array
  zavisimost?: string;
  seoURL?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

interface StrapiCollectionResponse<T> { data: T[]; meta?: any }
interface StrapiSingleResponse<T> { data: T; meta?: any }

const blocksToHtml = (blocks: any[]): string => {
  if (!Array.isArray(blocks)) return '';
  const esc = (s: string) => s.replace(/[&<>"]+/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]!));
  const renderChildren = (children: any[]): string => children?.map((n:any)=>('text'in n?esc(n.text): (n.children?renderChildren(n.children):''))).join('')||'';
  return blocks.map(node=>{
    if (node.type==='paragraph') return `<p>${renderChildren(node.children)}</p>`;
    if (node.type==='heading') { const lvl=Math.min(Math.max(node.level||2,1),6); return `<h${lvl}>${renderChildren(node.children)}</h${lvl}>`; }
    if (node.type==='list') { const tag=node.format==='ordered'?'ol':'ul'; return `<${tag}>${(node.children||[]).map((li:any)=>`<li>${renderChildren(li.children)}</li>`).join('')}</${tag}>`; }
    return '';
  }).join('\n');
};

export async function getHelpStories(): Promise<HelpStory[]> {
  const res = await fetchStrapi<StrapiCollectionResponse<HelpStory>>('/api/help-stories');
  return Array.isArray(res?.data) ? res.data : [];
}

export async function getHelpStory(idOrDocument: string): Promise<HelpStory | null> {
  // Try by seoURL first
  try {
    const res = await fetchStrapi<StrapiCollectionResponse<HelpStory>>(`/api/help-stories?filters[seoURL][$eq]=${encodeURIComponent(idOrDocument)}`);
    if (res.data?.[0]) return res.data[0];
  } catch {}
  
  // Try direct endpoint by ID
  try {
    const single = await fetchStrapi<StrapiSingleResponse<HelpStory>>(`/api/help-stories/${idOrDocument}`);
    if (single?.data) return single.data;
  } catch {}
  
  // Fallback: filter by documentId
  try {
    const res = await fetchStrapi<StrapiCollectionResponse<HelpStory>>(`/api/help-stories?filters[documentId][$eq]=${encodeURIComponent(idOrDocument)}`);
    return res.data?.[0] || null;
  } catch {}
  
  return null;
}

export function storyToHtml(story: HelpStory): string {
  return blocksToHtml(story.Description || []);
}

export function getStoryUrl(story: HelpStory): string {
  return story.seoURL || story.documentId || String(story.id);
}
