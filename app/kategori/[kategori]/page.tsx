import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import { getByKategori } from '@/lib/api';
import { SITE, canonical, ogImage, sanitizeSlug } from '@/lib/config';
import { getCategory } from '@/lib/categories';
import PaginatedPosts from '@/components/PaginatedPosts';

export async function generateStaticParams() {
  const all = await (await import('@/lib/api')).getPosts();
  return [...new Set(all.map((p) => sanitizeSlug(p.kategori)).filter(Boolean))].map((kategori) => ({ kategori }));
}

export async function generateMetadata({ params }: { params: Promise<{ kategori: string }> }): Promise<Metadata> {
  const { kategori } = await params;
  const category = getCategory(kategori);
  return {
    title: `${category.name} - ${SITE.name}`,
    description: category.description,
    alternates: { canonical: canonical(`/kategori/${sanitizeSlug(kategori)}`) },
    robots: { index: true, follow: true },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ kategori: string }> }) {
  const { kategori } = await params;
  const posts = await getByKategori(kategori);
  if (!posts.length) notFound();
  const category = getCategory(kategori);
  const categorySlug = sanitizeSlug(kategori);

  return <Layout>
    <div className="hero"><h1>{category.name}</h1><p>{posts.length} artikel tersedia</p></div>
    <PaginatedPosts posts={posts.map((p) => ({ slug: sanitizeSlug(p.slug), title: p.title, kategori: p.kategori, image: ogImage(p.slug) }))} categoryBase={`/kategori/${categorySlug}`} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: category.name, description: category.description, url: canonical(`/kategori/${categorySlug}`) }) }} />
  </Layout>;
}
