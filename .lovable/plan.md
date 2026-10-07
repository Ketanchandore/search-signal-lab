# Multi-account SEO Opportunity Assistant

## Goal
Allow every signed-in user to connect their own Google Search Console, Google Analytics 4, and Bing Webmaster accounts; import their accessible sites/properties; select one website; and get a detailed, evidence-based SEO opportunity report and follow-up chat.

## What will change
- Replace the current manual “provider + property name” entries with real per-user account connections and property discovery. Support multiple accounts and projects, and let the user map the exact GSC, GA4, and Bing properties to a website. Never guess when provider properties are ambiguous.
- Add secure connection, callback, refresh, disconnect, property-list, and reporting flows. Google Search Console and GA4 use each user’s own OAuth consent with read-only scopes. Bing Webmaster uses that user’s Webmaster API credential if the provider’s API flow requires it. Keep credentials and provider responses on the server; encrypt stored credentials, scope them to the authenticated user, and apply RLS and grants to new database tables.
- Add a selected-project workspace and date range. On request, retrieve real Search Console queries/pages, GA4 landing-page/acquisition metrics, and Bing query/page/rank metrics for the selected project, reporting only providers actually connected and authorized.
- Upgrade the AI assistant to analyze those fetched metrics alongside the selected project’s latest site audit. Produce prioritized opportunities with the supporting query/page, observed values and period, recommended change, and expected rationale. Persist chat/report history per user and selected project. Do not invent, repeat, or present mock numbers as provider results; surface missing permissions, empty data, quota failures, and partial source coverage clearly.
- Update the Connections and Assistant screens for account linking, discovered project selection, provider mapping, refresh status, date-range choice, data-source coverage, and report states.

## Technical details
- Use authenticated TanStack server functions for provider OAuth callbacks/exchanges, credential handling, data retrieval, and AI context assembly; keep all provider credentials and raw tokens server-only.
- Use read-only Google scopes for Search Console and Analytics. Store only encrypted provider credentials and the minimum metadata needed to reconnect and map properties. Enforce user ownership in every read/write and use RLS policies with explicit Data API grants for any new public tables.
- Verify selected property identifiers against the currently connected account before every provider query. Keep report/history queries tied to both authenticated user and project; do not use a shared connection slot or builder-owned account data.
- Google and Bing require provider-side setup before real connections can work: an OAuth application and authorized callback for Google, and a per-user Bing Webmaster API credential where required. The app cannot create or infer these external credentials. Provide the exact callback/setup steps and request any needed credentials only after the implementation is approved.
- Preserve the current sign-in system and the authenticated sidebar. Do not change unrelated SEO tools or rankings claims.

## Acceptance checks
- A signed-in user can independently connect/disconnect each supported account, import multiple real properties, and choose the exact properties attached to a selected website.
- A selected project’s report is based on live authorized API responses and visibly identifies provider coverage, date range, and refresh status; no demo or deterministic substitute data is shown.
- The assistant recommends query/page-level next actions only when supported by retrieved evidence, and retains history without exposing another user’s projects or credentials.
- Expired consent, missing scope, no verified property, no data, provider quota/error, and partial-provider availability have clear actionable states.
- Build and authenticated/public route checks pass; confirm the OAuth callback and project selection flows in the preview where provider credentials permit.
