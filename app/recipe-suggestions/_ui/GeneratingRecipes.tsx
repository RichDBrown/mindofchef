import Image from "next/image";
import OrangeLogo from "@/public/orange-logo.svg";

export default function GeneratingRecipes() {
  return (
    <main className="flex flex-col items-center p-12 max-w-md text-center bg-white rounded-2xl shadow-lg">
      <div className="relative flex flex-col justify-center items-center">
        <div className="absolute h-24 w-24 border-4 border-orange-500 border-t-orange-100 rounded-full animate-spin" />
        <Image
          src={OrangeLogo}
          alt="MindOfChef logo."
          unoptimized={true}
          priority={true}
          className="w-10 h-auto"
        />
      </div>
      <h2 className="mt-14 text-xl font-medium text-gray-900">
        Generating your recipes
      </h2>
      <p className="mt-3 text-gray-600">
        Our AI chef is analyzing your ingredients and creating personalized
        recipes just for you...
      </p>
      <div className="flex items-center gap-x-2 mt-6">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
        <div
          className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-2 h-2 bg-orange-500 rounded-full animate-bounce delay-300"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </main>
  );
}
