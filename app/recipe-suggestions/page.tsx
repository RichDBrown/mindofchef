"use client";

import { useIngredients } from "../_hooks/useIngredients";
import Header from "./_ui/Header";
import AddIngredients from "./_ui/AddIngredients";
import { useRecipes } from "../_hooks/useRecipes";
import GeneratingRecipes from "./_ui/GeneratingRecipes";
import ErrorGeneratingRecipes from "./_ui/ErrorGeneratingRecipes";
import RecipePreview from "./_ui/RecipePreview";

export default function RecipeSuggestionsPage() {
  const { ingredients } = useIngredients();
  const { recipes, isLoading, isErrorGeneratingRecipes } = useRecipes();

  return (
    <div
      className={`flex justify-center ${
        (ingredients.length === 0 || isLoading || isErrorGeneratingRecipes) &&
        "items-center"
      } p-4 min-h-screen w-full`}
    >
      <Header />
      {ingredients.length === 0 && <AddIngredients />}
      {isLoading && <GeneratingRecipes />}
      {isErrorGeneratingRecipes && <ErrorGeneratingRecipes />}
      {ingredients.length !== 0 && !isLoading && !isErrorGeneratingRecipes && (
        <main className="flex flex-col w-full max-w-md mt-34 gap-y-4">
          {recipes.map((recipe, index) => (
            <RecipePreview key={index} recipe={recipe} index={index} />
          ))}
        </main>
      )}
    </div>
  );
}
