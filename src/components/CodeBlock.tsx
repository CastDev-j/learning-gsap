import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { cn } from "@/lib/cn";
import Remark from "./Remark";

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
  showCopy?: boolean;
  codeTitle: string; // Ahora es requerido
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  language = "tsx",
  className,
  showCopy = true,
  codeTitle,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const iconRef = useRef<SVGSVGElement | null>(null);
  const morphPathRef = useRef<SVGPathElement | null>(null);
  const rectRef = useRef<SVGRectElement | null>(null);
  const checkPathRef = useRef<SVGPathElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(MorphSVGPlugin);

    if (copied && morphPathRef.current && checkPathRef.current) {
      const tl = gsap.timeline();

      tl.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
      })
        .to(buttonRef.current, {
          scale: 1,
          backgroundColor: "#6366f1",
          duration: 0.3,
          ease: "back.out(2)",
        })
        .to(
          iconRef.current,
          {
            rotation: 360,
            scale: 1.15,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          0.1
        )
        .to(
          morphPathRef.current,
          {
            morphSVG: checkPathRef.current,
            duration: 0.4,
            ease: "power2.inOut",
          },
          0.15
        )
        .to(
          rectRef.current,
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
          },
          0.15
        );
    } else if (buttonRef.current && iconRef.current && morphPathRef.current) {
      const tl = gsap.timeline();

      tl.to(iconRef.current, {
        rotation: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.inOut",
      })
        .to(
          morphPathRef.current,
          {
            morphSVG: morphPathRef.current,
            duration: 0.4,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          rectRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
          },
          0
        )
        .to(
          buttonRef.current,
          {
            backgroundColor: "#262626",
            duration: 0.3,
          },
          0
        )
        .call(() => setIsAnimating(false));
    }
  }, [copied]);

  const handleCopy = async () => {
    if (isAnimating) return;

    setIsAnimating(true);

    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (e) {
      setIsAnimating(false);
    }
  };

  useGSAP(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "relative my-4 rounded-lg overflow-hidden w-full border border-neutral-800",
        className
      )}
    >
      <div className="flex items-center justify-between px-5 py-3 gap-4 bg-neutral-900 border-b border-neutral-800">
        <Remark className="text-sm min-w-0 flex-1">{codeTitle}</Remark>

        {showCopy && (
          <button
            ref={buttonRef}
            onClick={handleCopy}
            disabled={isAnimating}
            aria-label="Copiar código"
            className="bg-neutral-800 hover:bg-neutral-700 text-neutral-100 px-3 py-2.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-2 disabled:cursor-not-allowed shrink-0"
          >
            <svg
              ref={iconRef}
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                ref={morphPathRef}
                d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
              />
              <rect
                ref={rectRef}
                x="8"
                y="2"
                width="8"
                height="4"
                rx="1"
                ry="1"
              />
            </svg>

            <svg className="hidden">
              <path ref={checkPathRef} d="M20 6 9 17l-5-5" />
            </svg>
          </button>
        )}
      </div>

      <div>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: "1.25rem",
            background: "#0a0a0a",
            fontSize: "0.875rem",
            lineHeight: "1.6",
          }}
          codeTagProps={{
            style: {
              background: "transparent",
            },
          }}
          showLineNumbers={false}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
