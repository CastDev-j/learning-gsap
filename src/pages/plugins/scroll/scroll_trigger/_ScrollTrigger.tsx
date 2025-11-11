import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathHelper, MotionPathPlugin, ScrollTrigger } from "gsap/all";

const ScrollTriggerComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(MotionPathPlugin, MotionPathHelper, ScrollTrigger);

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }

      timelineRef.current = gsap.timeline({ paused: true });

      timelineRef.current.set(".rect", {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
        willChange: "transform",
        force3D: true,
      });

      timelineRef.current.to(".rect", {
        duration: 1,
        motionPath: {
          path: ".path",
          align: ".path",
          alignOrigin: [0.5, 0.5],
          autoRotate: 90,
          start: 0,
          end: 1,
        },
        onStart: () => {
          gsap.to(".rect", { opacity: 1, duration: 0.3 });
        },
      });

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        markers: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 5,
        animation: timelineRef.current,
        start: "top top",
        end: "+=300%",
        onUpdate: (self) => {
          const additionalRotation = self.direction === -1 ? 180 : 0;
          gsap.set(".rect", {
            rotation: `+=${additionalRotation}`,
          });
        },
      });

      // MotionPathHelper.create(".rect");
    },
    { scope: containerRef }
  );

  return (
    <main className="flex flex-col items-center justify-center gap-8 px-4 max-w-4xl w-full">
      <section className="min-h-[85vh] flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-center">
          Usando ScrollTrigger con MotionPath
        </h1>
        <p className="text-center mt-2">
          Desplázate hacia abajo para ver la animación en acción.
        </p>
      </section>

      <section
        className="flex flex-col gap-8 w-full justify-center items-center min-h-screen"
        ref={containerRef}
      >
        <svg
          className="w-full h-152"
          viewBox="-350 -150 1350 700"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            className="path"
            d="M-247.084,-138.75001 C-225.64555,-144.50056 671.433,-258.40501 880.96,-138.57501 1035.004,-50.47501 -299.406,-112.95601 -239.584,-1.25401 -182.901,104.57399 543.808,-128.10801 864.165,14.99699 1072.339,107.98999 -111.918,-3.37401 -204.583,92.49699 -324.582,216.66799 739.167,98.33699 846.664,157.49999 897.08,245.40699 -103.16,102.99399 -195.629,255.41699 -233.6474,318.08589 1072.488,197.92299 776.121,294.04699 640.348,338.08399 -282.674,317.21499 -308.361,363.93199 -318.639,382.61959 724.201,273.92499 805.245,453.26999 812.941,470.30299 775.74,705.58499 639.308,526.54299 577.90875,445.97624 612.989,102.50899 525.005,-68.03201 453.017,-207.56401 315.651,-265.45701 233.099,-219.63501 148.419,-172.63101 220.276,657.57399 223.622,659.35599 "
            stroke="#a5b4fc"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10 10"
            fill="none"
            fillOpacity="0.5"
            opacity="0.8"
          />

          <g
            className="rect"
            style={{
              opacity: 0,
            }}
          >
            <svg
              x="-50"
              y="-50"
              width="100"
              height="100"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.7797 17.4231C8.26348 19.2055 5.01827 16.4877 6.33123 13.6977L9.28559 7.41965C10.3664 5.12284 13.6337 5.12285 14.7145 7.41966L17.6689 13.6977C18.9818 16.4877 15.7366 19.2055 13.2204 17.4231L12.5781 16.9682C12.2318 16.7229 11.7683 16.7229 11.422 16.9682L10.7797 17.4231Z"
                fill="#6366f1"
              />
            </svg>
          </g>
        </svg>
      </section>

      <section className="min-h-screen flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-center">
          Fin de la demostración de ScrollTrigger
        </h1>
        <p className="text-center mt-2">
          Has llegado al final de la demostración. ¡Gracias por desplazarte!
        </p>
      </section>
    </main>
  );
};

export default ScrollTriggerComponent;
