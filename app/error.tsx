'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="container"><section className="hero"><h1>Terjadi kesalahan</h1><p>Silakan coba lagi.</p><div className="hero-btns"><button className="btn" onClick={() => reset()}>Coba Lagi</button><Link className="btn btn2" href="/">Home</Link></div></section></main>;
}
