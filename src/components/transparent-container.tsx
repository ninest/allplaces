import clsx from "clsx";
import { ComponentProps } from "react";

interface TransparentContainer extends ComponentProps<"div"> {}

export function TransparentContainer({ className, children, ...props }: TransparentContainer) {
  return (
    <div className={clsx(className, "bg-white/90 backdrop-blur-sm z-50")} {...props}>
      {children}
    </div>
  );
}