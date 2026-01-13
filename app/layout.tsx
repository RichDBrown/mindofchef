import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { IngredientsProvider } from "./_contexts/IngredientsContext";
import { RecipesProvider } from "./_contexts/RecipesContext";
import OGImage from "@/public/og.jpg";

const inter = Inter({
  weight: "variable",
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mindofchef.com"),
  title: "MindOfChef | AI-Powered Recipe Creator",
  description:
    "MindOfChef is an AI recipe generator that creates personalized recipes from the ingredients you have. Discover what to cook in seconds.",
  openGraph: {
    title: "MindOfChef | AI-Powered Recipe Creator",
    description:
      "MindOfChef is an AI recipe generator that creates personalized recipes from the ingredients you have. Discover what to cook in seconds.",
    type: "website",
    images: OGImage.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen w-full`}>
        <IngredientsProvider>
          <RecipesProvider>{children}</RecipesProvider>
        </IngredientsProvider>
      </body>
    </html>
  );
}
