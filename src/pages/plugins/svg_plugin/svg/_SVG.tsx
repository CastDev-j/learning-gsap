import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import CodeBlock from "@/components/CodeBlock";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import { GSDevTools } from "gsap/all";

interface Props {
  rawCode?: string;
}

const SVG: React.FC<Props> = ({ rawCode }) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(GSDevTools);
      timelineRef.current = gsap.timeline({
        id: "svg-timeline",
        paused: true,
        defaults: { smoothOrigin: true, ease: "power1.inOut" },
      });

      timelineRef.current
        .to("#block", {
          rotation: "-=90",
          transformOrigin: "top right",
        })
        .to("#block", {
          rotation: "-=90",
          transformOrigin: "bottom right",
        })
        .to("#block", {
          rotation: "-=90",
          transformOrigin: "bottom left",
        })
        .to("#block", {
          rotation: "-=90",
          transformOrigin: "top left",
        })
        .to("#block", {
          rotation: "-=90",
          transformOrigin: "bottom right",
        })
        .to("#block", {
          rotation: "-=90",
          transformOrigin: "top left",
        })
        .to("#block", {
          rotation: "-=90",
          transformOrigin: "top right",
        })
        .to("#block", {
          rotation: "-=90",
          transformOrigin: "bottom right",
        })
        .to("#block", {
          rotation: "-=90",
          transformOrigin: "bottom left",
        })
        .to("#block", {
          rotation: "-=90",
          transformOrigin: "top right",
        });

      timelineRef.current
        .to(
          ".box",
          {
            rotation: "+=360",
            svgOrigin: "120 48",
            stagger: 0.1,
            duration: 2.5,
          },
          0
        )
        .to(
          ".box",
          {
            rotation: "+=360",
            transformOrigin: "50% 50%",
            stagger: 0.1,
            duration: 2.5,
          },
          2.5
        );

      timelineRef.current
        .to(
          ".box",
          {
            attr: {
              fill: "#22c55e",
            },
            xPercent: 100,
            stagger: 0.1,
            duration: 2.5,
          },
          0
        )
        .to(
          ".box",
          {
            attr: {
              fill: "#d946ef",
            },
            xPercent: 0,
            stagger: 0.1,
            duration: 2.5,
          },
          2.5
        );

      GSDevTools.create({
        animation: timelineRef.current,
        container: containerRef.current,
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 max-w-4xl w-full">
      <section className="text-center space-y-2">
        <Title>SVG</Title>
        <Paragraph>
          GSAP permite animar elementos SVG de manera eficiente y fluida,
          ofreciendo un control preciso sobre sus propiedades y
          transformaciones.
        </Paragraph>
      </section>

      <section
        className="w-full flex flex-col items-center relative min-h-44 z-0"
        ref={containerRef}
      >
        <svg
          width="240"
          height="96"
          viewBox="0 0 240 96"
          className="bg-neutral-800"
        >
          <path id="block" d="M 0 0 L 48 0 L 48 48 L 0 48 Z" fill="#4F46E5" />

          <path
            className="box"
            d="M 12 12 L 36 12 L 36 36 L 12 36 Z"
            fill="#d946ef"
          />

          <path
            className="box"
            d="M 108 12 L 132 12 L 132 36 L 108 36 Z"
            fill="#d946ef"
          />

          <path
            className="box"
            d="M 204 12 L 228 12 L 228 36 L 204 36 Z"
            fill="#d946ef"
          />

          <path
            className="box"
            d="M 108 60 L 132 60 L 132 84 L 108 84 Z"
            fill="#d946ef"
          />
        </svg>
      </section>

      {rawCode && <CodeBlock codeTitle="SVG.tsx">{rawCode}</CodeBlock>}
    </div>
  );
};

export default SVG;
