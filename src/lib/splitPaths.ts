import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

type PathSegment = number[] & { closed?: boolean };

type RawPath = PathSegment[];

export function splitPaths(
  paths: string | Element | Element[] | NodeList
): SVGPathElement[] {
  const toSplit = gsap.utils.toArray<Element>(paths);
  let newPaths: SVGPathElement[] = [];

  if (toSplit.length > 1) {
    toSplit.forEach((path) => newPaths.push(...splitPaths(path)));
  } else {
    const path = toSplit[0] as SVGPathElement;
    const rawPath: RawPath = MotionPathPlugin.getRawPath(path);
    const parent = path.parentNode as SVGElement;
    const attributes = Array.from(path.attributes);

    newPaths = rawPath.map((segment) => {
      const newPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      ) as SVGPathElement;

      attributes.forEach((attr) => {
        newPath.setAttributeNS(null, attr.nodeName, attr.nodeValue || "");
      });

      const pathData = `M${segment[0]},${segment[1]}C${segment
        .slice(2)
        .join(",")}${segment.closed ? "z" : ""}`;

      newPath.setAttributeNS(null, "d", pathData);
      parent.insertBefore(newPath, path);

      return newPath;
    });

    parent.removeChild(path);
  }

  return newPaths;
}
