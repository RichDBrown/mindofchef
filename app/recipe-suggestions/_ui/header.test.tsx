import { RecipesContext } from "@/app/_contexts/RecipesContext";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { IngredientsProvider } from "@/app/_contexts/IngredientsContext";
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

describe("Header", () => {
  it("displays the correct number of recipes found", () => {
    render(
      <IngredientsProvider>
        <RecipesContext.Provider
          value={{
            recipes: mockRecipes,
            images: [""],
            isLoading: false,
            isErrorGeneratingRecipes: false,
            createRecipes: jest.fn(),
          }}
        >
          <Header />
        </RecipesContext.Provider>
      </IngredientsProvider>
    );
    screen.getByText("2 recipes found");
  });

  it("renders link back to ingredients page", () => {
    render(
      <IngredientsProvider>
        <RecipesContext.Provider
          value={{
            recipes: mockRecipes,
            images: [""],
            isLoading: false,
            isErrorGeneratingRecipes: false,
            createRecipes: jest.fn(),
          }}
        >
          <Header />
        </RecipesContext.Provider>
      </IngredientsProvider>
    );
    const linkToIngredients = screen.getByRole("link", {
      name: "Back to ingredients. Back to ingredients",
    });
    expect(linkToIngredients).toHaveAttribute("href", "/ingredients");
  });

  it("renders subheading as generating recipes when loading recipes", () => {
    render(
      <IngredientsProvider>
        <RecipesContext.Provider
          value={{
            recipes: [],
            images: [""],
            isLoading: true,
            isErrorGeneratingRecipes: false,
            createRecipes: jest.fn(),
          }}
        >
          <Header />
        </RecipesContext.Provider>
      </IngredientsProvider>
    );

    screen.getByText("Generating recipes...");
  });

  it("renders subheading as generation failed if an error occurs when loading recipes", () => {
    render(
      <IngredientsProvider>
        <RecipesContext.Provider
          value={{
            recipes: [],
            images: [""],
            isLoading: false,
            isErrorGeneratingRecipes: true,
            createRecipes: jest.fn(),
          }}
        >
          <Header />
        </RecipesContext.Provider>
      </IngredientsProvider>
    );

    screen.getByText("Generation failed");
  });
});
