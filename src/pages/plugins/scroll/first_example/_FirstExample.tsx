import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";

const FirstExample = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const slideRef = useRef<HTMLDivElement>(null!);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: slideRef.current,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: "+=400%",
          markers: true,
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / 4,
            duration: { min: 0.2, max: 3 },
          },
        },
      });

      timeline
        .addLabel("slide-1")
        .from(".container-2", {
          xPercent: -100,
          duration: 1,
        })
        .addLabel("slide-2")
        .from(".container-3", {
          xPercent: 100,
          duration: 1,
        })
        .addLabel("slide-3")
        .from(".container-4", {
          yPercent: -100,
          duration: 1,
        })
        .addLabel("slide-4")
        .from(".container-5", {
          yPercent: 100,
          duration: 1,
        });

      smootherRef.current = ScrollSmoother.create({
        smooth: 2,
        smoothTouch: 0.1,
        effects: true,
      });

      return () => {
        timeline.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <main
      className="flex flex-col items-center justify-center gap-8 px-4 max-w-4xl w-full"
      ref={containerRef}
      id="smooth-wrapper"
    >
      <div id="smooth-content">
        <section className="start h-screen flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-center">
            Contenedor 1: Introducción a ScrollTrigger
          </h1>
          <p className="text-center mt-2">
            Desplázate hacia abajo para ver la animación en acción.
          </p>
        </section>

        <section
          className="slide h-screen w-screen flex flex-col relative overflow-hidden"
          ref={slideRef}
        >
          <div className="container-1 w-screen h-screen bg-indigo-950 flex flex-col justify-center items-center text-white z-0 absolute">
            <h1 className="text-3xl font-bold text-center">Primera Capa</h1>
            <p
              className="text-center mt-2"
              onClick={() =>
                smootherRef.current?.scrollTo(".start", true, "center center")
              }
            >
              Base inicial
            </p>
          </div>
          <div className="container-2 w-screen h-screen bg-red-950 flex flex-col justify-center items-center text-white z-10 absolute">
            <h1 className="text-3xl font-bold text-center">Segunda Capa</h1>
            <p className="text-center mt-2">Desliza desde la izquierda</p>
          </div>
          <div className="container-3 w-screen h-screen bg-pink-950 flex flex-col justify-center items-center text-white z-20 absolute">
            <h1 className="text-3xl font-bold text-center">Tercera Capa</h1>
            <p className="text-center mt-2">Desliza desde la derecha</p>
          </div>
          <div className="container-4 w-screen h-screen bg-fuchsia-950 flex flex-col justify-center items-center text-white z-30 absolute">
            <h1 className="text-3xl font-bold text-center">Cuarta Capa</h1>
            <p className="text-center mt-2">Desciende desde arriba</p>
          </div>
          <div className="container-5 w-screen h-screen bg-neutral-950 flex flex-col justify-center items-center text-white z-40 absolute">
            <h1 className="text-3xl font-bold text-center">
              Fin de la demostración
            </h1>
            <p className="text-center mt-2">
              Has visto todas las capas en acción.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default FirstExample;
