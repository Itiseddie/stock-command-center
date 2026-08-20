export type Ticker = 'RKLB'|'MU'|'SNDK'|'NVDA'|'AMD'|'AVGO'|'PLTR'|'ASML';
export type InvestmentStatus = 'Strong Buy / Add'|'Buy / Add'|'Hold'|'Watch'|'Trim'|'Avoid';
export type RiskLevel = 'Low'|'Moderate'|'High'|'Very High';
export type ValuationLabel = 'Very Attractive'|'Attractive'|'Fair'|'Expensive'|'Extreme';
export type GrowthLabel = 'Exceptional'|'High'|'Moderate'|'Low';
export type MomentumLabel = 'Strong Positive'|'Positive'|'Neutral'|'Negative'|'Strong Negative';
export type DataQuality = 'sample'|'verified'|'needs-refresh'|'unknown';
export type ScoreSet = { thesis:number; growth:number; valuation:number; execution:number; competitive:number; catalyst:number; financialQuality:number; momentum:number; riskSeverity:number };
export interface StockMeta { ticker:Ticker; company:string; sector:string; themes:string[]; description:string }
export interface MarketQuote { ticker:Ticker; price:number|null; dailyChangePct:number|null; marketCapB:number|null; forwardPE:number|null; ytdReturnPct:number|null; currency:string; updatedAt:string; quality:DataQuality }
export interface FundamentalSnapshot { ticker:Ticker; revenueGrowthPct:number|null; epsGrowthPct:number|null; grossMarginPct:number|null; period:string; updatedAt:string; quality:DataQuality }
export interface Thesis { ticker:Ticker; status:InvestmentStatus; riskLevel:RiskLevel; valuationLabel:ValuationLabel; growthLabel:GrowthLabel; momentumLabel:MomentumLabel; scores:ScoreSet; core:string; drivers:string[]; bullCase:string; baseCase:string; bearCase:string; breakers:string[]; biggestCatalyst:string; biggestRisk:string; reviewedAt:string }
export type KpiStatus='Strong'|'Healthy'|'Watch'|'Weak'|'Critical';
export interface Kpi { ticker:Ticker; label:string; value:string; previous?:string; direction:'up'|'down'|'flat'|'unknown'; target?:string; status:KpiStatus; updatedAt:string; source:string; notes?:string; quality:DataQuality }
export interface Catalyst { id:string; ticker:Ticker; title:string; category:'earnings'|'product'|'launch'|'regulatory'|'contract'|'manufacturing'|'investor event'|'technology milestone'|'macro/industry'; expectedDate:string; importance:'High'|'Medium'|'Low'; status:'Upcoming'|'Completed'|'Delayed'|'Cancelled'|'Unknown'; notes:string }
export interface Risk { id:string; ticker:Ticker; title:string; category:string; severity:RiskLevel; probability:'Low'|'Medium'|'High'|'Unknown'; trend:'Improving'|'Stable'|'Worsening'; description:string; lastReviewed:string }
export interface ThesisHistory { ticker:Ticker; date:string; scores:Pick<ScoreSet,'thesis'|'valuation'|'growth'|'execution'|'riskSeverity'>; status:InvestmentStatus; summary:string; reason:string }
export type WatchState='Core Holding'|'Position'|'Watchlist'|'Research'|'Avoid';
export interface StockView { meta:StockMeta; market:MarketQuote; fundamentals:FundamentalSnapshot; thesis:Thesis; kpis:Kpi[] }
