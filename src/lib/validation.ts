export type LeadFormValues = {
  name: string;
  company: string;
  designation: string;
  phone: string;
  email: string;
  interests: string[];
  locations: string;
  timeline: string;
};

export type FieldErrors = Partial<Record<keyof LeadFormValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const namePattern = /^[A-Za-z][A-Za-z .'-]{1,79}$/;

function digitCount(value: string) {
  return value.replace(/\D/g, "").length;
}

export function validateEmail(email: string): string | undefined {
  const value = email.trim();
  if (!value) return "Email is required";
  if (!emailPattern.test(value)) return "Enter a valid email address";
  return undefined;
}

export function validatePhone(phone: string): string | undefined {
  const value = phone.trim();
  if (!value) return "Phone number is required";
  if (/[A-Za-z]/.test(value) || digitCount(value) < 10 || digitCount(value) > 15) {
    return "Please enter a valid number";
  }
  return undefined;
}

export function validateLeadForm(values: LeadFormValues): FieldErrors {
  const errors: FieldErrors = {};
  const name = values.name.trim();
  const company = values.company.trim();
  const designation = values.designation.trim();

  if (!name) errors.name = "Name is required";
  else if (!namePattern.test(name)) errors.name = "Enter a valid full name";

  if (!company) errors.company = "Company is required";
  else if (company.length < 2) errors.company = "Enter a valid company name";

  if (!designation) errors.designation = "Designation is required";
  else if (designation.length < 2) {
    errors.designation = "Enter a valid designation";
  }

  const phoneError = validatePhone(values.phone);
  if (phoneError) errors.phone = phoneError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  if (!values.interests.length) {
    errors.interests = "Select at least one interest";
  }

  if (!values.locations) {
    errors.locations = "Select the number of locations";
  }

  if (!values.timeline) {
    errors.timeline = "Select an expected timeline";
  }

  return errors;
}

export const emptyLeadForm = (): LeadFormValues => ({
  name: "",
  company: "",
  designation: "",
  phone: "",
  email: "",
  interests: [],
  locations: "",
  timeline: "",
});
