import BreadcrumbCPN from "@/components/Shared/BreadcrumbCPN";
import React from "react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Dialog from "@/components/Shared/Dialog";
import { Input } from "@/components/ui/input";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export default function Cart(): React.JSX.Element {
    const { cart, total, dispatch, deleteItem, length, addOrUpdateItem } = useCart()
    const [page, setPage] = React.useState<number>(1)
    const current = cart.slice((page - 1) * 3, page * 3)
    return <>
        <BreadcrumbCPN items={[{ name: "Home", link: "/" }, { name: "Cart", link: "/cart" }]} />
        <div className="flex gap-8">
            <Table >
                <TableHeader className="text-base leading-6">
                    <TableRow className="border-none shadow-lg ">
                        <TableHead >Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="w-[250px]">Quantity</TableHead>
                        <TableHead>Subtotal</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        current.map((el: CartItem) => <TableRow key={el.id} className="shadow-sm border-none">
                            <TableCell className="flex items-center justify-start gap-4">
                                <img src={el.thumbnail} alt={el.title} className="w-14 aspect-square object-cover" />
                                {el.title}
                            </TableCell>
                            <TableCell>{el.price}</TableCell>
                            <TableCell>
                                <Input value={el.qty} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    if (!(/^\d+$/).test(e.target.value)) {
                                        dispatch(addOrUpdateItem({ id: el.id, qty: 1 }))
                                    } else {
                                        dispatch(addOrUpdateItem({ id: el.id, qty: Number(e.target.value) }))
                                    }
                                }}></Input>
                            </TableCell>
                            <TableCell>${el.subtotal.toFixed(2)}</TableCell>
                            <TableCell>
                                <Dialog<void> title="Are use Sure" desc="This action will remove item from cart" callback={() => dispatch(deleteItem(el.id))} >
                                    <Trash />
                                </Dialog>
                            </TableCell>
                        </TableRow>
                        )
                    }

                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4} className="flex gap-3 justify-start">
                            <Button onClick={() => setPage((page) => page - 1)} disabled={page == 1} variant={"outline"}>{"<"}</Button>
                            <Button onClick={() => setPage((page) => page + 1)} disabled={current.length < 3 || page * 3 == length} variant={"outline"}>{">"}</Button>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

            <Card className="w-1/4 border-none">
                <CardHeader>
                    <CardTitle>Cart Total</CardTitle>
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
                    <Button className="bg-[#DB4444] hover:opacity-75 text-white w-full mt-10 cursor-pointer">Checkout</Button>

                </CardFooter>
            </Card>


        </div>

    </>
}
