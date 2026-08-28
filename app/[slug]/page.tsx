import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import PostHtml from '@/components/PostHtml';
import { getPost, getPosts } from '@/lib/api';
import { SITE, amphtml, canonical, cleanDescription, ogImage, readingTime, sanitizeSlug, stripHTML } from '@/lib/config';
import { schemaFor } from '@/lib/seo';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: sanitizeSlug(post.slug) })).filter((x) => x.slug);
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: `404 - ${SITE.name}`, robots: { index: false, follow: false } };
  const description = cleanDescription(stripHTML(post.content).slice(0, 160));
  const pageUrl = canonical(`/${post.slug}`);
  return {
    title: post.title,
    description,
    alternates: { canonical: pageUrl, types: { 'text/html': pageUrl, 'application/amphtml': amphtml(`/${post.slug}`) } },
    openGraph: { type: 'article', title: post.title, description, url: pageUrl, siteName: SITE.name, images: [{ url: ogImage(post.slug) }], publishedTime: post.created, modifiedTime: post.updated },
    twitter: { card: 'summary_large_image', title: post.title, description, images: [ogImage(post.slug)] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const posts = await getPosts();
  const related = posts.filter((p) => p.slug !== post.slug && p.kategori === post.kategori).slice(0, 6);
  const desc = cleanDescription(stripHTML(post.content).slice(0, 160));
  const schemas = schemaFor({ title: post.title, description: desc, slug: post.slug, image: ogImage(post.slug), kategori: post.kategori, published: post.created, updated: post.updated });

  return <Layout>
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href={`/kategori/${sanitizeSlug(post.kategori)}`}>{post.kategori}</Link><span>›</span><span>{post.title}</span></nav>
    <article className="post">
      <img src={ogImage(post.slug)} alt={post.title} width={1200} height={630} fetchPriority="high" />
      <h1>{post.title}</h1>
      <p>⏱ {readingTime(post.content)} min read</p>
      <PostHtml html={post.content} />
      <div className="post-tags"><Link href={`/kategori/${sanitizeSlug(post.kategori)}`}>#{post.kategori}</Link></div>
    </article>
    {related.length > 0 && <><h2>Artikel Terkait</h2><div className="grid">{related.map((p) => <div className="card" key={p.slug}><Link href={`/${p.slug}`}><img src={ogImage(p.slug)} alt={p.title} width={1200} height={630} loading="lazy" /><h3>{p.title}</h3></Link></div>)}</div></>}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
  </Layout>;
}
