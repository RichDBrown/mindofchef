import { Ingredient } from "../_types/ingredient";

export function ingredientsToSentence(ingredients: Ingredient[]): string {
  const stringArrayOfIngredients = ingredients.map(
    (ingredient) =>
      `${ingredient.quantity} ${ingredient.unit} of ${ingredient.ingredient}`
  );

  const stringOfIngredients = stringArrayOfIngredients.join(", ");
  return stringOfIngredients;
}
