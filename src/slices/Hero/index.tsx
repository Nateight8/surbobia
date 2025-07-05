import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

import { Boundry } from "../../components/boundry";

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
    >
      <div className="bg-foreground text-background text-7xl font-mono">
        <PrismicRichText field={slice.primary.heading} />
      </div>
      <PrismicRichText field={slice.primary.bodycopy} />
      <PrismicNextLink field={slice.primary.cta} />
    </Boundry>
  );
};

export default Hero;
