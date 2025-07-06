import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Boundry } from "@/components/boundry";
import clsx from "clsx";
import { Heading } from "@/components/ui/heading";
import { ButtonLink } from "@/components/ui/button-links";
import FeatureImage from "./_components/feature-image";

/**
 * Props for `Features`.
 */
export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>;

/**
 * Component for "Features" Slices.
 */
const Features: FC<FeaturesProps> = ({ slice, index }) => {
  return (
    <Boundry
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        "sticky ",
        slice.primary.theme === "blue" && "bg-brand-blue bg-texture text-white",
        slice.primary.theme === "orange" &&
          "bg-brand-orange bg-texture text-white",
        slice.primary.theme === "lime" && "bg-brand-lime bg-texture text-white",
        slice.primary.theme === "navy" && "bg-brand-navy bg-texture text-white"
      )}
      style={{
        top: `${index * 2}rem`,
      }}
    >
      <div className="grid grid-cols-1 items-center md:grid-cols-2 md:gap-24">
        <div
          className={clsx(
            "flex flex-col items-center text-center md:items-start md:text-left gap-8",
            slice.variation === "imageOnLeft" && "md:order-2"
          )}
        >
          <Heading as="h2">
            <PrismicText field={slice.primary.heading} />
          </Heading>
          <div className="max-w-md text-lg leading-relaxed">
            <PrismicRichText field={slice.primary.bodycopy} />
          </div>
          <ButtonLink
            field={slice.primary.cta}
            color={slice.primary.theme === "lime" ? "orange" : "lime"}
          >
            {slice.primary.cta.text}
          </ButtonLink>
        </div>

        <FeatureImage
          backgroundImage={slice.primary.background_image}
          mainImage={slice.primary.main_image}
        />
      </div>
    </Boundry>
  );
};

export default Features;
