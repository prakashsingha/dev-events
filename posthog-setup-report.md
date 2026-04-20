# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Next.js Dev Events app. The following changes were made:

- **`instrumentation-client.ts`** (new file): Initializes PostHog client-side using `posthog-js` via the Next.js 15.3+ instrumentation API. Configured with a reverse proxy (`/ingest`), exception capture, and debug mode in development.
- **`next.config.ts`**: Added reverse proxy rewrites for PostHog ingestion (`/ingest/*` → `https://us.i.posthog.com/*`) and set `skipTrailingSlashRedirect: true`.
- **`.env.local`**: Added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.
- **`components/ExploreBtn.tsx`**: Added `explore_events_clicked` capture to the existing click handler.
- **`components/EventCard.tsx`**: Converted to a client component; added `event_card_clicked` capture with event metadata properties on link click.
- **`components/Navbar.tsx`**: Converted to a client component; added `nav_link_clicked` capture for each navigation link with a `label` property.

| Event | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicked the "Explore Events" CTA button on the homepage hero | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card to view event details | `components/EventCard.tsx` |
| `nav_link_clicked` | User clicked a navigation link in the navbar | `components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/389455/dashboard/1487531
- **Explore Events CTA clicks over time**: https://us.posthog.com/project/389455/insights/4QJ6SMGI
- **Event card clicks by event**: https://us.posthog.com/project/389455/insights/4YfBvWjh
- **CTA to event click conversion funnel**: https://us.posthog.com/project/389455/insights/kffCVydK
- **Nav link click breakdown**: https://us.posthog.com/project/389455/insights/Ms223Zfa
- **Unique users engaging with events**: https://us.posthog.com/project/389455/insights/zrlBJdL2

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
