import Image from "next/image";
import OrangeLogo from "@/public/orange-logo.svg";
import Link from "next/link";
import { Navigation } from "../../_utils/navigation";

export default function AddIngredients() {
  return (
    <main className="flex flex-col items-center p-8 max-w-md text-center bg-white rounded-2xl shadow-lg">
      <div className="flex justify-center items-center w-20 h-20 bg-orange-100 rounded-full">
        <Image
          src={OrangeLogo}
          alt="MindOfChef logo."
          unoptimized={true}
          priority={true}
          className="w-10 h-auto"
        />
      </div>
      <h2 className="mt-6 text-xl font-medium text-gray-900">
        No ingredients added
      </h2>
      <p className="mt-3 text-gray-600">
        To generate personalized recipe suggestions, please add your available
        ingredients first.
      </p>
      <Link
        href={Navigation.INGREDIENTS}
        className="flex items-center justify-center mt-6 w-full h-12 bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:from-orange-600 active:to-amber-600 rounded-full transition-colors"
      >
        Go to ingredients page
      </Link>
    </main>
  );
}
