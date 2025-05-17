import { string, z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});

export const signupSchema = z
.object({
  full_name: z.string().min(1, "Full name is required"),
  gender: z
    .enum(["true", "false"], {
      required_error: "Gender is required",
      invalid_type_error: "Gender is required",
    })
    .transform((val) => val === "true"),
  email: z.string().email(),
  birthday: z
    .string({
      required_error: "Birthday is required",
      invalid_type_error: "Birthday is required",
    })
    .refine((val) => !!val, { message: "Birthday is required" }),
  id_number: z.string().min(1, "ID number is required"),
  phone_number: z.string().min(10, "Phone number is required"),
  password: z.string().min(5, "Password must be at least 5 characters"),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
})

export type LoginInputs = z.infer<typeof LoginSchema>;
export type SignupInputs = z.infer<typeof signupSchema>;