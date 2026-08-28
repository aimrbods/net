import Link from 'next/link';
import Layout from '@/components/Layout';
import Search from '@/components/Search';
import PaginatedPosts from '@/components/PaginatedPosts';
import { getPosts } from '@/lib/api';
import { SITE, canonical, ogImage, sanitizeSlug } from '@/lib/config';
import { schemaFor } from '@/lib/seo';

export const metadata = { title: SITE.name, description: SITE.description, alternates: { canonical: canonical('/') } };

export default async function Home() {
  const posts = await getPosts();
  const schemas = schemaFor({ title: SITE.name, description: SITE.description });

  return <Layout>
    <section className="hero">
      <div className="hero-box">
        <span className="hero-badge">⚡ AI MODERN</span>
        <h1>{SITE.name}</h1>
        <p>Panduan SEO, AI, blogging, teknologi digital, dan strategi website dari AI Mr Ferdy untuk membantu membangun serta meningkatkan visibilitas online di Indonesia.</p>
        <div className="hero-btns">
          <a href="https://apk.aimrFerdy.workers.dev/" className="btn" rel="nofollow">Aktivasi</a>
          <a href="https://app.aimrferdy.workers.dev/" className="btn btn2" rel="nofollow">Alternatif</a>
        </div>
      </div>
    </section>

    <section className="seo-box">
      <h2>Informasi Aplikasi Penghasil Cuan</h2>
      <p>Update aplikasi penghasil uang, AI modern, platform auto cuan, tips saldo digital, dan tren teknologi viral terbaru dengan informasi ringan dan mudah dipahami.</p>
    </section>

    <Search />
    <h2>Artikel Terbaru</h2>
    <PaginatedPosts posts={posts.map((p) => ({ slug: sanitizeSlug(p.slug), title: p.title, kategori: p.kategori, image: ogImage(p.slug) }))} />

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
  </Layout>;
}
