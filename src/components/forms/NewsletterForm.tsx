"use client";

import { FormEvent, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { validateEmail } from "@/lib/validation";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextError = validateEmail(email);
    setError(nextError);
    setSuccess(!nextError);
    if (!nextError) setEmail("");
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Box sx={{ display: "flex", gap: 0.6, flexDirection: { xs: "column", md: "row" } }}>
        <TextField
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError(validateEmail(event.target.value));
          }}
          error={Boolean(error)}
          helperText={error}
          required
          fullWidth
          autoComplete="email"
          slotProps={{ htmlInput: { "aria-label": "Email" } }}
        />
        <Button type="submit" variant="contained" sx={{ px: 1.5, fontSize: 12, minWidth: 108 }}>
          Subscribe
        </Button>
      </Box>
      {success ? (
        <Alert severity="success" sx={{ mt: 1 }}>
          You are subscribed. Thank you.
        </Alert>
      ) : null}
    </Box>
  );
}
