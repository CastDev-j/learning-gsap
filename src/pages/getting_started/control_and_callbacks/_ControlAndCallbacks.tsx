import React, { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import CodeBlock from "@/components/CodeBlock";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import Button from "@/components/Button";

interface Props {
  rawCode?: string;
}

const BASE_SIZE = 96;

const UsingTimeLines: React.FC<Props> = ({ rawCode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
    if (!containerRef.current || !cubeRef.current) return;

    const maxX = containerRef.current.offsetWidth - BASE_SIZE;

    timelineRef.current = gsap.timeline({ paused: true });
    timelineRef.current.to(cubeRef.current, {
      x: maxX,
      duration: 3,
      rotate: 360,
      ease: "power2.inOut",
      onStart: () => console.log("Animación iniciada"),
      onComplete: () => console.log("Animación completada"),
    });

    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  const handlePlay = () => {
    timelineRef.current?.play();
  };

  const handlePause = () => {
    timelineRef.current?.pause();
  };

  const handleResume = () => {
    timelineRef.current?.resume();
  };

  const handleReverse = () => {
    timelineRef.current?.reverse();
  };

  const handleRestart = () => {
    timelineRef.current?.restart();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 max-w-4xl w-full">
      <section className="text-center space-y-2">
        <Title>Controles y Callbacks</Title>
        <Paragraph>
          En esta sección, aprenderás a controlar las animaciones y utilizar
          callbacks para mejorar la interactividad y funcionalidad de tus
          proyectos con GSAP.
        </Paragraph>
      </section>

      <section className="w-full flex flex-col gap-6">
        <div
          ref={containerRef}
          className="flex flex-col items-start justify-center gap-4 -z-10 min-h-64 "
        >
          <div
            ref={cubeRef}
            style={{
              width: BASE_SIZE,
              height: BASE_SIZE,
              backgroundColor: "#4F46E5",
              borderRadius: 8,
            }}
          />
        </div>
      </section>

      <section className="flex gap-4 justify-center sm:justify-end w-full flex-wrap">
        <Button onClick={handlePlay} variant="secondary">
          Reproducir ()
        </Button>
        <Button onClick={handlePause} variant="secondary">
          Pausar ()
        </Button>
        <Button onClick={handleResume} variant="secondary">
          Reanudar ()
        </Button>
        <Button onClick={handleReverse} variant="secondary">
          Reversa ()
        </Button>
        <Button onClick={handleRestart} variant="secondary">
          Reiniciar ()
        </Button>
      </section>

      {rawCode && (
        <CodeBlock codeTitle="UsingTimeLines.tsx">{rawCode}</CodeBlock>
      )}
    </div>
  );
};

export default UsingTimeLines;
