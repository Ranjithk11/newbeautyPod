"use client";

import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { faqs } from "@/lib/content";
import { colors } from "@/theme/colors";

const faqItems = faqs.map((item, index) => ({ ...item, index }));
const faqColumns = [faqItems.slice(0, 5), faqItems.slice(5)];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Box
      component="section"
      id="faq"
      sx={{
        py: { xs: 3.25, md: 4 },
        px: { xs: 2.2, md: 3 },
        background: `linear-gradient(180deg, ${colors.cream} 0%, #efe9d6 100%)`,
      }}
    >
      <Box
        sx={{
          maxWidth: 1240,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(220px, 260px) 1fr" },
          overflow: "hidden",
          borderRadius: { xs: "16px", md: "20px" },
          border: `1px solid ${colors.gold}66`,
          boxShadow: "0 16px 36px rgba(13, 68, 54, 0.08)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            px: { xs: 2.2, md: 3 },
            py: { xs: 1.85, md: 3.25 },
            color: "#fff",
            background: `linear-gradient(160deg, ${colors.dark} 0%, ${colors.forest} 55%, ${colors.green} 140%)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: { xs: 1.1, md: 1.5 },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 170,
              height: 170,
              right: -48,
              top: -56,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${colors.gold}40 0%, transparent 68%)`,
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: 120,
              height: 120,
              left: -40,
              bottom: -40,
              borderRadius: "50%",
              border: `1px solid ${colors.gold}33`,
              pointerEvents: "none",
            }}
          />
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                mb: 0.8,
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: colors.gold, letterSpacing: "0.32em", display: "block" }}
              >
                QUESTIONS
              </Typography>
              <Typography
                sx={{
                  display: { xs: "block", md: "none" },
                  color: colors.goldSoft,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                }}
              >
                10 · ESSENTIALS
              </Typography>
            </Box>
            <Typography
              variant="h2"
              component="h2"
              sx={{ color: "#fff", fontSize: { xs: 26, md: 34 }, lineHeight: 1, mb: 1.05 }}
            >
              FAQ
            </Typography>
            <Box sx={{ width: 42, height: 2, bgcolor: colors.gold, mb: 1.1 }} />
            <Typography sx={{ m: 0, color: "rgba(246,244,233,0.88)", fontSize: 14, lineHeight: 1.45 }}>
              Your questions, answered
            </Typography>
          </Box>
          <Typography
            sx={{
              display: { xs: "none", md: "block" },
              position: "relative",
              color: colors.goldSoft,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.16em",
            }}
          >
            10 · ESSENTIALS
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: "#fffdf6",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          }}
        >
          {faqColumns.map((column, columnIndex) => (
            <Box
              key={columnIndex}
              sx={{
                borderLeft: {
                  xs: "none",
                  lg: columnIndex === 1 ? `1px solid ${colors.gold}30` : "none",
                },
                borderTop: {
                  xs: columnIndex === 1 ? `1px solid ${colors.gold}30` : "none",
                  lg: "none",
                },
              }}
            >
              {column.map((item, itemIndex) => {
                const isOpen = openIndex === item.index;
                const panelId = `faq-panel-${item.index}`;
                const headerId = `faq-header-${item.index}`;
                const isLast = itemIndex === column.length - 1;

                return (
                  <Box
                    key={item.q}
                    sx={{
                      borderBottom: isLast ? "none" : `1px solid ${colors.gold}26`,
                      bgcolor: isOpen ? "rgba(8,127,91,0.055)" : "transparent",
                      boxShadow: isOpen ? `inset 3px 0 0 ${colors.gold}` : "inset 3px 0 0 transparent",
                      transition: "background-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                  >
                    <Box
                      component="button"
                      type="button"
                      id={headerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : item.index)}
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.25,
                        px: { xs: 1.6, md: 2 },
                        py: { xs: 1.15, md: 1.25 },
                        border: 0,
                        bgcolor: "transparent",
                        cursor: "pointer",
                        textAlign: "left",
                        font: "inherit",
                        color: "inherit",
                        "&:hover .faq-q": { color: colors.green },
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          flexShrink: 0,
                          minWidth: 22,
                          color: colors.gold,
                          fontSize: 11,
                          fontWeight: 800,
                          letterSpacing: "0.08em",
                        }}
                      >
                        {String(item.index + 1).padStart(2, "0")}
                      </Typography>
                      <Typography
                        className="faq-q"
                        component="span"
                        sx={{
                          flex: 1,
                          fontWeight: 700,
                          fontSize: { xs: 13.5, md: 14.5 },
                          lineHeight: 1.35,
                          color: colors.dark,
                          transition: "color 0.2s ease",
                        }}
                      >
                        {item.q}
                      </Typography>
                      <Box
                        sx={{
                          width: 22,
                          height: 22,
                          flexShrink: 0,
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                          bgcolor: isOpen ? colors.green : "rgba(196,163,90,0.14)",
                          color: isOpen ? "#fff" : colors.gold,
                          transition: "background-color 0.2s ease, color 0.2s ease",
                        }}
                      >
                        {isOpen ? <RemoveIcon sx={{ fontSize: 15 }} /> : <AddIcon sx={{ fontSize: 15 }} />}
                      </Box>
                    </Box>
                    <Collapse in={isOpen}>
                      <Box
                        id={panelId}
                        role="region"
                        aria-labelledby={headerId}
                        sx={{ px: { xs: 1.6, md: 2 }, pl: { xs: 5, md: 5.5 }, pb: 1.35 }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: colors.muted, fontSize: 13, lineHeight: 1.55 }}
                        >
                          {item.a}
                        </Typography>
                      </Box>
                    </Collapse>
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
