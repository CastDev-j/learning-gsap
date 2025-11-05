import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import CodeBlock from "@/components/CodeBlock";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import { Draggable, GSDevTools, MorphSVGPlugin } from "gsap/all";
import { splitPaths } from "@/lib/splitPaths";
import { findMorphOrigin } from "@/lib/findMorphOrigin";

interface Props {
  rawCode?: string;
}

const MorphSVG: React.FC<Props> = ({ rawCode }) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(MorphSVGPlugin, GSDevTools, Draggable);

      MorphSVGPlugin.defaultType = "rotational";
      MorphSVGPlugin.convertToPath(".bird");

      timelineRef.current = gsap.timeline({
        paused: true,
        yoyo: true,
        repeat: -1,
        defaults: {
          delay: 1,
        },
      });

      // findMorphOrigin(".bird", ".dolphin", timelineRef.current);

      timelineRef.current
        .to(".bird", {
          morphSVG: {
            shape: ".dolphin",
            origin: "43% 63%, 42% 26%",
          },
          duration: 2,
        })
        .to(".bird", {
          morphSVG: {
            shape: ".bird",
            origin: "42% 26%, 43% 63%",
          },
          duration: 2,
        });

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
        <Title>Morph SVG</Title>
        <Paragraph>
          El plugin MorphSVG de GSAP facilita la animación y transformación de
          gráficos SVG complejos al permitir la morfología fluida entre
          diferentes formas SVG.
        </Paragraph>
      </section>

      <section
        className="w-full flex flex-col items-center relative min-h-96 z-0"
        ref={containerRef}
      >
        <svg
          viewBox="0 34 318 180"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          preserveAspectRatio="xMidYMid meet"
          className="w-80 h-80 "
        >
          <text x="160" y="58" textAnchor="middle" alignmentBaseline="central">
            Fixing origin weirdness
          </text>
          <polygon
            className="bird"
            fill="#9d95ff"
            points="77.2304688 91.9453125 159 106.492188 184 138.167969 226.898438 115.056641 253.035156 129.8125 226.898438 129.8125 209.027344 167 146.144531 198.804688 123.304688 240.269531 130.894531 167 69.1875 122.101562 91.6328125 115.056641"
          ></polygon>
          <path
            d="M175.676694,154.30152 L191.511695,155.82645 L210.962219,151.025394 L233.717151,155.82645 L242.95394,154.30152 C246.77832,152.244275 247.61217,151.123744 242.95394,146.194876 L230.087487,136.938053 L228.310365,127.939313 L217.984677,116.68971 L200.922897,107.825315 L172.061171,100.416322 L149.036371,93.2771959 L137.366057,93.2771959 L123.866769,96.9103958 L118.780525,101.045621 L136.032037,107.825315 L121.971801,121.095982 L107.78547,136.938053 L100.10543,164.102792 L101.795345,197.402607 L103.508829,211.042132 L94.1860125,234.383939 L94.1860125,252.182258 C94.9577165,256.086947 96.3827429,257.522276 100.10543,250.273149 L105.796225,238.164446 L118.300891,231.264549 L121.971801,226.980837 L133.751712,221.52927 L145.260577,219.924204 C147.809753,220.110729 149.728122,219.756979 147.910939,216.203798 L133.751712,205.522214 L121.971801,204.083311 L118.300891,199.915089 L121.971801,181.674847 L131.419535,162.505975 L147.047126,155.82645 L149.036371,162.505975 L145.260577,176.350553 L144.090364,181.744376 L147.047126,181.674847 L159,176.350553 L168.569976,167 L175.676694,154.30152 Z"
            className="dolphin hidden"
            stroke="#979797"
            fill="#D33838"
          ></path>
        </svg>
      </section>

      {rawCode && <CodeBlock codeTitle="MorphSVG.tsx">{rawCode}</CodeBlock>}
    </div>
  );
};

export default MorphSVG;
