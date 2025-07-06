import { CSSProperties, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

type BoundryProps = {
  asChild?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export function Boundry({
  asChild = false,
  className,
  children,
  ...restProps
}: BoundryProps) {
  const Comp = asChild ? Slot : "section";

  return (
    <Comp
      className={clsx(
        "px-6 ~py-10/16 [.header+&]:pt-44 [.header+&]:md:pt-32",
        className
      )}
      {...restProps}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Comp>
  );
}
