import { ButtonLink } from "@/components/ui/button-links";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
// import { SkaterScribble } from "./skater-scribble";
// import { clsx } from "clsx";

export default function Skater({
  skater,
  //   index,
}: {
  skater: Content.SkaterDocument;
  index: number;
}) {
  return (
    <div className="group relative flex flex-col items-center gap-4">
      <div className="stack-layout overflow-hidden">
        <PrismicNextImage
          field={skater.data.background_photo}
          width={500}
          imgixParams={{ q: 20 }}
          className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[.8]"
          alt=""
        />
        {/* <SkaterScribble className={clsx("text-lime-600")} /> */}
        <PrismicNextImage
          field={skater.data.skater}
          width={500}
          imgixParams={{ q: 20 }}
          className="transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
          alt=""
        />
        <div className="relative h-48 w-full place-self-end bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <h3 className="relative grid place-self-end justify-self-start p-2 font-mono text-brand-gray ~text-2xl/3xl">
          <span className="mb-[-.3em] block">{skater.data.first_name}</span>
          <span className="block">{skater.data.last_name}</span>
        </h3>
      </div>
      <ButtonLink field={skater.data.customizer_link} size="sm">
        Build their board
      </ButtonLink>
    </div>
  );
}
