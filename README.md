# Stock Command Center

Stock Command Center is a static, professional-grade personal equity research dashboard for ranking opportunities, comparing companies, tracking catalysts and risks, and preserving a thesis decision trail. It is decision support—not a trading system.

> Data safety: all V1 market and fundamental values are deliberately marked **Sample / Not live**. Research values are editable baselines and should be verified before use.

## Features

- Dense, sortable universe table and mobile stock cards
- Combined theme, status, risk, score, valuation, growth, and momentum screener
- Eight configurable companies: RKLB, MU, SNDK, NVDA, AMD, AVGO, PLTR, ASML
- Research detail pages with scenarios, drivers, breakers, scorecards, KPI templates, catalysts, risks, and history
- 2–5 stock comparison, including a useful default MU vs SNDK view
- Catalyst calendar, risk monitor, thesis change log, and local watchlist classifications
- Dark/light themes, keyboard focus, stale-data warnings, loading/success/error refresh states
- Vendor-neutral `MarketDataProvider`, GitHub refresh scaffold, tests, and Pages deployment

## Screenshots

Run the app locally, then capture the Overview, MU detail, Screener, and mobile views. Store approved images under `docs/screenshots/` and link them here.

## Tech stack

React, TypeScript, Vite, plain CSS, Vitest, and GitHub Actions. There is no backend and no heavyweight UI or chart dependency.

## Architecture

UI modules consume normalized `StockView` records assembled from separate metadata, market, fundamental, research, KPI, catalyst, risk, and history sources. The browser reads a static provider today. See [Architecture](docs/ARCHITECTURE.md) and [Data Model](docs/DATA_MODEL.md).

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm test
npm run lint
npm run build
npm run preview
```

## Adding a stock

1. Extend `Ticker` in `src/types/index.ts`.
2. Add metadata in `src/data/stocks.ts`.
3. Add a quote and fundamental snapshot in `src/data/market.ts` (use `null` and `unknown` when unverified).
4. Add its thesis in `src/data/research.ts` and KPI definitions in `src/data/kpis.ts`.
5. Optionally add catalysts, risks, and history in `src/data/events.ts`.
6. Run `npm test && npm run build`.

## Updating scores and research

Edit the ticker's single record in `src/data/research.ts`. Add a new immutable event to `src/data/events.ts` whenever a score or classification changes. Record the date, prior/current scores, summary, and reason. Research status remains explicitly authored in V1; it is not auto-generated.

## Market data refresh (V1)

The in-app **Refresh data** button rereads the static provider, updates loading/success/error UI, and reiterates the dataset timestamp. It does **not** call a live API. `npm run refresh:data` updates the generated sample file timestamp for workflow plumbing only and never relabels it as live.

The scheduled workflow runs on weekdays and via manual dispatch. Until a provider adapter is implemented it preserves sample data. If implemented later, only GitHub Actions may read `MARKET_DATA_API_KEY`.

## API integration

Implement `MarketDataProvider` in `src/services/marketData.ts`, normalize vendor output, validate it, and generate `public/data/generated-market.json` in Actions. Never import a private secret into Vite client code.

## Security

- No credentials belong in source, HTML, `.env` files committed to git, or `VITE_*` variables.
- Add a repository Actions secret named `MARKET_DATA_API_KEY` only after choosing a provider and implementing its adapter.
- Client-side refresh cannot securely use private credentials on GitHub Pages.

## GitHub Pages deployment

1. Create a repository named `stock-command-center` and push this project to `main`.
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
3. The `Deploy GitHub Pages` workflow tests, builds, uploads, and deploys `dist`.
4. The expected URL is `https://USERNAME.github.io/stock-command-center/`.

Vite's base path is `/stock-command-center/`. Navigation is an in-page SPA with optional ticker hashes, so static-host refreshes do not require route fallbacks.

## Roadmap

- Phase 2 secure on-demand refresh through a minimal Cloudflare Worker or equivalent serverless function
- Real provider normalizers and filing-derived fundamentals
- Verified source links, charts, import/export, and rule-based classifications with documented policies
- Larger configurable universe and lazy-loaded historical series
