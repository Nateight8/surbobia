import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Logo } from "./logo";
import { Boundry } from "../boundry";
import { FooterPhysics } from "./footer-physics";
import { asImageSrc } from "@prismicio/client";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  const boardTextureURLs = settings.data.footer_skateboards
    .map((item) => asImageSrc(item.skateboard, { h: 600 }))
    .filter((url): url is string => Boolean(url));

  return (
    <footer className="bg-texture bg-zinc-900 text-white overflow-hidden">
      <div className="relative h-[75vh] ~p-10/16 md:aspect-auto">
        <PrismicNextImage
          field={settings.data.footer_image}
          alt=""
          fill
          className="object-cover"
          width={1200}
        />
        <FooterPhysics
          boardTextureURLs={boardTextureURLs}
          className="absolute inset-0 overflow-hidden"
        />
        <Logo className="pointer-events-none relative h-20 mix-blend-exclusion md:h-28" />
      </div>
      <Boundry asChild>
        <div className="">
          <ul className="flex flex-wrap justify-center gap-8 ~text-lg/xl">
            {settings.data.navigation.map((item) => (
              <li key={item.link.text} className="hover:underline">
                <PrismicNextLink field={item.link} />
              </li>
            ))}
          </ul>
        </div>
      </Boundry>
      {/* List of links */}
    </footer>
  );
}
