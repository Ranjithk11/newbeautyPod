import Image from "next/image";
import { site } from "@/lib/content";

type LogoProps = {
  width?: number;
  priority?: boolean;
};

export default function Logo({ width = 178, priority = false }: LogoProps) {
  const height = Math.round((width * 72) / 320);

  return (
    <Image
      src="/images/logo.svg"
      alt={site.brand}
      width={width}
      height={height}
      priority={priority}
      style={{ display: "block", width, height: "auto" }}
    />
  );
}
