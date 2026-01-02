export type Recipe = {
  name: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: { ingredient: string; quantity: number; unit: string }[];
  instructions: string[];
};
