import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
    );
  }, []);

  const handleHover = () => {
    if (disabled) return;
    gsap.to(ref.current, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleHoverEnd = () => {
    if (disabled) return;
    gsap.to(ref.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleClick = () => {
    if (disabled) return;
    gsap.to(ref.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(ref.current, {
          scale: 1,
          duration: 0.2,
          ease: "back.out(2)",
        });
      },
    });
  };

  const baseClass =
    "opacity-0 font-medium rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2";

  const variantClass = {
    primary:
      "bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600",
    secondary:
      "bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700 hover:text-neutral-100",
    ghost: "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900",
    danger:
      "bg-red-900 text-red-100 border border-red-800 hover:bg-red-800 hover:border-red-700",
  }[variant];

  const sizeClass = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  }[size];

  return (
    <button
      ref={ref}
      className={cn(baseClass, variantClass, sizeClass, className)}
      disabled={disabled}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
