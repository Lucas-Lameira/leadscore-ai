import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeLead, fetchMockTranscriptions } from "../services/api";
import type { MockTranscription, Source } from "../types";

export default function NewAnalysis() {
  const navigate = useNavigate();
  const [mocks, setMocks] = useState<MockTranscription[]>([]);
  const [selectedMock, setSelectedMock] = useState<string | null>(null);

  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [role, setRole] = useState("");
  const [source, setSource] = useState<Source>("meeting");
  const [transcription, setTranscription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMockTranscriptions()
      .then(setMocks)
      .catch(() => {});
  }, []);

  function handleSelectMock(mock: MockTranscription) {
    setSelectedMock(mock.id);
    setCompanyName(mock.companyName);
    setContactName(mock.contactName);
    setRole(mock.role);
    setSource(mock.source);
    setTranscription(mock.transcription);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const lead = await analyzeLead({
        transcription,
        companyName,
        contactName,
        role,
        source,
      });

      navigate(`/leads/${lead.id}`);
    } catch (err: any) {
      setError(err.message || "Erro ao analisar");
    } finally {
      setLoading(false);
    }
  }

  const isValid =
    transcription.trim() &&
    companyName.trim() &&
    contactName.trim() &&
    role.trim();

  return (
    <div className="fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Nova Análise</h1>
        <p className="dashboard-subtitle">
          Cole uma transcrição ou selecione um cenário de exemplo
        </p>
      </div>

      {mocks.length > 0 && (
        <div className="mock-selector">
          <label className="form-label">Cenários de exemplo</label>
          <div className="mock-cards">
            {mocks.map((mock) => (
              <div
                key={mock.id}
                className={`mock-card ${selectedMock === mock.id ? "selected" : ""}`}
                onClick={() => handleSelectMock(mock)}
              >
                <div className="mock-card-company">{mock.companyName}</div>
                <div className="mock-card-desc">{mock.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <form className="new-analysis-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Empresa</label>
            <input
              className="form-input"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Nome da empresa"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contato</label>
            <input
              className="form-input"
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Nome do contato"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Cargo</label>
            <input
              className="form-input"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Cargo do contato"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Canal</label>
            <select
              className="form-select"
              value={source}
              onChange={(e) => setSource(e.target.value as Source)}
            >
              <option value="meeting">🎥 Reunião</option>
              <option value="call">📞 Ligação</option>
              <option value="whatsapp">💬 WhatsApp</option>
              <option value="email">📧 Email</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Transcrição da Conversa</label>
            <textarea
              className="form-textarea"
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              placeholder="Cole aqui a transcrição da conversa de vendas..."
            />
          </div>
        </div>

        {error && (
          <div
            style={{
              color: "var(--accent-hot)",
              fontSize: 14,
              marginBottom: 16,
              padding: "8px 16px",
              background: "var(--accent-hot-bg)",
              borderRadius: 6,
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isValid || loading}
        >
          {loading ? (
            <>
              <div className="spinner" /> Analisando com IA...
            </>
          ) : (
            <>✨ Analisar Transcrição</>
          )}
        </button>
      </form>
    </div>
  );
}
