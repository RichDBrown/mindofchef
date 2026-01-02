import { Ingredient } from "../_types/ingredient";
import { ingredientsToSentence } from "./ingredientsToSentence";

const mockIngredients: Ingredient[] = [
  { ingredient: "Chicken breast", quantity: 2, unit: "lb" },
  { ingredient: "Brussels sprouts", quantity: 6, unit: "oz" },
  { ingredient: "Garlic", quantity: 2, unit: "clove" },
];

describe("ingredientsToSentence", () => {
  it("transforms array of ingredients into a sentence", () => {
    const stringOfIngredients = ingredientsToSentence(mockIngredients);
    expect(stringOfIngredients).toBe(
      "2 lb of Chicken breast, 6 oz of Brussels sprouts, 2 clove of Garlic"
    );
  });
});
