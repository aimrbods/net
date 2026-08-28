import Link from 'next/link';
import Layout from '@/components/amp/Layout';
import { getPosts } from '@/lib/api';
import { SITE, ogImage, sanitizeSlug } from '@/lib/config';

export const dynamic = 'force-static';

export default async function AmpPage() {
  const posts = await getPosts();

  const content = (
    <>
      <section className="amp-hero">
        <h1>{SITE.name}</h1>

        <p>{SITE.description}</p>
      </section>

      <section className="amp-section">
        <div className="amp-section-header">
          <h2>Artikel Terbaru</h2>
          <p>
            Temukan artikel terbaru dari {SITE.name}.
          </p>
        </div>

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

                      <h3 className="amp-card-title">
                        {post.title}
                      </h3>

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
              Saat ini belum tersedia artikel untuk ditampilkan.
            </p>
          </div>
        )}
      </section>
    </>
  );

  return <Layout content={content} />;
}

