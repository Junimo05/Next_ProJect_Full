"use client"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "../ui/dialog";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export default function AddProductDialog() {
    const [cateList, setCateList] = useState<any>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    var _ = require('lodash');

    const FormSchema = z.object({
        id_Cate: z
            .any({
                required_error: "Please select an category",
            })
        ,
        name: z
            .string({
                required_error: "Please enter the product's name",
            }),
        description: z
            .string()
        ,
        price:
            z.coerce.number({
                required_error: "Price is required",
                invalid_type_error: "Price must be number",
            }),
        quantity:
            z.coerce.number({
            }),
        slug: z
            .string({
                required_error: "Please enter slug"
            })
            .default(""),
        status: z
            .string()
            .default("active"),
    })


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        //Valid data
        data.id_Cate = Number(data.id_Cate);
        data.slug = data.name.replace(" ", "-").toLowerCase();

        if (_.isEmpty(data.name.trim())) {
            toast({
                title: "Thông Báo",
                description: "Tên không hợp lệ",
                duration: 1000,
            })
            return;
        }

        let url = process.env.NEXT_PUBLIC_API_URL + '/product';
        const postData = async (url: any, data: any) => {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            // Handle the response
            if (response.ok) {
                // console.log(response.json())
                return await response.ok; // Parse response data if successful
            } else {
                throw new Error("Error posting data: " + response.statusText); // Handle errors
            }
        };

        try {
            const res = await postData(url, data);
            if (res) {
                toast({
                    title: "Thông Báo",
                    description: "Thành công",
                    duration: 1000,
                })

                setTimeout(() => {
                    setOpenDialog(false)
                }, 2000)
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Thông Báo",
                description: "Lỗi không xác định",
                duration: 1000,
            })
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/category');
            const data = await response.json();
            setCateList(data);
            // console.log(data);
        }
        fetchData();
    }, []);

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger>
                <Icons.pluscircle />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Products</DialogTitle>
                    <DialogDescription>
                        Fill the form and submit to add product
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="id_Cate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    cateList && cateList.map((item: any, index: any) => {
                                                        return (
                                                            <SelectItem key={item.id_Cate} value={`${item.id_Cate}`}>
                                                                {index + 1} - {item.name}
                                                            </SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <Input placeholder="Enter the product's name" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        placeholder="Tell us about your product"
                                        className="resize-none"
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <Input placeholder="Enter price" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <Input placeholder="Enter Quantity" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <div className="min-w-max">
                                <Button type="submit" variant={'outline'}>Submit</Button>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}