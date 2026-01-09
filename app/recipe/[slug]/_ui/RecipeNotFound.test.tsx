import { render, screen } from "@testing-library/react";
import RecipeNotFound from "./RecipeNotFound";

describe("RecipeNotFound", () => {
  it("renders link back to ingredients page", () => {
    render(<RecipeNotFound />);

    const backToIngredientsLink = screen.getByRole("link", {
      name: "Back to ingredients",
    });
    expect(backToIngredientsLink).toHaveAttribute("href", "/ingredients");
  });
});
