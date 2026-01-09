import { Navigation } from "@/app/_utils/navigation";
import Link from "next/link";
import Image from "next/image";
import LeftChevron from "@/public/chevron-left-grey.svg";
import { useRecipes } from "@/app/_hooks/useRecipes";
import Clock from "@/public/clock.svg";
import Stopwatch from "@/public/stopwatch.svg";
import People from "@/public/person-2.svg";
import Flame from "@/public/flame.svg";

export default function RecipeDetails({ slug }: { slug: string }) {
  const { recipes, images } = useRecipes();

  return (
    <main className="flex flex-col items-center w-full">
      <Link
        href={Navigation.RECIPESUGGESTIONS}
        className="fixed top-4 left-4 p-3 z-10 bg-white/90 hover:bg-white active:bg-white rounded-full shadow-lg transition-colors"
      >
        <Image src={LeftChevron} alt="Link back to recipe suggestions." />
      </Link>
      <div className="relative flex flex-col justify-center items-center w-full h-80 bg-[#F3F4F6]">
        {images[Number(slug)] ? (
          <>
            <Image
              src={images[Number(slug)]}
              alt={recipes[Number(slug)].description}
              unoptimized={true}
              fill={true}
              objectFit="cover"
            />
            <div className="absolute z-3 w-full h-full bg-linear-to-t from-black/60 to-transparent" />
          </>
        ) : (
          <>
            <div className="flex justify-center items-center w-5 h-5 bg-[#FF6900] rounded-full">
              <div className="h-4 w-4 rounded-full border-3 border-dotted border-white animate-spin"></div>
            </div>
            <p className="mt-3 text-xs text-[#99A1AF]">Generating image...</p>
          </>
        )}
      </div>
      <div className="-mt-12 p-4 z-5 w-full max-w-md">
        <section className="flex flex-col w-full p-6 bg-white rounded-3xl shadow-2xl">
          <h1 className="text-3xl font-medium text-gray-900">
            {recipes[Number(slug)].name}
          </h1>
          <p className="mt-3 text-gray-600">
            {recipes[Number(slug)].description}
          </p>
          <div className="grid grid-cols-4 gap-x-3 mt-6">
            <div className="flex flex-col items-center p-3 text-center bg-orange-50 rounded-xl">
              <Image
                src={Clock}
                alt="Prep time."
                unoptimized={true}
                priority={true}
                className="w-5 h-auto mb-1"
              />
              <p className="text-xs text-gray-500">Prep</p>
              <p className="font-medium text-gray-900">
                {recipes[Number(slug)].prepTime}m
              </p>
            </div>
            <div className="flex flex-col items-center p-3 text-center bg-orange-50 rounded-xl">
              <Image
                src={Stopwatch}
                alt="Cook time."
                unoptimized={true}
                priority={true}
                className="w-5 h-auto mb-1"
              />
              <p className="text-xs text-gray-500">Cook</p>
              <p className="font-medium text-gray-900">
                {recipes[Number(slug)].cookTime}m
              </p>
            </div>
            <div className="flex flex-col items-center p-3 text-center bg-orange-50 rounded-xl">
              <Image
                src={People}
                alt="Servings."
                unoptimized={true}
                priority={true}
                className="w-auto h-5 mb-1"
              />
              <p className="text-xs text-gray-500">Servings</p>
              <p className="font-medium text-gray-900">
                {recipes[Number(slug)].servings}
              </p>
            </div>
            <div className="flex flex-col items-center p-3 text-center bg-orange-50 rounded-xl">
              <Image
                src={Flame}
                alt="Calories."
                unoptimized={true}
                priority={true}
                className="w-5 h-auto mb-1"
              />
              <p className="text-xs text-gray-500">Calories</p>
              <p className="font-medium text-gray-900">
                {recipes[Number(slug)].calories}
              </p>
            </div>
          </div>
          <section className="flex flex-col mt-6 p-5 bg-linear-to-r from-orange-50 to-amber-50 rounded-2xl">
            <h2 className="text-xl font-medium text-gray-900">
              Nutrition facts
            </h2>
            <div className="grid grid-cols-3 gap-x-4 mt-3">
              <div className="flex items-center gap-x-2">
                <div className="p-2 text-xl bg-white rounded-lg">🥩</div>
                <div>
                  <p className="text-xs text-gray-500">Protein</p>
                  <p className="font-medium text-gray-900">
                    {recipes[Number(slug)].protein}g
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="p-2 text-xl bg-white rounded-lg">🥔</div>
                <div>
                  <p className="text-xs text-gray-500">Carbs</p>
                  <p className="font-medium text-gray-900">
                    {recipes[Number(slug)].carbs}g
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="p-2 text-xl bg-white rounded-lg">🥑</div>
                <div>
                  <p className="text-xs text-gray-500">Fats</p>
                  <p className="font-medium text-gray-900">
                    {recipes[Number(slug)].fats}g
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col mt-6">
            <h2 className="text-xl font-medium text-gray-900">Ingredients</h2>
            <ul className="flex flex-col mt-4 gap-y-2">
              {recipes[Number(slug)].ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-none"
                >
                  <div className="flex items-center gap-x-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full" />
                    <p className="text-gray-600">{ingredient.ingredient}</p>
                  </div>
                  <p className="font-medium text-gray-900">
                    {ingredient.quantity} {ingredient.unit}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          <section className="flex flex-col mt-6">
            <h2 className="text-xl font-medium text-gray-900">Instructions</h2>
            <ol className="flex flex-col mt-4 gap-y-4">
              {recipes[Number(slug)].instructions.map((instruction, index) => (
                <li key={index} className="flex gap-x-4">
                  <div className="flex items-center justify-center shrink-0 w-8 h-8 font-medium text-white bg-linear-to-r from-orange-500 to-amber-500 rounded-full">
                    {index + 1}
                  </div>
                  <p className="flex-1 mt-1 text-gray-700">{instruction}</p>
                </li>
              ))}
            </ol>
          </section>
        </section>
      </div>
    </main>
  );
}
