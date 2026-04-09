import { LLMAnalysisResponse } from "../types";
import { config } from "../config";
import {
  QUALIFICATION_SYSTEM_PROMPT,
  buildUserPrompt,
} from "../prompts/qualification";

export class LLMService {
  async analyzeTranscription(
    transcription: string
  ): Promise<LLMAnalysisResponse> {
    const apiKey = config.geminiApiKey;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${QUALIFICATION_SYSTEM_PROMPT}\n\n${buildUserPrompt(transcription)}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errorBody}`);
    }

    const data = await response.json() as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Empty response from Gemini API");
    }

    const parsed: LLMAnalysisResponse = JSON.parse(text);
    return parsed;
  }
}

export const llmService = new LLMService();
