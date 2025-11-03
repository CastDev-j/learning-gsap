import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import CodeBlock from "@/components/CodeBlock";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import Button from "@/components/Button";

interface Props {
  rawCode?: string;
}

interface Item {
  id: number;
  color: string;
}

const BASE_SIZE = 68;

const LayoutShift: React.FC<Props> = ({ rawCode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Item[]>([
    { id: 0, color: "#6366f1" },
    { id: 1, color: "#8b5cf6" },
    { id: 2, color: "#db2777" },
    { id: 3, color: "#84cc16" },
    { id: 4, color: "#f43f5e" },
    { id: 5, color: "#ef4444" },
    { id: 6, color: "#14b8a6" },
  ]);

  useGSAP(() => {
    gsap.registerPlugin(Flip);
  }, []);

  const handleRemove = (itemToRemove: Item) => {
    if (!containerRef.current) return;

    const boxes = containerRef.current.querySelectorAll(".box");
    const state = Flip.getState(boxes);

    const boxElement = Array.from(boxes).find(
      (box) => box.getAttribute("data-id") === String(itemToRemove.id)
    );

    if (boxElement) {
      gsap.to(boxElement, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        onComplete: () => {
          setItems((prevItems) => {
            const newItems = prevItems.filter(
              (item) => item.id !== itemToRemove.id
            );

            requestAnimationFrame(() => {
              Flip.from(state, {
                duration: 0.15,
                ease: "power1.inOut",
              });
            });

            return newItems;
          });
        },
      });
    }
  };

  const handleReset = () => {
    setItems([
      { id: Date.now() + 0, color: "#6366f1" },
      { id: Date.now() + 1, color: "#8b5cf6" },
      { id: Date.now() + 2, color: "#db2777" },
      { id: Date.now() + 3, color: "#84cc16" },
      { id: Date.now() + 4, color: "#f43f5e" },
      { id: Date.now() + 5, color: "#ef4444" },
      { id: Date.now() + 6, color: "#14b8a6" },
    ]);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 max-w-4xl w-full">
      <section className="text-center space-y-2">
        <Title>Evitando el Layout Shift</Title>
        <Paragraph>
          GSAP Flip permite animar cambios de layout sin causar saltos bruscos,
          creando transiciones suaves cuando los elementos cambian de posición.
        </Paragraph>
      </section>

      <section
        className="flex justify-center gap-2 flex-wrap min-h-20"
        ref={containerRef}
      >
        {items.map((item) => (
          <div
            key={item.id}
            data-id={item.id}
            className="flex items-center justify-center rounded-md box cursor-pointer hover:opacity-80 transition-opacity text-white font-semibold select-none"
            style={{
              width: BASE_SIZE,
              height: BASE_SIZE,
              backgroundColor: item.color,
            }}
            onClick={() => handleRemove(item)}
          >
            Click
          </div>
        ))}
      </section>

      {items.length === 0 && <Button onClick={handleReset}>Reiniciar</Button>}

      {rawCode && <CodeBlock codeTitle="LayoutShift.tsx">{rawCode}</CodeBlock>}
    </div>
  );
};

export default LayoutShift;
