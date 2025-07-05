import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Boundry } from "@/components/boundry";
import { Heading } from "@/components/ui/heading";
import Product from "./_components/product";

/**
 * Props for `ProductGrid`.
 */
export type ProductGridProps = SliceComponentProps<Content.ProductGridSlice>;

/**
 * Component for "ProductGrid" Slices.
 */
const ProductGrid: FC<ProductGridProps> = ({ slice }) => {
  return (
    <Boundry
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-brand-gray bg-texture"
    >
      <Heading className="text-center ~mb-4/6" as="h2">
        <PrismicText field={slice.primary.heading} />
      </Heading>
      <div className="text-center ~mb-6/10">
        <PrismicRichText field={slice.primary.bodycopy} />
      </div>

      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {slice.primary.product.map(({ skateboard }) => {
          if (!isFilled.contentRelationship(skateboard)) return null;
          return <Product productId={skateboard.id} key={skateboard.id} />;
        })}
      </div>
    </Boundry>
  );
};

export default ProductGrid;
