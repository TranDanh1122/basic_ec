import { z } from "zod"
export const registerSchema = z.object({
    name: z.coerce.string({ message: "Name is required" }).min(2),
    email: z.coerce.string().min(2),
    // .email({ message: "Invalid Email" }),
    password: z.coerce.string().min(3)
})
export const loginSchema = z.object({
    email: z.coerce.string().min(2),
    // .email({ message: "Invalid Email" }),
    password: z.coerce.string().min(3)
})
