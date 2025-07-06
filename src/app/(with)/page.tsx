import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { bundleFeaturesSlices } from "@/lib/utils";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());
  const slices = bundleFeaturesSlices(page.data.slices);

  // Create a components object that includes both the regular components and our bundle handler
  const allComponents = {
    ...components,
    features_bundle: ({
      slice,
    }: {
      slice: { slices: typeof page.data.slices };
    }) => (
      <div className="features-bundle">
        <SliceZone slices={slice.slices} components={components} />
      </div>
    ),
  };

  return (
    <main>
      <SliceZone slices={slices} components={allComponents} />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
