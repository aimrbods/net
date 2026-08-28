import { API_BASE, sanitizeSlug } from './config';

export type Post = {
  slug: string;
  title: string;
  content: string;
  kategori: string;
  created: string;
  updated: string;
};

let cache: Post[] | null = null;
let lastFetch = 0;
const TTL = 60_000;

function normalize(post: any): Post {
  const created = post?.created || new Date().toISOString();
  return {
    slug: sanitizeSlug(post?.slug || ''),
    title: String(post?.title || 'No Title').trim(),
    content: String(post?.content || ''),
    kategori: String(post?.kategori || 'umum').toLowerCase().trim(),
    created,
    updated: post?.updated || created,
  };
}

export async function getPosts(): Promise<Post[]> {
  const now = Date.now();
  if (cache && now - lastFetch < TTL) return cache;

  try {
    const res = await fetch(`${API_BASE}/posts`, {
      headers: { accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    const posts = (Array.isArray(data) ? data : [])
      .map(normalize)
      .filter((p: Post) => p.slug)
      .sort((a: Post, b: Post) => new Date(b.created).getTime() - new Date(a.created).getTime());
    cache = posts;
    lastFetch = now;
    return posts;
  } catch (error) {
    console.error('FETCH ERROR:', error);
    return cache || [];
  }
}

export async function getPost(slug = ''): Promise<Post | null> {
  const safe = sanitizeSlug(slug);
  if (!safe) return null;
  return (await getPosts()).find((p) => p.slug === safe) || null;
}

export async function getByKategori(kategori = ''): Promise<Post[]> {
  const safe = sanitizeSlug(kategori);
  return (await getPosts()).filter((p) => sanitizeSlug(p.kategori) === safe);
}

export async function searchPosts(query = ''): Promise<Post[]> {
  const q = String(query)
    .toLowerCase()
    .replace(/<[^>]*>?/gm, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!q) return [];
  return (await getPosts()).filter((p) => p.title.toLowerCase().includes(q)).slice(0, 20);
}
