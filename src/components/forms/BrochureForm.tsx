"use client";

import { FormEvent, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { submitEnquiry } from "@/lib/submitEnquiry";
import {
  validateBrochureForm,
  validatePhone,
  type BrochureFormValues,
} from "@/lib/validation";
import FormTextField from "./FormTextField";

type BrochureFormProps = {
  onSuccess?: (emailed: boolean) => void;
};

export default function BrochureForm({ onSuccess }: BrochureFormProps) {
  const [values, setValues] = useState<BrochureFormValues>({ email: "", phone: "" });
  const [errors, setErrors] = useState<Partial<BrochureFormValues>>({});
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [phonePopupOpen, setPhonePopupOpen] = useState(false);

  const onPhoneChange = (value: string) => {
    const hasLetters = /[A-Za-z]/.test(value);
    const cleaned = value.replace(/[^\d+\s-]/g, "");
    setValues((current) => ({ ...current, phone: cleaned }));
    if (hasLetters) {
      setPhonePopupOpen(true);
      setErrors((current) => ({ ...current, phone: "Please enter a valid number" }));
      return;
    }
    if (errors.phone) {
      setErrors((current) => ({ ...current, phone: validatePhone(cleaned) }));
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateBrochureForm(values);
    setErrors(nextErrors);
    setSubmitError(undefined);
    if (nextErrors.phone) setPhonePopupOpen(true);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "brochure",
          email: values.email.trim(),
          phone: values.phone.trim(),
          request: "Download BeautyPod brochure",
        } satisfies Parameters<typeof submitEnquiry>[0]),
      });
      const json = (await response.json()) as {
        ok?: boolean;
        sent?: boolean;
        error?: string;
      };
      if (!response.ok || !json.ok) {
        throw new Error(
          json.error || "Could not send your details. Please try again.",
        );
      }
      onSuccess?.(Boolean(json.sent ?? json.ok));
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Could not send your details. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Stack spacing={2}>
        <FormTextField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={(event) => {
            setValues((current) => ({ ...current, email: event.target.value }));
            if (errors.email) {
              const next = validateBrochureForm({ ...values, email: event.target.value });
              setErrors((current) => ({ ...current, email: next.email }));
            }
          }}
          error={Boolean(errors.email)}
          helperText={errors.email}
          required
          autoComplete="email"
        />
        <FormTextField
          label="Phone"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={values.phone}
          onChange={(event) => onPhoneChange(event.target.value)}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          required
          autoComplete="tel"
          slotProps={{ htmlInput: { inputMode: "numeric", maxLength: 18 } }}
        />
        {submitError ? <Alert severity="error">{submitError}</Alert> : null}
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {submitting ? "Sending..." : "Download brochure"}
        </Button>
      </Stack>

      <Dialog
        open={phonePopupOpen}
        onClose={() => setPhonePopupOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{ root: { sx: { zIndex: 1500 } } }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 0.5 }}>Invalid phone number</DialogTitle>
        <DialogContent>
          <Typography sx={{ textAlign: "center", pt: 1 }}>Please enter a valid number</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2.2 }}>
          <Button variant="contained" onClick={() => setPhonePopupOpen(false)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
