"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function generateImages(recipeDescription: string) {
  const response = await ai.models.generateImages({
    model: "imagen-4.0-fast-generate-001",
    prompt: recipeDescription,
    config: {
      numberOfImages: 1,
      aspectRatio: "16:9",
      outputMimeType: "image/jpeg",
      outputCompressionQuality: 80,
    },
  });
  return response.generatedImages;
}
