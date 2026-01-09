"use client";

import { useRecipes } from "@/app/_hooks/useRecipes";
import { use } from "react";
import RecipeNotFound from "./_ui/RecipeNotFound";
import RecipeDetails from "./_ui/RecipeDetails";

export default function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { recipes } = useRecipes();
  const recipeExists = recipes[Number(slug)];
  return (
    <div
      className={`flex justify-center ${
        !recipeExists && "items-center p-4"
      } min-h-screen w-full`}
    >
      {recipeExists ? <RecipeDetails slug={slug} /> : <RecipeNotFound />}
    </div>
  );
}
