import { ButtonLink } from "@/components/ui/button-links";
import { createClient } from "@/prismicio";
// import { StarIcon } from "@phosphor-icons/react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import Price from "./price";
import { HorizontalLine, VerticalLine } from "./line";
import clsx from "clsx";
import { Scribble } from "./scribble";
import { getDominantColor } from "@/lib/utils";

export default async function Product({ productId }: { productId: string }) {
  const client = createClient();
  const product = await client.getByID<Content.SkateboardDocument>(productId);

  const price = isFilled.number(product?.data.price) ? product?.data.price : 0;

  const VERTICAL_LINE_CLASSES =
    "absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";

  const HORIZONTAL_LINE_CLASSES =
    "-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";

  const dominantColor = isFilled.image(product.data.image)
    ? await getDominantColor(product.data.image.url)
    : undefined;

  return (
    <div className="group relative mx-auto w-full px-8 pt-4">
      <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "left-4")} />
      <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "right-4")} />
      <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />
      <Price price={price} />
      <div className="-mb-1 overflow-hidden py-4">
        <Scribble
          className="absolute inset-0 size-full "
          color={dominantColor}
        />
        <PrismicNextImage
          alt=""
          width={150}
          field={product?.data.image}
          className=" mx-auto w-[58%] origin-top transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-150"
        />
      </div>
      <h3 className="my-2 font-mono text-center leading-tight ~text-lg/xl ">
        {product?.data.name}
      </h3>
      <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100 flex items-center justify-center">
        <ButtonLink field={product?.data.customizer}>Customize</ButtonLink>
      </div>
      <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />
    </div>
  );
}
