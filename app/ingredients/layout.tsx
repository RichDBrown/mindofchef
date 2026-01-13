import { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: true, follow: false },
};

export default function IngredientsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center items-center p-4 min-h-screen w-full">
      {children}
    </div>
  );
}
