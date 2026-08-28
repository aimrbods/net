import Link from 'next/link';
import Layout from '@/components/amp/Layout';
import { getByKategori, getPosts } from '@/lib/api';
import { SITE, ogImage, sanitizeSlug } from '@/lib/config';

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

export default async function AmpCategoryPage({
  params,
}: PageProps) {
  const { kategori } = await params;

  const category = decodeURIComponent(kategori);

  const posts = await getByKategori(category);

  const content = (
    <>
      <section className="amp-category-header">
        <nav
          className="amp-breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link href="/amp/">Beranda</Link>

          <span>›</span>

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
        {posts.length > 0 ? (
          <div className="amp-grid">
            {posts.map((post) => {
              const slug = sanitizeSlug(post.slug);

              return (
                <article
                  key={post.slug}
                  className="amp-card"
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
                      {post.kategori && (
                        <span className="amp-card-category">
                          {post.kategori}
                        </span>
                      )}

                      <h2 className="amp-card-title">
                        {post.title}
                      </h2>

                      {post.created && (
                        <time
                          className="amp-card-meta"
                          dateTime={post.created}
                        >
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
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="amp-empty">
            <h2>Belum ada artikel</h2>

            <p>
              Belum ada artikel dalam kategori{' '}
              <strong>{category}</strong>.
            </p>

            <Link
              href="/amp/"
              className="amp-button amp-button-primary"
            >
              Kembali ke AMP
            </Link>
          </div>
        )}
      </section>
    </>
  );

  return <Layout content={content} />;
}

