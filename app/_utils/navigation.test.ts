import { Navigation } from "./navigation";

describe("Navigation enum", () => {
  it("returns the correct strings", () => {
    expect(Navigation.INGREDIENTS).toBe("/ingredients");
    expect(Navigation.RECIPESUGGESTIONS).toBe("/recipe-suggestions");
    expect(Navigation.RECIPE).toBe("/recipe/");
  });
});
