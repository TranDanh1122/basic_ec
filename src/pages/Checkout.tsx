import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { CheckoutForm, CheckoutFormType, checkoutFormUI, initCheckoutData } from "@/schema/checkout";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import BreadcrumbCPN from "@/components/Shared/BreadcrumbCPN";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";

export default function Checkout(): React.JSX.Element {
    const form = useForm<CheckoutFormType>({
        resolver: zodResolver(CheckoutForm),
        defaultValues: initCheckoutData,
    })
    const { total } = useCart()
    const onSubmit = () => {
        toast({ title: "Order created" })
    }
    return <>
        <BreadcrumbCPN items={[{ name: "Home", link: "/" }, { name: "Checkout", link: "/checkout" }]} />
        <div className="flex lg:flex-row flex-col-reverse items-start justify-between gap-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} id="checkout" className="space-y-8 lg:w-2/5 w-full shadow-lg p-4">
                    {
                        checkoutFormUI.map(el => <FormField
                            control={form.control}
                            name={el.name as keyof CheckoutFormType}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base text-black/40">{el.label}</FormLabel>
                                    <FormControl>
                                        <Input className=" bg-neutral-200 rounded-sm focus:bg-white border-[1px] border-solid border-neutral-200
                                    focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                                            type={el.type ? "text" : el.type} {...field} />
                                    </FormControl>
                                    <FormMessage className="text-[#DB4444]" />
                                </FormItem>
                            )}
                        />)
                    }
                </form>
            </Form>
            <Card className="lg:w-2/5 w-full">
                <CardHeader>
                    <CardTitle>Checkout</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>

                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium p-0">Subtotal</TableCell>
                                <TableCell className="text-right">${total}</TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium p-0">Shipping:</TableCell>
                                <TableCell className="text-right">Freeship</TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium p-0">Total:</TableCell>
                                <TableCell className="text-right">${total}</TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>

                </CardContent>
                <CardFooter>
                    <Button type="submit" form="checkout" className="bg-[#DB4444] hover:opacity-75 text-white w-full mt-10 cursor-pointer">Checkout</Button>
                </CardFooter>
            </Card>
        </div>

    </>

}