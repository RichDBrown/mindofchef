import { useRecipes } from "@/app/_hooks/useRecipes";
import Image from "next/image";
import Link from "next/link";
import LeftChevron from "@/public/chevron-left.svg";
import { Navigation } from "@/app/_utils/navigation";

export default function Header() {
  const { recipes, isLoading, isErrorGeneratingRecipes } = useRecipes();

  return (
    <header className="flex flex-col fixed z-10 top-0 p-4 w-full text-sm font-medium bg-linear-to-r from-[#FF6900] to-[#FE9A00] shadow-lg">
      <Link href={Navigation.INGREDIENTS} className="flex items-center gap-x-3">
        <Image
          src={LeftChevron}
          alt="Back to ingredients."
          unoptimized={true}
          priority={true}
          className="h-3 w-auto"
        />
        Back to ingredients
      </Link>
      <h1 className="mt-3 text-2xl font-medium">Recipe suggestions</h1>
      <p className="mt-1 text-sm text-[#FFEDD4]">
        {isLoading
          ? "Generating recipes..."
          : isErrorGeneratingRecipes
          ? "Generation failed"
          : recipes.length === 1
          ? "1 recipe found"
          : `${recipes.length} recipes found`}
      </p>
    </header>
  );
}
