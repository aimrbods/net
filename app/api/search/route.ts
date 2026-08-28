import { getPosts } from '@/lib/api';
import { sanitizeSlug, escapeHTML } from '@/lib/config';

export const dynamic = 'force-static';

export async function GET() {
  const data = (await getPosts()).map((p) => ({ title: escapeHTML(p.title), slug: sanitizeSlug(p.slug) }));
  return Response.json(data, { headers: { 'cache-control': 'public,max-age=3600' } });
}
