import type { Metadata } from 'next';
import './globals.css';
import { SITE, canonical } from '@/lib/config';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  alternates: { canonical: canonical('/'), types: { "application/rss+xml": '/rss.xml' } },
  icons: { icon: SITE.favicon },
  openGraph: { type: 'website', siteName: SITE.name, locale: 'id_ID', title: SITE.name, description: SITE.description, url: SITE.domain, images: [{ url: `${SITE.domain}${SITE.defaultImage}` }] },
  twitter: { card: 'summary_large_image', title: SITE.name, description: SITE.description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
