import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

interface Link {
  label: string;
  url: string;
}

interface Props {
  links: Link[];
}

export const Menu: React.FC<Props> = ({ links }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
      });

      if (isOpen) {
        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
        })
          .to(
            menuRef.current,
            {
              x: "0%",
              duration: 0.5,
            },
            0.1
          )
          .to(
            linksRef.current,
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.05,
            },
            0.3
          );
      } else {
        tl.to(linksRef.current, {
          opacity: 0,
          x: -20,
          duration: 0.3,
          stagger: 0.03,
        })
          .to(
            menuRef.current,
            {
              x: "100%",
              duration: 0.5,
            },
            0.2
          )
          .to(
            overlayRef.current,
            {
              opacity: 0,
              duration: 0.3,
            },
            0.2
          );
      }
    },
    { scope: containerRef, dependencies: [isOpen] }
  );

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section ref={containerRef}>
      <div className="flex w-screen h-18" />

      <div className="fixed top-4 right-4 z-50">
        <CloseOrOpenMenu isOpen={isOpen} onToggle={handleMenuToggle} />
      </div>

      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 opacity-0 pointer-events-none"
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        onClick={() => setIsOpen(false)}
      />

      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-full sm:w-96 h-screen bg-neutral-900 z-40 translate-x-full shadow-2xl"
      >
        <div className="flex flex-col h-full">
          <div className="px-8 pt-24 pb-8 border-b border-neutral-800">
            <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-2">
              Navegación
            </h2>
            <p className="text-2xl font-bold text-neutral-100">
              Proyectos GSAP
            </p>
          </div>

          <nav className="flex-1 overflow-y-auto px-8 py-6 disable-scroll">
            <div className="space-y-2 ">
              {links.map((link, i) => (
                <a
                  key={link.url}
                  ref={(el) => {
                    linksRef.current[i] = el;
                  }}
                  href={link.url}
                  className="group block px-4 py-4 rounded-lg hover:bg-neutral-800 transition-colors opacity-0 -translate-x-5"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-neutral-600 font-mono tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-neutral-100 font-medium group-hover:text-white transition-colors">
                      {link.label}
                    </span>
                    <svg
                      className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 group-hover:translate-x-1 transition-all"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M4 10h12m0 0l-4-4m4 4l-4 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </nav>

          <div className="px-8 py-6 border-t border-neutral-800">
            <p className="text-xs text-neutral-600 text-center">
              Animado con GSAP · {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CloseOrOpenMenu: React.FC<{ isOpen: boolean; onToggle: () => void }> = ({
  isOpen,
  onToggle,
}) => {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: "power2.inOut" },
      });

      if (isOpen) {
        tl.to(line2Ref.current, { opacity: 0, duration: 0.25 })
          .to(
            line1Ref.current,
            {
              rotation: 45,
              y: 8,
              transformOrigin: "center center",
              duration: 0.25,
            },
            0.25
          )
          .to(
            line3Ref.current,
            {
              rotation: -45,
              y: -8,
              transformOrigin: "center center",
              duration: 0.25,
            },
            0.25
          );
      } else {
        tl.to(
          line1Ref.current,
          {
            rotation: 0,
            y: 0,
            transformOrigin: "center center",
            duration: 0.25,
          },
          0
        )
          .to(
            line3Ref.current,
            {
              rotation: 0,
              y: 0,
              transformOrigin: "center center",
              duration: 0.25,
            },
            0
          )
          .to(line2Ref.current, { opacity: 1, duration: 0.25 }, 0.25);
      }
    },
    { scope: buttonRef, dependencies: [isOpen] }
  );

  return (
    <button
      ref={buttonRef}
      onClick={onToggle}
      className={cn(
        "flex rounded-full relative size-10 cursor-pointer transition-colors",
        isOpen ? "bg-transparent" : "bg-neutral-50"
      )}
    >
      <div
        ref={line1Ref}
        className={cn(
          "block w-6 h-1 rounded-sm absolute top-2.5 left-2 transition-colors",
          isOpen ? "bg-neutral-50" : "bg-neutral-950"
        )}
      />
      <div
        ref={line2Ref}
        className={cn(
          "block w-6 h-1 rounded-sm absolute top-4.5 left-2 transition-colors",
          isOpen ? "bg-neutral-50" : "bg-neutral-950"
        )}
      />
      <div
        ref={line3Ref}
        className={cn(
          "block w-6 h-1 rounded-sm absolute top-6.5 left-2 transition-colors",
          isOpen ? "bg-neutral-50" : "bg-neutral-950"
        )}
      />
    </button>
  );
};

export default Menu;
