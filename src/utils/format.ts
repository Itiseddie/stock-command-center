export const formatPrice=(n:number|null,currency='USD')=>n==null?'Unknown':new Intl.NumberFormat('en-US',{style:'currency',currency,maximumFractionDigits:2}).format(n);
export const formatCap=(n:number|null)=>n==null?'Unknown':n>=1000?`$${(n/1000).toFixed(2)}T`:`$${n.toFixed(1)}B`;
export const formatPct=(n:number|null)=>n==null?'Unknown':`${n>0?'+':''}${n.toFixed(1)}%`;
export const shortDate=(d:string)=>new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(d));
export const ageInDays=(d:string,now=new Date())=>Math.max(0,Math.floor((now.getTime()-new Date(d).getTime())/86400000));
