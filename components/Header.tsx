'use client';
import { useState } from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/config';

export default function Header(){
 const [open,setOpen]=useState(false);
 const links=[['Home','/'],['AMP','/amp'],['RSS','/rss.xml'],['Sitemap','/sitemap.xml']];
 return <>
  <header className="header"><div className="header-wrap">
   <Link href="/" className="logo">⚡ <span>{SITE.name}</span></Link>
   <nav className="desktop-nav">{links.map(([t,h])=><Link key={h} href={h}>{t}</Link>)}</nav>
   <button className="menu-toggle" onClick={()=>setOpen(true)} aria-label="Menu">☰</button>
  </div></header>
  <nav className={`mobile-nav${open?' active':''}`}>
   <div className="mobile-top"><div className="mobile-title">⚡ {SITE.name}</div><button className="close-menu" onClick={()=>setOpen(false)}>✕</button></div>
   {[...links,['Tentang Kami','/about'],['Contact','/contact'],['Privacy Policy','/privacy-policy'],['Terms','/terms'],['Disclaimer','/disclaimer']].map(([t,h])=><Link onClick={()=>setOpen(false)} key={h} href={h}>{t}</Link>)}
  </nav>
  {open && <div className="mobile-overlay active" onClick={()=>setOpen(false)} />}
 </>;
}
