import type { BANTAnalysis } from "../types";

interface BantBreakdownProps {
  analysis: BANTAnalysis;
}

const BANT_CONFIG = {
  budget: { label: "Budget", icon: "💰", key: "budget" as const },
  authority: { label: "Authority", icon: "👤", key: "authority" as const },
  need: { label: "Need", icon: "🎯", key: "need" as const },
  timeline: { label: "Timeline", icon: "⏱️", key: "timeline" as const },
};

export default function BantBreakdown({ analysis }: BantBreakdownProps) {
  return (
    <div className="bant-grid">
      {Object.values(BANT_CONFIG).map(({ label, icon, key }, i) => {
        const criterion = analysis[key];
        const percentage = (criterion.score / 25) * 100;

        return (
          <div
            key={key}
            className={`bant-card fade-in fade-in-delay-${i + 1}`}
          >
            <div className="bant-card-header">
              <div className="bant-card-title">
                <div className={`bant-card-icon ${key}`}>{icon}</div>
                {label}
              </div>
              <div className="bant-card-score">
                {criterion.score}
                <span className="bant-card-score-max">/25</span>
              </div>
            </div>

            <div className="bant-progress">
              <div
                className={`bant-progress-fill ${key}`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className="bant-card-summary">{criterion.summary}</p>

            {criterion.evidence && (
              <blockquote className="bant-card-evidence">
                "{criterion.evidence}"
              </blockquote>
            )}

            <div style={{ marginTop: 8 }}>
              <span className="bant-confidence">
                {criterion.detected ? "✓" : "✗"} Confiança:{" "}
                {criterion.confidence === "high"
                  ? "Alta"
                  : criterion.confidence === "medium"
                    ? "Média"
                    : "Baixa"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
