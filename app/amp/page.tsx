import Link from 'next/link';
import Layout from '@/components/amp/Layout';
import { getPosts } from '@/lib/api';
import {
  SITE,
  ogImage,
  sanitizeSlug,
} from '@/lib/config';

export const dynamic = 'force-static';

export default async function AmpPage() {
  const posts = await getPosts();
  const latestPosts = posts.slice(0, 12);

  const content = (
    <>
      <section className="amp-hero">
        <span className="amp-hero-badge">
          ⚡ AI MODERN
        </span>

        <h1>{SITE.name}</h1>

        <p>{SITE.description}</p>

        <div className="amp-buttons">
          <Link
            href="/"
            className="amp-button amp-button-primary"
          >
            Website Utama
          </Link>

          <Link
            href="/amp/"
            className="amp-button"
          >
            AMP
          </Link>
        </div>
      </section>

      <section className="amp-section">
        <header className="amp-section-header">
          <h2 className="amp-section-title">
            Artikel Terbaru
          </h2>

          <p className="amp-section-description">
            Artikel terbaru dari {SITE.name}
          </p>
        </header>

        {latestPosts.length > 0 ? (
          <div className="amp-grid">
            {latestPosts.map((post) => {
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

                      <h3 className="amp-card-title">
                        {post.title}
                      </h3>

                      <div className="amp-card-meta">
                        {new Date(post.created).toLocaleDateString(
                          'id-ID',
                          {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="amp-empty">
            Belum ada artikel tersedia.
          </div>
        )}
      </section>
    </>
  );

  return <Layout content={content} />;
}

