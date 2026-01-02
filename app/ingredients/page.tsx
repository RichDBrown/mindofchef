"use client";

import Image from "next/image";
import Logo from "@/public/logo.svg";
import Plus from "@/public/plus.svg";
import Sparkles from "@/public/sparkles.svg";
import { FormEvent, useId, useState } from "react";
import Ingredient from "./_ui/Ingredient";
import { Unit } from "../_types/ingredient";
import { useIngredients } from "../_hooks/useIngredients";
import { useRouter } from "next/navigation";
import { useRecipes } from "../_hooks/useRecipes";
import { Navigation } from "../_utils/navigation";

export default function IngredientsPage() {
  const ingredientInput = useId();
  const quantityInput = useId();
  const unitInput = useId();
  const [ingredient, setIngredient] = useState<string>("");
  const { ingredients, addIngredient } = useIngredients();
  const { createRecipes } = useRecipes();
  const router = useRouter();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const ingredient = formData.get("ingredient") as string;
    const quantity = Number(formData.get("quantity"));
    const unit = formData.get("unit") as string as Unit;

    addIngredient({ ingredient, quantity, unit });
    e.currentTarget.reset();
    setIngredient("");
  }

  return (
    <div className="flex justify-center items-center p-4 min-h-screen w-full">
      <main className="flex flex-col rounded-3xl w-full max-w-md shadow-xl">
        <header className="flex flex-col items-center gap-y-2 px-6 py-8 w-full bg-linear-to-r from-[#FF6900] to-[#FE9A00] rounded-t-3xl">
          <div className="flex items-center gap-x-3">
            <Image
              src={Logo}
              alt="MindOfChef logo."
              unoptimized={true}
              priority={true}
              className="w-10 h-auto"
            />
            <h1 className="text-3xl font-medium">MindOfChef</h1>
          </div>
          <p className="text-sm text-[#FFEDD4]">AI-powered recipe creator</p>
        </header>
        <section className="flex flex-col p-6 bg-white rounded-b-3xl">
          <form onSubmit={onSubmit} className="flex flex-col">
            <label
              htmlFor={ingredientInput}
              className="ml-1 mb-2 text-sm font-medium text-[#4A5565]"
            >
              Ingredient name
            </label>
            <input
              id={ingredientInput}
              name="ingredient"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              className="px-3 py-2.25 text-[#0A0A0A] bg-[#F3F3F5] border border-transparent focus:border-[#a1a1a1] focus:outline-3 outline-[#d0d0d0] rounded-md"
              placeholder="e.g., Tomatoes, Chicken, Garlic..."
            />
            <div className="grid grid-cols-2 mt-4 gap-x-2">
              <div className="flex flex-col">
                <label
                  htmlFor={quantityInput}
                  className="ml-1 mb-2 text-sm font-medium text-[#4A5565]"
                >
                  Quantity
                </label>
                <input
                  id={quantityInput}
                  name="quantity"
                  type="number"
                  min={0.1}
                  step={0.1}
                  defaultValue={1}
                  className="px-3 py-2.25 text-[#0A0A0A] bg-[#F3F3F5] border border-transparent focus:border-[#a1a1a1] focus:outline-3 outline-[#d0d0d0] rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor={unitInput}
                  className="ml-1 mb-2 text-sm font-medium text-[#4A5565]"
                >
                  Unit
                </label>
                <select
                  id={unitInput}
                  name="unit"
                  className="px-3 py-2.25 text-[#0A0A0A] bg-[#F3F3F5] border border-transparent focus:border-[#a1a1a1] focus:outline-3 outline-[#d0d0d0] rounded-md"
                >
                  <option>cup</option>
                  <option>tbsp</option>
                  <option>tsp</option>
                  <option>oz</option>
                  <option>lb</option>
                  <option>g</option>
                  <option>kg</option>
                  <option>ml</option>
                  <option>l</option>
                  <option>piece</option>
                  <option>clove</option>
                  <option>pinch</option>
                </select>
              </div>
            </div>
            <button
              disabled={ingredient === ""}
              className="flex justify-center items-center gap-x-4 mt-4 h-9 text-sm font-medium text-white bg-[#FF6900] hover:bg-[#e35706] active:bg-[#e35706] disabled:bg-[#f4b788] rounded-lg cursor-pointer disabled:cursor-default transition-colors"
            >
              <Image
                src={Plus}
                alt="Add ingredient."
                unoptimized={true}
                priority={true}
                className="w-4 h-auto"
              />
              Add ingredient
            </button>
          </form>
          {ingredients.length > 0 && (
            <section className="flex flex-col mt-6">
              <h2 className="text-sm font-medium text-[#4A5565]">
                Your ingredients {`(${ingredients.length})`}
              </h2>
              <ul className="flex flex-col mt-3 gap-y-2 max-h-56.5 overflow-y-auto">
                {ingredients.map((ingredient, index) => (
                  <Ingredient
                    key={index}
                    ingredient={ingredient}
                    index={index}
                  />
                ))}
              </ul>
            </section>
          )}
          <button
            onClick={() => {
              createRecipes();
              router.push(Navigation.RECIPESUGGESTIONS);
            }}
            disabled={ingredients.length === 0}
            className="flex justify-center items-center mt-6 gap-x-4 h-12 text-lg font-medium bg-linear-to-r from-[#ff6900] enabled:hover:from-[#e35706] enabled:active:from-[#e35706] to-[#fe9a00] enabled:hover:to-[#d37809] enabled:active:to-[#d37809] opacity-50 enabled:opacity-100 rounded-lg shadow-lg cursor-pointer disabled:cursor-default transition-all"
          >
            <Image
              src={Sparkles}
              alt="Generate recipes."
              unoptimized={true}
              priority={true}
              className="w-4 h-auto"
            />
            Generate recipes
          </button>
          {ingredients.length === 0 && (
            <p className="self-center mt-6 text-sm text-[#99a1af]">
              Add at least one ingredient to start
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
