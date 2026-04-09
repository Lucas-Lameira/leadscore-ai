import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchLeads } from "../services/api";
import type { Lead } from "../types";
import LeadCard from "../components/LeadCard";

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads()
      .then(setLeads)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const hotCount = leads.filter((l) => l.classification === "hot").length;
  const warmCount = leads.filter((l) => l.classification === "warm").length;
  const coldCount = leads.filter((l) => l.classification === "cold").length;
  const avgScore =
    leads.length > 0
      ? Math.round(leads.reduce((sum, l) => sum + l.totalScore, 0) / leads.length)
      : 0;

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner" />
        <span>Carregando leads...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">⚠️</div>
        <p className="empty-state-text">Erro ao carregar: {error}</p>
        <p style={{ color: "var(--text-tertiary)", fontSize: 14 }}>
          Verifique se o backend está rodando em http://localhost:3001
        </p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard de Leads</h1>
        <p className="dashboard-subtitle">
          Leads qualificados por IA com análise BANT
        </p>
      </div>

      {leads.length > 0 && (
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-value">{leads.length}</div>
            <div className="stat-label">Total de leads</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: "var(--accent-hot)" }}>
              {hotCount}
            </div>
            <div className="stat-label">🔥 Quentes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: "var(--accent-warm)" }}>
              {warmCount}
            </div>
            <div className="stat-label">🟡 Mornos</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: "var(--accent-cold)" }}>
              {coldCount}
            </div>
            <div className="stat-label">❄️ Frios</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{avgScore}</div>
            <div className="stat-label">Score médio</div>
          </div>
        </div>
      )}

      {leads.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <p className="empty-state-text">Nenhum lead analisado ainda</p>
          <Link to="/analyze" className="btn btn-primary">
            ✨ Analisar primeiro lead
          </Link>
        </div>
      ) : (
        <div className="leads-list">
          {leads.map((lead, i) => (
            <div key={lead.id} className={`fade-in fade-in-delay-${Math.min(i + 1, 5)}`}>
              <LeadCard lead={lead} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
