"use client";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { navLinks } from "@/lib/content";
import { colors } from "@/theme/colors";
import { useDemoDialog } from "@/components/providers/DemoDialogProvider";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const { openDemo } = useDemoDialog();

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            top: { xs: 76, md: 88 },
            bgcolor: colors.header,
            color: colors.gold,
            boxShadow: "0 15px 30px rgba(0,0,0,.12)",
          },
        },
      }}
    >
      <Stack component="nav" aria-label="Mobile" sx={{ px: 2.5, pt: 1, pb: 2.5 }}>
        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <IconButton aria-label="Close menu" onClick={onClose} sx={{ color: colors.gold }}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {navLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            sx={{
              py: 1.25,
              fontWeight: 500,
              fontSize: 15,
              color: colors.white,
              borderBottom: `1px solid rgba(255,255,255,0.18)`,
              transition: "color 0.2s ease",
              "&:hover": { color: colors.gold },
            }}
          >
            {item.label}
          </Link>
        ))}
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => {
            onClose();
            openDemo();
          }}
        >
          Book a Demo
        </Button>
      </Stack>
    </Drawer>
  );
}
