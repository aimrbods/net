export const dynamic='force-static';
import {SITE} from '@/lib/config';export function GET(){return new Response(`User-agent: *\nAllow: /\nSitemap: ${SITE.domain}/sitemap.xml\nHost: ${SITE.domain}\n`,{headers:{'content-type':'text/plain;charset=UTF-8','cache-control':'public,max-age=3600,stale-while-revalidate=86400'}})}
