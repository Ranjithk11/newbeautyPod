"use client";

import { useMemo, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DEMO_DAYS_AHEAD, DEMO_TIME_SLOTS, DEMO_TIMEZONE } from "@/lib/demoSlots";
import { submitEnquiry } from "@/lib/submitEnquiry";
import { colors } from "@/theme/colors";

type DemoSlotPickerProps = {
  name: string;
  email: string;
  phone: string;
  onScheduled?: () => void;
};

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDayLabel(date: Date) {
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: DEMO_TIMEZONE,
  });
}

function istNow() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: DEMO_TIMEZONE }));
}

export default function DemoSlotPicker({
  name,
  email,
  phone,
  onScheduled,
}: DemoSlotPickerProps) {
  const days = useMemo(() => {
    const start = istNow();
    start.setHours(0, 0, 0, 0);
    return Array.from({ length: DEMO_DAYS_AHEAD }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return date;
    });
  }, []);

  const [selectedDate, setSelectedDate] = useState(dateKey(days[0]));
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const now = istNow();
  const selected = days.find((day) => dateKey(day) === selectedDate) ?? days[0];
  const isToday = dateKey(selected) === dateKey(now);

  const onConfirm = async () => {
    const slot = DEMO_TIME_SLOTS.find((item) => item.id === selectedSlot);
    if (!slot) {
      setError("Please choose a time slot.");
      return;
    }

    setSubmitting(true);
    setError(undefined);
    try {
      await submitEnquiry({
        formType: "calendly",
        name,
        email,
        phone,
        date: selectedDate,
        slot: slot.label,
        timezone: DEMO_TIMEZONE,
        request: `Book BeautyPod demo on ${selectedDate} ${slot.label} IST`,
      });
      onScheduled?.();
    } catch {
      setError("Could not book this slot. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={2.25}>
      <Typography sx={{ color: colors.muted, fontSize: 14 }}>
        Choose a 2-hour window between 7:00 AM and 7:00 PM IST.
      </Typography>

      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 1, color: colors.heading }}>
          Date
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            pb: 0.5,
            "&::-webkit-scrollbar": { height: 6 },
            "&::-webkit-scrollbar-thumb": { bgcolor: colors.border, borderRadius: 99 },
          }}
        >
          {days.map((day) => {
            const key = dateKey(day);
            const active = key === selectedDate;
            return (
              <Button
                key={key}
                type="button"
                variant={active ? "contained" : "outlined"}
                onClick={() => {
                  setSelectedDate(key);
                  setSelectedSlot("");
                }}
                sx={{
                  flex: "0 0 auto",
                  minWidth: 92,
                  px: 1.25,
                  py: 1.1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: 13,
                  lineHeight: 1.25,
                  bgcolor: active ? colors.green : colors.white,
                  color: active ? colors.white : colors.heading,
                  borderColor: active ? colors.green : colors.border,
                }}
              >
                {formatDayLabel(day)}
              </Button>
            );
          })}
        </Box>
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 1, color: colors.heading }}>
          Time slot
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 1,
          }}
        >
          {DEMO_TIME_SLOTS.map((slot) => {
            const past = isToday && now.getHours() >= slot.startHour + 2;
            const active = selectedSlot === slot.id;
            return (
              <Button
                key={slot.id}
                type="button"
                disabled={past}
                variant={active ? "contained" : "outlined"}
                onClick={() => setSelectedSlot(slot.id)}
                sx={{
                  py: 1.35,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 700,
                  justifyContent: "flex-start",
                  bgcolor: active ? colors.green : colors.white,
                  color: active ? colors.white : colors.heading,
                  borderColor: active ? colors.green : colors.border,
                  "&.Mui-disabled": { opacity: 0.4 },
                }}
              >
                {slot.label}
              </Button>
            );
          })}
        </Box>
      </Box>

      {error ? <Alert severity="error">{error}</Alert> : null}

      <Button
        variant="contained"
        size="large"
        disabled={submitting || !selectedSlot}
        onClick={() => void onConfirm()}
        startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : null}
      >
        {submitting ? "Booking..." : "Confirm demo slot"}
      </Button>
    </Stack>
  );
}
