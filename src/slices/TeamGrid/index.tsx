import React, { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import { Boundry } from "@/components/boundry";
// import { PrismicNextImage } from "@prismicio/next";
import { Heading } from "@/components/ui/heading";
import { createClient } from "@/prismicio";
import Skater from "./_components/skater";

/**
 * Props for `TeamGrid`.
 */
export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid: FC<TeamGridProps> = async ({ slice }) => {
  const client = createClient();
  const skaters = await client.getAllByType("skater");

  return (
    <Boundry
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-navy "
    >
      <Heading as="h2" size="lg" className="mb-8 text-center text-white">
        <PrismicText field={slice.primary.heading} />
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-4  gap-8">
        {skaters.map((skater, index) => {
          return (
            <React.Fragment key={skater.id}>
              {skater.data.first_name && (
                <Skater skater={skater} index={index} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </Boundry>
  );
};

export default TeamGrid;
