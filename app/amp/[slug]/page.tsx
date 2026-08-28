import type { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/amp/Layout';
import { getPosts } from '@/lib/api';
import {
  SITE,
  canonical,
  amphtml,
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const posts = await getPosts();

  const post = posts.find(
    (item) => sanitizeSlug(item.slug) === slug
  );

  if (!post) {
    return {
      title: `Artikel Tidak Ditemukan - ${SITE.name}`,
    };
  }

  return {
    title: post.title,
    description:
      post.description || SITE.description,
    alternates: {
      canonical: canonical(`/${slug}`),
      types: {
        'application/amphtml': amphtml(
          `/amp/${slug}/`
        ),
      },
    },
    openGraph: {
      title: post.title,
      description:
        post.description || SITE.description,
      images: [
        {
          url: ogImage(post.slug),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function AmpPostPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const posts = await getPosts();

  const post = posts.find(
    (item) => sanitizeSlug(item.slug) === slug
  );

  if (!post) {
    const content = (
      <section className="amp-section">
        <div className="amp-empty">
          <h1>Artikel tidak ditemukan</h1>

          <p>
            Artikel yang Anda cari tidak tersedia.
          </p>

          <div className="amp-buttons">
            <Link
              href="/amp/"
              className="amp-button amp-button-primary"
            >
              Kembali ke AMP
            </Link>
          </div>
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
        <Link href="/amp/">
          Beranda
        </Link>

        <span>/</span>

        {post.kategori && (
          <>
            <span>{post.kategori}</span>
            <span>/</span>
          </>
        )}

        <span>{post.title}</span>
      </nav>

      <header>
        {post.kategori && (
          <div className="amp-card-category">
            {post.kategori}
          </div>
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

      <div className="amp-buttons">
        <Link
          href={`/${sanitizeSlug(post.slug)}`}
          className="amp-button amp-button-primary"
        >
          Baca Versi Utama
        </Link>

        <Link
          href="/amp/"
          className="amp-button"
        >
          Artikel Lainnya
        </Link>
      </div>
    </article>
  );

  return <Layout content={content} />;
}

