import { ScoringService } from "./scoring.service";
import { BANTAnalysis } from "../types";

// Helper: creates a BANTAnalysis with specified scores
function createAnalysis(
  budgetScore: number,
  authorityScore: number,
  needScore: number,
  timelineScore: number
): BANTAnalysis {
  return {
    budget: {
      detected: budgetScore > 0,
      confidence: "high",
      score: budgetScore,
      evidence: "test evidence",
      summary: "test summary",
    },
    authority: {
      detected: authorityScore > 0,
      confidence: "high",
      score: authorityScore,
      evidence: "test evidence",
      summary: "test summary",
    },
    need: {
      detected: needScore > 0,
      confidence: "high",
      score: needScore,
      evidence: "test evidence",
      summary: "test summary",
    },
    timeline: {
      detected: timelineScore > 0,
      confidence: "high",
      score: timelineScore,
      evidence: "test evidence",
      summary: "test summary",
    },
  };
}

// Tests
describe("ScoringService", () => {
  let service: ScoringService;

  beforeEach(() => {
    service = new ScoringService();
  });

  describe("calculateTotalScore()", () => {
    it("should return 100 when all criteria have max score (25 each)", () => {
      const analysis = createAnalysis(25, 25, 25, 25);
      expect(service.calculateTotalScore(analysis)).toBe(100);
    });

    it("should return 0 when all criteria have zero score", () => {
      const analysis = createAnalysis(0, 0, 0, 0);
      expect(service.calculateTotalScore(analysis)).toBe(0);
    });

    it("should sum all four BANT scores correctly", () => {
      const analysis = createAnalysis(20, 15, 25, 10);
      expect(service.calculateTotalScore(analysis)).toBe(70);
    });

    it("should handle partial scores", () => {
      const analysis = createAnalysis(5, 5, 5, 5);
      expect(service.calculateTotalScore(analysis)).toBe(20);
    });
  });

  describe("classify()", () => {
    it('should classify as "hot" when score >= 75', () => {
      expect(service.classify(75)).toBe("hot");
      expect(service.classify(90)).toBe("hot");
      expect(service.classify(100)).toBe("hot");
    });

    it('should classify as "warm" when score >= 40 and < 75', () => {
      expect(service.classify(40)).toBe("warm");
      expect(service.classify(55)).toBe("warm");
      expect(service.classify(74)).toBe("warm");
    });

    it('should classify as "cold" when score < 40', () => {
      expect(service.classify(0)).toBe("cold");
      expect(service.classify(20)).toBe("cold");
      expect(service.classify(39)).toBe("cold");
    });

    it("should handle boundary values correctly", () => {
      expect(service.classify(75)).toBe("hot");
      expect(service.classify(74)).toBe("warm");
      expect(service.classify(40)).toBe("warm");
      expect(service.classify(39)).toBe("cold");
    });
  });
});
