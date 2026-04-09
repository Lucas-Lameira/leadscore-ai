import type { Classification } from "../types";

interface ScoreGaugeProps {
  score: number;
  classification: Classification;
  size?: number;
}

export default function ScoreGauge({ score, classification, size = 100 }: ScoreGaugeProps) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const offset = circumference - progress;

  const center = size / 2;
  const fontSize = size * 0.28;

  return (
    <div className="score-gauge" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="score-gauge-bg"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={`score-gauge-fill ${classification}`}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="score-gauge-label">
        <span className="score-gauge-value" style={{ fontSize }}>{score}</span>
        <span className="score-gauge-suffix">/100</span>
      </div>
    </div>
  );
}
