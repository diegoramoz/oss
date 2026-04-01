"use server";

export type ExtractedInvoice = {
  merchant: string;
  date: string;
  amount: string;
  currency: string;
  category: string;
  description: string;
  tax: string;
};

const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

export async function extractInvoice(
  formData: FormData
): Promise<ExtractedInvoice> {
  const file = formData.get("file");
  if (!(file instanceof File)) {
    throw new Error("No file provided");
  }

  if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
    throw new Error(
      `Unsupported file type "${file.type}". Accepted types: PDF, JPG, PNG, WEBP.`
    );
  }

  // Stub: return empty values — Ollama extraction is wired in ISSUE-004
  return {
    merchant: "",
    date: new Date().toISOString().slice(0, 10),
    amount: "0.00",
    currency: "USD",
    category: "",
    description: "",
    tax: "0.00",
  };
}
