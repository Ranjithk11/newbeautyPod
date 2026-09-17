import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createElement } from "react";
import { site } from "@/lib/content";
import { colors } from "@/theme/colors";
import Logo from "@/components/ui/Logo";
import NewsletterForm from "@/components/forms/NewsletterForm";

const quickLinks = [
  { label: "For Retailers", href: "/#retailers" },
  { label: "For Brands", href: "/#brands" },
  { label: "Locations", href: "/#locations" },
  { label: "Case Studies", href: "/#case-studies" },
];

const aboutLinks = [
  { label: "Our Technology", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: `mailto:${site.email}` },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: LinkedInIcon },
  { label: "Instagram", href: "https://www.instagram.com/", icon: InstagramIcon },
  { label: "YouTube", href: "https://www.youtube.com/", icon: YouTubeIcon },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "#fff" }}>
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
          <Logo width={180} />
          <Typography sx={{ color: "text.secondary", fontSize: 13, mt: 1 }}>
            {site.tagline}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" component="h4" sx={{ mb: 1.5 }}>
            Quick Links
          </Typography>
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              sx={{ display: "block", fontSize: 12, color: "#52635e", my: 1 }}
            >
              {item.label}
            </Link>
          ))}
        </Box>
        <Box>
          <Typography variant="h4" component="h4" sx={{ mb: 1.5 }}>
            About
          </Typography>
          {aboutLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              sx={{ display: "block", fontSize: 12, color: "#52635e", my: 1 }}
            >
              {item.label}
            </Link>
          ))}
        </Box>
        <Box>
          <Typography variant="h4" component="h4" sx={{ mb: 1.5 }}>
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", gap: 1.2 }}>
            {socials.map((social) => (
              <IconButton
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                sx={{
                  width: 30,
                  height: 30,
                  border: "1px solid #d5dfda",
                  color: colors.text,
                }}
              >
                {createElement(social.icon, { sx: { fontSize: 16 } })}
              </IconButton>
            ))}
          </Box>
        </Box>
        <Box>
          <Typography variant="h4" component="h4" sx={{ mb: 1.5 }}>
            Stay Updated
          </Typography>
          <NewsletterForm />
        </Box>
      </Box>
      <Box
        sx={{
          borderTop: "1px solid #e3e9e6",
          maxWidth: 1240,
          mx: "auto",
          px: { xs: 2.5, md: 3 },
          py: 1.75,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          gap: 1,
          color: "#71807b",
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
