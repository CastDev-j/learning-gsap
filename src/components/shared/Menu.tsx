import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
  const linksRef = useRef<HTMLDivElement>(null);
  const [isOpen, setisOpen] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.5, ease: "power2.inOut" },
    });

    if (isOpen) {
      tl.to(menuRef.current, { y: "0%" }).to(
        linksRef.current,
        { autoAlpha: 1, stagger: 0.1 },
        "-=0.25"
      );
    } else {
      tl.to(linksRef.current, { autoAlpha: 0, stagger: 0.1 }, 0).to(
        menuRef.current,
        { y: "-100%" }
      );
    }
  }, [isOpen]);

  const handleMenuToggle = () => {
    setisOpen(!isOpen);
  };

  return (
    <section ref={containerRef} className="">
      <div className="absolute top-4 right-4 z-50">
        <CloseOrOpenMenu isOpen={isOpen} onToggle={handleMenuToggle} />
      </div>
      <div
        ref={menuRef}
        className="w-screen h-screen fixed top-0 left-0 bg-neutral-800 z-40 flex flex-col justify-center items-center -translate-y-full"
      >
        <div className="relative">
          <nav
            ref={linksRef}
            className="flex flex-col items-center py-6 text-3xl max-h-[70vh] overflow-y-scroll disable-scroll"
          >
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-48 bg-linear-to-b from-neutral-800 to-neutral-800/0 z-10" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-neutral-800 to-neutral-800/0 z-10" />
            <div className="min-h-[30vh]" />
            {links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="text-white opacity-70 px-4 py-6 hover:opacity-100 hover:scale-110 transition-all z-0"
                onClick={() => setisOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="min-h-[30vh]" />
          </nav>
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

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.5, ease: "power2.inOut" },
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
  }, [isOpen]);

  return (
    <button
      onClick={onToggle}
      className="flex bg-neutral-50 rounded-full relative size-15 cursor-pointer"
    >
      <div
        ref={line1Ref}
        className="block w-8 h-1 bg-neutral-950 rounded-sm absolute top-5 left-3.5"
      />
      <div
        ref={line2Ref}
        className="block w-8 h-1 bg-neutral-950 rounded-sm absolute top-7 left-3.5"
      />
      <div
        ref={line3Ref}
        className="block w-8 h-1 bg-neutral-950 rounded-sm absolute top-9 left-3.5"
      />
    </button>
  );
};
