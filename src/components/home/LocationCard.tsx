import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { colors } from "@/theme/colors";
import AppIcon from "@/components/ui/AppIcon";
import type { IconName } from "@/components/ui/AppIcon";

type LocationCardProps = {
  image: string;
  name: string;
  icon: string;
};

export default function LocationCard({ image, name, icon }: LocationCardProps) {
  return (
    <Box
      component="article"
      sx={{
        transition: "transform 0.25s ease",
        "&:hover": { transform: "translateY(-4px)" },
        "&:hover img": { transform: "scale(1.06)" },
      }}
    >
      <Box sx={{ position: "relative", aspectRatio: "1.25", borderRadius: "9px", overflow: "hidden" }}>
        <Image
          src={image}
          alt={`${name} BeautyPod deployment`}
          fill
          sizes="(max-width: 760px) 50vw, 12vw"
          style={{ objectFit: "cover", transition: "transform 0.45s ease" }}
        />
      </Box>
      <Box
        sx={{
          minHeight: 55,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.6,
          textAlign: "center",
          fontWeight: 700,
          color: colors.text,
        }}
      >
        <AppIcon name={icon as IconName} sx={{ fontSize: 21, color: colors.green }} />
        <Typography sx={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>
          {name}
        </Typography>
      </Box>
    </Box>
  );
}
