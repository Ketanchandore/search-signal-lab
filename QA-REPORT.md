# QA Report — SEOAcademys

Run date: 7 August 2026 · Tool: Playwright (Chromium, headless) · Target: local dev build

## Viewports tested

| Viewport | Size |
| --- | --- |
| Mobile | 390 × 844 |
| Tablet | 768 × 1024 |
| Desktop | 1280 × 900 |

## Pages tested

`/`, `/tools`, `/blog`, `/changelog`, `/contact`, `/privacy`, `/tools/seo-audit-hub`

## Results

| Check | Mobile | Tablet | Desktop |
| --- | --- | --- | --- |
| HTTP 200 on every page | Pass | Pass | Pass |
| Horizontal scroll (must be none) | None | None | None |
| Exactly one `<h1>` per page | Pass | Pass | Pass |
| Unique, non-default `<title>` per page | Pass | Pass | Pass |
| Console errors | 0 | 0 | 0 |

Mobile tool page screenshot captured at `/tools/seo-audit` — sidebar drawer trigger, scrollable tool list and bottom tab bar all render inside the viewport.

## Notes

- Cookie consent banner sits above the mobile bottom nav (`bottom-16` on small screens) so it never covers navigation.
- Ad slots render nothing until both `VITE_ADS_ENABLED=true` and consent is granted, so they cannot cause layout shift pre-approval.
- GA4 loads on the `load` event with Consent Mode v2 defaults set to `denied`, keeping it off the critical rendering path.

## Outstanding manual steps

1. Replace the placeholder business address on `/contact` before AdSense review.
2. Set `VITE_ADSENSE_CLIENT` and `VITE_ADS_ENABLED` once AdSense approves the site.
