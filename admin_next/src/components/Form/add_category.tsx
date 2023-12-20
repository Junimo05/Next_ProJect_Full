"use client"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
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
import { toast, useToast } from "../ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";

const FormSchema = z.object({
    name: z
        .string({
            required_error: "Please enter the category's name",
        }),
    description: z
        .string()
        .max(160, {
            message: "Description must not be longer than 30 characters",
        })
    ,
    status: z
        .string()
    ,
})

export default function AddCategoryDialog() {
    const [open, setOpen] = useState<any>(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        // console.log("Access", data);
        let url = process.env.NEXT_PUBLIC_API_URL + '/category'
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
                console.log(response.json())
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
                    setOpen(false);
                })
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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Icons.pluscircle />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogDescription>
                        Fill the form and submit to add
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <Input placeholder="Enter the category's name" {...field} />
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
                                        className="resize-none"
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='active'>Active</SelectItem>
                                            <SelectItem value='inactive'>Inactive</SelectItem>
                                            {/* <SelectItem value='deleted'>Deleted</SelectItem> */}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <div className="min-w-max">
                                    <Button type="submit" variant={'outline'}>Submit</Button>
                                </div>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}