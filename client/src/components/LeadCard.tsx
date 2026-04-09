import { useNavigate } from "react-router-dom";
import type { Lead } from "../types";
import ScoreGauge from "./ScoreGauge";

interface LeadCardProps {
  lead: Lead;
}

const SOURCE_ICONS: Record<string, string> = {
  meeting: "🎥",
  call: "📞",
  whatsapp: "💬",
  email: "📧",
};

const CLASSIFICATION_LABELS: Record<string, string> = {
  hot: "🔥 Quente",
  warm: "🟡 Morno",
  cold: "❄️ Frio",
};

export default function LeadCard({ lead }: LeadCardProps) {
  const navigate = useNavigate();
  const date = new Date(lead.analyzedAt).toLocaleDateString("pt-BR");

  return (
    <div className="lead-card" onClick={() => navigate(`/leads/${lead.id}`)}>
      <div className="lead-card-info">
        <div className="lead-card-company">{lead.companyName}</div>
        <div className="lead-card-contact">
          {lead.contactName} · {lead.role}
        </div>
        <div className="lead-card-meta">
          <span className={`badge ${lead.classification}`}>
            {CLASSIFICATION_LABELS[lead.classification]}
          </span>
          <span className="lead-card-meta-item">
            <span className="source-icon">{SOURCE_ICONS[lead.source]}</span>
            {lead.source}
          </span>
          <span className="lead-card-meta-item">📅 {date}</span>
        </div>
      </div>
      <div className="lead-card-score">
        <ScoreGauge
          score={lead.totalScore}
          classification={lead.classification}
          size={72}
        />
      </div>
    </div>
  );
}
