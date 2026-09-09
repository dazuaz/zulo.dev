export const siteIdentity = {
  name: 'Zulo',
  author: 'Daniel Zuloaga',
  title: 'AI Strategy, Automation & Custom Systems | Zulo',
  description: 'AI strategy, custom systems, and hands-on implementation for businesses already building with AI. Zulo takes your prototype and turns it into software your team can depend on.',
  image: '/og/zulo.png',
  imageAlt: 'Zulo — You have the prototype. We build. AI transformation with Daniel Zuloaga.',
  profiles: [
    'https://x.com/danielzuloaga',
    'https://www.linkedin.com/in/daniel-zuloaga/',
    'https://github.com/dazuaz',
  ],
};

/** Keep query strings, fragments, and trailing-slash variants out of canonical URLs. */
export function canonicalUrl(path: string, site: URL): string {
  const url = new URL(path, site);
  url.search = '';
  url.hash = '';
  url.pathname = url.pathname.replace(/\/+$/, '') || '/';
  return url.toString();
}

/** Inline JSON must not be able to terminate its script element. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function identityGraph(site: URL) {
  const home = canonicalUrl('/', site);
  return [
    {
      '@type': 'Person',
      '@id': `${home}#person`,
      name: siteIdentity.author,
      url: canonicalUrl('/about', site),
      jobTitle: 'AI Transformation Partner',
      sameAs: siteIdentity.profiles,
      worksFor: { '@id': `${home}#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${home}#organization`,
      name: siteIdentity.name,
      url: home,
      description: siteIdentity.description,
      founder: { '@id': `${home}#person` },
    },
    {
      '@type': 'WebSite',
      '@id': `${home}#website`,
      url: home,
      name: siteIdentity.name,
      description: siteIdentity.description,
      inLanguage: 'en-US',
      publisher: { '@id': `${home}#organization` },
    },
  ];
}
