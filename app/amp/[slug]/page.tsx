import Link from 'next/link';
import Layout from '@/components/amp/Layout';
import { getPost, getPosts } from '@/lib/api';
import {
  SITE,
  ogImage,
  sanitizeSlug,
} from '@/lib/config';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: sanitizeSlug(post.slug),
  }));
}

export default async function AmpPostPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    const content = (
      <section className="amp-section">
        <div className="amp-empty">
          <h1>Artikel tidak ditemukan</h1>

          <p>
            Artikel yang Anda cari tidak tersedia.
          </p>

          <Link
            href="/amp/"
            className="amp-button amp-button-primary"
          >
            Kembali ke AMP
          </Link>
        </div>
      </section>
    );

    return <Layout content={content} />;
  }

  const content = (
    <article className="amp-article">
      <nav
        className="amp-breadcrumb"
        aria-label="Breadcrumb"
      >
        <Link href="/amp/">Beranda</Link>

        <span>›</span>

        {post.kategori && (
          <>
            <Link
              href={`/amp/kategori/${encodeURIComponent(
                post.kategori
              )}/`}
            >
              {post.kategori}
            </Link>

            <span>›</span>
          </>
        )}

        <span>{post.title}</span>
      </nav>

      <header className="amp-article-header">
        {post.kategori && (
          <Link
            href={`/amp/kategori/${encodeURIComponent(
              post.kategori
            )}/`}
            className="amp-card-category"
          >
            {post.kategori}
          </Link>
        )}

        <h1 className="amp-article-title">
          {post.title}
        </h1>

        <div className="amp-article-meta">
          {post.created && (
            <time dateTime={post.created}>
              {new Date(
                post.created
              ).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          )}

          {post.updated &&
            post.updated !== post.created && (
              <>
                <span> · </span>

                <span>
                  Diperbarui{' '}
                  {new Date(
                    post.updated
                  ).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </>
            )}
        </div>
      </header>

      <div className="amp-article-image">
        <img
          src={ogImage(post.slug)}
          alt={post.title}
          width={1200}
          height={630}
          loading="eager"
        />
      </div>

      <div
        className="amp-content"
        dangerouslySetInnerHTML={{
          __html: post.content || '',
        }}
      />

      <footer className="amp-article-footer">
        <div className="amp-buttons">
          <Link
            href={`/${sanitizeSlug(post.slug)}/`}
            className="amp-button amp-button-primary"
          >
            Baca Versi Utama
          </Link>

          <Link
            href="/amp/"
            className="amp-button"
          >
            Artikel Terbaru
          </Link>
        </div>

        <p className="amp-powered">
          {SITE.name}
        </p>
      </footer>
    </article>
  );

  return <Layout content={content} />;
}

