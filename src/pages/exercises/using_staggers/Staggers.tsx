import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import CodeBlock from "@/components/CodeBlock";
import Button from "@/components/Button";
import SelectEasing from "@/components/shared/SelectEasing";
import { useGSAP } from "@gsap/react";
import SelectStaggerFrom from "@/components/shared/SelectStagger";

interface Props {
  rawCode?: string;
}

const Staggers: React.FC<Props> = ({ rawCode }) => {
  const [easing, setEasing] = useState("bounce.out");
  const [duration, setDuration] = useState(1000);
  const [stagger, setStagger] = useState(100);
  const [staggerFrom, setStaggerFrom] = useState<
    "start" | "center" | "end" | "edges" | "random"
  >("edges");
  const cubeRefs = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null!);
  const durationRef = useRef<HTMLDivElement>(null!);
  const staggerRef = useRef<HTMLDivElement>(null!);
  const baseSize = 36;
  const [cubeAmount, setCubeAmount] = useState(0);

  useLayoutEffect(() => {
    const updateCubeAmount = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newCubeAmount = Math.floor(containerWidth / baseSize) || 6;
        setCubeAmount(newCubeAmount);
      }
    };

    updateCubeAmount();
    window.addEventListener("resize", updateCubeAmount);
    return () => window.removeEventListener("resize", updateCubeAmount);
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      staggerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
    );

    gsap.fromTo(
      durationRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
    );
  }, []);

  const handleRunAnimation = useCallback(() => {
    if (!cubeRefs.current || !containerRef.current) return;

    const containerHeight = containerRef.current.offsetHeight;
    const maxY = containerHeight - baseSize;

    gsap.to(cubeRefs.current, {
      y: maxY,
      ease: easing,
      backgroundColor: "#ec4899",
      duration: duration / 1000,
      stagger: {
        each: stagger / 1000,
        from: staggerFrom,
      },
    });
  }, [easing, duration, stagger, staggerFrom]);

  const handleResetAnimation = useCallback(() => {
    if (!cubeRefs.current || !containerRef.current) return;

    gsap.to(cubeRefs.current, {
      y: 0,
      ease: easing,
      backgroundColor: "#6366f1",
      duration: duration / 1000,
      stagger: {
        each: stagger / 1000,
        from: staggerFrom,
      },
    });
  }, [easing, duration, stagger, staggerFrom]);

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(e.target.value, 10);
    if (!isNaN(newDuration) && newDuration >= 0) {
      setDuration(newDuration);
    }
  };

  const handleStaggerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStagger = parseInt(e.target.value, 10);
    if (!isNaN(newStagger) && newStagger >= 0) {
      setStagger(newStagger);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 max-w-4xl w-full">
      <section className="text-center space-y-2">
        <Title>Utilizando Staggers en GSAP</Title>
        <Paragraph>
          Staggers son una característica poderosa en GSAP que permiten animar
          múltiples elementos con un retraso incremental entre cada uno. Esto
          crea efectos visuales atractivos y dinámicos de manera sencilla.
        </Paragraph>
      </section>

      <section className="w-full flex flex-col gap-6">
        <SelectEasing value={easing} onChange={setEasing} />

        <div
          ref={containerRef}
          className="min-h-64 flex items-start justify-center gap-1 -z-10"
        >
          {Array.from({ length: cubeAmount }, (_, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cubeRefs.current[index] = el;
              }}
              className="rounded-lg"
              style={{
                width: baseSize,
                height: baseSize,
                backgroundColor: "#6366f1",
              }}
            />
          ))}
        </div>
      </section>

      <section className="w-full flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        <SelectStaggerFrom
          value={staggerFrom}
          onChange={setStaggerFrom}
          className="flex-1 min-w-[200px]"
        />

        <div className="shrink-0 flex gap-4 justify-end w-full sm:w-auto">
          <div className="relative opacity-0 " ref={staggerRef}>
            <label
              htmlFor="stagger"
              className="block text-xs text-neutral-400 mb-1"
            >
              Stagger
            </label>
            <input
              id="stagger"
              type="number"
              min="0"
              step="50"
              value={stagger}
              onChange={handleStaggerChange}
              className="px-3 py-2 pr-10 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-neutral-300 hover:border-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors w-24"
            />
            <span className="absolute right-3 bottom-2.5 text-xs text-neutral-500 pointer-events-none">
              ms
            </span>
          </div>

          <div className="relative opacity-0 " ref={durationRef}>
            <label
              htmlFor="duration"
              className="block text-xs text-neutral-400 mb-1"
            >
              Duración
            </label>
            <input
              id="duration"
              type="number"
              min="0"
              step="100"
              value={duration}
              onChange={handleDurationChange}
              className="px-3 py-2 pr-10 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-neutral-300 hover:border-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors w-24"
            />
            <span className="absolute right-3 bottom-2.5 text-xs text-neutral-500 pointer-events-none">
              ms
            </span>
          </div>
        </div>
      </section>

      <section className="flex gap-4 justify-center sm:justify-end w-full flex-wrap">
        <Button onClick={handleRunAnimation} variant="primary">
          Correr Animación
        </Button>
        <Button onClick={handleResetAnimation} variant="secondary">
          Reiniciar Animación
        </Button>
      </section>

      {rawCode && <CodeBlock codeTitle="Staggers.tsx">{rawCode}</CodeBlock>}
    </div>
  );
};

export default Staggers;
