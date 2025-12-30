import { useContext } from "react";
import { RecipesContext } from "../_contexts/RecipesContext";

export function useRecipes() {
  const context = useContext(RecipesContext);

  if (!context) {
    throw new Error("useRecipes must be used within RecipesProvider");
  }

  return context;
}
