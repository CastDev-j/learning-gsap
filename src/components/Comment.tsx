import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

interface CommentProps {
  children: React.ReactNode;
  variant?: "inline" | "block";
  className?: string;
}

const Comment: React.FC<CommentProps> = ({
  children,
  variant = "block",
  className,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    },
    { scope: ref }
  );

  if (variant === "inline") {
    return (
      <span
        ref={ref as any}
        className={cn("text-sm italic text-neutral-500", className)}
      >
        {children}
      </span>
    );
  }

  return (
    <aside
      ref={ref}
      className={cn(
        "opacity-0 px-6 py-4 w-fit bg-neutral-900 border border-neutral-800 rounded-md text-sm text-neutral-400",
        className
      )}
    >
      {children}
    </aside>
  );
};

export default Comment;
