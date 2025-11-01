import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

type StaggerFrom = "start" | "center" | "end" | "edges" | "random";

interface SelectStaggerFromProps {
  value: StaggerFrom;
  onChange: (from: StaggerFrom) => void;
  className?: string;
}

interface CustomSelectProps {
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  options,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isOpen && dropdownRef.current) {
        gsap.fromTo(
          dropdownRef.current,
          { opacity: 0, y: 8, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }
        );
      }
    },
    { scope: dropdownRef, dependencies: [isOpen] }
  );

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || value;

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-neutral-300 hover:border-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors w-full text-left flex items-center justify-between gap-2"
      >
        <span>{selectedLabel}</span>
        <svg
          className={cn(
            "w-4 h-4 transition-transform duration-200 rotate-180",
            isOpen && "rotate-0"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div
            ref={dropdownRef}
            className="opacity-0 absolute z-30 bottom-full mb-1 w-full bg-neutral-900 border border-neutral-800 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "w-full px-3 py-2 text-sm text-left hover:bg-neutral-800 transition-colors",
                  option.value === value
                    ? "text-neutral-100 bg-neutral-850"
                    : "text-neutral-400"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const SelectStaggerFrom: React.FC<SelectStaggerFromProps> = ({
  value,
  onChange,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

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

  const staggerOptions = [
    { value: "start", label: "start" },
    { value: "center", label: "center" },
    { value: "end", label: "end" },
    { value: "edges", label: "edges" },
    { value: "random", label: "random" },
  ];

  return (
    <div
      ref={ref}
      className={cn("opacity-0 flex gap-3 items-center", className)}
    >
      <span className="text-xs text-neutral-500 font-mono mr-auto">
        from: {value}
      </span>

      <CustomSelect
        value={value}
        options={staggerOptions}
        onChange={(newValue) => onChange(newValue as StaggerFrom)}
        className="min-w-[120px]"
      />
    </div>
  );
};

export default SelectStaggerFrom;
