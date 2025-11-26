import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION_DE, SYSTEM_INSTRUCTION_EN } from "../constants";

export const createChatSession = (language: 'de' | 'en', apiKey: string): Chat => {
  if (!apiKey) {
    throw new Error("API Key is required");
  }

  const ai = new GoogleGenAI({ apiKey });
  const systemInstruction = language === 'de' ? SYSTEM_INSTRUCTION_DE : SYSTEM_INSTRUCTION_EN;

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction,
      temperature: 0.7, 
      topK: 40,
      maxOutputTokens: 800, 
    },
  });
};

export const sendMessageToChat = async (
  chat: Chat,
  message: string
) => {
  return await chat.sendMessageStream({ message });
};