import { IngredientsProvider } from "@/app/_contexts/IngredientsContext";
import { RecipesContext } from "@/app/_contexts/RecipesContext";
import { render, screen } from "@testing-library/react";
import RecipePreview from "./RecipePreview";
import { Recipe } from "@/app/_types/recipe";

const mockRecipe: Recipe = {
  name: "Garlic Chicken",
  description: "Simple garlic chicken.",
  prepTime: 10,
  cookTime: 20,
  servings: 2,
  calories: 420,
  protein: 38,
  carbs: 3,
  fats: 28,
  ingredients: [
    { ingredient: "Chicken breast", quantity: 2, unit: "piece" },
    { ingredient: "Garlic", quantity: 3, unit: "clove" },
  ],
  instructions: ["Cook chicken", "Add garlic"],
};

jest.mock("@/app/_server-functions/generateRecipes", () => ({
  generateRecipes: jest.fn(),
}));

jest.mock("@/app/_server-functions/generateImages", () => ({
  generateImages: jest.fn(),
}));

describe("RecipePreview", () => {
  it("renders loading icon on recipe image when images are still generating", () => {
    render(
      <IngredientsProvider>
        <RecipesContext.Provider
          value={{
            recipes: [],
            images: [],
            isLoading: false,
            isErrorGeneratingRecipes: false,
            createRecipes: jest.fn(),
          }}
        >
          <RecipePreview recipe={mockRecipe} index={0} />
        </RecipesContext.Provider>
      </IngredientsProvider>
    );

    screen.getByText("Generating image...");
  });
});
