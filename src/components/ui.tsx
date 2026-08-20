import type {InvestmentStatus,RiskLevel} from '../types';
export function Badge({children,tone='neutral'}:{children:React.ReactNode;tone?:string}){return <span className={`badge badge-${tone}`}>{children}</span>}
export const StatusBadge=({value}:{value:InvestmentStatus})=><Badge tone={value.includes('Buy')?'positive':value==='Watch'?'warning':value==='Avoid'||value==='Trim'?'negative':'neutral'}>{value}</Badge>;
export const RiskBadge=({value}:{value:RiskLevel})=><Badge tone={value==='Very High'?'negative':value==='High'?'warning':'neutral'}>{value}</Badge>;
export function Score({value,label}:{value:number;label?:string}){const tone=value>=8.5?'positive':value>=7?'accent':value>=5?'warning':'negative';return <span className={`score score-${tone}`} title={label?`${label}: ${value}/10`:undefined}>{value.toFixed(1)}</span>}
export function Empty({title,body}:{title:string;body:string}){return <div className="empty"><strong>{title}</strong><p>{body}</p></div>}
export function PageHeader({eyebrow,title,description,actions}:{eyebrow?:string;title:string;description:string;actions?:React.ReactNode}){return <header className="page-header"><div>{eyebrow&&<div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1><p>{description}</p></div>{actions&&<div className="page-actions">{actions}</div>}</header>}
