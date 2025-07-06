"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

import { Boundry } from "../../components/boundry";
import { Heading } from "@/components/ui/heading";
import { ButtonLink } from "@/components/ui/button-links";
import { WideLogo } from "../wide-logo";
import { TallLogo } from "../tall-logo";
import { SkateBoard } from "@/components/skate-board";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Boundry
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-brand-pink relative h-dvh overflow-hidden"
    >
      <div className="absolute inset-0 text-brand-purple flex items-center pt-20">
        <WideLogo className="w-full hidden opacity-20 lg:block mix-blend-multiply" />
        <TallLogo className="w-full mix-blend-multiply lg:hidden opacity-20" />
      </div>

      <div className="grid absolute grid-rows-[1fr,auto] inset-0 mx-auto mt-24 max-w-6xl place-items-end px-6 ~py-10/16">
        <Heading className="relative max-w-2xl place-self-start">
          <PrismicText field={slice.primary.heading} />
        </Heading>

        <div className="flex relative flex-col ~gap-2/4 justify-between lg:flex-row w-full items-center">
          <div className="max-w-[45ch] ~text-lg/xl font-semibold">
            <PrismicRichText field={slice.primary.bodycopy} />
          </div>
          <ButtonLink
            icon="skateboard"
            size="lg"
            className="z-20 mt-2 block"
            field={slice.primary.cta}
          >
            {slice.primary.cta.text}
          </ButtonLink>
          {/* <PrismicNextLink field={slice.primary.cta} /> */}
        </div>
      </div>
      <SkateBoard
        deckTextureURL={"/skateboard/deck.webp"}
        wheelTextureURL={"/skateboard/SkateWheel1.png"}
        truckColor="555555"
        boltColor="555555"
        wheelTextureURLs={["/skateboard/SkateWheel1.png"]}
        deckTextureURLs={["/skateboard/deck.webp"]}
      />
    </Boundry>
  );
};

export default Hero;
