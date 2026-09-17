"use client";

import { FormEvent, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {
  interestOptions,
  locationCountOptions,
  timelineOptions,
} from "@/lib/content";
import {
  emptyLeadForm,
  validateLeadForm,
  type FieldErrors,
  type LeadFormValues,
} from "@/lib/validation";

type LeadCaptureFormProps = {
  onSuccess?: () => void;
};

export default function LeadCaptureForm({ onSuccess }: LeadCaptureFormProps) {
  const [values, setValues] = useState<LeadFormValues>(emptyLeadForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState(false);

  const setField = <K extends keyof LeadFormValues>(key: K, value: LeadFormValues[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (errors[key]) {
      const nextErrors = validateLeadForm(next);
      setErrors((current) => ({ ...current, [key]: nextErrors[key] }));
    }
  };

  const toggleInterest = (option: string) => {
    const interests = values.interests.includes(option)
      ? values.interests.filter((item) => item !== option)
      : [...values.interests, option];
    setField("interests", interests);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLeadForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setSuccess(false);
      return;
    }
    setSuccess(true);
    setValues(emptyLeadForm());
    onSuccess?.();
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Stack spacing={2}>
        <TextField
          label="Name"
          name="name"
          value={values.name}
          onChange={(event) => setField("name", event.target.value)}
          error={Boolean(errors.name)}
          helperText={errors.name}
          required
          fullWidth
          autoComplete="name"
        />
        <TextField
          label="Company"
          name="company"
          value={values.company}
          onChange={(event) => setField("company", event.target.value)}
          error={Boolean(errors.company)}
          helperText={errors.company}
          required
          fullWidth
          autoComplete="organization"
        />
        <TextField
          label="Designation"
          name="designation"
          value={values.designation}
          onChange={(event) => setField("designation", event.target.value)}
          error={Boolean(errors.designation)}
          helperText={errors.designation}
          required
          fullWidth
          autoComplete="organization-title"
        />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={(event) => setField("phone", event.target.value)}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          required
          fullWidth
          autoComplete="tel"
          slotProps={{ htmlInput: { inputMode: "tel" } }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) => setField("email", event.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
          required
          fullWidth
          autoComplete="email"
        />

        <FormControl error={Boolean(errors.interests)} component="fieldset">
          <FormLabel component="legend">Interested in</FormLabel>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              mt: 0.5,
            }}
          >
            {interestOptions.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={values.interests.includes(option)}
                    onChange={() => toggleInterest(option)}
                    name="interests"
                  />
                }
                label={option}
              />
            ))}
          </Box>
          {errors.interests ? <FormHelperText>{errors.interests}</FormHelperText> : null}
        </FormControl>

        <FormControl error={Boolean(errors.locations)}>
          <FormLabel id="locations-label">Number of locations</FormLabel>
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
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
          {errors.locations ? <FormHelperText>{errors.locations}</FormHelperText> : null}
        </FormControl>

        <FormControl error={Boolean(errors.timeline)}>
          <FormLabel id="timeline-label">Expected timeline</FormLabel>
          <RadioGroup
            aria-labelledby="timeline-label"
            name="timeline"
            value={values.timeline}
            onChange={(event) => setField("timeline", event.target.value)}
          >
            {timelineOptions.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
          {errors.timeline ? <FormHelperText>{errors.timeline}</FormHelperText> : null}
        </FormControl>

        {success ? (
          <Alert severity="success">
            Enquiry submitted. Our team will contact you shortly.
          </Alert>
        ) : null}

        <Button type="submit" variant="contained" size="large">
          Submit Enquiry
        </Button>
      </Stack>
    </Box>
  );
}
