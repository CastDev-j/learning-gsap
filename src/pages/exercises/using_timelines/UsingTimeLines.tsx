import React, { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { Link } from "@/interfaces";
import CodeBlock from "@/components/CodeBlock";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import Button from "@/components/Button";

interface Props {
  rawCode?: string;
}
const BASE_SIZE = 46;

const UsingTimeLines: React.FC<Props> = ({ rawCode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const cube1Ref = useRef<HTMLDivElement>(null!);
  const cube2Ref = useRef<HTMLDivElement>(null!);
  const cube3Ref = useRef<HTMLDivElement>(null!);

  const cube4Ref = useRef<HTMLDivElement>(null!);
  const cube5Ref = useRef<HTMLDivElement>(null!);
  const cube6Ref = useRef<HTMLDivElement>(null!);

  const cube7Ref = useRef<HTMLDivElement>(null!);
  const cube8Ref = useRef<HTMLDivElement>(null!);
  const cube9Ref = useRef<HTMLDivElement>(null!);

  const timeline1Ref = useRef<gsap.core.Timeline | null>(null);
  const timeline2Ref = useRef<gsap.core.Timeline | null>(null);
  const timeline3Ref = useRef<gsap.core.Timeline | null>(null);

  const getSizes = useCallback(() => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const objetiveWidth = BASE_SIZE;
    const maxX = containerWidth - objetiveWidth;
    return { containerWidth, objetiveWidth, maxX };
  }, []);

  const handleRunAnimations = useCallback(() => {
    killTimelines();

    const { maxX } = getSizes();
    const { timeline1, timeline2, timeline3 } = createTimelines();

    timeline1Ref.current = timeline1;
    timeline2Ref.current = timeline2;
    timeline3Ref.current = timeline3;

    timeline1Ref.current
      .to(cube1Ref.current, {
        x: maxX,
        duration: 1.5,
      })
      .to(cube2Ref.current, {
        x: maxX,
        duration: 0.5,
      })
      .to(cube3Ref.current, {
        x: maxX,
        duration: 1,
      });

    timeline2Ref.current
      .to(cube4Ref.current, {
        x: maxX,
        duration: 1.5,
      })
      .to(cube5Ref.current, {
        x: maxX,
        duration: 0.25,
        delay: 0.25,
      })
      .to(cube6Ref.current, {
        x: maxX,
        duration: 0.5,
        delay: 0.5,
      });

    timeline3Ref.current
      .to(
        cube7Ref.current,
        {
          x: maxX,
          duration: 0.5,
        },
        1
      )
      .to(
        cube8Ref.current,
        {
          x: maxX,
          duration: 1.0,
        },
        "<"
      )
      .to(
        cube9Ref.current,
        {
          x: maxX,
          duration: 0.5,
        },
        "+=0.5"
      );
  }, [getSizes]);

  const handleResetAnimations = useCallback(() => {
    killTimelines();

    const cubeRefs = [
      cube1Ref.current,
      cube2Ref.current,
      cube3Ref.current,
      cube4Ref.current,
      cube5Ref.current,
      cube6Ref.current,
      cube7Ref.current,
      cube8Ref.current,
      cube9Ref.current,
    ];

    gsap.to(cubeRefs, {
      x: 0,
      duration: 1.5,
    });
  }, []);

  useEffect(() => {
    return () => {
      killTimelines();
    };
  }, []);

  const killTimelines = useCallback(() => {
    if (timeline1Ref.current) timeline1Ref.current.kill();
    if (timeline2Ref.current) timeline2Ref.current.kill();
    if (timeline3Ref.current) timeline3Ref.current.kill();
  }, []);

  const createTimelines = useCallback(() => {
    const defaultParams = { ease: "power2.inOut" };
    const timeline1 = gsap.timeline({ defaults: { ...defaultParams } });
    const timeline2 = gsap.timeline({ defaults: { ...defaultParams } });
    const timeline3 = gsap.timeline({ defaults: { ...defaultParams } });

    return { timeline1, timeline2, timeline3 };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 max-w-4xl w-full">
      <section className="text-center space-y-2">
        <Title>Utilizando Timelines</Title>
        <Paragraph>
          Los timelines en GSAP nos permiten encadenar múltiples animaciones de
          manera secuencial o simultánea, facilitando la creación de animaciones
          complejas y coordinadas. Con un timeline, podemos controlar el tiempo,
          la duración y el orden de las animaciones de forma más eficiente.
        </Paragraph>
      </section>

      <section className="w-full flex flex-col gap-6">
        <div
          ref={containerRef}
          className="flex flex-col items-start gap-4 -z-10"
        >
          <div className="flex flex-col gap-1 w-full ">
            <CreateCube color="oklch(58.5% 0.233 277.117)" ref={cube1Ref} />
            <CreateCube color="oklch(64.5% 0.246 16.439)" ref={cube2Ref} />
            <CreateCube color="oklch(69.6% 0.17 162.48)" ref={cube3Ref} />
          </div>

          <div className="flex flex-col gap-1 w-full ">
            <CreateCube color="oklch(58.5% 0.233 277.117)" ref={cube4Ref} />
            <CreateCube color="oklch(64.5% 0.246 16.439)" ref={cube5Ref} />
            <CreateCube color="oklch(69.6% 0.17 162.48)" ref={cube6Ref} />
          </div>

          <div className="flex flex-col gap-1 w-full ">
            <CreateCube color="oklch(58.5% 0.233 277.117)" ref={cube7Ref} />
            <CreateCube color="oklch(64.5% 0.246 16.439)" ref={cube8Ref} />
            <CreateCube color="oklch(69.6% 0.17 162.48)" ref={cube9Ref} />
          </div>
        </div>
      </section>

      <section className="flex gap-4 justify-center sm:justify-end w-full flex-wrap">
        <Button onClick={handleRunAnimations} variant="primary">
          Correr Animaciones
        </Button>
        <Button onClick={handleResetAnimations} variant="secondary">
          Reiniciar Animaciones
        </Button>
      </section>

      {rawCode && <CodeBlock codeTitle="Staggers.tsx">{rawCode}</CodeBlock>}
    </div>
  );
};

export default UsingTimeLines;

interface CubeProps {
  color: string;
  ref: React.RefObject<HTMLDivElement>;
}
const CreateCube: React.FC<CubeProps> = React.forwardRef<
  HTMLDivElement,
  Omit<CubeProps, "ref">
>(({ color }, ref) => {
  return (
    <div
      ref={ref}
      className="rounded-md"
      style={{
        backgroundColor: color,
        width: BASE_SIZE,
        height: BASE_SIZE,
      }}
    />
  );
});

CreateCube.displayName = "CreateCube";
