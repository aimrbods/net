import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import { SITE, canonical } from '@/lib/config';

export const metadata: Metadata = {
  title: 'APK Download',
  description: 'Kumpulan APK terbaru.',
  alternates: { canonical: canonical('/apk') },
};

export default function ApkPage() {
  return <Layout><h1>APK Download</h1><p>Daftar APK terbaru.</p></Layout>;
}
