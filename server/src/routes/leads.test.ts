import request from "supertest";
import { createApp } from "../app";
import { leadsStore } from "../store/leads.store";
import { Lead, BANTAnalysis } from "../types";

// Mock the LLM service so tests don't call the real Gemini API
jest.mock("../services/llm.service", () => ({
  llmService: {
    analyzeTranscription: jest.fn().mockResolvedValue({
      budget: {
        detected: true,
        confidence: "high",
        score: 20,
        evidence: "Mencionou orçamento",
        summary: "Budget identificado",
      },
      authority: {
        detected: true,
        confidence: "medium",
        score: 15,
        evidence: "Cargo de liderança",
        summary: "Influenciador direto",
      },
      need: {
        detected: true,
        confidence: "high",
        score: 25,
        evidence: "Problema claro descrito",
        summary: "Necessidade urgente",
      },
      timeline: {
        detected: true,
        confidence: "medium",
        score: 10,
        evidence: "Prazo mencionado",
        summary: "Prazo moderado",
      },
      recommendation: "Agendar reunião de demo",
    }),
  },
}));

function createTestLead(overrides: Partial<Lead> = {}): Lead {
  const defaultAnalysis: BANTAnalysis = {
    budget: {
      detected: true,
      confidence: "high",
      score: 25,
      evidence: "Budget de R$ 3.000",
      summary: "Orçamento confirmado",
    },
    authority: {
      detected: true,
      confidence: "high",
      score: 25,
      evidence: "CEO decide",
      summary: "Decisor final",
    },
    need: {
      detected: true,
      confidence: "high",
      score: 25,
      evidence: "CRM não é preenchido",
      summary: "Necessidade clara",
    },
    timeline: {
      detected: true,
      confidence: "high",
      score: 20,
      evidence: "2-3 semanas",
      summary: "Prazo curto",
    },
  };

  return {
    id: "test-lead-1",
    companyName: "TestCorp",
    contactName: "João Teste",
    role: "CEO",
    source: "meeting",
    transcription: "Transcrição de teste...",
    analysis: defaultAnalysis,
    totalScore: 95,
    classification: "hot",
    recommendation: "Agendar demo imediatamente",
    analyzedAt: new Date().toISOString(),
    ...overrides,
  };
}

// Tests
const app = createApp();

describe("API Routes", () => {
  beforeEach(() => {
    try {
      leadsStore.clear();
    } catch { }
  });

  describe("GET /health", () => {
    it("should return status ok", async () => {
      const res = await request(app).get("/health");

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("ok");
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe("GET /api/leads", () => {
    it("should return 200 with an array", async () => {
      const res = await request(app).get("/api/leads");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should return empty array when no leads exist", async () => {
      const res = await request(app).get("/api/leads");

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it("should return leads sorted by score descending", async () => {
      leadsStore.add(createTestLead({ id: "low", totalScore: 20 }));
      leadsStore.add(createTestLead({ id: "high", totalScore: 90 }));
      leadsStore.add(createTestLead({ id: "mid", totalScore: 55 }));

      const res = await request(app).get("/api/leads");

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(3);
      expect(res.body[0].id).toBe("high");
      expect(res.body[1].id).toBe("mid");
      expect(res.body[2].id).toBe("low");
    });
  });

  describe("GET /api/leads/:id", () => {
    it("should return 200 with the lead when found", async () => {
      const lead = createTestLead({ id: "find-me" });
      leadsStore.add(lead);

      const res = await request(app).get("/api/leads/find-me");

      expect(res.status).toBe(200);
      expect(res.body.id).toBe("find-me");
      expect(res.body.companyName).toBe("TestCorp");
      expect(res.body.analysis).toBeDefined();
      expect(res.body.totalScore).toBeDefined();
    });

    it("should return 404 when lead not found", async () => {
      const res = await request(app).get("/api/leads/does-not-exist");

      expect(res.status).toBe(404);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("POST /api/analyze", () => {
    it("should return 400 when transcription is missing", async () => {
      const res = await request(app).post("/api/analyze").send({
        companyName: "TestCorp",
        contactName: "João",
        role: "CEO",
        source: "meeting",
        // transcription is missing
      });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("should return 400 when companyName is missing", async () => {
      const res = await request(app).post("/api/analyze").send({
        transcription: "Some transcription text",
        contactName: "João",
        role: "CEO",
        source: "meeting",
        // companyName is missing
      });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("should return 400 when transcription is empty string", async () => {
      const res = await request(app).post("/api/analyze").send({
        transcription: "",
        companyName: "TestCorp",
        contactName: "João",
        role: "CEO",
        source: "meeting",
      });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it("should return 201 with a scored lead on valid input", async () => {
      const res = await request(app).post("/api/analyze").send({
        transcription: "Uma transcrição de conversa de vendas válida com bastante conteúdo para análise.",
        companyName: "TestCorp",
        contactName: "João Teste",
        role: "CEO",
        source: "meeting",
      });

      expect(res.status).toBe(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.companyName).toBe("TestCorp");
      expect(res.body.totalScore).toBeGreaterThanOrEqual(0);
      expect(res.body.totalScore).toBeLessThanOrEqual(100);
      expect(res.body.classification).toMatch(/^(hot|warm|cold)$/);
      expect(res.body.analysis).toBeDefined();
      expect(res.body.analysis.budget).toBeDefined();
      expect(res.body.analysis.authority).toBeDefined();
      expect(res.body.analysis.need).toBeDefined();
      expect(res.body.analysis.timeline).toBeDefined();
    });

    it("should store the analyzed lead so it appears in GET /api/leads", async () => {
      await request(app).post("/api/analyze").send({
        transcription: "Uma transcrição de teste para verificar persistência no store.",
        companyName: "Persist Corp",
        contactName: "Maria",
        role: "CTO",
        source: "call",
      });

      const listRes = await request(app).get("/api/leads");
      expect(listRes.body.length).toBeGreaterThanOrEqual(1);

      const found = listRes.body.find(
        (l: Lead) => l.companyName === "Persist Corp"
      );
      expect(found).toBeDefined();
    });
  });

  describe("GET /api/mock-transcriptions", () => {
    it("should return 200 with an array of mock transcriptions", async () => {
      const res = await request(app).get("/api/mock-transcriptions");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it("each mock should have required fields", async () => {
      const res = await request(app).get("/api/mock-transcriptions");

      for (const mock of res.body) {
        expect(mock.id).toBeDefined();
        expect(mock.companyName).toBeDefined();
        expect(mock.contactName).toBeDefined();
        expect(mock.role).toBeDefined();
        expect(mock.source).toBeDefined();
        expect(mock.description).toBeDefined();
        expect(mock.transcription).toBeDefined();
        expect(mock.transcription.length).toBeGreaterThan(50);
      }
    });

    it("should contain at least 5 mock transcriptions", async () => {
      const res = await request(app).get("/api/mock-transcriptions");
      expect(res.body.length).toBeGreaterThanOrEqual(5);
    });
  });
});
