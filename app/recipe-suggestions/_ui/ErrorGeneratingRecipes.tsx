import Image from "next/image";
import Error from "@/public/exclamationmark.triangle.svg";
import { useRecipes } from "@/app/_hooks/useRecipes";

export default function ErrorGeneratingRecipes() {
  const { createRecipes } = useRecipes();

  return (
    <main className="flex flex-col items-center p-8 mt-8 max-w-md text-center bg-white rounded-2xl shadow-lg">
      <div className="flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
        <Image
          src={Error}
          alt="An error occurred while generating your recipes."
          unoptimized={true}
          priority={true}
          className="w-10 h-auto"
        />
      </div>
      <h2 className="mt-6 text-xl font-medium text-gray-900">
        Recipe generation failed
      </h2>
      <p className="mt-3 text-gray-600">
        We encountered an issue while generating your recipes. This might be due
        to a temporary connection problem or service interruption.
      </p>
      <button
        onClick={() => createRecipes()}
        className="mt-6 w-full h-12 bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:from-orange-600 active:to-amber-600 rounded-full cursor-pointer transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
