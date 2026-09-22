"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import InstagramIcon from "@mui/icons-material/Instagram";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { site, socialLinks } from "@/lib/content";
import { colors } from "@/theme/colors";
import SectionHeading from "@/components/ui/SectionHeading";

type InstagramVideo = {
  id: string;
  caption: string;
  mediaType: string;
  mediaProductType: string | null;
  mediaUrl: string | null;
  thumbnailUrl: string | null;
  permalink: string;
  timestamp: string;
};

const instagramHref = socialLinks.find((item) => item.label === "Instagram")?.href ?? "https://www.instagram.com/leafwater.skincare/";

function videoSrc(video: InstagramVideo) {
  return `/api/instagram-media/${video.id}?kind=video`;
}

function NativeReelPlayer({ video }: { video: InstagramVideo }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    el.setAttribute("referrerpolicy", "no-referrer");
    el.src = videoSrc(video);

    const tryPlay = () => {
      el.play().catch(() => {
        el.muted = true;
        el.play().catch(() => undefined);
      });
    };

    if (el.readyState >= 2) {
      tryPlay();
    } else {
      el.addEventListener("loadeddata", tryPlay, { once: true });
    }

    return () => {
      el.removeEventListener("loadeddata", tryPlay);
      el.pause();
    };
  }, [video.id]);

  if (failed) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "grid",
          placeItems: "center",
          px: 3,
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Box>
          <Typography sx={{ mb: 1.5 }}>This reel could not start here.</Typography>
          <Link
            href={video.permalink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "#9ecbff", fontWeight: 700 }}
          >
            Watch on Instagram
          </Link>
        </Box>
      </Box>
    );
  }

  return (
    <video
      ref={ref}
      poster={video.thumbnailUrl || undefined}
      controls
      autoPlay
      playsInline
      preload="auto"
      onError={() => setFailed(true)}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        objectFit: "contain",
        background: "#000",
      }}
    />
  );
}

