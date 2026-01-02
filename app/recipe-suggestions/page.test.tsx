import { render, screen } from "@testing-library/react";
import {
  IngredientsContext,
  IngredientsProvider,
} from "../_contexts/IngredientsContext";
import { RecipesContext, RecipesProvider } from "../_contexts/RecipesContext";
import RecipeSuggestionsPage from "./page";
import { Recipe } from "../_types/recipe";
import { Ingredient } from "../_types/ingredient";

const mockIngredients: Ingredient[] = [
  { ingredient: "Cheese", quantity: 6, unit: "cup" },
];

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

describe("RecipeSuggestionsPage", () => {
  it("renders prompt to user to add availble ingredients if they have not entered any ingredients yet", () => {
    render(
      <IngredientsProvider>
        <RecipesProvider>
          <RecipeSuggestionsPage />
        </RecipesProvider>
      </IngredientsProvider>
    );
    screen.getByRole("heading", { level: 2, name: "No ingredients added" });
    screen.getByText(
      "To generate personalized recipe suggestions, please add your available ingredients first."
    );
    const ingredientsPageLink = screen.getByRole("link", {
      name: "Go to ingredients page",
    });
    expect(ingredientsPageLink).toHaveAttribute("href", "/ingredients");
  });

  it("renders loading indicator as recipes are being generated", () => {
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
          <RecipeSuggestionsPage />
        </RecipesContext.Provider>
      </IngredientsProvider>
    );

    screen.getByRole("heading", { level: 2, name: "Generating your recipes" });
    screen.getByText(
      "Our AI chef is analyzing your ingredients and creating personalized recipes just for you..."
    );
  });

  it("renders error when error occurrs generating recipes", () => {
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
          <RecipeSuggestionsPage />
        </RecipesContext.Provider>
      </IngredientsProvider>
    );

    screen.getByRole("heading", { level: 2, name: "Recipe generation failed" });
    screen.getByText(
      "We encountered an issue while generating your recipes. This might be due to a temporary connection problem or service interruption."
    );
    screen.getByRole("button", { name: "Try again" });
  });

  it("renders recipe cards when recipes have been loaded", () => {
    render(
      <IngredientsContext.Provider
        value={{
          ingredients: mockIngredients,
          addIngredient: jest.fn(),
          removeIngredient: jest.fn(),
        }}
      >
        <RecipesContext.Provider
          value={{
            recipes: mockRecipes,
            images: ["image1", "image2"],
            isLoading: false,
            isErrorGeneratingRecipes: false,
            createRecipes: jest.fn(),
          }}
        >
          <RecipeSuggestionsPage />
        </RecipesContext.Provider>
      </IngredientsContext.Provider>
    );

    const card1 = screen
      .getByRole("heading", { level: 2, name: "Garlic Chicken" })
      .closest("a");
    expect(card1).toHaveAttribute("href", "/recipe/0");
    screen.getByAltText("Simple garlic chicken.");
    expect(card1).toHaveTextContent("Prep 10m");
    expect(card1).toHaveTextContent("Cook 20m");
    expect(card1).toHaveTextContent("2 servings");
    expect(card1).toHaveTextContent("Total time: 30 minutes");

    const card2 = screen
      .getByRole("heading", { level: 2, name: "Tomato Pasta" })
      .closest("a");
    expect(card2).toHaveAttribute("href", "/recipe/1");
    screen.getByAltText("Quick tomato pasta.");
    expect(card2).toHaveTextContent("Prep 5m");
    expect(card2).toHaveTextContent("Cook 15m");
    expect(card2).toHaveTextContent("2 servings");
    expect(card2).toHaveTextContent("Total time: 20 minutes");
  });

  it("renders loading icon on recipe image when recipes have been loaded, but images still generating", () => {
    render(
      <IngredientsContext.Provider
        value={{
          ingredients: mockIngredients,
          addIngredient: jest.fn(),
          removeIngredient: jest.fn(),
        }}
      >
        <RecipesContext.Provider
          value={{
            recipes: mockRecipes,
            images: [],
            isLoading: false,
            isErrorGeneratingRecipes: false,
            createRecipes: jest.fn(),
          }}
        >
          <RecipeSuggestionsPage />
        </RecipesContext.Provider>
      </IngredientsContext.Provider>
    );

    screen.getAllByText("Generating image...");
  });
});
