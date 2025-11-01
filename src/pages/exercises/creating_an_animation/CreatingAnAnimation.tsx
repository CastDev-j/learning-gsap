import React, { useCallback, useRef, useState } from "react";
import { gsap } from "gsap";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import CodeBlock from "@/components/CodeBlock";
import Button from "@/components/Button";
import SelectEasing from "@/components/shared/SelectEasing";
import { useGSAP } from "@gsap/react";

interface Props {
  rawCode?: string;
}

const CreatingAnAnimation: React.FC<Props> = ({ rawCode }) => {
  const [easing, setEasing] = useState("power2.out");
  const [duration, setDuration] = useState(1000);
  const cubeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(cubeRef.current, {
      backgroundColor: "#6366f1",
      x: 0,
      width: 96,
      height: 96,
    });
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      durationRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
    );
  }, []);

  const handleRunAnimation = useCallback(() => {
    if (!cubeRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const cubeWidth = cubeRef.current.offsetWidth;
    const maxX = containerWidth - cubeWidth;

    gsap.to(cubeRef.current, {
      x: maxX,
      ease: easing,
      backgroundColor: "#ec4899",
      height: 140,
      duration: duration / 1000,
    });
  }, [easing, duration]);

  const handleResetAnimation = useCallback(() => {
    if (!cubeRef.current || !containerRef.current) return;

    gsap.to(cubeRef.current, {
      x: 0,
      ease: easing,
      backgroundColor: "#6366f1",
      height: 96,
      duration: duration / 1000,
    });
  }, [easing, duration]);

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(e.target.value, 10);
    if (!isNaN(newDuration) && newDuration >= 0) {
      setDuration(newDuration);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 max-w-4xl w-full">
      <section className="text-center space-y-2">
        <Title>Creando una animación</Title>
        <Paragraph>
          Un cubo animado con GSAP que rota continuamente. Interactúa con él
          para ver el efecto.
        </Paragraph>
      </section>

      <section ref={containerRef} className="w-full flex flex-col gap-6 ">
        <SelectEasing value={easing} onChange={setEasing} />
        <div className="min-h-64 flex items-center  -z-10">
          <div
            ref={cubeRef}
            className="size-24 rounded-lg shadow-2xl cursor-pointer select-none touch-none"
            style={{ viewTransitionName: "cube" }}
          />
        </div>
      </section>

      <section className="flex gap-4 justify-end w-full ">
        <div ref={durationRef} className="relative opacity-0">
          <input
            type="number"
            min="0"
            value={duration}
            onChange={handleDurationChange}
            className="px-3 py-2 pr-10 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-neutral-300 hover:border-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors w-24"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 pointer-events-none">
            ms
          </span>
        </div>
      </section>

      <section className="flex gap-4 sm:justify-end justify-between w-full">
        <Button onClick={handleRunAnimation} variant="primary">
          Correr Animación
        </Button>
        <Button onClick={handleResetAnimation} variant="secondary">
          Reiniciar Animación
        </Button>
      </section>

      {rawCode && (
        <CodeBlock codeTitle="CreatingAnAnimation.tsx">{rawCode}</CodeBlock>
      )}
    </div>
  );
};

export default CreatingAnAnimation;
