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
  ...testLinks,
];
