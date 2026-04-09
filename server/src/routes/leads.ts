import { Router, Request, Response } from "express";
import { leadsStore } from "../store/leads.store";
import { scoringService } from "../services/scoring.service";
import { llmService } from "../services/llm.service";
import { mockTranscriptions } from "../data/mock-transcriptions";
import { AnalyzeRequest } from "../types";
import { randomUUID } from "crypto";

const router = Router();

router.get("/leads", (_req: Request, res: Response) => {
  const leads = leadsStore.getAll();
  res.json(leads);
});

router.get("/leads/:id", (req: Request, res: Response) => {
  const id = req.params.id as string;
  const lead = leadsStore.getById(id);
  if (!lead) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }
  res.json(lead);
});

router.post("/analyze", async (req: Request, res: Response) => {
  const { transcription, companyName, contactName, role, source } =
    req.body as AnalyzeRequest;

  // TODO: ADD VALIDATION LAYER/SCHEMA TO THE ENDPOINT
  if (!transcription || !transcription.trim()) {
    res.status(400).json({ error: "transcription is required" });
    return;
  }
  if (!companyName) {
    res.status(400).json({ error: "companyName is required" });
    return;
  }
  if (!contactName) {
    res.status(400).json({ error: "contactName is required" });
    return;
  }
  if (!role) {
    res.status(400).json({ error: "role is required" });
    return;
  }
  if (!source) {
    res.status(400).json({ error: "source is required" });
    return;
  }

  try {
    const llmResult = await llmService.analyzeTranscription(transcription);

    const analysis = {
      budget: llmResult.budget,
      authority: llmResult.authority,
      need: llmResult.need,
      timeline: llmResult.timeline,
    };

    const totalScore = scoringService.calculateTotalScore(analysis);
    const classification = scoringService.classify(totalScore);

    const lead = {
      id: randomUUID(),
      companyName,
      contactName,
      role,
      source,
      transcription,
      analysis,
      totalScore,
      classification,
      recommendation: llmResult.recommendation,
      analyzedAt: new Date().toISOString(),
    };

    leadsStore.add(lead);
    res.status(201).json(lead);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

router.get("/mock-transcriptions", (_req: Request, res: Response) => {
  res.json(mockTranscriptions);
});

export default router;
