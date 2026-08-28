import Link from 'next/link';
import { SITE } from '@/lib/config';

export default function Header() {
  return (
    <header className="amp-header">
      <div className="amp-header-inner">
        <Link href="/amp/" className="amp-logo">
          {SITE.name}
        </Link>

        <nav className="amp-nav" aria-label="Navigasi">
          <Link href="/amp/">Beranda</Link>
          <Link href="/">Website Utama</Link>
        </nav>
      </div>
    </header>
  );
}
