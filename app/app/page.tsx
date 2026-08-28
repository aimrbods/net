import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import { canonical } from '@/lib/config';

export const metadata: Metadata = {
  title: 'APP',
  description: 'Halaman aplikasi.',
  alternates: { canonical: canonical('/app') },
};

export default function AppPage() {
  return <Layout><h1>APP</h1><p>Halaman aplikasi.</p></Layout>;
}
