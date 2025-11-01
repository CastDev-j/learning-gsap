import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

interface TitleProps {
  level?: 1 | 2 | 3 | 4;
  variant?: "page" | "section" | "sub";
  className?: string;
}

const Title: React.FC<React.PropsWithChildren<TitleProps>> = ({
  children,
  level = 2,
  variant = "section",
  className,
}) => {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, []);

  const base = "opacity-0 font-bold text-neutral-100 tracking-tight";

  const variantClass =
    variant === "page"
      ? "text-4xl sm:text-5xl"
      : variant === "section"
      ? "text-2xl sm:text-3xl"
      : "text-lg sm:text-xl text-neutral-200";

  const Tag = `h${level}` as React.ElementType;

  return (
    <Tag ref={ref as any} className={cn(base, variantClass, className)}>
      {children}
    </Tag>
  );
};

export default Title;
