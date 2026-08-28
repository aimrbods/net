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
    kategori: string;
  }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const posts = await getPosts();

  const categories = Array.from(
    new Set(
      posts
        .map((post) => post.kategori)
        .filter(Boolean)
    )
  );

  return categories.map((kategori) => ({
    kategori: encodeURIComponent(kategori),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { kategori } = await params;
  const category = decodeURIComponent(kategori);

  return {
    title: `${category} - ${SITE.name}`,
    description: `Artikel kategori ${category} di ${SITE.name}.`,
    alternates: {
      canonical: canonical(
        `/kategori/${encodeURIComponent(category)}`
      ),
      types: {
        'application/amphtml': amphtml(
          `/amp/kategori/${encodeURIComponent(category)}/`
        ),
      },
    },
  };
}

export default async function AmpCategoryPage({
  params,
}: PageProps) {
  const { kategori } = await params;
  const category = decodeURIComponent(kategori);

  const posts = await getPosts();

  const categoryPosts = posts.filter(
    (post) =>
      post.kategori?.toLowerCase() ===
      category.toLowerCase()
  );

  const content = (
    <>
      <section className="amp-category-header">
        <nav
          className="amp-breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link href="/amp/">
            Beranda
          </Link>

          <span>/</span>

          <span>{category}</span>
        </nav>

        <h1 className="amp-category-title">
          {category}
        </h1>

        <p className="amp-category-description">
          Artikel terbaru dalam kategori {category}.
        </p>
      </section>

      <section className="amp-section">
        {categoryPosts.length > 0 ? (
          <div className="amp-grid">
            {categoryPosts.map((post) => {
              const slug = sanitizeSlug(post.slug);

              return (
                <article
                  className="amp-card"
                  key={post.slug}
                >
                  <Link href={`/amp/${slug}/`}>
                    <div className="amp-card-image">
                      <img
                        src={ogImage(post.slug)}
                        alt={post.title}
                        width={1200}
                        height={630}
                        loading="lazy"
                      />
                    </div>

                    <div className="amp-card-body">
                      <span className="amp-card-category">
                        {post.kategori || 'ARTIKEL'}
                      </span>

                      <h2 className="amp-card-title">
                        {post.title}
                      </h2>

                      {post.created && (
                        <div className="amp-card-meta">
                          {new Date(
                            post.created
                          ).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </div>
                      )}
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="amp-empty">
            <h2>
              Belum ada artikel
            </h2>

            <p>
              Belum ada artikel dalam kategori{' '}
              <strong>{category}</strong>.
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
        )}
      </section>
    </>
  );

  return <Layout content={content} />;
}

