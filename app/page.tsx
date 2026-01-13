import Image from "next/image";
import Logo from "@/public/logo.svg";
import Wand from "@/public/wand-and-sparkles.svg";
import Clock from "@/public/clock.svg";
import Leaf from "@/public/leaf.svg";
import Heart from "@/public/heart.svg";
import Link from "next/link";
import Sparkles from "@/public/sparkles.svg";
import { Navigation } from "./_utils/navigation";

export default function LandingPage() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen w-full px-4 py-12">
      <div className="flex justify-center items-center w-24 h-24 bg-linear-to-br from-orange-500 to-amber-500 rounded-3xl shadow-2xl">
        <Image
          src={Logo}
          alt="MindOfChef logo."
          unoptimized={true}
          priority={true}
          className="w-14 h-auto"
        />
      </div>
      <h1 className="mt-8 text-5xl font-medium text-transparent bg-linear-to-r from-orange-600 to-amber-600 bg-clip-text">
        MindOfChef
      </h1>
      <p className="mt-2 text-lg text-gray-600">AI-Powered Recipe Creator</p>
      <h2 className="mt-6 max-w-md text-xl text-gray-700 text-center">
        Transform your ingredients into delicious recipes with the power of AI
      </h2>
      <section className="grid grid-cols-[auto_1fr] mt-8 p-6 gap-4 max-w-md bg-white rounded-2xl shadow-xl">
        <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
          <Image
            src={Wand}
            alt=""
            unoptimized={true}
            priority={true}
            className="h-5 w-auto"
          />
        </div>
        <div>
          <h3 className="mb-1 text-lg font-medium text-gray-900">
            AI-generated recipes
          </h3>
          <p className="text-sm text-gray-600">
            Get personalized recipe suggestions based on your available
            ingredients
          </p>
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
          <Image
            src={Clock}
            alt=""
            unoptimized={true}
            priority={true}
            className="h-auto w-5"
          />
        </div>
        <div>
          <h3 className="mb-1 text-lg font-medium text-gray-900">
            Quick & easy
          </h3>
          <p className="text-sm text-gray-600">
            Save time with clear prep times, cook times, and step-by-step
            instructions
          </p>
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
          <Image
            src={Leaf}
            alt=""
            unoptimized={true}
            priority={true}
            className="h-auto w-5"
          />
        </div>
        <div>
          <h3 className="mb-1 text-lg font-medium text-gray-900">
            Nutritional info
          </h3>
          <p className="text-sm text-gray-600">
            Track calories, protein, carbs, and fats for every recipe
          </p>
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
          <Image
            src={Heart}
            alt=""
            unoptimized={true}
            priority={true}
            className="h-auto w-5"
          />
        </div>
        <div>
          <h3 className="mb-1 text-lg font-medium text-gray-900">
            Reduce food waste
          </h3>
          <p className="text-sm text-gray-600">
            Make the most of what you have and discover new recipe ideas
          </p>
        </div>
      </section>
      <Link
        href={Navigation.INGREDIENTS}
        className="flex justify-center items-center gap-x-4 mt-8 py-3 w-full max-w-md text-lg font-semibold bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:from-orange-600 active:to-amber-600 rounded-lg shadow-2xl hover:scale-105 active:scale-105 transition-all"
      >
        <Image
          src={Sparkles}
          alt="Get started."
          unoptimized={true}
          className="w-4 h-auto"
        />
        Get started
      </Link>
      <p className="mt-4 text-sm text-gray-500">
        No sign-up required &bull; Free to use
      </p>
    </main>
  );
}
