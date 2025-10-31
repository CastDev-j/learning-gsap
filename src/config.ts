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
    label: "Página de Ejemplo",
    url: "/exercises/example",
  },
  ...testLinks,
];
