import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/api';
import {
  SITE,
  canonical,
  amphtml,
  ogImage,
  sanitizeSlug,
  escapeHTML,
} from '@/lib/config';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `${SITE.name} - AMP`,
  description: SITE.description,
  alternates: {
    canonical: canonical('/'),
    types: {
      'application/amphtml': amphtml('/'),
    },
  },
};

export default async function AmpPage() {
  const posts = await getPosts();
  const latestPosts = posts.slice(0, 12);

  return (
    <>
      {/* AMP runtime */}
      <script
        async
        src="https://cdn.ampproject.org/v0.js"
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            * {
              box-sizing: border-box;
            }

            html {
              background: #020617;
            }

            body {
              margin: 0;
              padding: 0;
              background: #020617;
              color: #e5e7eb;
              font-family:
                Arial,
                Helvetica,
                sans-serif;
            }

            a {
              color: inherit;
              text-decoration: none;
            }

            .amp-container {
              width: 100%;
              max-width: 1100px;
              margin: 0 auto;
              padding: 20px;
            }

            .header {
              padding: 12px 0 28px;
            }

            .brand {
              display: inline-block;
              font-size: 24px;
              font-weight: 800;
              color: #fff;
            }

            .amp-label {
              display: inline-block;
              margin-left: 8px;
              padding: 4px 8px;
              border-radius: 999px;
              background: #1e293b;
              color: #94a3b8;
              font-size: 11px;
              font-weight: 700;
              vertical-align: middle;
            }

            .hero {
              margin-bottom: 32px;
              padding: 30px 24px;
              border: 1px solid #1e293b;
              border-radius: 22px;
              background:
                linear-gradient(
                  135deg,
                  #111827 0%,
                  #020617 100%
                );
            }

            .hero-badge {
              display: inline-block;
              margin-bottom: 12px;
              padding: 6px 10px;
              border-radius: 999px;
              background: #1e293b;
              color: #a78bfa;
              font-size: 12px;
              font-weight: 700;
            }

            .hero h1 {
              margin: 0 0 12px;
              color: #fff;
              font-size: 34px;
              line-height: 1.2;
            }

            .hero p {
              max-width: 760px;
              margin: 0;
              color: #94a3b8;
              font-size: 16px;
              line-height: 1.7;
            }

            .section-title {
              margin-bottom: 18px;
            }

            .section-title h2 {
              margin: 0 0 6px;
              color: #fff;
              font-size: 25px;
            }

            .section-title p {
              margin: 0;
              color: #64748b;
              font-size: 14px;
            }

            .grid {
              display: grid;
              grid-template-columns:
                repeat(auto-fit, minmax(260px, 1fr));
              gap: 20px;
            }

            .card {
              overflow: hidden;
              border: 1px solid #1e293b;
              border-radius: 18px;
              background: #0f172a;
            }

            .card-image {
              overflow: hidden;
              background: #111827;
            }

            .card-body {
              padding: 16px;
            }

            .category {
              display: inline-block;
              margin-bottom: 8px;
              color: #a78bfa;
              font-size: 12px;
              font-weight: 700;
              text-transform: uppercase;
            }

            .card h3 {
              margin: 0;
              color: #fff;
              font-size: 18px;
              line-height: 1.45;
            }

            .empty {
              padding: 30px;
              border: 1px solid #1e293b;
              border-radius: 16px;
              color: #94a3b8;
              text-align: center;
            }

            .footer {
              margin-top: 45px;
              padding: 25px 0;
              border-top: 1px solid #1e293b;
              color: #64748b;
              font-size: 13px;
              line-height: 1.7;
            }

            .footer a {
              color: #a78bfa;
            }

            @media (max-width: 600px) {
              .amp-container {
                padding: 15px;
              }

              .hero {
                padding: 24px 18px;
              }

              .hero h1 {
                font-size: 28px;
              }

              .grid {
                grid-template-columns: 1fr;
              }
            }
          `,
        }}
      />

      <main className="amp-container">
        <header className="header">
          <Link href="/" className="brand">
            {SITE.name}
          </Link>

          <span className="amp-label">
            AMP
          </span>
        </header>

        <section className="hero">
          <span className="hero-badge">
            ⚡ AI MODERN
          </span>

          <h1>
            {SITE.name}
          </h1>

          <p>
            Panduan SEO, AI, blogging, teknologi digital,
            dan strategi website dari AI Mr Ferdy untuk
            membantu membangun serta meningkatkan
            visibilitas online di Indonesia.
          </p>
        </section>

        <section>
          <div className="section-title">
            <h2>
              Artikel Terbaru
            </h2>

            <p>
              Update konten terbaru dari {SITE.name}
            </p>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid">
              {latestPosts.map((post) => {
                const slug = sanitizeSlug(post.slug);
                const image = ogImage(post.slug);

                return (
                  <article
                    className="card"
                    key={post.slug}
                  >
                    <Link href={`/amp/${slug}/`}>
                      <div className="card-image">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `
                              <amp-img
                                src="${escapeHTML(image)}"
                                width="1200"
                                height="630"
                                layout="responsive"
                                alt="${escapeHTML(post.title)}"
                              ></amp-img>
                            `,
                          }}
                        />
                      </div>

                      <div className="card-body">
                        <span className="category">
                          {post.kategori}
                        </span>

                        <h3>
                          {post.title}
                        </h3>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty">
              Belum ada artikel tersedia.
            </div>
          )}
        </section>

        <footer className="footer">
          <div>
            © {new Date().getFullYear()} {SITE.name}
          </div>

          <div>
            <Link href="/">
              Kembali ke website utama
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}

