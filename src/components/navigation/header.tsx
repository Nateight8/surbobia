import Link from "next/link";
// import React, { useEffect, useState } from "react";
import { ButtonLink } from "../ui/button-links";
import { Logo } from "./logo";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { LinkField } from "@prismicio/client";

// Type for navigation items from Prismic
// Type for navigation items from Prismic
type NavigationItem = {
  id?: string;
  link: LinkField;
  label?: string;
  uid?: string;
};

export async function Header() {
  // const [settings, setSettings] = useState<{
  //   data: { navigation?: NavigationItem[] };
  // } | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<Error | null>(null);
  const client = createClient();
  const settingsData = await client.getSingle("settings");
  // useEffect(() => {
  //   const fetchSettings = async () => {
  //     try {

  //       console.log("SETTINGS FROM HEADER", settingsData);
  //       setSettings(
  //         settingsData as unknown as { data: { navigation?: NavigationItem[] } }
  //       );
  //     } catch (err) {
  //       console.error("Failed to fetch settings:", err);
  //       setError(
  //         err instanceof Error ? err : new Error("An unknown error occurred")
  //       );
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchSettings();
  // }, []);

  return (
    <header className="header absolute left-0 right-0 top-0 z-50 ~h-32/48 ~px-4/6 ~py-4/6 hd:h-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto,auto] items-center gap-6 md:grid-cols-[1fr,auto,1fr]">
        <Link href="/" className="justify-self-start">
          <Logo className="text-brand-purple ~h-12/20" />
        </Link>
        <nav
          aria-label="Main"
          className="col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1"
        >
          <ul className="flex flex-wrap items-center justify-center gap-8">
            {settingsData?.data?.navigation?.map((item: NavigationItem) => (
              <li
                key={
                  item.id || item.uid || Math.random().toString(36).substr(2, 9)
                }
              >
                <PrismicNextLink field={item.link} className="~text-lg/xl">
                  {item.link?.text || item.label || "Link"}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="justify-self-end">
          <ButtonLink href="" icon="cart" color="purple" aria-label="Cart (1)">
            <span className="md:hidden">1</span>
            <span className="hidden md:inline">Cart (1)</span>
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
