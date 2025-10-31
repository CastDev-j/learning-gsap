import React, { useCallback, useRef, useState } from "react";
import { gsap } from "gsap";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import CodeBlock from "@/components/CodeBlock";
import Button from "@/components/Button";
import SelectEasing from "@/components/shared/SelectEasing";

const codeSection = `const handleRunAnimation = useCallback(() => {
    if (!cubeRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const cubeWidth = cubeRef.current.offsetWidth;
    const maxX = containerWidth - cubeWidth;

    gsap.to(cubeRef.current, {
      x: maxX,
      ease: easing,
    });
  }, [easing]);

  const handleResetAnimation = useCallback(() => {
    if (!cubeRef.current || !containerRef.current) return;

    gsap.to(cubeRef.current, {
      x: 0,
      ease: easing,
    });
  }, [easing]);`;

const CreatingAnAnimation = () => {
  const [easing, setEasing] = useState("power2.out");
  const cubeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRunAnimation = useCallback(() => {
    if (!cubeRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const cubeWidth = cubeRef.current.offsetWidth;
    const maxX = containerWidth - cubeWidth;

    gsap.to(cubeRef.current, {
      x: maxX,
      ease: easing,
    });
  }, [easing]);

  const handleResetAnimation = useCallback(() => {
    if (!cubeRef.current || !containerRef.current) return;

    gsap.to(cubeRef.current, {
      x: 0,
      ease: easing,
    });
  }, [easing]);
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-8 max-w-4xl w-full">
      <section className="text-center space-y-2">
        <Title>Creando una animación</Title>
        <Paragraph>
          Un cubo animado con GSAP que rota continuamente. Interactúa con él
          para ver el efecto.
        </Paragraph>
      </section>

      <section
        ref={containerRef}
        className="w-full flex flex-col gap-6 relative z-10"
      >
        <SelectEasing value={easing} onChange={setEasing} />
        <div className="min-h-64 flex items-center">
          <div
            ref={cubeRef}
            className="size-24 bg-indigo-500 rounded-lg shadow-2xl cursor-pointer select-none touch-none"
            style={{ viewTransitionName: "cube" }}
          />
        </div>
      </section>

      <section className="flex gap-4 justify-end w-full">
        <Button onClick={handleRunAnimation} variant="primary">
          Correr Animación
        </Button>
        <Button onClick={handleResetAnimation} variant="secondary">
          Reiniciar Animación
        </Button>
      </section>
      <CodeBlock codeTitle="CreatingAnAnimation.tsx">{codeSection}</CodeBlock>
    </div>
  );
};

export default CreatingAnAnimation;
