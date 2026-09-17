import { createElement } from "react";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LocalPharmacyOutlinedIcon from "@mui/icons-material/LocalPharmacyOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const iconMap = {
  eco: SpaOutlinedIcon,
  sparkle: AutoAwesomeOutlinedIcon,
  bag: ShoppingBagOutlinedIcon,
  chart: BarChartOutlinedIcon,
  scan: CameraAltOutlinedIcon,
  analyse: MemoryOutlinedIcon,
  recommend: ScienceOutlinedIcon,
  purchase: ShoppingCartOutlinedIcon,
  plane: FlightTakeoffOutlinedIcon,
  mall: LocalMallOutlinedIcon,
  hotel: HotelOutlinedIcon,
  store: StorefrontOutlinedIcon,
  pharmacy: LocalPharmacyOutlinedIcon,
  corporate: BusinessOutlinedIcon,
  gym: FitnessCenterOutlinedIcon,
  university: SchoolOutlinedIcon,
  users: GroupsOutlinedIcon,
  target: TrackChangesOutlinedIcon,
  insights: InsightsOutlinedIcon,
  clock: AccessTimeOutlinedIcon,
  support: SettingsOutlinedIcon,
  gem: DiamondOutlinedIcon,
  cart: ShoppingCartOutlinedIcon,
  rupee: CurrencyRupeeOutlinedIcon,
  managed: SettingsOutlinedIcon,
  handshake: HandshakeOutlinedIcon,
  stats: QueryStatsOutlinedIcon,
} as const;

export type IconName = keyof typeof iconMap;

type AppIconProps = SvgIconProps & { name: IconName };

export default function AppIcon({ name, ...props }: AppIconProps) {
  return createElement(iconMap[name], props);
}
