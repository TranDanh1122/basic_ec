import { z } from "zod"
export const ContactSchema = z.object({
    name: z.coerce.string().min(2),
    email: z.coerce.string().email({ message: "Invalid email" }),
    phone: z.coerce.string().regex(/^\d{10}$/, { message: "Invalid phone number" }),
    content: z.coerce.string().optional()
})
export type ContactSchemaType = z.infer<typeof ContactSchema>