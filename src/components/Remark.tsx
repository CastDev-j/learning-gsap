import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

type Variant = "regular" | "accent" | "muted";

interface RemarkProps {
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}

const Remark: React.FC<RemarkProps> = ({
  children,
  variant = "regular",
  className,
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 4 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    },
    { scope: ref }
  );

  return (
    <span
      ref={ref}
      className={cn(
        "opacity-0 font-mono text-neutral-300",
        variant === "accent" &&
          "text-neutral-100 bg-neutral-900 px-1.5 py-0.5 rounded",
        variant === "muted" && "text-neutral-400",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Remark;
