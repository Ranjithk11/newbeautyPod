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
            top: { xs: 66, md: 76 },
            boxShadow: "0 15px 30px rgba(0,0,0,.12)",
          },
        },
      }}
    >
      <Stack component="nav" aria-label="Mobile" sx={{ px: 2.5, pt: 1, pb: 2.5 }}>
        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <IconButton aria-label="Close menu" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {navLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            sx={{
              py: 1.5,
              fontWeight: 700,
              fontSize: 14,
              borderBottom: `1px solid ${colors.border}`,
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
