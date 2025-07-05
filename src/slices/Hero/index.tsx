import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

import { Boundry } from "../../components/boundry";
import { Heading } from "@/components/ui/heading";

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
      <Heading className="font-mono">
        <PrismicRichText field={slice.primary.heading} />
      </Heading>

      <PrismicRichText field={slice.primary.bodycopy} />
      <PrismicNextLink field={slice.primary.cta} />
    </Boundry>
  );
};

export default Hero;
