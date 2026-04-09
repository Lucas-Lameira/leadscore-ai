export type Confidence = "high" | "medium" | "low";
export type Classification = "hot" | "warm" | "cold";
export type Source = "whatsapp" | "call" | "meeting" | "email";

// BANT
export interface BANTCriterion {
  detected: boolean;
  confidence: Confidence;
  score: number; // 0-25
  evidence: string;
  summary: string;
}

export interface BANTAnalysis {
  budget: BANTCriterion;
  authority: BANTCriterion;
  need: BANTCriterion;
  timeline: BANTCriterion;
}

// LEADS
export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  role: string;
  source: Source;
  transcription: string;
  analysis: BANTAnalysis;
  totalScore: number; // 0-100
  classification: Classification;
  recommendation: string;
  analyzedAt: string;
}

// API Request / Response Types
export interface AnalyzeRequest {
  transcription: string;
  companyName: string;
  contactName: string;
  role: string;
  source: Source;
}

export interface LLMAnalysisResponse {
  budget: BANTCriterion;
  authority: BANTCriterion;
  need: BANTCriterion;
  timeline: BANTCriterion;
  recommendation: string;
}


// MOCKS
export interface MockTranscription {
  id: string;
  companyName: string;
  contactName: string;
  role: string;
  source: Source;
  description: string;
  transcription: string;
}
