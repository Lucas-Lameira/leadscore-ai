const API_BASE = "http://localhost:3001/api";

import type { Lead, MockTranscription, AnalyzeRequest } from "../types";

export async function fetchLeads(): Promise<Lead[]> {
  const res = await fetch(`${API_BASE}/leads`);
  if (!res.ok) throw new Error("Failed to fetch leads");
  return res.json();
}

export async function fetchLead(id: string): Promise<Lead> {
  const res = await fetch(`${API_BASE}/leads/${id}`);
  if (!res.ok) throw new Error("Lead not found");
  return res.json();
}

export async function analyzeLead(data: AnalyzeRequest): Promise<Lead> {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Analysis failed");
  }
  return res.json();
}

export async function fetchMockTranscriptions(): Promise<MockTranscription[]> {
  const res = await fetch(`${API_BASE}/mock-transcriptions`);
  if (!res.ok) throw new Error("Failed to fetch mock transcriptions");
  return res.json();
}
