"use client";

import { Fragment, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { faqs } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Box
      component="section"
      id="faq"
      sx={{ py: { xs: 2, md: 3 }, px: { xs: 2.2, md: 3 }, bgcolor: "#fbfbf7" }}
    >
      <Box sx={{ maxWidth: 860, mx: "auto" }}>
        <SectionHeading title="FAQ" subtitle="Your questions, answered" />
        {faqs.map((item, index) => {
          const panelId = `faq-panel-${index}`;
          const headerId = `faq-header-${index}`;
          const isOpen = openIndex === index;
          return (
            <Fragment key={item.q}>
              <Box
                sx={{
                  mb: 1,
                  border: "1px solid #e7ece8",
                  borderRadius: "8px",
                  bgcolor: "#fff",
                  transition: "box-shadow 0.25s ease, transform 0.25s ease",
                  "&:hover": {
                    boxShadow: "0 8px 18px rgba(16,44,39,0.08)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box
                  component="button"
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    px: 2,
                    py: 1.5,
                    border: 0,
                    bgcolor: "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    font: "inherit",
                    color: "inherit",
                  }}
                >
                  <Typography component="span" sx={{ fontWeight: 700, fontSize: 15 }}>
                    {item.q}
                  </Typography>
                  <ExpandMoreIcon
                    sx={{
                      color: "text.secondary",
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </Box>
                <Collapse in={isOpen}>
                  <Box id={panelId} role="region" aria-labelledby={headerId} sx={{ px: 2, pb: 2 }}>
                    <Typography variant="body2">{item.a}</Typography>
                  </Box>
                </Collapse>
              </Box>
            </Fragment>
          );
        })}
      </Box>
    </Box>
  );
}
