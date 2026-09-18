"use client";

import { useEffect, useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { reviews } from "@/lib/content";
import { colors } from "@/theme/colors";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Reviews() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const directionRef = useRef<1 | -1>(1);

  const cardStep = () => {
    const el = scrollerRef.current;
    const card = el?.querySelector<HTMLElement>("[data-review-card]");
    return (card?.offsetWidth ?? 320) + 16;
  };

  const maxPage = () => {
    const el = scrollerRef.current;
    if (!el) return reviews.length - 1;
    const step = cardStep();
    return Math.max(0, Math.round((el.scrollWidth - el.clientWidth) / step));
  };

  const goTo = (next: number, direction?: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const last = maxPage();
    const clamped = Math.min(last, Math.max(0, next));
    if (direction) directionRef.current = direction;
    setPage(clamped);
    el.scrollTo({ left: clamped * cardStep(), behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const step = cardStep();
      setPage(Math.round(el.scrollLeft / step));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => {
      const last = maxPage();
      let next = page + directionRef.current;
      if (next > last) {
        directionRef.current = -1;
        next = Math.max(0, last - 1);
      } else if (next < 0) {
        directionRef.current = 1;
        next = Math.min(last, 1);
      }
      goTo(next);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [paused, page]);

  return (
    <Box
      component="section"
      id="reviews"
      sx={{
        py: { xs: 5.2, md: 6.5 },
        px: { xs: 2.2, md: 3 },
        background: `linear-gradient(180deg, ${colors.caseBg} 0%, ${colors.cream} 100%)`,
      }}
    >
      <Box sx={{ maxWidth: 1240, mx: "auto", position: "relative" }}>
        <SectionHeading
          title="Case studies & reviews"
          subtitle="Skincare that speaks for itself, from first use to forever favourite"
        />

        <Box
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          sx={{ position: "relative" }}
        >
          <IconButton
            aria-label="Previous review"
            onClick={() => goTo(page - 1, -1)}
            sx={{
              position: "absolute",
              left: { xs: -8, md: -20 },
              top: "42%",
              zIndex: 2,
              bgcolor: "#fff",
              border: `1px solid ${colors.border}`,
              boxShadow: "0 8px 18px rgba(13,68,54,0.12)",
              "&:hover": { bgcolor: colors.cream },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            aria-label="Next review"
            onClick={() => goTo(page + 1, 1)}
            sx={{
              position: "absolute",
              right: { xs: -8, md: -20 },
              top: "42%",
              zIndex: 2,
              bgcolor: "#fff",
              border: `1px solid ${colors.border}`,
              boxShadow: "0 8px 18px rgba(13,68,54,0.12)",
              "&:hover": { bgcolor: colors.cream },
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          <Box
            ref={scrollerRef}
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
              pb: 1,
              px: { xs: 0.5, md: 1 },
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {reviews.map((review) => (
              <Box
                key={review.name}
                data-review-card
                sx={{
                  flex: {
                    xs: "0 0 86%",
                    sm: "0 0 48%",
                    md: "0 0 32%",
                  },
                  scrollSnapAlign: "start",
                  bgcolor: "#fff",
                  borderRadius: 3,
                  p: { xs: 2.5, md: 3 },
                  minHeight: 220,
                  border: `1px solid ${colors.border}`,
                  boxShadow: "0 12px 28px rgba(13,68,54,0.06)",
                }}
              >
                <FormatQuoteIcon sx={{ color: colors.green, mb: 1 }} />
                <Typography sx={{ color: "#314b44", fontSize: 15, lineHeight: 1.6, mb: 2.2 }}>
                  “{review.quote}”
                </Typography>
                <Typography sx={{ fontWeight: 800, fontSize: 14 }}>{review.name}</Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 12 }}>{review.role}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 0.8, mt: 2.5 }}>
          {reviews.map((review, index) => (
            <Box
              key={review.name}
              component="button"
              type="button"
              aria-label={`Go to ${review.name} review`}
              onClick={() => goTo(index, index > page ? 1 : -1)}
              sx={{
                width: page === index ? 22 : 8,
                height: 8,
                border: 0,
                p: 0,
                borderRadius: 99,
                cursor: "pointer",
                bgcolor: page === index ? colors.green : colors.border,
                transition: "width 0.2s ease, background-color 0.2s ease",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
