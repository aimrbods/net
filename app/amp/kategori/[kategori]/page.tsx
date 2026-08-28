import { getPosts } from '@/lib/api';
import { SITE, ogImage, sanitizeSlug, escapeHTML } from '@/lib/config';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const posts = await getPosts();
  return [...new Set(posts.map((p) => sanitizeSlug(p.kategori)).filter(Boolean))]
    .map((kategori) => ({ kategori }));
}

export default async function AmpCategoryPage({
  params,
}: {
  params: Promise<{ kategori: string }>;
}) {
  const { kategori } = await params;
  const all = (await getPosts()).filter(
    (p) => sanitizeSlug(p.kategori) === sanitizeSlug(kategori)
  );

  const cards = all.slice(0, 24).map(
    (p) => `<a class="card" href="/amp/${sanitizeSlug(p.slug)}"><amp-img src="${ogImage(p.slug)}" width="1200" height="630" layout="responsive" alt="${escapeHTML(p.title)}"></amp-img><h3>${escapeHTML(p.title)}</h3></a>`
  ).join('');

  const html = `<!doctype html><html amp lang="id"><head><meta charset="utf-8"><title>${escapeHTML(kategori)} AMP - ${escapeHTML(SITE.name)}</title><meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><script async src="https://cdn.ampproject.org/v0.js"></script><style amp-custom>body{margin:0;background:#020617;color:#e5e7eb;font-family:Arial,sans-serif;padding:24px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px}.card{background:#0f172a;border:1px solid #1e293b;border-radius:20px;overflow:hidden;color:#fff;text-decoration:none}.card h3{padding:16px}</style></head><body><h1>${escapeHTML(kategori)}</h1><p>${all.length} artikel tersedia</p><div class="grid">${cards}</div></body></html>`;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
