"use client";

import DemoSlotPicker from "./DemoSlotPicker";

type CalendlyEmbedProps = {
  name: string;
  email: string;
  phone: string;
  onScheduled?: () => void;
};

/** Replaced the blank Calendly iframe with 2-hour slots from 7 AM to 7 PM IST. */
export default function CalendlyEmbed(props: CalendlyEmbedProps) {
  return <DemoSlotPicker {...props} />;
}
