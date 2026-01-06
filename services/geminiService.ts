
import { GoogleGenAI } from "@google/genai";

export const getDeepDiveExplanation = async (nodeLabel: string, description: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Explain the technical significance of "${nodeLabel}" in a high-performance analytical architecture. 
                 Context: "${description}". 
                 Focus on "sub-second analytics" and "in-memory performance". 
                 Keep the explanation professional and concise (max 3 sentences).`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to fetch advanced AI deep-dive at this moment.";
  }
};
