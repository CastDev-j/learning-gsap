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
    url: "/exercises/creating_an_animation",
  },
  {
    label: "Utilizando Staggers",
    url: "/exercises/using_staggers",
  },
  ...testLinks,
];
