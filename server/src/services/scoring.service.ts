import { BANTAnalysis, Classification } from "../types";

export class ScoringService {
  calculateTotalScore(analysis: BANTAnalysis): number {
    return (
      analysis.budget.score +
      analysis.authority.score +
      analysis.need.score +
      analysis.timeline.score
    );
  }

  classify(totalScore: number): Classification {
    if (totalScore >= 75) return "hot";
    if (totalScore >= 40) return "warm";
    return "cold";
  }
}

export const scoringService = new ScoringService();
