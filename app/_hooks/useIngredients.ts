import { useContext } from "react";
import { IngredientsContext } from "../_contexts/IngredientsContext";

export function useIngredients() {
  const context = useContext(IngredientsContext);

  if (!context) {
    throw new Error("useIngredients must be used within IngredientsProvider");
  }

  return context;
}
