export type EnquiryPayload = {
  formType: "demo" | "newsletter";
  [key: string]: string | string[] | undefined;
};

export async function submitEnquiry(payload: EnquiryPayload) {
  const response = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Could not send your details. Please try again.");
  }
}
