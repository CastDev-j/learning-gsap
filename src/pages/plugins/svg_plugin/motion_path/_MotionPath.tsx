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
        position: "absolute",
        opacity: 1,
      });

      timelineRef.current.to(".rect", {
        duration: 10,
        motionPath: {
          path: ".path",
          // align: ".path", // only if is outside SVG
          // curviness: 0,
          autoRotate: true,
          start: 0,
          end: 1,
        },
      });

      // MotionPathHelper.create(".rect", { selected: true });

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
            d="M-303.75,417.499 C-237.089,284.163 -270.382,96.085 -199.999,227.498 -143.318,333.327 -266.607,460.64 -122.499,422.499 97.913,364.162 -68.582,-29.626 -161.248,66.248 -281.246,190.413 77.498,519.582 112.499,370 -54.588,-319.584 690.827,182.079 217.5,199.998 67.9,202.495 213.319,-183.748 277.498,402.499 274.156,504.579 578.328,390.413 463.748,181.249 329.998,-92.086 856.247,147.067 931.248,241.247 "
            stroke="#a5b4fc"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10 10"
            fill="none"
            fillOpacity="0.5"
            opacity="0.8"
          />

          <foreignObject
            x="0"
            y="0"
            width="60"
            height="60"
            className="rect opacity-0"
          >
            <svg
              viewBox="0 0 24 24"
              className="rotate-90 scale-150"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.7797 17.4231C8.26348 19.2055 5.01827 16.4877 6.33123 13.6977L9.28559 7.41965C10.3664 5.12284 13.6337 5.12285 14.7145 7.41966L17.6689 13.6977C18.9818 16.4877 15.7366 19.2055 13.2204 17.4231L12.5781 16.9682C12.2318 16.7229 11.7683 16.7229 11.422 16.9682L10.7797 17.4231Z"
                fill="#6366f1"
              ></path>
            </svg>
          </foreignObject>
        </svg>
      </section>

      {rawCode && <CodeBlock codeTitle="MotionPath.tsx">{rawCode}</CodeBlock>}
    </div>
  );
};

export default MotionPath;
