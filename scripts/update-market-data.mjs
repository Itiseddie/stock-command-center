import {readFile,writeFile} from 'node:fs/promises';
const file=new URL('../public/data/generated-market.json',import.meta.url);
const existing=JSON.parse(await readFile(file,'utf8'));
// V1 safe fallback: preserve sample payload when no server-side provider is configured.
// Future adapters may read MARKET_DATA_API_KEY only inside GitHub Actions.
const output={...existing,generated_at:new Date().toISOString(),provider:process.env.MARKET_DATA_API_KEY?'provider-not-implemented':'static-sample',quality:'sample',notice:'Illustrative data only. Not live market data.'};
await writeFile(file,JSON.stringify(output,null,2)+'\n');
console.log(`Refreshed ${file.pathname}; provider=${output.provider}; quality=${output.quality}`);
