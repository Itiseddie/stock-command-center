import type { ScoreSet } from '../types';
export const scoringWeights = { growth:.2, valuation:.16, execution:.16, competitive:.15, catalyst:.12, financialQuality:.14, riskAdjustment:.07 } as const;
/** Risk Severity is the sole inverted score: 10 = highest risk. All other dimensions: 10 = strongest. */
export function calculateWeightedScore(s:ScoreSet){ const riskSafety=11-s.riskSeverity; return Number((s.growth*scoringWeights.growth+s.valuation*scoringWeights.valuation+s.execution*scoringWeights.execution+s.competitive*scoringWeights.competitive+s.catalyst*scoringWeights.catalyst+s.financialQuality*scoringWeights.financialQuality+riskSafety*scoringWeights.riskAdjustment).toFixed(1)); }
