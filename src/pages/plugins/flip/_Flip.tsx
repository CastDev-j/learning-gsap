import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/all";
import { cn } from "@/lib/cn";

const FirstExample = () => {
  const containerRef = useRef<HTMLElement>(null!);
  const imageRef = useRef<HTMLImageElement>(null!);
  const fullSizeRef = useRef<HTMLImageElement>(null!);
  const [colors, setColors] = useState([
    { id: 1, color: "#ff0000", hidden: false },
    { id: 2, color: "#00ff00", hidden: false },
    { id: 3, color: "#0000ff", hidden: false },
  ]);

  useGSAP(
    () => {
      gsap.registerPlugin(Flip);
    },
    { scope: containerRef }
  );

  const toggleImage = () => {
    const state = Flip.getState([imageRef.current, fullSizeRef.current], {
      props: "width,height",
    });

    imageRef.current.classList.toggle("hidden");
    fullSizeRef.current.classList.toggle("hidden");

    Flip.from(state, {
      duration: 0.4,
      ease: "power1.inOut",
      absolute: true,
      fade: true,
    });
  };

  const animarFrames = (state: Flip.FlipState) => {
    requestAnimationFrame(() => {
      Flip.from(state, {
        targets: ".color-box",
        duration: 0.3,
        ease: "power1.inOut",
        fade: true,
        scale: true,
        spin: false,
        zIndex: 100,
        toggleClass: "rounded-xl",
        absoluteOnLeave: true,
        stagger: 0.03,
        onEnter: (elements) => {
          return gsap.fromTo(
            elements,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "bounce.out" }
          );
        },
        onLeave: (elements) => {
          return gsap.to(elements, {
            opacity: 0,
            scale: 0,
            duration: 0.4,
            ease: "power1.inOut",
            onComplete: () => {
              const idsToRemove = elements.map((el) =>
                Number(el.getAttribute("data-id"))
              );

              setColors((prev) =>
                prev.filter((c) => !idsToRemove.includes(c.id))
              );
            },
          });
        },
      });
    });
  };

  const addRandomColor = () => {
    const state = Flip.getState(".color-box");

    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const newId = Math.max(...colors.map((c) => c.id), 0) + 1;

    setColors((prevColors) => [
      ...prevColors,
      { id: newId, color: randomColor, hidden: false },
    ]);

    animarFrames(state);
  };

  const removeColor = (colorToRemove: string) => {
    const state = Flip.getState(".color-box");

    setColors((prev) =>
      prev.map((c) => (c.color === colorToRemove ? { ...c, hidden: true } : c))
    );

    animarFrames(state);
  };

  return (
    <main
      className="flex flex-col items-center justify-center gap-8 px-4 max-w-4xl w-full mx-auto py-8"
      ref={containerRef}
    >
      <section className="flex flex-col">
        <h1 className="text-3xl font-bold text-center">
          Contenedor 1: Introducción a ScrollTrigger
        </h1>
        <p className="text-center mt-2">
          Desplázate hacia abajo para ver la animación en acción.
        </p>
      </section>

      <section className="w-full flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-neutral-600 text-white rounded hover:bg-neutral-700"
          onClick={addRandomColor}
        >
          Agregar Color Aleatorio
        </button>
      </section>

      <section className="w-full grid grid-cols-3 gap-4">
        {colors.map(({ id, color, hidden }) => (
          <div
            key={id}
            data-id={id}
            className={cn(
              "h-24 mb-4 cursor-pointer color-box",
              "flex items-center justify-center",
              "rounded ",
              hidden && "hidden"
            )}
            style={{ backgroundColor: color }}
            onClick={() => removeColor(color)}
          >
            <p className="bg-neutral-800 text-neutral-50 rounded-sm px-4 py-2">
              {color}
            </p>
          </div>
        ))}
      </section>

      <section className="w-full">
        <img
          src="https://placehold.co/200x200"
          alt="Small placeholder"
          className="mx-auto normal-size cursor-pointer"
          ref={imageRef}
          onClick={toggleImage}
          data-flip-id="image"
        />
        <img
          src="https://placehold.co/600x600"
          alt="Large placeholder"
          className="mx-auto full-size cursor-pointer hidden"
          ref={fullSizeRef}
          onClick={toggleImage}
          data-flip-id="image"
        />
      </section>
    </main>
  );
};

export default FirstExample;
