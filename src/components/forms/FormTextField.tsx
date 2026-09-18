"use client";

import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material/TextField";

export default function FormTextField({ slotProps, sx, label, ...props }: TextFieldProps) {
  const showLabel = Boolean(label);

  return (
    <TextField
      variant="outlined"
      fullWidth
      size="small"
      label={label}
      {...props}
      slotProps={{
        ...slotProps,
        inputLabel: {
          shrink: showLabel,
          ...slotProps?.inputLabel,
        },
        input: {
          notched: false,
          ...slotProps?.input,
        },
      }}
      sx={{
        ...(showLabel
          ? {
              "& .MuiInputLabel-root": {
                position: "relative",
                transform: "none !important",
                maxWidth: "100%",
                fontSize: 13,
                fontWeight: 600,
                lineHeight: 1.2,
                mb: 0.75,
                color: "text.primary",
                pointerEvents: "none",
              },
              "& .MuiInputLabel-asterisk": {
                color: "text.primary",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                top: 0,
              },
              "& .MuiOutlinedInput-notchedOutline legend": {
                display: "none",
                width: 0,
                padding: 0,
              },
            }
          : {
              "& .MuiInputLabel-root": {
                display: "none",
              },
            }),
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#fff",
          minHeight: 44,
          alignItems: "center",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        },
        "& .MuiOutlinedInput-root.Mui-focused": {
          boxShadow: "0 0 0 3px rgba(8,127,91,0.12)",
        },
        "& .MuiOutlinedInput-input": {
          py: "11px",
          px: 1.5,
          height: 22,
          boxSizing: "content-box",
          lineHeight: "22px",
          "&::placeholder": {
            opacity: 0.72,
            color: "text.secondary",
          },
        },
        "& .MuiFormHelperText-root": {
          mx: 0,
          mt: 0.5,
        },
        ...sx,
      }}
    />
  );
}
