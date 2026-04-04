import { z } from "zod";

export const profileSchema = z.object({
  fullName: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[A-Za-z\u10A0-\u10FF\s]+$/, {
      message: "Name can contain only letters and spaces",
    }),

  email: z
    .string({ error: "Email required" })
    .min(1, "Email is required")
    .email("Invalid email format")
    .readonly(),

  phone: z
    .string({ error: "Phone required" })
    .trim()
    .nonempty("Mobile number is required")
    .transform((value) => value.replace(/\s+/g, ""))
    .refine((value) => /^\d+$/.test(value), {
      message:
        "Please enter a valid Georgian mobile number (9 digits starting with 5)",
    })
    .refine((value) => value.startsWith("5"), {
      message: "Georgian mobile numbers must start with 5",
    })
    .refine((value) => value.length === 9, {
      message: "Mobile number must be exactly 9 digits",
    }),

  age: z
    .number({
      error: "Age required",
    })
    .min(16, "You must be at least 16 years old to enroll")
    .max(120, "Please enter a valid age"),

  avatar: z.union([z.instanceof(File), z.string(), z.null()]).optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
