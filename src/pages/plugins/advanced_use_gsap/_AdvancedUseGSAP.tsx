import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import CodeBlock from "@/components/CodeBlock";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import Remark from "@/components/Remark";
import Button from "@/components/Button";

interface Props {
  rawCode?: string;
}

const BASE_SIZE = 96;
const wrap = gsap.utils.wrap(["pulse", "spin", "shake"]);

const AvancedUseGSAP: React.FC<Props> = ({ rawCode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null!);
  const [tl, setTl] = useState<GSAPTimeline | null>(null);
  const [effect, setEffect] = useState<string>("");
  const count = useRef<number>(0);

  const getMaxWidth = () => {
    if (!containerRef.current) return 0;
    return containerRef.current.clientWidth - BASE_SIZE;
  };

  useGSAP(() => {
    gsap.registerEffect({
      name: "pulse",
      effect(targets: gsap.TweenTarget) {
        return gsap.fromTo(
          targets,
          {
            scale: 1,
          },
          {
            scale: 1.5,
            repeat: 1,
            yoyo: true,
            ease: "bounce",
            yoyoEase: "power3",
          }
        );
      },
    });

    gsap.registerEffect({
      name: "spin",
      effect(targets: gsap.TweenTarget) {
        return gsap.to(targets, {
          rotation: (i, el) =>
            gsap.utils.snap(360, +gsap.getProperty(el, "rotation") + 360),
        });
      },
    });

    gsap.registerEffect({
      name: "shake",
      effect(targets: gsap.TweenTarget) {
        return gsap.fromTo(
          targets,
          {
            x: 0,
          },
          {
            x: 10,
            repeat: 5,
            yoyo: true,
            duration: 0.1,
            ease: "power1.inOut",
          }
        );
      },
    });
  }, []);

  const { contextSafe } = useGSAP(() => {
    const timeline = gsap.timeline({ paused: true });
    setTl(timeline);
  }, []);

  const handlePlay = contextSafe(() => {
    tl?.play();
  });

  const handleReverse = contextSafe(() => {
    tl?.reverse();
  });

  const toggleEffect = () => {
    setEffect(wrap(count.current++));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 max-w-4xl w-full">
      <section className="text-center space-y-2">
        <Title>useGSAP Avanzado</Title>
        <Paragraph>
          En esta sección, exploraremos características avanzadas del hook{" "}
          <Remark>useGSAP</Remark>.
        </Paragraph>
      </section>

      <section
        ref={containerRef}
        className="justify-center w-full flex flex-col gap-4"
      >
        <Box
          timeline={tl}
          index={0}
          initialPosition={0}
          targetPosition={getMaxWidth()}
        >
          Box
        </Box>
        <Circle
          timeline={tl}
          rotation={360}
          index={1}
          initialPosition={getMaxWidth()}
          targetPosition={0}
        >
          Circle
        </Circle>
      </section>

      <FadeIn vars={{ x: 10, delay: 0.4 }}>
        <p>
          El hook <Remark>useGSAP</Remark> también puede utilizarse para crear
          animaciones independientes que no formen parte de una línea de tiempo.
        </p>
      </FadeIn>

      <section className="flex gap-4 justify-center sm:justify-end w-full flex-wrap">
        <Button onClick={handlePlay} variant="secondary">
          Reproducir
        </Button>
        <Button onClick={handleReverse} variant="secondary">
          Revertir
        </Button>
      </section>

      <section className="flex flex-col items-center gap-4">
        <Button onClick={toggleEffect} variant="secondary">
          Toggle Effect
        </Button>
        <p className="text-sm font-medium">
          Efecto actual:{" "}
          <span className="text-indigo-600">{effect || "ninguno"}</span>
        </p>
        <GsapEffect targetRef={boxRef} effect={effect}>
          <div
            ref={boxRef}
            className="rounded-md bg-indigo-400 flex items-center justify-center text-white font-semibold"
            style={{ width: BASE_SIZE, height: BASE_SIZE }}
          >
            Effect Box
          </div>
        </GsapEffect>
      </section>

      {rawCode && (
        <CodeBlock codeTitle="AdvancedUseGSAP.tsx">{rawCode}</CodeBlock>
      )}
    </div>
  );
};

export default AvancedUseGSAP;

interface BoxProps {
  children: React.ReactNode;
  timeline: GSAPTimeline | null;
  index: number;
  initialPosition: number;
  targetPosition: number;
}

function Box({
  children,
  timeline,
  index,
  initialPosition,
  targetPosition,
}: BoxProps) {
  const el = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (timeline && el.current) {
      timeline.to(el.current, { x: targetPosition, duration: 3 }, index * 0.1);
    }
  }, [timeline, index, targetPosition]);

  return (
    <div
      ref={el}
      className="bg-indigo-500 rounded-md size-24 flex items-center justify-center"
      style={{ transform: `translateX(${initialPosition}px)` }}
    >
      {children}
    </div>
  );
}

interface CircleProps {
  children: React.ReactNode;
  timeline: GSAPTimeline | null;
  index: number;
  rotation: number;
  initialPosition: number;
  targetPosition: number;
}

function Circle({
  children,
  timeline,
  index,
  rotation,
  initialPosition,
}: CircleProps) {
  const el = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (timeline && el.current) {
      timeline.to(
        el.current,
        { rotation, x: -initialPosition, duration: 3 },
        index * 0.1
      );
    }
  }, [timeline, rotation, index, initialPosition]);

  return (
    <div
      ref={el}
      className="bg-rose-500 rounded-full size-24 flex items-center justify-center self-end"
    >
      {children}
    </div>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  vars: gsap.TweenVars;
}

function FadeIn({ children, vars }: FadeInProps) {
  const el = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!el.current) return;

    gsap.set(el.current, {
      opacity: 0,
      x: vars.x || 0,
    });

    gsap.to(el.current, {
      opacity: 1,
      x: 0,
      stagger: vars.stagger || 0.1,
      duration: vars.duration || 1,
      delay: vars.delay || 0,
    });
  });

  return (
    <span ref={el} style={{ opacity: 0 }}>
      {children}
    </span>
  );
}

interface GsapEffectProps {
  children: React.ReactNode;
  effect: string;
  targetRef: React.RefObject<HTMLElement>;
  vars?: Record<string, any>;
}

function GsapEffect({ children, effect, targetRef, vars }: GsapEffectProps) {
  useGSAP(() => {
    if (!effect || !gsap.effects[effect] || !targetRef.current) return;

    gsap.effects[effect](targetRef.current, vars);
  }, [effect]);

  return <>{children}</>;
}
