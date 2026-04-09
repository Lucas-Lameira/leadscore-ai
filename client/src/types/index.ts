export type Confidence = "high" | "medium" | "low";
export type Classification = "hot" | "warm" | "cold";
export type Source = "whatsapp" | "call" | "meeting" | "email";

export interface BANTCriterion {
  detected: boolean;
  confidence: Confidence;
  score: number;
  evidence: string;
  summary: string;
}

export interface BANTAnalysis {
  budget: BANTCriterion;
  authority: BANTCriterion;
  need: BANTCriterion;
  timeline: BANTCriterion;
}

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  role: string;
  source: Source;
  transcription: string;
  analysis: BANTAnalysis;
  totalScore: number;
  classification: Classification;
  recommendation: string;
  analyzedAt: string;
}

export interface MockTranscription {
  id: string;
  companyName: string;
  contactName: string;
  role: string;
  source: Source;
  description: string;
  transcription: string;
}

export interface AnalyzeRequest {
  transcription: string;
  companyName: string;
  contactName: string;
  role: string;
  source: Source;
}
