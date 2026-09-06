# SEO and AI discoverability review

Reviewed and implemented September 6, 2026. Scope: the current Zulo Astro/Vercel site, including the existing uncommitted redesign and published writing. These changes are local; this review did not publish a deployment.

## Findings and changes

| Finding | Implementation |
| --- | --- |
| No sitemap or robots file | Build `/sitemap.xml` from the same published collection used by page routes and RSS. `/robots.txt` permits public crawling, excludes the contact API, and advertises the sitemap. This preserves the previously unrestricted policy for public content, including AI crawlers. |
| Canonicals could differ by trailing slash | Strip query strings, fragments, and trailing slashes from canonical URLs. Configure Vercel's generated routing to redirect trailing slashes; explicitly disable RSS's default trailing slash insertion. |
| Marketing titles were mostly brand/CTA language | Use descriptive titles for AI strategy, automation, applied AI insights, and contacting Daniel. Keep the page copy and visual design. |
| Only the homepage identified the author in structured data | Add linked Person, Organization, WebSite, and page entities. Services use descriptions already visible on the homepage. Contact and insights use appropriate page types. |
| Articles lacked structured data and a visible byline | Add BlogPosting and BreadcrumbList data, a linked Daniel Zuloaga byline, publication dates, and modification dates when supplied. Use relevant article images where present. |
| Date-only frontmatter could display a day early | Format publication and update labels in UTC, matching the content dates. Do not manufacture update dates for unchanged content. |
| Public pages rendered on each request | Prerender the homepage, contact page, insights, and published posts. Keep the contact API on the server and BotID on the contact page. Publishing content requires a rebuild/deployment. |
| Article heroes lacked reserved dimensions | Record the existing images' intrinsic dimensions and render width/height attributes. Preserve the original assets and social previews. |
| Missing-page template had no explicit indexing policy | Use a shared noindex 404 page. Verify Vercel emits a 404 status for the fallback and does not create draft routes. |
| Social metadata lacked image descriptions and preview policy | Preserve the existing 1200 × 630 `/og.jpg`; add image alt metadata, default-image dimensions, locale, and `max-image-preview:large`. |

The existing site already provides server-visible text, descriptive article summaries, crawlable internal links, native FAQ disclosures, and a substantive practitioner biography. These are useful foundations for search and AI retrieval. The review did not add invented credentials, results, testimonials, or additional promotional content.

Structured data is escaped before insertion into HTML, so content containing an HTML closing tag cannot terminate the JSON-LD script.

## AI discoverability approach

AI optimization here means making the real pages easy to retrieve, identify, and attribute. Google documents that its AI features rely on ordinary search eligibility and do not require special AI schema or additional text files. This implementation therefore focuses on consistent URLs, public HTML, authorship, accurate metadata, and internal discovery. It does not claim guaranteed ranking or AI citations. [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features).

Article markup follows Google's guidance on describing an article's author, title, relevant images, and publication dates. [Google: Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article).

Public routes opt into Astro prerendering while retaining the existing server adapter for the contact endpoint. [Astro: On-demand rendering](https://docs.astro.build/en/guides/on-demand-rendering/).

## Verification

Run `pnpm build`, then `pnpm check:seo` (Python 3; standard library only). The audit checks the generated Vercel artifacts:

- Exact sitemap and RSS membership: nine public pages, six articles, one excluded draft at review time.
- A single H1 and canonical per indexable page, unique descriptions and social titles, image files, and preview metadata.
- Parseable JSON-LD, stable entity IDs, visible author attribution, article dates, breadcrumbs, and hero dimensions.
- Internal links and fragment destinations, including Markdown article content.
- Noindex/no canonical on the error page, a 404 fallback, trailing-slash redirects, and the server contact route.

Local HTTP checks returned 200 for public pages and discovery endpoints, and 404 for a draft and an unknown URL. No contact submission was sent. A local build and artifact audit do not substitute for production crawler inspection or field performance measurements.

## After deployment

1. Submit `https://www.zulo.dev/sitemap.xml` in Google Search Console and Bing Webmaster Tools; inspect the homepage and a representative article.
2. Run the public article through Google's Rich Results Test and check rendered HTML in URL Inspection. Confirm hosting protection permits search crawlers.
3. Monitor indexed pages, search queries, organic contact conversions, and identifiable AI referrals. Compare real observations over time rather than treating markup as proof of visibility.
4. Measure mobile Core Web Vitals. Some original article images remain large (the newest PNG is about 3 MB); responsive image derivatives and font delivery are the next performance opportunities. Intrinsic dimensions reserve space but do not reduce download size.

Search Console ownership, production indexing, crawler access at the hosting layer, and field performance were not verified in this local implementation.

## Live-review follow-up

Canonical metadata now uses `https://www.zulo.dev`, matching the existing primary host. Image delivery now uses Astro’s native optimizer, with responsive source selection and automatic dimensions for inline images as well as heroes. See [Image delivery](image-delivery.md) for the implementation and high-DPI validation. The Vercel project-domain redirect is managed separately from the application route configuration.
