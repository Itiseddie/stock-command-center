import {stocks} from './stocks'; import {marketQuotes,fundamentals} from './market'; import {research} from './research'; import {kpis} from './kpis'; import type {StockView,Ticker} from '../types';
export const stockViews:StockView[]=stocks.map(meta=>({meta,market:marketQuotes.find(x=>x.ticker===meta.ticker)!,fundamentals:fundamentals.find(x=>x.ticker===meta.ticker)!,thesis:research.find(x=>x.ticker===meta.ticker)!,kpis:kpis.filter(x=>x.ticker===meta.ticker)}));
export const getStock=(ticker:Ticker)=>stockViews.find(s=>s.meta.ticker===ticker);
