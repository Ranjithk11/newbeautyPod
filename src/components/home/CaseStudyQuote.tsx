import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function CaseStudyQuote() {
  return (
    <Box
      component="blockquote"
      sx={{
        m: { xs: "0 18px 28px", md: 3.75 },
        alignSelf: "center",
        bgcolor: "#fff",
        borderRadius: "12px",
        p: 3.5,
        color: "#314b44",
        lineHeight: 1.55,
        boxShadow: "0 8px 30px rgba(0,0,0,.06)",
      }}
    >
      <FormatQuoteIcon sx={{ color: "#087f5b", mb: 1 }} />
      <Typography component="p" sx={{ fontSize: { xs: 15, md: 16 } }}>
        “BeautyPod has created a unique and memorable experience for our
        passengers. It&apos;s innovative, engaging and perfectly suited for
        today&apos;s travellers.”
      </Typography>
      <Typography
        component="footer"
        sx={{ mt: 2.5, fontSize: 12, fontWeight: 700 }}
      >
        — Airport Partner
      </Typography>
    </Box>
  );
}
