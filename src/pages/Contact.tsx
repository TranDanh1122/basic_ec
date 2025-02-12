import React from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { ContactSchema, ContactSchemaType } from "@/schema/contact";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import BreadcrumbCPN from "@/components/Shared/BreadcrumbCPN";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function Contact(): React.JSX.Element {
    const form = useForm<ContactSchemaType>({
        resolver: zodResolver(ContactSchema),
        defaultValues: { name: "", email: "", phone: "", content: "" },
    })
    const onSubmit = async (data: ContactSchemaType) => {
        console.log(data);
        toast({
            title: "Your message has been sent to the United Nations.",
            description: "They will review it shortly!",
        })
    }
    return <>
        <BreadcrumbCPN items={[{ name: "Home", link: "/" }, { name: "Contact", link: "/contact" }]} />
        <div className="flex lg:flex-row flex-col gap-8">
            <div className="space-y-8 lg:w-1/3 w-full shadow-lg p-8">
                <div className="font-medium space-y-4">
                    <div className="flex items-center gap-4">
                        <img src="/assets/icons-phone.svg" alt="phone" className="w-10 h-10 object-cover" />
                        <h2 className="text-base ">Call To Us</h2>
                    </div>
                    <p className="text-sm ">We are available 24/7, 7 days a week.</p>
                    <a className="text-sm" href="tel:+8801611112222">Phone: +8801611112222</a>
                </div>
                <hr />
                <hr />
                <div className="font-medium space-y-4">
                    <div className="flex items-center gap-4">
                        <img src="/assets/icons-mail.svg" alt="phone" className="w-10 h-10 object-cover" />
                        <h2 className="text-base ">Write To US</h2>
                    </div>
                    <p className="text-sm ">Fill out our form and we will contact you within 24 hours.</p>
                    <a className="text-sm block" href="mailto:customer@exclusive.com">Emails: customer@exclusive.com</a>
                    <a className="text-sm" href="mailto:support@exclusive.com">Emails: support@exclusive.com</a>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} id="checkout" className="flex flex-col gap-6 lg:w-2/3 md:w-full shadow-lg p-8">
                    <div className="flex md:flex-row flex-col w-full gap-4 items-center">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="md:w-1/3 w-full">
                                    <FormControl>
                                        <Input placeholder="Your Name*" className="bg-neutral-100 rounded-sm focus:bg-white border-[1px] border-solid border-neutral-100
                                    focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-[#DB4444]" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="md:w-1/3 w-full">
                                    <FormControl>
                                        <Input placeholder="Your Email*" className=" bg-neutral-100 rounded-sm focus:bg-white border-[1px] border-solid border-neutral-100
                                    focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-[#DB4444]" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="md:w-1/3 w-full">
                                    <FormControl>
                                        <Input placeholder="Your Phone*" className=" bg-neutral-100 rounded-sm focus:bg-white border-[1px] border-solid border-neutral-100 
                                    focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-[#DB4444]" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem className="h-full">
                                <FormControl>
                                    <Textarea placeholder="Message" className=" bg-neutral-100 rounded-sm focus:bg-white border-[1px] border-solid border-neutral-100 h-full
                                    focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none" {...field} />
                                </FormControl>
                                <FormMessage className="text-[#DB4444]" />
                            </FormItem>
                        )}
                    />
                    <Button className="bg-[#DB4444] rounded-none text-white py-6 px-10 w-fit ml-auto hover:opacity-50 cursor-pointer">Send Massage</Button>
                </form>
            </Form>

        </div>
    </>
}