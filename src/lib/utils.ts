import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
