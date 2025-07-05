import { CSSProperties, ElementType, ReactNode } from "react";
import clsx from "clsx";

type BoundryProps = {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function Boundry({
  as: Comp = "section",
  className,
  children,
  ...restProps
}: BoundryProps) {
  return (
    <Comp
      className={clsx(
        "px-6 ~py-10/16 [.header+&]:pt-44 [.header+&]:md:pt-32 bg-texture",
        className
      )}
      {...restProps}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Comp>
  );
}
