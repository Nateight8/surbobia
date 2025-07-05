"use client";
import { StarIcon } from "@phosphor-icons/react";

export default function Price({ price }: { price: number }) {
  return (
    <div className="flex items-center justify-between ~text-sm/2xl">
      <span>$ {price.toFixed(2)}</span>
      <span className="inline-flex items-center gap-1">
        <StarIcon /> 37
      </span>
    </div>
  );
}
