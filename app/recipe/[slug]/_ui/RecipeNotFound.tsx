import Image from "next/image";
import Error from "@/public/exclamationmark-circle.svg";
import Link from "next/link";
import { Navigation } from "@/app/_utils/navigation";

export default function RecipeNotFound() {
  return (
    <main className="flex flex-col w-full max-w-md bg-white rounded-3xl shadow-xl">
      <header className="px-6 py-4 bg-linear-to-r from-orange-500 to-amber-500 rounded-t-3xl">
        <h1 className="text-2xl font-medium">Recipe not found</h1>
      </header>
      <section className="flex flex-col items-center m-8 p-8 text-center bg-orange-50 rounded-2xl">
        <div className="flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full">
          <Image
            src={Error}
            alt="Recipe not available."
            className="w-10 h-auto"
            unoptimized={true}
            priority={true}
          />
        </div>
        <h2 className="mt-6 text-xl font-medium text-gray-900">
          Recipe not available
        </h2>
        <p className="mt-3 text-gray-600">
          We couldn't find the recipe you're looking for. The link may be
          incorrect, or expired.
        </p>
        <Link
          href={Navigation.INGREDIENTS}
          className="flex justify-center items-center mt-6 h-12 w-full bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:from-orange-600 active:to-amber-600 rounded-full transition-colors"
        >
          Back to ingredients
        </Link>
      </section>
    </main>
  );
}
