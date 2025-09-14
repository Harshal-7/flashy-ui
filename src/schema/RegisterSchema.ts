import * as z from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(1, {
    message: "Name is required",
  }),

  email: z.string().email({
    message: "Email is required",
  }),

  password: z.string().min(6, {
    message: "Password must contain atleast 6 characters",
  }),
});
