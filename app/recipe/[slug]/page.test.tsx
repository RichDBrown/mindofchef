import { IngredientsProvider } from "@/app/_contexts/IngredientsContext";
import { RecipesContext } from "@/app/_contexts/RecipesContext";
import RecipePage from "./page";
import { act, render, screen } from "@testing-library/react";
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

describe("RecipePage", () => {
  it("renders error message if no recipe exists for slug", async () => {
    await act(async () =>
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
            <RecipePage params={Promise.resolve({ slug: "0" })} />
          </RecipesContext.Provider>
        </IngredientsProvider>
      )
    );

    screen.getByRole("heading", { level: 1, name: "Recipe not found" });
    screen.getByAltText("Recipe not available.");
    screen.getByRole("heading", { level: 2, name: "Recipe not available" });
    screen.getByText(
      "We couldn't find the recipe you're looking for. The link may be incorrect, or expired."
    );
    screen.getByRole("link", {
      name: "Back to ingredients",
    });
  });

  it("renders recipe details when a recipe exists for slug", async () => {
    await act(async () =>
      render(
        <IngredientsProvider>
          <RecipesContext.Provider
            value={{
              recipes: mockRecipes,
              images: ["image1", "image2"],
              isLoading: false,
              isErrorGeneratingRecipes: false,
              createRecipes: jest.fn(),
            }}
          >
            <RecipePage params={Promise.resolve({ slug: "0" })} />
          </RecipesContext.Provider>
        </IngredientsProvider>
      )
    );

    const backButton = screen.getByRole("link");
    expect(backButton).toHaveAttribute("href", "/recipe-suggestions");
    screen.getByAltText("Simple garlic chicken.");
    screen.getByRole("heading", { level: 1, name: "Garlic Chicken" });
    screen.getByText("Simple garlic chicken.");
    screen.getByText("Prep");
    screen.getByText("10m");
    screen.getByText("Cook");
    screen.getByText("20m");
    screen.getByText("Servings");
    screen.getAllByText("2")[0];
    screen.getByText("Calories");
    screen.getByText("420");
    screen.getByRole("heading", { level: 2, name: "Nutrition facts" });
    screen.getByText("Protein");
    screen.getByText("38g");
    screen.getByText("Carbs");
    screen.getByText("3g");
    screen.getByText("Fats");
    screen.getByText("28g");
    screen.getByRole("heading", { level: 2, name: "Ingredients" });
    screen.getByText("Chicken breast");
    screen.getByText("2 piece");
    screen.getByText("Garlic");
    screen.getByText("3 clove");
    screen.getByRole("heading", { level: 2, name: "Instructions" });
    screen.getByText("Cook chicken");
    screen.getByText("Add garlic");
  });
});
