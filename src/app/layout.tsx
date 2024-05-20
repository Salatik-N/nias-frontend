import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {getGlobalPageMetadata} from "@/data/loaders";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata();

  return {
    title: metadata?.title,
    description: metadata?.description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
