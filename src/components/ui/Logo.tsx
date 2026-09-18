import Image from "next/image";
import { site } from "@/lib/content";

type LogoProps = {
  width?: number;
  priority?: boolean;
};

const INTRINSIC_WIDTH = 1016;
const INTRINSIC_HEIGHT = 371;

export default function Logo({ width = 176, priority = false }: LogoProps) {
  const height = Math.round((width * INTRINSIC_HEIGHT) / INTRINSIC_WIDTH);

  return (
    <Image
      src="/images/logo.jpg"
      alt={site.brand}
      width={width}
      height={height}
      priority={priority}
      style={{
        display: "block",
        width: "100%",
        height: "auto",
        maxHeight: "100%",
        objectFit: "contain",
        objectPosition: "left center",
      }}
    />
  );
}