export default function InstagramVideos() {
  const [videos, setVideos] = useState<InstagramVideo[]>([]);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<InstagramVideo | null>(null);
  const [mounted, setMounted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [page, setPage] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/instagram-videos?limit=12", { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        setConfigured(json?.configured !== false);
        setError(json?.error || null);
        setVideos(Array.isArray(json?.videos) ? json.videos : []);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load Instagram videos");
          setVideos([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    const timer = window.setInterval(load, 15 * 60 * 1000);
    setMounted(true);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const cardStep = () => {
    const el = scrollerRef.current;
    const card = el?.querySelector<HTMLElement>("[data-ig-card]");
    if (!el || !card) return 272;
    const styles = window.getComputedStyle(el);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "12") || 12;
    return card.offsetWidth + gap;
  };

  const maxPage = () => {
    const el = scrollerRef.current;
    if (!el) return Math.max(0, videos.length - 1);
    const step = cardStep();
    return Math.max(0, Math.round((el.scrollWidth - el.clientWidth) / step));
  };

  const goTo = (next: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const last = maxPage();
    let target = next;
    if (target > last) target = 0;
    if (target < 0) target = last;
    setPage(target);
    const wrap = (next > last || next < 0) && last > 0;
    el.scrollTo({ left: target * cardStep(), behavior: wrap ? "auto" : "smooth" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;
    const onScroll = () => {
      const step = cardStep();
      setPage(Math.round(el.scrollLeft / step));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [videos.length]);

  useEffect(() => {
    if (paused || active || videos.length < 2) return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      goTo(page + 1);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [paused, active, page, videos.length]);

  const openVideo = (video: InstagramVideo) => {
    if (video.permalink || video.mediaUrl) {
      setActive(video);
    }
  };

  return (
    <Box
      component="section"
      id="instagram"
      sx={{
        py: { xs: 5.2, md: 6.5 },
        background: `linear-gradient(180deg, ${colors.forest} 0%, #0a3b31 100%)`,
        color: "#fff",
      }}
    >
      <Box sx={{ maxWidth: 1240, mx: "auto", px: { xs: 2.2, md: 3 } }}>
        <SectionHeading
          light
          title="Latest from Instagram"
          subtitle={`Fresh reels from ${site.instagramHandle}`}
        />

        {loading ? (
          <Typography sx={{ textAlign: "center", color: "rgba(255,255,255,0.8)" }}>
            Loading Instagram videos…
          </Typography>
        ) : null}

        {!loading && !configured ? (
          <Typography sx={{ textAlign: "center", color: "rgba(255,255,255,0.8)", maxWidth: 640, mx: "auto" }}>
            Instagram is not connected on this host. Add INSTAGRAM_ACCESS_TOKEN and
            INSTAGRAM_USER_ID in Vercel environment variables, then redeploy.
          </Typography>
        ) : null}

        {!loading && configured && error && videos.length === 0 ? (
          <Typography sx={{ textAlign: "center", color: "#ffd7d7" }}>
            {error}
          </Typography>
        ) : null}

        {!loading && videos.length > 0 ? (
          <Box
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setPaused(false);
              }
            }}
            sx={{ position: "relative" }}
          >
            {videos.length > 1 ? (
              <>
                <IconButton
                  aria-label="Previous Instagram video"
                  onClick={() => goTo(page - 1)}
                  sx={{
                    position: "absolute",
                    left: { xs: -6, md: -18 },
                    top: "42%",
                    zIndex: 2,
                    bgcolor: "rgba(255,255,255,0.94)",
                    color: colors.green,
                    boxShadow: "0 8px 18px rgba(0,0,0,0.22)",
                    "&:hover": { bgcolor: "#fff" },
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  aria-label="Next Instagram video"
                  onClick={() => goTo(page + 1)}
                  sx={{
                    position: "absolute",
                    right: { xs: -6, md: -18 },
                    top: "42%",
                    zIndex: 2,
                    bgcolor: "rgba(255,255,255,0.94)",
                    color: colors.green,
                    boxShadow: "0 8px 18px rgba(0,0,0,0.22)",
                    "&:hover": { bgcolor: "#fff" },
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </>
            ) : null}
            <Box
              ref={scrollerRef}
              data-ig-scroller
              sx={{
                display: "flex",
                gap: 1.5,
                overflowX: "auto",
                pb: 1.5,
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
            {videos.map((video) => {
              const thumb = video.thumbnailUrl || video.mediaUrl;
              return (
                <Box
                  key={video.id}
                  data-ig-card
                  component="button"
                  type="button"
                  onClick={() => openVideo(video)}
                  aria-label={video.caption?.slice(0, 80) || "Play Instagram video"}
                  sx={{
                    flex: "0 0 auto",
                    width: { xs: 220, sm: 240, md: 260 },
                    height: 420,
                    borderRadius: 3,
                    overflow: "hidden",
                    bgcolor: "#111",
                    cursor: "pointer",
                    scrollSnapAlign: "start",
                    position: "relative",
                    border: 0,
                    p: 0,
                    textAlign: "left",
                  }}
                >
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb}
                      alt={video.caption?.slice(0, 80) || "Instagram video"}
                      referrerPolicy="no-referrer"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : null}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "grid",
                      placeItems: "center",
                      background: "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.72) 100%)",
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.94)",
                        color: colors.green,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <PlayArrowIcon sx={{ fontSize: 34 }} />
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      position: "absolute",
                      left: 12,
                      right: 12,
                      bottom: 12,
                      fontSize: 12,
                      color: "#fff",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {video.caption?.trim() || "View on Instagram"}
                  </Typography>
                </Box>
              );
            })}
            </Box>
          </Box>
        ) : null}

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Link
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: colors.goldSoft,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: 0.8,
            }}
          >
            <InstagramIcon fontSize="small" />
            Follow {site.instagramHandle}
          </Link>
        </Box>
      </Box>

      {mounted && active
        ? createPortal(
            <Box
              onClick={() => setActive(null)}
              sx={{
                position: "fixed",
                inset: 0,
                zIndex: 2000,
                bgcolor: "rgba(8, 20, 16, 0.78)",
                display: "grid",
                placeItems: "center",
                p: { xs: 1.5, md: 3 },
              }}
            >
              <Box
                onClick={(event) => event.stopPropagation()}
                sx={{
                  position: "relative",
                  width: "min(380px, 92vw)",
                  height: "min(80vh, 680px)",
                  bgcolor: "#000",
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
                }}
              >
                <IconButton
                  onClick={() => setActive(null)}
                  sx={{ position: "absolute", top: 8, right: 8, zIndex: 2, color: "#fff" }}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <NativeReelPlayer key={active.id} video={active} />
              </Box>
            </Box>,
            document.body,
          )
        : null}
    </Box>
  );
}
