import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const RegisterSchema = toTypedSchema(
  z
    .object({
      username: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword)
);
