export type Unit =
  | "cup"
  | "tbsp"
  | "tsp"
  | "oz"
  | "lb"
  | "g"
  | "kg"
  | "ml"
  | "l"
  | "piece"
  | "clove"
  | "pinch";

export type Ingredient = {
  ingredient: string;
  quantity: number;
  unit: Unit;
};
