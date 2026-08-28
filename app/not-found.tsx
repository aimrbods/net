import Link from 'next/link';
import Layout from '@/components/Layout';

export default function NotFound() {
  return <Layout><section className="hero"><h1>404</h1><p>Halaman yang Anda cari tidak ditemukan.</p><div className="hero-btns"><Link className="btn" href="/">Kembali ke Home</Link></div></section></Layout>;
}
