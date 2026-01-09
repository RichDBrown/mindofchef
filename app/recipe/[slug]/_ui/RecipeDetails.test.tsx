import { IngredientsProvider } from "@/app/_contexts/IngredientsContext";
import { RecipesContext } from "@/app/_contexts/RecipesContext";
import { render, screen } from "@testing-library/react";
import RecipeDetails from "./RecipeDetails";
import { Recipe } from "@/app/_types/recipe";

const mockRecipes: Recipe[] = [
  {
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
  },
  {
    name: "Tomato Pasta",
    description: "Quick tomato pasta.",
    prepTime: 5,
    cookTime: 15,
    servings: 2,
    calories: 480,
    protein: 14,
    carbs: 65,
    fats: 12,
    ingredients: [
      { ingredient: "Pasta", quantity: 200, unit: "g" },
      { ingredient: "Tomato", quantity: 2, unit: "piece" },
    ],
    instructions: ["Boil pasta", "Add tomatoes"],
  },
];

jest.mock("@/app/_server-functions/generateRecipes", () => ({
  generateRecipes: jest.fn(),
}));

jest.mock("@/app/_server-functions/generateImages", () => ({
  generateImages: jest.fn(),
}));

describe("RecipeDetails", () => {
  it("renders loading icon when recipe image is still generating", () => {
    render(
      <IngredientsProvider>
        <RecipesContext.Provider
          value={{
            recipes: mockRecipes,
            images: [],
            isLoading: false,
            isErrorGeneratingRecipes: false,
            createRecipes: jest.fn(),
          }}
        >
          <RecipeDetails slug="1" />
        </RecipesContext.Provider>
      </IngredientsProvider>
    );

    screen.getByText("Generating image...");
  });
});
