
import { z } from "zod"

export const CheckoutForm = z.object({
    name: z.coerce.string().min(2).max(50),
    cpnName: z.coerce.string().max(50).optional(),
    st_address: z.coerce.string().min(2),
    op_address: z.coerce.string().optional(),
    city: z.coerce.string().min(2),
    phone: z.string().regex(/^\d{10}$/, { message: "Invalid phone number" }),
    email: z.coerce.string({ message: "Email is required" }).email({ message: "Invalid Email" })
})
export type CheckoutFormType = z.infer<typeof CheckoutForm>
export const initCheckoutData = {
    name: "",
    cpnName: "",
    st_address: "",
    op_address: "",
    city: "",
    phone: "",
    email: ""
}
export const checkoutFormUI = [
    { label: "First Name*", name: "name" },
    { label: "Company Name", name: "cpnName" },
    { label: "Street Address**", name: "st_address" },
    { label: "Apartment, floor, etc. (optional)", name: "op_address" },
    { label: "Town/City*", name: "city" },
    { label: "Phone Number*", name: "phone" },
    { label: "Email Address*", name: "email", type: "email" },
];