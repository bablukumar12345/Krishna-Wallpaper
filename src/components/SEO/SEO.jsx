import { useEffect } from 'react';

/**
 * Minimal dependency-free SEO helper. Updates the document title and the
 * core meta tags on route change so every page ships distinct SEO metadata
 * even though this is a client-rendered SPA.
 */
function setMeta(name, content, attr = 'name') {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function SEO({
  title,
  description,
  image = '/images/logo/og-image.jpg',
  url,
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Krishna Wallpaper` : 'Krishna Wallpaper';
    document.title = fullTitle;

    setMeta('description', description);
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:image', image, 'property');
    setMeta('og:type', 'website', 'property');
    if (url) setMeta('og:url', url, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
  }, [title, description, image, url]);

  return null;
}
