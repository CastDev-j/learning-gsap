import type { Link } from "./interfaces";

const testLinks = Array.from({ length: 0 }, (_, i) => ({
  url: `/#section-${i + 1}`,
  label: `Section ${i + 1}`,
}));

export const links: Link[] = [
  {
    label: "Inicio",
    url: "/",
  },
  {
    label: "Creando una animación",
    url: "/getting_started/creating_an_animation",
  },
  {
    label: "Utilizando Staggers",
    url: "/getting_started/using_staggers",
  },
  {
    label: "Utilizando Timelines",
    url: "/getting_started/using_timelines",
  },
  {
    label: "Control y Callbacks",
    url: "/getting_started/control_and_callbacks",
  },
  {
    label: "Usando GSAP con React",
    url: "/plugins/use_gsap",
  },
  {
    label: "Usando LayoutShift con React",
    url: "/plugins/layout_shift",
  },
  {
    label: "Animando SVG",
    url: "/plugins/svg_plugin/svg",
  },
  {
    label: "Draw SVG",
    url: "/plugins/svg_plugin/draw_svg",
  },
  {
    label: "Morph SVG",
    url: "/plugins/svg_plugin/morph_svg",
  },
  {
    label: "Motion Path",
    url: "/plugins/svg_plugin/motion_path",
  },
  ...testLinks,
];
