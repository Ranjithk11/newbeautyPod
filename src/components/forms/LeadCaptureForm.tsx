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
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  interestOptions,
  locationCountOptions,
  timelineOptions,
} from "@/lib/content";
import { submitEnquiry } from "@/lib/submitEnquiry";
import {
  emptyLeadForm,
  validateLeadForm,
  type FieldErrors,
  type LeadFormValues,
} from "@/lib/validation";
import { colors } from "@/theme/colors";
import FormTextField from "./FormTextField";

export type LeadSuccessDetails = {
  name: string;
  email: string;
  phone: string;
};

type LeadCaptureFormProps = {
  onSuccess?: (details: LeadSuccessDetails) => void;
};

export default function LeadCaptureForm({ onSuccess }: LeadCaptureFormProps) {
  const [values, setValues] = useState<LeadFormValues>(emptyLeadForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [phonePopupOpen, setPhonePopupOpen] = useState(false);

  const setField = <K extends keyof LeadFormValues>(key: K, value: LeadFormValues[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (errors[key]) {
      const nextErrors = validateLeadForm(next);
      setErrors((current) => ({ ...current, [key]: nextErrors[key] }));
    }
  };

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
      const nextErrors = validateLeadForm({ ...values, phone: cleaned });
      setErrors((current) => ({ ...current, phone: nextErrors.phone }));
    }
  };

  const toggleInterest = (option: string) => {
    const interests = values.interests.includes(option)
      ? values.interests.filter((item) => item !== option)
      : [...values.interests, option];
    setField("interests", interests);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLeadForm(values);
    setErrors(nextErrors);
    setSubmitError(undefined);
    if (nextErrors.phone) {
      setPhonePopupOpen(true);
    }
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    try {
      const details = {
        name: values.name.trim(),
        company: values.company.trim(),
        designation: values.designation.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        interests: values.interests,
        locations: values.locations,
        timeline: values.timeline,
      };
      await submitEnquiry({
        formType: "demo",
        ...details,
      });
      setValues(emptyLeadForm());
      onSuccess?.({ name: details.name, email: details.email, phone: details.phone });
    } catch {
      setSubmitError("Could not send your details. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Stack spacing={2}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 1.75,
          }}
        >
          <FormTextField
            label="Name"
            name="name"
            placeholder="Enter your name"
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name}
            required
            autoComplete="name"
          />
          <FormTextField
            label="Company"
            name="company"
            placeholder="Enter your company"
            value={values.company}
            onChange={(event) => setField("company", event.target.value)}
            error={Boolean(errors.company)}
            helperText={errors.company}
            required
            autoComplete="organization"
          />
          <FormTextField
            label="Designation"
            name="designation"
            placeholder="Enter your designation"
            value={values.designation}
            onChange={(event) => setField("designation", event.target.value)}
            error={Boolean(errors.designation)}
            helperText={errors.designation}
            required
            autoComplete="organization-title"
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
          <Box sx={{ gridColumn: { sm: "1 / -1" } }}>
            <FormTextField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={(event) => setField("email", event.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
              required
              autoComplete="email"
            />
          </Box>
        </Box>

        <FormControl error={Boolean(errors.interests)} component="fieldset">
          <FormLabel component="legend" sx={{ fontWeight: 700, fontSize: 13, mb: 1, color: colors.text }}>
            Interested in
          </FormLabel>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {interestOptions.map((option) => {
              const selected = values.interests.includes(option);
              return (
                <Box
                  key={option}
                  component="button"
                  type="button"
                  onClick={() => toggleInterest(option)}
                  sx={{
                    border: selected ? `1px solid ${colors.green}` : `1px solid ${colors.border}`,
                    bgcolor: selected ? "rgba(8,127,91,0.12)" : "#fff",
                    color: colors.dark,
                    borderRadius: "999px",
                    px: 1.4,
                    py: 0.7,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {option}
                </Box>
              );
            })}
          </Box>
          {errors.interests ? <FormHelperText>{errors.interests}</FormHelperText> : null}
        </FormControl>

        <FormControl error={Boolean(errors.locations)}>
          <FormLabel id="locations-label" sx={{ fontWeight: 700, fontSize: 13, color: colors.text }}>
            Number of locations
          </FormLabel>
          <RadioGroup
            aria-labelledby="locations-label"
            name="locations"
            value={values.locations}
            onChange={(event) => setField("locations", event.target.value)}
            row
          >
            {locationCountOptions.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio size="small" />}
                label={option}
              />
            ))}
          </RadioGroup>
          {errors.locations ? <FormHelperText>{errors.locations}</FormHelperText> : null}
        </FormControl>

        <FormControl error={Boolean(errors.timeline)}>
          <FormLabel id="timeline-label" sx={{ fontWeight: 700, fontSize: 13, color: colors.text }}>
            Expected timeline
          </FormLabel>
          <RadioGroup
            aria-labelledby="timeline-label"
            name="timeline"
            value={values.timeline}
            onChange={(event) => setField("timeline", event.target.value)}
            row
          >
            {timelineOptions.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio size="small" />}
                label={option}
              />
            ))}
          </RadioGroup>
          {errors.timeline ? <FormHelperText>{errors.timeline}</FormHelperText> : null}
        </FormControl>

        {submitError ? <Alert severity="error">{submitError}</Alert> : null}

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : null}
          sx={{ py: 1.4, fontSize: 15, letterSpacing: 0.2 }}
        >
          {submitting ? "Sending..." : "Continue to schedule"}
        </Button>
      </Stack>

      <Dialog
        open={phonePopupOpen}
        onClose={() => setPhonePopupOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          root: { sx: { zIndex: 1500 } },
        }}
      >
        <DialogTitle id="phone-alert-title" sx={{ textAlign: "center", pb: 0.5 }}>
          Invalid phone number
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ textAlign: "center", pt: 1 }}>
            Please enter a valid number
          </Typography>
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
