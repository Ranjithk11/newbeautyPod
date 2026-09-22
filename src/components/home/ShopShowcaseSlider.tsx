"use client";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import type { BrandShowcaseImage } from "@/lib/leafwater";

const VISIBLE = 6;

function ProductTile({
  item,
  delay,
}: {
  item: BrandShowcaseImage;
  delay: number;
}) {
  const [shown, setShown] = useState(item);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (item.brandId === shown.brandId) return undefined;
    setFlipping(true);
    const swap = window.setTimeout(() => setShown(item), 280);
    const done = window.setTimeout(() => setFlipping(false), 700);
    return () => {
      window.clearTimeout(swap);
      window.clearTimeout(done);
    };
  }, [item, shown.brandId]);

  return (
    <Box sx={{ perspective: 900 }}>
      <Box
        sx={{
          position: "relative",
          aspectRatio: "1 / 1",
          bgcolor: "rgba(255,255,255,0.94)",
          borderRadius: 1.5,
          overflow: "hidden",
          boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
          transformStyle: "preserve-3d",
          animation: flipping
            ? "bpCardFlip 0.7s ease"
            : `bpCardFloat 4.6s ease-in-out ${delay}s infinite`,
          "&:hover": {
            animationPlayState: "paused",
            transform: "translateY(-4px) scale(1.03)",
            boxShadow: "0 14px 28px rgba(0,0,0,0.22)",
          },
        }}
      >
        <Image
          src={shown.url}
          alt={`${shown.brand} — ${shown.name}`}
          fill
          sizes="160px"
          style={{ objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
}

export default function ShopShowcaseSlider({
  images,
}: {
  images: BrandShowcaseImage[];
}) {
  const [visible, setVisible] = useState(() =>
    images.slice(0, VISIBLE).map((_, index) => index),
  );
  const paused = useRef(false);
  const queue = useRef(images.map((_, index) => index).slice(VISIBLE));

  useEffect(() => {
    setVisible(images.slice(0, VISIBLE).map((_, index) => index));
    queue.current = images.map((_, index) => index).slice(VISIBLE);
  }, [images]);

  useEffect(() => {
    if (images.length <= VISIBLE) return undefined;
    let slot = 0;
    const tick = window.setInterval(() => {
      if (paused.current) return;
      const currentSlot = slot % VISIBLE;
      setVisible((current) => {
        const next = [...current];
        const outgoing = next[currentSlot];
        const incoming = queue.current.shift();
        if (incoming === undefined) return current;
        next[currentSlot] = incoming;
        queue.current.push(outgoing);
        return next;
      });
      slot += 1;
    }, 2800);
    return () => window.clearInterval(tick);
  }, [images.length]);

  if (!images.length) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 1.2,
        }}
      >
        {Array.from({ length: VISIBLE }).map((_, index) => (
          <Box
            key={index}
            sx={{
              aspectRatio: "1 / 1",
              bgcolor: "rgba(255,255,255,0.16)",
              borderRadius: 1.5,
            }}
          />
        ))}
      </Box>
    );
  }

  const cards = visible.map((imageIndex) => images[imageIndex]).filter(Boolean);

  return (
    <Box
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 1.2,
      }}
    >
      {cards.map((item, index) => (
        <ProductTile key={index} item={item} delay={index * 0.35} />
      ))}
    </Box>
  );
}
