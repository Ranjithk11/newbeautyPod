import Image from "next/image";
import { site } from "@/lib/content";

type LogoProps = {
  width?: number;
  priority?: boolean;
};

export default function Logo({ width = 280, priority = false }: LogoProps) {
  const height = Math.round((width * 403) / 1024);

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
        objectFit: "contain",
      }}
    />
  );
}
