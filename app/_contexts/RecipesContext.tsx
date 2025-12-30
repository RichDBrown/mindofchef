"use client";

import { createContext, ReactNode } from "react";
import { useRouter } from "next/navigation";

type RecipesContextValue = {
  generateRecipes: () => void;
};

export const RecipesContext = createContext<RecipesContextValue | null>(null);

export function RecipesProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  function generateRecipes() {
    router.push("/recipe-suggestions");
  }

  return (
    <RecipesContext.Provider value={{ generateRecipes }}>
      {children}
    </RecipesContext.Provider>
  );
}
