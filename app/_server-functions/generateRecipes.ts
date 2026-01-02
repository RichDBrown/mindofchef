"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function generateRecipes(ingredients: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `ingredients: ${ingredients}`,
    config: {
      thinkingConfig: {
        thinkingBudget: 0,
      },
      systemInstruction: `You are a professional chef with experience in creating nutrition-aware recipes. You will be provided with a string 
      of ingredients. Using only the given ingredients, along with common pantry staples such as salt, pepper, oil, and water, generate between 
      three and ten complete recipes. Include a mix of quick and more involved recipes.
      
      Each recipe should include a clear name and a concise description, as well as the estimated preparation time in minutes, cooking time in minutes, 
      and number of servings. In addition, provide an estimated nutritional breakdown per serving, including calories, protein in grams, carbohydrates 
      in grams, and fat in grams. Each recipe must also include a detailed list of required ingredients, where each ingredient specifies its name, 
      quantity, and unit of measurement. Finally, include clear, step-by-step instructions that explain how to prepare and cook the dish.

      Example:
      --input--
      ingredients: 2 piece of chicken breast, 3 clove of garlic, 2 tbsp of olive oil
      
      --output--
      [
      {
      "name": "Garlic Herb Chicken",
      "description": "A simple and flavorful chicken dish cooked with garlic and olive oil, perfect for a quick and healthy meal.",
      "prepTime": 10,
      "cookTime": 20,
      "servings": 2,
      "calories": 420,
      "protein": 38,
      "carbs": 3,
      "fats": 28,
      "ingredients": [
      { "ingredient": "Chicken breast", "quantity": 2, "unit": "pieces" },
      { "ingredient": "Garlic", "quantity": 3, "unit": "cloves" },
      { "ingredient": "Olive oil", "quantity": 2, "unit": "tbsp" }
      ],
      "instructions": [
      "Pat the chicken breasts dry and season with salt and pepper.",
      "Heat olive oil in a pan over medium heat.",
      "Add garlic and sauté until fragrant, about 30 seconds.",
      "Add chicken breasts and cook for 6-7 minutes per side until golden and fully cooked.",
      "Remove from heat and let rest for a few minutes before serving."
      ]
      }
      ]`,
      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            description: {
              type: "string",
            },
            prepTime: {
              type: "number",
            },
            cookTime: {
              type: "number",
            },
            servings: {
              type: "number",
            },
            calories: {
              type: "number",
            },
            protein: {
              type: "number",
            },
            carbs: {
              type: "number",
            },
            fats: {
              type: "number",
            },
            ingredients: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  ingredient: {
                    type: "string",
                  },
                  quantity: {
                    type: "number",
                  },
                  unit: {
                    type: "string",
                  },
                },
                required: ["ingredient", "quantity", "unit"],
                propertyOrdering: ["ingredient", "quantity", "unit"],
              },
            },
            instructions: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          required: [
            "name",
            "description",
            "prepTime",
            "cookTime",
            "servings",
            "calories",
            "protein",
            "carbs",
            "fats",
            "ingredients",
            "instructions",
          ],
          propertyOrdering: [
            "name",
            "description",
            "prepTime",
            "cookTime",
            "servings",
            "calories",
            "protein",
            "carbs",
            "fats",
            "ingredients",
            "instructions",
          ],
        },
      },
    },
  });
  return response.text;
}
