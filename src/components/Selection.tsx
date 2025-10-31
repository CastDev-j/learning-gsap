import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

interface SelectionOption {
  value: string;
  label: string;
}

interface SelectionProps {
  options: SelectionOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Selection: React.FC<SelectionProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={ref} className={cn("inline-flex gap-2 flex-wrap", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200",
            "border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900",
            value === option.value
              ? "bg-neutral-900 text-neutral-100 border-neutral-700"
              : "text-neutral-400"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Selection;
