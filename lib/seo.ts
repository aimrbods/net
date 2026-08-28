import { SITE, canonical, cleanDescription, ogImage, sanitizeSlug } from './config';

export function schemaFor({
  title = '', description = '', slug = '', image = '', published = '', updated = '', kategori = '',
}: {
  title?: string; description?: string; slug?: string; image?: string; published?: string; updated?: string; kategori?: string;
}) {
  const cleanDesc = cleanDescription(description);
  const safeSlug = sanitizeSlug(slug);
  const isHome = !safeSlug;
  const pageUrl = canonical(isHome ? '/' : `/${safeSlug}`);
  const schemas: any[] = [];

  if (isHome) {
    schemas.push({ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.domain });
    schemas.push({ '@context': 'https://schema.org', '@type': 'WebPage', name: title || SITE.name, url: pageUrl, description: cleanDesc });
  } else {
    schemas.push({
      '@context': 'https://schema.org', '@type': 'BlogPosting', headline: title, description: cleanDesc,
      image: image || ogImage(safeSlug), url: pageUrl, mainEntityOfPage: pageUrl,
      datePublished: published || new Date().toISOString(), dateModified: updated || published || new Date().toISOString(),
      articleSection: kategori || 'Artikel', author: { '@type': 'Organization', name: SITE.name },
      publisher: { '@type': 'Organization', name: SITE.name },
    });
  }

  const items: any[] = [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain }];
  if (!isHome) {
    if (kategori) items.push({ '@type': 'ListItem', position: 2, name: kategori, item: canonical(`/kategori/${sanitizeSlug(kategori)}`) });
    items.push({ '@type': 'ListItem', position: kategori ? 3 : 2, name: title, item: pageUrl });
  }
  schemas.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items });
  return schemas;
}
