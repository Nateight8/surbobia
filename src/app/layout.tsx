import type { Metadata } from "next";
import { Bowlby_One_SC, DM_Mono } from "next/font/google";
import "./globals.css";

import { SVGFilters } from "@/components/svg-filters";
import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";

const bowlbyOne = Bowlby_One_SC({
  variable: "--font-bowlby-one",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  display: "swap",
  weight: "500",
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings").catch(() => notFound());

  return {
    title: settings.data.site_title,
    description: settings.data.meta_description,
    openGraph: {
      images: settings.data.fallback_og_image.url ?? undefined,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bowlbyOne.variable} ${dmMono.className} antialiased text-zinc-900`}
      >
        <main>{children}</main>
        <SVGFilters />
      </body>
    </html>
  );
}
