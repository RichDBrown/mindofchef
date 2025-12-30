"use client";

import { createContext, ReactNode, useState } from "react";
import { Ingredient } from "../_types/ingredient";

type IngredientsContextValue = {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (index: number) => void;
};

export const IngredientsContext = createContext<IngredientsContextValue | null>(
  null
);

export function IngredientsProvider({ children }: { children: ReactNode }) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  function addIngredient(ingredient: Ingredient) {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  }

  function removeIngredient(index: number) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  }

  return (
    <IngredientsContext.Provider
      value={{ ingredients, addIngredient, removeIngredient }}
    >
      {children}
    </IngredientsContext.Provider>
  );
}
