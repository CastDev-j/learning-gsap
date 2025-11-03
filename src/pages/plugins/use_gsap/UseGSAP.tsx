import React, { useRef, type MouseEvent } from "react";
import { gsap } from "gsap";
import CodeBlock from "@/components/CodeBlock";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import Remark from "@/components/Remark";
import { useGSAP } from "@gsap/react";
import Button from "@/components/Button";
import Comment from "@/components/Comment";

interface Props {
  rawCode?: string;
}

const BASE_SIZE = 96;

const UseGSAP: React.FC<Props> = ({ rawCode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline | null>(null);
  const xTo = useRef<gsap.QuickToFunc>(null!);
  const yTo = useRef<gsap.QuickToFunc>(null!);

  const getMaxWidth = () => {
    if (!containerRef.current) return 0;
    return containerRef.current.clientWidth - BASE_SIZE;
  };

  const { contextSafe } = useGSAP(
    () => {
      tl.current = gsap
        .timeline()
        .to(".box", {
          x: getMaxWidth(),
          duration: 2,
          ease: "power1.inOut",
          stagger: {
            each: 0.2,
            yoyo: true,
            repeat: -1,
          },
        })
        .pause();

      xTo.current = gsap.quickTo(".special-box", "x", {
        duration: 0.8,
        ease: "power3",
      });
      yTo.current = gsap.quickTo(".special-box", "y", {
        duration: 0.8,
        ease: "power3",
      });
    },
    { scope: containerRef }
  );

  const moveShape = contextSafe((e: MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left - BASE_SIZE / 2;
    const y = e.clientY - rect.top - BASE_SIZE / 2;

    xTo.current(x);
    yTo.current(y);
  });

  const handlePause = contextSafe(() => {
    tl.current?.pause();
  });
  const handlePlay = contextSafe(() => {
    tl.current?.play();
  });

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 max-w-4xl w-full">
      <section className="text-center space-y-2">
        <Title>Utilizando useGSAP</Title>
        <Paragraph>
          Use GSAP dentro de componentes de React utilizando el hook{" "}
          <Remark>useGSAP</Remark>. Este hook facilita la integración de
          animaciones GSAP en el ciclo de vida de los componentes React,
          permitiendo crear animaciones reactivas y eficientes.
        </Paragraph>
      </section>

      <section className="w-full flex flex-col gap-6">
        <div
          ref={containerRef}
          onMouseMove={(e) => moveShape(e)}
          className="flex flex-col items-start justify-center gap-4 min-h-64 relative"
        >
          <div
            className="box"
            style={{
              width: BASE_SIZE,
              height: BASE_SIZE,
              backgroundColor: "#4F46E5",
              borderRadius: 8,
            }}
          />
          <div
            className="box"
            style={{
              width: BASE_SIZE,
              height: BASE_SIZE,
              backgroundColor: "#EF4444",
              borderRadius: 8,
            }}
          />
          <div
            className="box"
            style={{
              width: BASE_SIZE,
              height: BASE_SIZE,
              backgroundColor: "#10B981",
              borderRadius: 8,
            }}
          />
          <div
            className="special-box"
            style={{
              width: BASE_SIZE,
              height: BASE_SIZE,
              backgroundColor: "#F59E0B",
              borderRadius: 8,
              position: "absolute",
              transform: "translate(-50%, -50%)",
              top: BASE_SIZE / 2,
              left: BASE_SIZE / 2,
            }}
          ></div>
        </div>
      </section>

      <Comment>Toca el contenedor de la animación :3</Comment>

      <section className="flex gap-4 justify-center sm:justify-end w-full flex-wrap">
        <Button onClick={handlePlay} variant="secondary">
          play()
        </Button>
        <Button onClick={handlePause} variant="secondary">
          pause()
        </Button>
      </section>

      {rawCode && <CodeBlock codeTitle="UseGSAP.tsx">{rawCode}</CodeBlock>}
    </div>
  );
};

export default UseGSAP;
