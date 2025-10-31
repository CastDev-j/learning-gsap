import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

type Variant = "regular" | "lead" | "muted";

interface ParagraphProps {
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  variant = "regular",
  className,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, []);

  return (
    <p
      ref={ref}
      className={cn(
        "leading-relaxed text-neutral-300",
        variant === "lead" && "text-lg text-neutral-200 font-medium",
        variant === "muted" && "text-neutral-500 text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export default Paragraph;
