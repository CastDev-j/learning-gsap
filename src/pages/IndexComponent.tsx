import React, { useEffect } from "react";
import { gsap } from "gsap";
import type { Link } from "@/interfaces";

interface Props {
  links: Link[];
}

const IndexComponent: React.FC<Props> = ({ links = [] }) => {
  useEffect(() => {
    gsap.fromTo(
      ".grid-bg",
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" }
    );

    gsap.to(".title-word", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.3,
    });

    gsap.to(".subtitle", {
      opacity: 1,
      duration: 1,
      delay: 1.2,
      ease: "power2.out",
    });

    gsap.to(".nav-title", {
      opacity: 1,
      duration: 0.8,
      delay: 1.5,
      ease: "power2.out",
    });

    gsap.to(".link-card", {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 1.7,
      ease: "power2.out",
    });

    gsap.to(".footer", {
      opacity: 1,
      duration: 1,
      delay: 2.2,
      ease: "power2.out",
    });

    gsap.to(".grid-bg", {
      backgroundPosition: "100px 100px",
      duration: 20,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <>
      <style>{`
        .grid-bg {
          background-image: linear-gradient(
              rgba(115, 115, 115, 0.03) 1px,
              transparent 1px
            ),
            linear-gradient(90deg, rgba(115, 115, 115, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>

      <div className="grid-bg fixed inset-0 opacity-0 z-0"></div>

      <div className="flex justify-center px-8 relative z-10">
        <div className="max-w-4xl w-full">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
            <span className="title-word inline-block mr-2 opacity-0 translate-y-8">
              Biblioteca
            </span>
            <span className="title-word inline-block mr-2 opacity-0 translate-y-8">
              de
            </span>
            <span className="title-word inline-block mr-2 opacity-0 translate-y-8">
              mis
            </span>
            <span className="title-word inline-block mr-2 opacity-0 translate-y-8">
              trabajos
            </span>
            <span className="title-word inline-block mr-2 opacity-0 translate-y-8">
              con
            </span>
            <span className="title-word inline-block mr-2 opacity-0 translate-y-8">
              GSAP
            </span>
          </h1>

          <p className="subtitle text-xl text-neutral-400 mb-16 opacity-0">
            Explorando animaciones y transiciones con GreenSock
          </p>

          <nav className="mb-16">
            <h2 className="nav-title text-xs uppercase tracking-widest text-neutral-600 mb-8 opacity-0">
              Explorar proyectos
            </h2>
            <div className="grid gap-px bg-neutral-950 border border-neutral-900">
              {links.slice(1, 4).map((link, i) => (
                <a
                  key={link.url}
                  href={link.url}
                  className="link-card flex items-center gap-4 px-7 py-6 bg-neutral-950 hover:bg-neutral-900 transition-all duration-300 relative overflow-hidden opacity-0 -translate-x-5 group"
                  data-index={i}
                >
                  <span className="link-number text-sm text-neutral-600 tabular-nums relative z-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="link-label flex-1 text-lg font-medium relative z-10">
                    {link.label}
                  </span>
                  <svg
                    className="link-arrow w-5 h-5 text-neutral-500 transition-transform duration-300 group-hover:translate-x-1 relative z-10"
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
                  <div className="absolute inset-0 w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </nav>

          <footer className="footer mt-24 opacity-0">
            <div className="h-px bg-linear-to-r from-transparent via-neutral-800 to-transparent mb-8"></div>
            <p className="text-center text-sm text-neutral-600 tracking-wide">
              Animado con GSAP
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default IndexComponent;
