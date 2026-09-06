"""Validate crawlable production HTML, structured data, and discovery feeds.

Run `pnpm check:seo` after building. Uses only Python's standard library.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / '.vercel/output/static'
ORIGIN = 'https://www.zulo.dev'
NS = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.tags = []
        self.text = []
        self.schemas = []
        self.schema = None
        self.feed(path.read_text())

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.schema = ''

    def handle_endtag(self, tag):
        if tag == 'script' and self.schema is not None:
            self.schemas.append(json.loads(self.schema))
            self.schema = None

    def handle_data(self, data):
        if self.schema is not None:
            self.schema += data
        else:
            self.text.append(data)

    def elements(self, tag, **attrs):
        return [a for t, a in self.tags if t == tag and all(a.get(k) == v for k, v in attrs.items())]

    def elements_id(self, value):
        return any(attrs.get('id') == unquote(value) for _, attrs in self.tags)

    def meta(self, key):
        found = [a['content'] for t, a in self.tags if t == 'meta' and (a.get('name') == key or a.get('property') == key)]
        assert len(found) == 1, f'Missing or duplicate metadata: {key}'
        return found[0]


def output_path(url):
    path = OUTPUT / unquote(urlsplit(url).path).lstrip('/')
    return path if path.is_file() else path / 'index.html'


def check():
    assert OUTPUT.exists(), 'Run pnpm build first.'
    sitemap = ET.parse(OUTPUT / 'sitemap.xml')
    urls = [entry.find('s:loc', NS).text for entry in sitemap.findall('s:url', NS)]
    posts = []
    drafts = []
    for path in (ROOT / 'src/content/blog').glob('*.md'):
        frontmatter = path.read_text().split('---', 2)[1]
        (drafts if re.search(r'^draft:\s*true\s*$', frontmatter, re.M) else posts).append(path.stem)
    expected = {ORIGIN + p for p in ['/', '/blog', '/contact'] + ['/blog/' + slug for slug in posts]}
    assert len(urls) == len(set(urls)) and set(urls) == expected, 'Sitemap differs from published routes'
    robots = (OUTPUT / 'robots.txt').read_text()
    assert 'User-agent: *\nAllow: /\nDisallow: /api/' in robots
    assert f'Sitemap: {ORIGIN}/sitemap.xml' in robots
    rss_links = [item.findtext('link') for item in ET.parse(OUTPUT / 'rss.xml').findall('./channel/item')]
    assert set(rss_links) == {ORIGIN + '/blog/' + slug for slug in posts}, 'RSS differs from published posts'
    titles = set()
    descriptions = set()
    for url in urls:
        path = output_path(url)
        assert path.exists(), f'No static HTML for {url}'
        page = Page(path)
        assert len(page.elements('h1')) == 1, f'{url}: expected one H1'
        assert page.elements('html', lang='en'), f'{url}: missing language'
        assert page.elements('link', rel='canonical') == [{'rel': 'canonical', 'href': url}], f'{url}: wrong canonical'
        assert 'noindex' not in page.meta('robots')
        assert 'max-image-preview:large' in page.meta('robots')
        assert page.meta('og:url') == url
        assert 'https://zulo.dev' not in path.read_text(), f'{url}: stale non-www URL'
        assert page.meta('og:title') not in titles, f'{url}: duplicate title'
        titles.add(page.meta('og:title'))
        assert page.meta('description') not in descriptions, f'{url}: duplicate description'
        descriptions.add(page.meta('description'))
        assert page.meta('og:description') == page.meta('description') == page.meta('twitter:description')
        assert page.meta('twitter:image') == page.meta('og:image')
        assert page.meta('og:image:alt') and page.meta('twitter:image:alt')
        assert output_path(page.meta('og:image')).exists(), f'{url}: missing social image'
        assert page.elements('link', rel='alternate', type='application/rss+xml')
        assert len(page.schemas) == 1
        graph = page.schemas[0]['@graph']
        assert page.schemas[0]['@context'] == 'https://schema.org'
        nodes = {node['@id']: node for node in graph}
        assert len(nodes) == len(graph), f'{url}: duplicate schema IDs'
        for kind in ['Person', 'Organization', 'WebSite']:
            assert any(node['@type'] == kind for node in graph), f'{url}: missing {kind}'
        assert nodes[ORIGIN + '/#person']['name'] == 'Daniel Zuloaga'
        visible = ' '.join(page.text)
        if '/blog/' in url:
            article = nodes[url + '#article']
            assert article['@type'] == 'BlogPosting'
            assert article['headline'] in visible and article['description'] in visible
            assert page.elements('a', rel='author', href='/#about'), f'{url}: missing visible author'
            assert 'Daniel Zuloaga' in visible
            assert page.elements('time', datetime=article['datePublished'])
            assert article['datePublished'] == page.meta('article:published_time')
            if 'image' in article:
                hero = page.elements('img', src=urlsplit(article['image']).path)
                assert hero and int(hero[0]['width']) > 0 and int(hero[0]['height']) > 0, f'{url}: hero missing dimensions'
            if 'dateModified' in article:
                assert page.elements('time', datetime=article['dateModified'])
                assert article['dateModified'] == page.meta('article:modified_time')
            assert article['author']['@id'] in nodes
            assert article['publisher']['@id'] in nodes
            assert article['mainEntityOfPage']['@id'] == url + '#webpage'
            crumbs = nodes[url + '#breadcrumb']['itemListElement']
            assert [crumb['position'] for crumb in crumbs] == [1, 2, 3]
            assert crumbs[-1]['item'] == url
        for image in page.elements('img'):
            assert int(image.get('width', 0)) > 0 and int(image.get('height', 0)) > 0, f'{url}: missing dimensions'
            if image.get('src', '').startswith(('/_astro/', '/blog/')):
                assert image.get('sizes'), f'{url}: missing responsive sizes'
                candidates = [candidate.strip().split() for candidate in image.get('srcset', '').split(',')]
                assert len(candidates) >= 2, f'{url}: missing responsive variants'
                for src, width in candidates:
                    assert width.endswith('w') and int(width[:-1]) > 0
                    assert output_path(src).is_file(), f'{url}: missing responsive image {src}'
        # Check internal links and fragments against actual output, including Markdown links.
        for tag, attrs in page.tags:
            target = attrs.get('href') if tag == 'a' else attrs.get('src') if tag == 'img' else None
            if not target or not target.startswith(('/', '#')) or target.startswith('//'):
                continue
            destination = output_path(target) if not target.startswith('#') else path
            assert destination.exists(), f'{url}: broken {tag} target {target}'
            fragment = urlsplit(target).fragment
            if fragment and destination.suffix == '.html':
                assert Page(destination).elements_id(fragment), f'{url}: missing fragment {target}'
    for slug in drafts:
        assert not output_path('/blog/' + slug).exists(), f'Draft has public HTML: {slug}'
    missing = Page(OUTPUT / '404.html')
    assert 'noindex' in missing.meta('robots')
    assert not missing.elements('link', rel='canonical') and not missing.schemas
    routes = json.loads((ROOT / '.vercel/output/config.json').read_text())['routes']
    assert any(route.get('src') == '^/api/contact$' and route.get('dest') == '_render' for route in routes)
    assert any(route.get('status') == 404 and route.get('dest') == '/404.html' for route in routes)
    assert any(route.get('status') == 308 and route.get('headers', {}).get('Location') == '/$1' for route in routes)
    print(f'SEO audit passed: {len(urls)} pages, {len(posts)} articles, {len(drafts)} excluded draft(s), RSS, sitemap, robots, links, JSON-LD, and Vercel routing.')


if __name__ == '__main__':
    check()
