"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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

function instagramEmbedSrc(permalink: string) {
  return `${permalink.split("?")[0].replace(/\/$/, "")}/embed`;
}

export default function InstagramVideos() {
  const [videos, setVideos] = useState<InstagramVideo[]>([]);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<InstagramVideo | null>(null);
  const [mounted, setMounted] = useState(false);

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
            sx={{
              display: "flex",
              gap: 1.5,
              overflowX: "auto",
              pb: 1.5,
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": { height: 8 },
              "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.28)", borderRadius: 99 },
            }}
          >
            {videos.map((video) => {
              const thumb = video.thumbnailUrl || video.mediaUrl;
              return (
                <Box
                  key={video.id}
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
                {active.permalink ? (
                  <Box
                    component="iframe"
                    src={instagramEmbedSrc(active.permalink)}
                    title={active.caption || "Instagram reel"}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    sx={{ width: "100%", height: "100%", border: 0 }}
                  />
                ) : (
                  <video
                    key={active.id}
                    src={active.mediaUrl || undefined}
                    poster={active.thumbnailUrl || undefined}
                    controls
                    autoPlay
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                      objectFit: "contain",
                      background: "#000",
                    }}
                  />
                )}
              </Box>
            </Box>,
            document.body,
          )
        : null}
    </Box>
  );
}
