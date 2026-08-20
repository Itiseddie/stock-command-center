import type { MarketQuote, Ticker } from '../types';
import { marketQuotes } from '../data/market';
export interface MarketDataProvider { getQuote(ticker:Ticker):Promise<MarketQuote>; getQuotes(tickers:Ticker[]):Promise<MarketQuote[]>; }
export class StaticMarketDataProvider implements MarketDataProvider {
 async getQuote(ticker:Ticker){const quote=marketQuotes.find(q=>q.ticker===ticker);if(!quote)throw new Error(`No quote for ${ticker}`);return structuredClone(quote)}
 async getQuotes(tickers:Ticker[]){return Promise.all(tickers.map(t=>this.getQuote(t)))}
}
export const marketDataProvider=new StaticMarketDataProvider();
