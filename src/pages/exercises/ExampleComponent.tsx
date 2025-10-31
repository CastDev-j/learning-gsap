import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const ExampleComponent = () => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(cubeRef.current, {
      rotation: 360,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
  }, []);

  const handleInteractionStart = () => {
    gsap.to(cubeRef.current, {
      scale: 1.2,
      backgroundColor: "#3b82f6",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleInteractionEnd = () => {
    gsap.to(cubeRef.current, {
      scale: 1,
      backgroundColor: "#6366f1",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-[60vh] flex flex-col items-center justify-center gap-8 p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Ejemplo básico</h2>
        <p className="text-neutral-400 max-w-md">
          Un cubo animado con GSAP que rota continuamente. Interactúa con él
          para ver el efecto.
        </p>
      </div>

      <div
        ref={cubeRef}
        className="size-24 bg-indigo-500 rounded-lg shadow-2xl cursor-pointer select-none touch-none"
        style={{ viewTransitionName: "cube" }}
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        onTouchCancel={handleInteractionEnd}
      />

      <div className="mt-8 px-6 py-4 bg-neutral-900 rounded-lg border border-neutral-800">
        <p className="text-sm text-neutral-400 text-center">
          <span className="text-neutral-300 font-mono">useGSAP()</span> ·
          Rotación infinita · Interacción táctil
        </p>
      </div>
    </div>
  );
};

export default ExampleComponent;
