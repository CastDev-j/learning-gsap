import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import CodeBlock from "@/components/CodeBlock";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import { GSDevTools, MotionPathHelper, MotionPathPlugin } from "gsap/all";

interface Props {
  rawCode?: string;
}

const MotionPath: React.FC<Props> = ({ rawCode }) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(GSDevTools, MotionPathPlugin, MotionPathHelper);
      timelineRef.current = gsap.timeline();

      timelineRef.current.set(".rect", {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
        willChange: "transform",
        force3D: true,
      });

      timelineRef.current.to(".rect", {
        duration: 10,
        motionPath: {
          path: ".path",
          align: ".path",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: 0,
          end: 1,
        },
        onStart: () => {
          gsap.to(".rect", { opacity: 1, duration: 0.3 });
        },
      });

      timelineRef.current.repeat(-1).yoyo(true);

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
        <Title>Motion Path</Title>
        <Paragraph>
          El plugin MotionPath de GSAP permite animar elementos a lo largo de
          rutas SVG definidas. Esto es especialmente útil para crear animaciones
          complejas y fluidas que siguen trayectorias específicas.
        </Paragraph>
      </section>

      <section
        className="w-full flex flex-col items-center relative min-h-96 z-0"
        ref={containerRef}
      >
        <svg
          className="w-full h-96 -mt-12"
          viewBox="-350 -150 1350 700"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            className="path"
            d="M-300.834,417.499 C-234.173,284.163 -267.466,96.085 -197.083,227.498 -140.402,333.327 -263.691,460.64 -119.583,422.499 100.829,364.162 -65.666,-29.626 -158.332,66.248 -278.33,190.413 80.414,519.582 115.415,370 -51.672,-319.584 721.445,394.993 248.124,412.914 113.4786,415.1595 46.304,41.299 321.124,235.607 389.533,283.974 273.9961,343.8743 280.414,402.499 277.072,504.579 581.244,390.413 466.664,181.249 373.039,-10.0855 756.865,22.617 585.245,108.843 462.16435,170.67675 1089.997,537.321 643.491,448.675 474.1212,415.0492 555.031,206.894 692.217,157.003 783.67,123.737 930.11395,236.16128 934.164,241.247 "
            stroke="#a5b4fc"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10 10"
            fill="none"
            fillOpacity="0.5"
            opacity="0.8"
          />

          <g
            className="rect"
            style={{
              opacity: 0,
            }}
          >
            <svg
              x="-50"
              y="-50"
              width="100"
              height="100"
              viewBox="0 0 24 24"
              className="rotate-90"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.7797 17.4231C8.26348 19.2055 5.01827 16.4877 6.33123 13.6977L9.28559 7.41965C10.3664 5.12284 13.6337 5.12285 14.7145 7.41966L17.6689 13.6977C18.9818 16.4877 15.7366 19.2055 13.2204 17.4231L12.5781 16.9682C12.2318 16.7229 11.7683 16.7229 11.422 16.9682L10.7797 17.4231Z"
                fill="#6366f1"
              ></path>
            </svg>
          </g>
        </svg>
      </section>

      {rawCode && <CodeBlock codeTitle="MotionPath.tsx">{rawCode}</CodeBlock>}
    </div>
  );
};

export default MotionPath;
