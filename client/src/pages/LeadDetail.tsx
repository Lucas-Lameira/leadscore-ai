import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchLead } from "../services/api";
import type { Lead } from "../types";
import ScoreGauge from "../components/ScoreGauge";
import BantBreakdown from "../components/BantBreakdown";
import TranscriptViewer from "../components/TranscriptViewer";

const SOURCE_LABELS: Record<string, string> = {
  meeting: "🎥 Reunião",
  call: "📞 Ligação",
  whatsapp: "💬 WhatsApp",
  email: "📧 Email",
};

export default function LeadDetail() {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchLead(id)
      .then(setLead)
      .catch(() => setLead(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner" />
        <span>Carregando análise...</span>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <p className="empty-state-text">Lead não encontrado</p>
        <Link to="/" className="btn btn-secondary">← Voltar ao Dashboard</Link>
      </div>
    );
  }

  const date = new Date(lead.analyzedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fade-in">
      <Link to="/" className="detail-back">← Voltar ao Dashboard</Link>

      <div className="detail-header">
        <div className="detail-info">
          <h1 className="detail-company">{lead.companyName}</h1>
          <p className="detail-contact">{lead.contactName} · {lead.role}</p>
          <div className="detail-meta">
            <span className={`badge ${lead.classification}`}>
              {lead.classification === "hot" && "🔥 Lead Quente"}
              {lead.classification === "warm" && "🟡 Lead Morno"}
              {lead.classification === "cold" && "❄️ Lead Frio"}
            </span>
            <span className="detail-meta-item">
              {SOURCE_LABELS[lead.source]}
            </span>
            <span className="detail-meta-item">📅 {date}</span>
          </div>
        </div>
        <div className="detail-score-section">
          <ScoreGauge
            score={lead.totalScore}
            classification={lead.classification}
            size={140}
          />
        </div>
      </div>

      <div className="detail-recommendation">
        <div className="detail-recommendation-label">💡 Recomendação da IA</div>
        <p className="detail-recommendation-text">{lead.recommendation}</p>
      </div>

      <div className="detail-section">
        <h2 className="detail-section-title">📊 Análise BANT</h2>
        <BantBreakdown analysis={lead.analysis} />
      </div>

      <div className="detail-section">
        <h2 className="detail-section-title">📝 Transcrição da Conversa</h2>
        <TranscriptViewer transcription={lead.transcription} />
      </div>
    </div>
  );
}
