# Data model

All data is normalized by ticker and carries freshness/quality metadata where relevant.

| Domain | Core type | Required concepts |
|---|---|---|
| Stock metadata | `StockMeta` | ticker, company, sector, themes, description |
| Market | `MarketQuote` | price, daily change, market cap, multiples, returns, currency, `updatedAt`, quality |
| Fundamentals | `FundamentalSnapshot` | growth, margin, period, `updatedAt`, quality |
| Research | `Thesis` | classification, score set, thesis, scenarios, drivers, breakers, catalyst/risk, `reviewedAt` |
| KPI | `Kpi` | ticker-specific definition, current/previous, direction, target, status, source, update, quality |
| Catalyst | `Catalyst` | category, expected date, importance, status, notes |
| Risk | `Risk` | category, severity, probability, trend, description, reviewed date |
| History | `ThesisHistory` | immutable dated scores, status, summary, reason |

## Scores

Valid range is 1–10. Growth, valuation, execution, competitive position, catalyst strength, financial quality, momentum, and thesis use 10 = strongest. `riskSeverity` is clearly named and uses 10 = most severe. Scoring weights are configuration, not UI logic.

## Freshness

- `MarketQuote.updatedAt`: market snapshot generation time
- `FundamentalSnapshot.updatedAt`: financial dataset refresh time
- `Thesis.reviewedAt`: analyst review date, independent of price data
- `Kpi.updatedAt`: metric/source observation time
- `quality`: `sample`, `verified`, `needs-refresh`, or `unknown`

Unknown facts should be `null` or a visible “Needs refresh”; they must not be replaced with plausible-looking values. A future industry dataset should follow the same pattern with `industryDataUpdatedAt`, source, period, and quality.

## Validation rules

- Ticker must be present and known.
- Scores must be finite and between 1 and 10.
- Major snapshots require parseable refresh timestamps.
- Categories should use declared unions; unknown vendor values must be mapped or rejected.
- Bad imports fail before replacing the last known-good generated JSON. The UI should show an error instead of silently substituting live-looking data.
