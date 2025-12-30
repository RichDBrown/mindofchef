import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IngredientsProvider } from "../_contexts/IngredientsContext";
import IngredientsPage from "./page";
import { useRouter } from "next/navigation";
import { RecipesProvider } from "../_contexts/RecipesContext";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("IngredientsPage", () => {
  const pushMock = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    render(
      <IngredientsProvider>
        <RecipesProvider>
          <IngredientsPage />
        </RecipesProvider>
      </IngredientsProvider>
    );
  });

  it("allows user to enter ingredients", async () => {
    const addIngredientButton = screen.getByRole("button", {
      name: "Add ingredient. Add ingredient",
    });
    expect(addIngredientButton).toBeDisabled();

    const ingredientNameInput = screen.getByRole("textbox", {
      name: "Ingredient name",
    });
    await user.type(ingredientNameInput, "Tomato");

    const quantityInput = screen.getByRole("spinbutton", { name: "Quantity" });
    await user.type(quantityInput, "2");

    const unitSelect = screen.getByRole("combobox", { name: "Unit" });
    await user.selectOptions(unitSelect, "piece");

    expect(addIngredientButton).toBeEnabled();
    await user.click(addIngredientButton);

    screen.getByText("Tomato");
  });

  it("allows the user to remove ingredients", async () => {
    const ingredientNameInput = screen.getByRole("textbox", {
      name: "Ingredient name",
    });
    await user.type(ingredientNameInput, "Tomato");

    const quantityInput = screen.getByRole("spinbutton", { name: "Quantity" });
    await user.type(quantityInput, "2");

    const unitSelect = screen.getByRole("combobox", { name: "Unit" });
    await user.selectOptions(unitSelect, "piece");

    const addIngredientButton = screen.getByRole("button", {
      name: "Add ingredient. Add ingredient",
    });
    await user.click(addIngredientButton);

    screen.getByText("Tomato");

    const removeIngredientButton = screen.getByRole("button", {
      name: "Delete ingredient.",
    });
    await user.click(removeIngredientButton);

    expect(screen.queryByText("Tomato")).toBeNull();
  });

  it("allows the user to generate recipes after adding at least one ingredient", async () => {
    const generateRecipesButton = screen.getByRole("button", {
      name: "Generate recipes. Generate recipes",
    });
    expect(generateRecipesButton).toBeDisabled();

    screen.getByText("Add at least one ingredient to start");

    const ingredientNameInput = screen.getByRole("textbox", {
      name: "Ingredient name",
    });
    await user.type(ingredientNameInput, "Tomato");

    const quantityInput = screen.getByRole("spinbutton", { name: "Quantity" });
    await user.type(quantityInput, "2");

    const unitSelect = screen.getByRole("combobox", { name: "Unit" });
    await user.selectOptions(unitSelect, "piece");

    const addIngredientButton = screen.getByRole("button", {
      name: "Add ingredient. Add ingredient",
    });
    await user.click(addIngredientButton);

    expect(
      screen.queryByText("Add at least one ingredient to start")
    ).toBeNull();

    await user.click(generateRecipesButton);
    expect(pushMock).toHaveBeenCalledWith("/recipe-suggestions");
  });
});
