"use client"
import { SelectSeparator } from "../ui/select"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormLabel, FormField, FormItem, FormMessage } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import moment from 'moment';
import { Label } from "../ui/label"

export default function OrderFormEdit(order: any) {
    const router = useRouter();
    // console.log(order);
    const FormSchema = z.object({
        id_Order: z
            .number()
        ,
        customerName: z
            .string()
        ,
        staffName: z
            .string()
        ,
        status: z
            .string()
        ,
        shipping_fee: z
            .number()
        ,
        total: z
            .number()
        ,
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: order,
    })

    const products = order.products;

    // console.log(products);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // console.log("Access", data);
        router.back();
    }

    function onReset() {
        form.reset();
        //console.log("reseted");
    }

    // console.log(form.getValues("created_at"))

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onReset={() => onReset()} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="id_Order"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ID</FormLabel>
                            <Input placeholder="" {...field} disabled />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Customer</FormLabel>
                            <Input placeholder="" {...field} disabled />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="staffName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Staff Name</FormLabel>
                            <Input
                                placeholder=""
                                {...field}
                                disabled
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="shipping_fee"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Shipping Fee</FormLabel>
                            <Input {...field} disabled />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <h4 className="mb-4 text-sm font-semibold leading-none">Products</h4>
                <ScrollArea className="h-72 w-full rounded-md border p-10">
                    {products && products.map((product: any, index: any) => {
                        return (
                            <Link href={`/pages/products/all/${product.Pro_slug}`} key={product.id_Pro}
                                className="hover:text-gray-400"
                            >
                                {index + 1}. {product.Pro_name} - Price: {product.Pro_price} - Quantity: {product.quantity}
                                <SelectSeparator />
                            </Link>
                        )
                    })}
                </ScrollArea>

                <FormField
                    control={form.control}
                    name="total"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total</FormLabel>
                            <Input placeholder="" {...field} disabled />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Label>Create At</Label>
                <Input placeholder="" value={
                    (order.created_at === undefined || order.created_at === null)
                        ? "Not Have"
                        : moment(order.created_at).format('hh:mm:ss DD/MM/YYYY')
                }
                    disabled />

                {order.status == "delivered" &&
                    <>
                        <Label>Deliverd At</Label>
                        <Input placeholder="" value={
                            (order.delivered_at === undefined || order.delivered_at === null)
                                ? "Not Have"
                                : moment(order.delivered_at).format('hh:mm:ss DD/MM/YYYY')
                        } disabled />
                    </>
                }

                {order.status == "canceled" &&
                    <>
                        <Label>Canceled At</Label>
                        <Input placeholder="" value={
                            (order.canceled_at === undefined || order.canceled_at === null)
                                ? "Not Have"
                                : moment(order.canceled_at).format('hh:mm:ss DD/MM/YYYY')
                        } disabled />
                    </>
                }

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Input placeholder="" {...field} disabled />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="min-w-max flex gap-3">
                    <Button type="submit" variant={"outline"}>Submit</Button>
                    {/* <Button variant={"outline"}>Delete</Button> */}
                    {/* <Button type="reset">Reset</Button> */}
                </div>
            </form>
        </Form>
    )
}