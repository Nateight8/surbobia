import { Content } from "@prismicio/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export interface FeaturesBundleSlice {
  id: string;
  slice_type: "features_bundle";
  slices: Content.FeaturesSlice[];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getDominantColor(url: string) {
  const paletteURL = new URL(url);
  paletteURL.searchParams.set("palette", "json");

  const res = await fetch(paletteURL);
  const json = await res.json();

  return (
    json.dominant_colors.vibrant?.hex || json.dominant_colors.vibrant_light?.hex
  );
}

export function bundleFeaturesSlices(
  slices: Content.HomepageDocumentDataSlicesSlice[]
) {
  const res: (Content.HomepageDocumentDataSlicesSlice | FeaturesBundleSlice)[] =
    [];

  for (const slice of slices) {
    if (slice.slice_type !== "features") {
      res.push(slice);
      continue;
    }

    const bundle = res.at(-1);
    if (bundle?.slice_type === "features_bundle") {
      bundle.slices.push(slice);
    } else {
      res.push({
        id: `${slice.id}-bundle`,
        slice_type: "features_bundle",
        slices: [slice],
      });
    }
  }
  return res;
}
