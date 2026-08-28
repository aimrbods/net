import Link from 'next/link';
import { SITE } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="amp-footer">
      <div className="amp-footer-inner">
        <nav
          className="amp-footer-links"
          aria-label="Navigasi footer"
        >
          <Link href="/amp/">
            Beranda AMP
          </Link>

          <Link href="/">
            Website Utama
          </Link>
        </nav>

        <div>
          © {new Date().getFullYear()} {SITE.name}
        </div>
      </div>
    </footer>
  );
}
