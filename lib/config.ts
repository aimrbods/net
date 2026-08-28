export const SITE = {
  name: 'Ai Mr Ferdy',
  domain: (process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://adskerala.com').replace(/\/$/, ''),
  description:
    'AI Mr Ferdy adalah platform digital Indonesia yang membahas teknologi, kecerdasan buatan, AI Tools, aplikasi, internet, dan berbagai perkembangan digital modern.',
  logo: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjm9WfgOG9sY-qxwmukImzuA3s3tsrt7cgpnW05MA1Uci8aZNi87uvBgnWPchWYwYmLDow2_8rjpHOoyiCXO57T9ZrThcZZ3Ji0f_usVCRvq6Pt94JcZjzcHDE03ILfSGVw2NrAMzLrovYL-cxySyV3KArao1wv53Qyyaw0cTEfLOW4f1pEIe-l3AsmySA/s1600/logo1.png',
  favicon: 'https://aimrferdycheat.blogspot.com/favicon.ico',
  defaultImage: '/og/home',
};

export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || 'https://api-adskerala.aimrbods.workers.dev').replace(/\/$/, '');
export const AMP_DOMAIN = `${SITE.domain}/amp`;

export function url(path = '') {
  if (!path.startsWith('/')) path = `/${path}`;
  return `${SITE.domain}${path}`;
}

export function canonical(path = '/') {
  return url(path);
}

export function amphtml(path = '/') {
  if (!path.startsWith('/')) path = `/${path}`;
  return `${AMP_DOMAIN}${path}`;
}

export function sanitizeSlug(str = '') {
  return encodeURIComponent(
    String(str)
      .toLowerCase()
      .replace(/<[^>]*>?/gm, '')
      .replace(/["']/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim(),
  );
}

export function stripHTML(html = '') {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function cleanDescription(str = '') {
  return stripHTML(str).replace(/\s+/g, ' ').trim();
}

export function readingTime(text = '') {
  const words = stripHTML(text).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function ogImage(slug = '') {
  return slug ? url(`/og/${sanitizeSlug(slug)}`) : url(SITE.defaultImage);
}

export function escapeHTML(str = '') {
  return String(str).replace(/[&<>"]/g, (s) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
  })[s] || s);
}

export function escapeXML(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
