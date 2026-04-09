import { LeadsStore } from "./leads.store";
import { Lead, BANTAnalysis } from "../types";


// Helper: creates a valid Lead object for testing
function createTestLead(overrides: Partial<Lead> = {}): Lead {
  const defaultAnalysis: BANTAnalysis = {
    budget: {
      detected: true,
      confidence: "high",
      score: 25,
      evidence: "Budget aprovado de R$ 3.000/mês",
      summary: "Orçamento confirmado",
    },
    authority: {
      detected: true,
      confidence: "high",
      score: 25,
      evidence: "Sou eu mesmo, o CEO",
      summary: "Decisor final confirmado",
    },
    need: {
      detected: true,
      confidence: "high",
      score: 25,
      evidence: "Ninguém preenche o CRM e perdemos deals",
      summary: "Necessidade clara e urgente",
    },
    timeline: {
      detected: true,
      confidence: "high",
      score: 20,
      evidence: "Próximas 2-3 semanas",
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
describe("LeadsStore", () => {
  let store: LeadsStore;

  beforeEach(() => {
    store = new LeadsStore();
  });

  describe("add()", () => {
    it("should add a lead and return it", () => {
      const lead = createTestLead();
      const result = store.add(lead);

      expect(result).toEqual(lead);
    });

    it("should increase the count after adding", () => {
      expect(store.count()).toBe(0);

      store.add(createTestLead({ id: "lead-1" }));
      expect(store.count()).toBe(1);

      store.add(createTestLead({ id: "lead-2" }));
      expect(store.count()).toBe(2);
    });

    it("should store multiple leads independently", () => {
      const lead1 = createTestLead({ id: "lead-1", companyName: "Company A" });
      const lead2 = createTestLead({ id: "lead-2", companyName: "Company B" });

      store.add(lead1);
      store.add(lead2);

      const all = store.getAll();
      expect(all).toHaveLength(2);
    });
  });

  describe("getAll()", () => {
    it("should return empty array when no leads exist", () => {
      expect(store.getAll()).toEqual([]);
    });

    it("should return leads sorted by score descending", () => {
      store.add(createTestLead({ id: "low", totalScore: 20 }));
      store.add(createTestLead({ id: "high", totalScore: 90 }));
      store.add(createTestLead({ id: "mid", totalScore: 55 }));

      const leads = store.getAll();

      expect(leads[0].id).toBe("high");
      expect(leads[1].id).toBe("mid");
      expect(leads[2].id).toBe("low");
    });
  });

  describe("getById()", () => {
    it("should return the correct lead by ID", () => {
      const lead = createTestLead({ id: "specific-id" });
      store.add(lead);

      const found = store.getById("specific-id");
      expect(found).toEqual(lead);
    });

    it("should return undefined for non-existent ID", () => {
      const found = store.getById("does-not-exist");
      expect(found).toBeUndefined();
    });
  });

  describe("clear()", () => {
    it("should remove all leads", () => {
      store.add(createTestLead({ id: "lead-1" }));
      store.add(createTestLead({ id: "lead-2" }));
      expect(store.count()).toBe(2);

      store.clear();
      expect(store.count()).toBe(0);
      expect(store.getAll()).toEqual([]);
    });
  });

  describe("count()", () => {
    it("should return 0 for empty store", () => {
      expect(store.count()).toBe(0);
    });
  });
});
