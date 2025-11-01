import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

type EasingType =
  | "none"
  | "power1"
  | "power2"
  | "power3"
  | "power4"
  | "back"
  | "bounce"
  | "circ"
  | "elastic"
  | "expo"
  | "sine"
  | "steps";
type EasingDirection = "in" | "out" | "inOut";

interface SelectEasingProps {
  value: string;
  onChange: (easing: string) => void;
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
          { opacity: 0, y: -8, scale: 0.95 },
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
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
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
            className="opacity-0 absolute z-30 mt-1 w-full bg-neutral-900 border border-neutral-800 rounded-md shadow-lg max-h-60 overflow-auto"
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

const SelectEasing: React.FC<SelectEasingProps> = ({
  value,
  onChange,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const parseEasing = (easingString: string) => {
    if (easingString === "none")
      return { type: "none", direction: "out", steps: 12 };

    const stepsMatch = easingString.match(/^steps\((\d+)\)$/);
    if (stepsMatch) {
      return {
        type: "steps",
        direction: "out",
        steps: parseInt(stepsMatch[1]),
      };
    }

    const match = easingString.match(/^(\w+)\.(in|out|inOut)$/);
    if (match) {
      return {
        type: match[1] as EasingType,
        direction: match[2] as EasingDirection,
        steps: 12,
      };
    }
    return { type: "power2", direction: "out", steps: 12 };
  };

  const {
    type: currentType,
    direction: currentDirection,
    steps: currentSteps,
  } = parseEasing(value);

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

  const handleTypeChange = (newType: string) => {
    if (newType === "none") {
      onChange("none");
    } else if (newType === "steps") {
      onChange(`steps(${currentSteps})`);
    } else {
      onChange(`${newType}.${currentDirection}`);
    }
  };

  const handleDirectionChange = (newDirection: string) => {
    const easing = `${currentType}.${newDirection}`;
    onChange(easing);
  };

  const handleStepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const steps = parseInt(e.target.value) || 1;
    onChange(`steps(${Math.max(1, steps)})`);
  };

  const typeOptions = [
    { value: "none", label: "linear" },
    { value: "power1", label: "power1" },
    { value: "power2", label: "power2" },
    { value: "power3", label: "power3" },
    { value: "power4", label: "power4" },
    { value: "back", label: "back" },
    { value: "bounce", label: "bounce" },
    { value: "circ", label: "circ" },
    { value: "elastic", label: "elastic" },
    { value: "expo", label: "expo" },
    { value: "sine", label: "sine" },
    { value: "steps", label: "steps" },
  ];

  const directionOptions = [
    { value: "in", label: "in" },
    { value: "out", label: "out" },
    { value: "inOut", label: "inOut" },
  ];

  const displayValue = currentType === "none" ? "linear" : value;

  return (
    <div
      ref={ref}
      className={cn("opacity-0 flex gap-3 items-center", className)}
    >
      <span className="text-xs text-neutral-500 font-mono mr-auto">
        {displayValue}
      </span>

      <CustomSelect
        value={currentType}
        options={typeOptions}
        onChange={handleTypeChange}
        className="min-w-[120px]"
      />

      {currentType === "steps" && (
        <input
          type="number"
          min="1"
          value={currentSteps}
          onChange={handleStepsChange}
          className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-neutral-300 hover:border-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors w-20"
        />
      )}

      {currentType !== "none" && currentType !== "steps" && (
        <CustomSelect
          value={currentDirection}
          options={directionOptions}
          onChange={handleDirectionChange}
          className="min-w-[100px]"
        />
      )}
    </div>
  );
};

export default SelectEasing;
