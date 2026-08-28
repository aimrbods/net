'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Item = { title: string; slug: string };

export default function Search(){
  const [q,setQ]=useState('');
  const [all,setAll]=useState<Item[]>([]);
  const [items,setItems]=useState<Item[]>([]);

  useEffect(()=>{
    fetch('/api/search')
      .then(r=>r.ok?r.json():[])
      .then(data=>setAll(Array.isArray(data)?data:[]))
      .catch(()=>setAll([]));
  },[]);

  useEffect(()=>{
    const t=setTimeout(()=>{
      const query=q.toLowerCase().trim();
      if(query.length<2){setItems([]);return;}
      setItems(all.filter(x=>x.title.toLowerCase().includes(query)).slice(0,20));
    },150);
    return()=>clearTimeout(t);
  },[q,all]);

  return <><input className="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari artikel..." aria-label="Cari artikel"/><div id="results">{items.map(x=><Link className="search-item" key={x.slug} href={`/${x.slug}`}>{x.title}</Link>)}</div></>
}
