"use client";

import { FormEvent, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { submitEnquiry } from "@/lib/submitEnquiry";
import { validateEmail } from "@/lib/validation";
import FormTextField from "./FormTextField";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextError = validateEmail(email);
    setError(nextError);
    setSuccess(false);
    if (nextError) return;

    setSubmitting(true);
    try {
      await submitEnquiry({
        formType: "newsletter",
        email: email.trim(),
      });
      setSuccess(true);
      setEmail("");
    } catch {
      setError("Could not subscribe. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "flex-start" },
        }}
      >
        <FormTextField
          type="email"
          name="email"
          placeholder="Email *"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError(validateEmail(event.target.value));
          }}
          error={Boolean(error)}
          helperText={error}
          required
          autoComplete="email"
          aria-label="Email"
          sx={{ flex: 1, minWidth: 0 }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={14} color="inherit" /> : null}
          sx={{
            px: 2,
            fontSize: 13,
            minWidth: 118,
            height: 44,
            flexShrink: 0,
          }}
        >
          {submitting ? "Sending..." : "Subscribe"}
        </Button>
      </Box>
      {success ? (
        <Alert severity="success" sx={{ mt: 1, width: "100%" }}>
          You are subscribed. Thank you.
        </Alert>
      ) : null}
    </Box>
  );
}
