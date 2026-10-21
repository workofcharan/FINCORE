import { z } from "zod";

export const consultationSchema = z.object({
  clientType: z.enum(["individual", "business"], {
    message: "Please select whether you are an individual or a business",
  }),
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name cannot exceed 80 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Please enter a valid full name"),
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(100, "Email address is too long"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .regex(/^[+0-9\s-]{10,15}$/, "Please enter a valid phone number"),
  businessName: z.string().max(120, "Business name cannot exceed 120 characters").optional().or(z.literal("")),
  serviceRequired: z
    .string()
    .min(1, "Please select the service category you require"),
  description: z
    .string()
    .min(10, "Please provide at least 10 characters describing your requirement")
    .max(1500, "Description cannot exceed 1500 characters"),
  preferredContact: z.enum(["phone", "whatsapp", "email"], {
    message: "Please select a preferred contact method",
  }),
  consentGiven: z.literal(true, {
    message: "You must consent to being contacted regarding this inquiry",
  }),
  // Anti-spam honeypot field. Must be empty in valid human submissions
  honeypot: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;
