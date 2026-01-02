import { Navigation } from "@/app/_utils/navigation";
import Link from "next/link";
import Image from "next/image";
import Clock from "@/public/clock.svg";
import Stopwatch from "@/public/stopwatch.svg";
import People from "@/public/person-2.svg";
import { Recipe } from "@/app/_types/recipe";
import { useRecipes } from "@/app/_hooks/useRecipes";

type RecipePreviewProps = {
  recipe: Recipe;
  index: number;
};

export default function RecipePreview({ recipe, index }: RecipePreviewProps) {
  const { images } = useRecipes();

  return (
    <Link
      href={`${Navigation.RECIPE}${index}`}
      className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-all duration-300"
    >
      <div className="relative flex flex-col justify-center items-center aspect-video bg-[#F3F4F6] rounded-t-2xl">
        {images[index] ? (
          <Image
            src={images[index]}
            alt={recipe.description}
            fill={true}
            unoptimized={true}
            className="rounded-t-2xl"
          />
        ) : (
          <>
            <div className="flex justify-center items-center w-5 h-5 bg-[#FF6900] rounded-full">
              <div className="h-4 w-4 rounded-full border-3 border-dotted border-white animate-spin"></div>
            </div>
            <p className="mt-3 text-xs text-[#99A1AF]">Generating image...</p>
          </>
        )}
      </div>
      <section className="flex flex-col p-5">
        <h2 className="text-xl font-medium text-gray-900">{recipe.name}</h2>
        <div className="grid grid-cols-3 mt-4">
          <div className="flex items-center gap-x-1.5">
            <Image
              src={Clock}
              alt="Prep time."
              unoptimized={true}
              className="w-4 h-auto"
            />
            <p className="text-sm font-medium text-gray-600">
              <span className="text-xs text-gray-500">Prep</span>{" "}
              {recipe.prepTime}m
            </p>
          </div>
          <div className="flex items-center justify-self-center gap-x-1.5">
            <Image
              src={Stopwatch}
              alt="Cook time."
              unoptimized={true}
              className="w-4 h-auto"
            />
            <p className="text-sm font-medium text-gray-600">
              <span className="text-xs text-gray-500">Cook</span>{" "}
              {recipe.cookTime}m
            </p>
          </div>
          <div className="flex items-center justify-self-end gap-x-1.5">
            <Image
              src={People}
              alt="Servings."
              unoptimized={true}
              className="w-auto h-4"
            />
            <p className="text-sm font-medium text-gray-600">
              {recipe.servings}{" "}
              <span className="text-xs text-gray-500">servings</span>
            </p>
          </div>
        </div>
        <div className="pt-2 mt-4 border-t border-[#F3F4F6]">
          <div className="px-3 py-2 w-fit bg-orange-50 rounded-full">
            <p className="text-sm font-medium text-orange-900">
              <span className="text-xs text-orange-700">Total time:</span>{" "}
              {recipe.prepTime + recipe.cookTime} minutes
            </p>
          </div>
        </div>
      </section>
    </Link>
  );
}
