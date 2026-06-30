export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  metrics?: ResponseMetrics;
}

export interface ResponseMetrics {
  ruleApplied: "Rule 1: Completion" | "Rule 2: Expert Guidance";
  headersCount: number;
  bulletsCount: number;
  tablesCount: number;
  boldPhrasesCount: number;
  hasLaTeX: boolean;
  wordCount: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  candorLevel: number; // 1 (Gentle & Supportive) to 5 (Absolute Candid Truth)
  presetStyle: "balanced" | "technical" | "strategic" | "creative";
  systemInstructionOverride?: string;
}

export interface SystemPreset {
  id: string;
  name: string;
  icon: string;
  description: string;
  instruction: string;
  suggestedPrompts: string[];
}
