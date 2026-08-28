'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export type PaginatedPost = { slug: string; title: string; kategori?: string; image: string };

export default function PaginatedPosts({ posts, perPage = 12, categoryBase = '/' }: { posts: PaginatedPost[]; perPage?: number; categoryBase?: string }) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const value = Number.parseInt(new URLSearchParams(window.location.search).get('page') || '1', 10);
    setPage(Number.isFinite(value) && value > 0 ? value : 1);
  }, []);

  const total = Math.max(1, Math.ceil(posts.length / perPage));
  const currentPage = Math.min(page, total);
  const current = posts.slice((currentPage - 1) * perPage, currentPage * perPage);
  const base = categoryBase.endsWith('/') ? categoryBase.slice(0, -1) : categoryBase;

  return <>
    <div className="grid">
      {current.map((p) => <div className="card" key={p.slug}>
        <Link href={`/${p.slug}`}>
          <div className="thumb"><img src={p.image} alt={p.title} loading="lazy" width={400} height={210} /></div>
          <div className="body"><span className="badge">{p.kategori || 'ARTIKEL'}</span><h3>{p.title}</h3></div>
        </Link>
      </div>)}
    </div>
    {total > 1 && <div className="pagination">
      {Array.from({ length: total }, (_, i) => i + 1).map((i) => <Link className={i === currentPage ? 'active' : ''} key={i} href={i === 1 ? base || '/' : `${base || '/'}?page=${i}`}>{i}</Link>)}
    </div>}
  </>;
}
