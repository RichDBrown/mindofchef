import { useIngredients } from "@/app/_hooks/useIngredients";
import { Ingredient as IngredientType } from "../../_types/ingredient";
import Xmark from "@/public/xmark.svg";
import Image from "next/image";

type IngredientProps = {
  ingredient: IngredientType;
  index: number;
};

export default function Ingredient({ ingredient, index }: IngredientProps) {
  const { removeIngredient } = useIngredients();

  return (
    <li className="flex justify-between items-center px-4 py-3 bg-[#FFF7ED] border border-[#FFEDD4] rounded-xl">
      <div>
        <p className="text-[#101828]">{ingredient.ingredient}</p>
        <p className="text-sm text-[#6A7282]">{`${ingredient.quantity} ${ingredient.unit}`}</p>
      </div>
      <button
        onClick={() => removeIngredient(index)}
        className="flex justify-center items-center w-8 h-8 hover:bg-[#f9d8ae] active:bg-[#f9d8ae] rounded-full cursor-pointer transition-colors"
      >
        <Image
          src={Xmark}
          alt="Delete ingredient."
          className="w-3 h-auto"
          unoptimized={true}
        />
      </button>
    </li>
  );
}
