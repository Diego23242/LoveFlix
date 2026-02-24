
import { GoogleGenAI } from "@google/genai";

export const generateRomanticMessage = async (memoryTitle: string, description: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres un experto en romance y cartas de amor. Escribe un mensaje corto, emotivo y romántico (máximo 3 párrafos) para celebrar este momento especial llamado "${memoryTitle}". El contexto del momento es: "${description}". Haz que suene muy apasionado y tierno para el Día de San Valentín.`,
      config: {
        temperature: 0.9,
        topK: 64,
        topP: 0.95,
      },
    });

    return response.text || "Eres el amor de mi vida, cada momento a tu lado es un regalo.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "En este día de San Valentín, solo quiero decirte que mi mundo es mejor contigo. Cada recuerdo es una joya que guardo en mi corazón.";
  }
};
