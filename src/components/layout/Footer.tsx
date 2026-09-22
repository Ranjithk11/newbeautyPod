import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createElement } from "react";
import { site, socialLinks } from "@/lib/content";
import { colors } from "@/theme/colors";
import Logo from "@/components/ui/Logo";
import NewsletterForm from "@/components/forms/NewsletterForm";

const quickLinks = [
  { label: "Shop Products", href: "/products" },
  { label: "For Retailers", href: "/#retailers" },
  { label: "For Brands", href: "/#brands" },
  { label: "Brands", href: "/#brand-partners" },
  { label: "Case Studies", href: "/#case-studies" },
];

const aboutLinks = [
  { label: "Our Technology", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: `mailto:${site.email}` },
];

const socialIcons = {
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
  Facebook: FacebookIcon,
} as const;

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: colors.footer,
        color: "rgba(255,255,255,0.86)",
        backgroundImage:
          "radial-gradient(circle at 12% 0%, rgba(196,163,90,0.16), transparent 34%), radial-gradient(circle at 90% 100%, rgba(8,127,91,0.28), transparent 40%)",
      }}
    >
      <Box
        sx={{
          maxWidth: 1240,
          mx: "auto",
          px: { xs: 2.5, md: 3 },
          py: 4.2,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            lg: "1.6fr 1fr 1fr .8fr 1.3fr",
          },
          gap: 3.75,
        }}
      >
        <Box sx={{ gridColumn: { xs: "1 / -1", lg: "auto" } }}>
          <Box sx={{ width: 200, lineHeight: 0, bgcolor: "#fff", borderRadius: 1.5, p: 1 }}>
            <Logo width={200} />
          </Box>
          <Typography sx={{ color: "rgba(255,255,255,0.72)", fontSize: 13, mt: 1.5 }}>
            {site.tagline}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" component="h4" sx={{ mb: 1.5, color: "#fff" }}>
            Quick Links
          </Typography>
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              sx={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.74)", my: 1 }}
            >
              {item.label}
            </Link>
          ))}
        </Box>
        <Box>
          <Typography variant="h4" component="h4" sx={{ mb: 1.5, color: "#fff" }}>
            About
          </Typography>
          {aboutLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              sx={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.74)", my: 1 }}
            >
              {item.label}
            </Link>
          ))}
        </Box>
        <Box>
          <Typography variant="h4" component="h4" sx={{ mb: 1.5, color: "#fff" }}>
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", gap: 1.2 }}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                sx={{
                  width: 30,
                  height: 30,
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "#fff",
                  transition: "transform 0.2s ease, background-color 0.2s ease, color 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    color: colors.goldSoft,
                    bgcolor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                {createElement(socialIcons[social.label], { sx: { fontSize: 16 } })}
              </IconButton>
            ))}
          </Box>
        </Box>
        <Box>
          <Typography variant="h4" component="h4" sx={{ mb: 1.5, color: "#fff" }}>
            Stay Updated
          </Typography>
          <NewsletterForm />
        </Box>
      </Box>
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.12)",
          maxWidth: 1240,
          mx: "auto",
          px: { xs: 2.5, md: 3 },
          py: 1.75,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          gap: 1,
          color: "rgba(255,255,255,0.62)",
          fontSize: 11,
        }}
      >
        <Typography sx={{ fontSize: 11 }}>
          © 2026 BeautyPod by Leaf Water. All rights reserved.
        </Typography>
        <Box>
          <Link href="/terms" sx={{ color: "inherit" }}>
            Terms
          </Link>
          {"  |  "}
          <Link href="/privacy" sx={{ color: "inherit" }}>
            Privacy
          </Link>
          {"  |  "}
          <Link href="/cookies" sx={{ color: "inherit" }}>
            Cookies
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
