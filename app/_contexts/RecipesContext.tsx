"use client";

import { createContext, ReactNode, useState } from "react";
import { generateRecipes } from "../_server-functions/generateRecipes";
import { ingredientsToSentence } from "../_utils/ingredientsToSentence";
import { useIngredients } from "../_hooks/useIngredients";
import { Recipe } from "../_types/recipe";
import { generateImages } from "../_server-functions/generateImages";

type RecipesContextValue = {
  recipes: Recipe[];
  images: string[];
  isLoading: boolean;
  isErrorGeneratingRecipes: boolean;
  createRecipes: () => void;
};

export const RecipesContext = createContext<RecipesContextValue | null>(null);

export function RecipesProvider({ children }: { children: ReactNode }) {
  const { ingredients } = useIngredients();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrorGeneratingRecipes, setIsErrorGeneratingRecipes] =
    useState<boolean>(false);

  async function createRecipes() {
    setIsErrorGeneratingRecipes(false);
    setIsLoading(true);
    try {
      const recipesJSON = await generateRecipes(
        ingredientsToSentence(ingredients)
      );

      if (!recipesJSON) {
        throw new Error("generateRecipes returned no data");
      }

      const recipes = JSON.parse(recipesJSON) as Recipe[];
      setRecipes(recipes);
      setIsLoading(false);
      createImages(recipes);
    } catch (error) {
      if (process.env.NODE_ENV !== "production")
        console.error("Failed to generate recipes:", error);
      setIsLoading(false);
      setIsErrorGeneratingRecipes(true);
    }
  }

  async function createImages(recipes: Recipe[]) {
    try {
      for (const recipe of recipes) {
        const images = await generateImages(recipe.description);
        const image = images?.[0]?.image?.imageBytes;

        if (image) {
          setImages((prev) => [...prev, `data:image/jpeg;base64,${image}`]);
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV !== "production")
        console.error("Failed to generate images:", error);
    }
  }

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        images,
        isLoading,
        isErrorGeneratingRecipes,
        createRecipes,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}
