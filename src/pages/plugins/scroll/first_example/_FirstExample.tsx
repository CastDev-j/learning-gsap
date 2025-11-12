import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";

const boxSize = 96;

const FirstExample = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const boxContainerRef = useRef<HTMLDivElement>(null!);

  const getContainerWidth = () => {
    return boxContainerRef.current
      ? boxContainerRef.current.getBoundingClientRect().width - boxSize
      : 0;
  };

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    lenisRef.current.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      timelineRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: boxContainerRef.current,
          pin: true,
          pinSpacing: true,
          start: "top 0%",
          end: "bottom 0%",
          markers: true,
          scrub: 1,
        },
      });

      timelineRef.current.from(".box.a", {
        x: -getContainerWidth(),
        rotation: -360,
        duration: 1,
        ease: "none",
      });

      timelineRef.current.to(".box.b", {
        x: -getContainerWidth(),
        rotation: -360,
        duration: 1,
        ease: "none",
      });

      timelineRef.current.from(".box.c", {
        x: -getContainerWidth(),
        rotation: -360,
        duration: 1,
        ease: "none",
      });

      return () => {
        timelineRef.current?.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <main
      className="flex flex-col items-center justify-center gap-8 px-4 max-w-4xl w-full"
      ref={containerRef}
    >
      <section className="min-h-[85vh] flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-center">
          Contenedor 1: Introducción a ScrollTrigger
        </h1>
        <p className="text-center mt-2">
          Desplázate hacia abajo para ver la animación en acción.
        </p>
      </section>

      <section
        className="flex flex-col gap-8 w-full justify-center items-end min-h-screen"
        ref={boxContainerRef}
      >
        <div
          className="box a"
          style={{ background: "#34d399", width: boxSize, height: boxSize }}
        />
        <div
          className="box b"
          style={{ background: "#60a5fa", width: boxSize, height: boxSize }}
        />
        <div
          className="box c"
          style={{ background: "#fb7185", width: boxSize, height: boxSize }}
        />
      </section>

      <section className="min-h-screen flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-center">
          Contenedor 3: Conclusión
        </h1>
        <p className="text-center mt-2">
          Has llegado al final de la demostración de ScrollTrigger.
        </p>
      </section>
    </main>
  );
};

export default FirstExample;
