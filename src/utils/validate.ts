import type { MarketQuote } from '../types';
export function validateScore(score:number){if(!Number.isFinite(score)||score<1||score>10)throw new Error('Score must be between 1 and 10');return score}
export function validateMarketQuote(input:unknown):input is MarketQuote {if(!input||typeof input!=='object')return false;const q=input as Partial<MarketQuote>;return typeof q.ticker==='string'&&typeof q.updatedAt==='string'&&!Number.isNaN(Date.parse(q.updatedAt))&&['sample','verified','needs-refresh','unknown'].includes(q.quality??'')}
