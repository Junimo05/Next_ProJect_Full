"use client"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormLabel, FormField, FormItem, FormMessage, FormControl } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import moment from 'moment';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Icons } from "../ui/icons"
import { Textarea } from "../ui/textarea"
import axios from "axios"
import { toast } from "../ui/use-toast"
import { SelectContent, Select, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useState } from "react"

export default function CategoryDialog(category: Category) {
    const router = useRouter();
    const [open, setOpen] = useState<any>(false);
    //console.log("CategoryDialog: ", category);

    const FormSchema = z.object({
        id_Cate: z
            .number()
        ,
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
        created_at:
            z.string()
        ,
        updated_at:
            z.string()
        ,

    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: category,
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // console.log("Access", data);
        let url = process.env.NEXT_PUBLIC_API_URL + `/category/${data.id_Cate}`;
        // console.log(data);
        const infoData = {
            name: data.name,
            description: data.description,
            status: data.status
        }

        axios.patch(url, infoData)
            .then(response => {
                if (response.status === 200) {
                    toast({
                        title: "Thông Báo",
                        description: "Thành công",
                        duration: 1000,
                    })
                }
                setTimeout(() => {
                    setOpen(false);
                })
                window.location.reload();
            })
            .catch(error => {
                toast({
                    title: "Thông Báo",
                    description: "Lỗi không xác định",
                    duration: 1000,
                })
            })
    }

    function onReset() {
        form.reset();
        //console.log("reseted");
    }

    function DeleteCategory(id: any) {
        let url = process.env.NEXT_PUBLIC_API_URL + `/category/${id}`;
        axios.delete(url, id)
            .then(res => {
                if (res.status === 200) {
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
            })
            .catch(error => {
                toast({
                    title: "Thông Báo",
                    description: "Lỗi không xác định",
                    duration: 1000,
                })
            })
        //delete on db
    }

    // console.log(form.getValues("updated_at"))

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Icons.detail />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Category Detail</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} onReset={() => onReset()} className="w-full space-y-2">
                        <FormField
                            control={form.control}
                            name="id_Cate"
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Name</FormLabel>
                                    <Input placeholder="" {...field} />
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
                                    <Textarea {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="created_at"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Created At</FormLabel>
                                    <Input placeholder="" value={
                                        (form.getValues("created_at") === undefined || form.getValues("created_at") === null)
                                            ? "Not Have"
                                            : moment(form.getValues("created_at")).format('hh:mm:ss DD/MM/YYYY')
                                    }
                                        disabled />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="updated_at"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Updated At</FormLabel>
                                    <Input placeholder="" value={
                                        (form.getValues("updated_at") === undefined || form.getValues("updated_at") === null)
                                            ? "Not Have"
                                            : moment(form.getValues("updated_at")).format('hh:mm:ss DD/MM/YYYY')
                                    }
                                        disabled />
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
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                            <SelectItem value="deleted">Deleted</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="min-w-max flex gap-3">
                            <Button type="submit" variant={"outline"}>Submit</Button>
                            <Button type="reset" variant={"outline"}>Reset</Button>
                            <Button onClick={() => DeleteCategory(category.id_Cate)} type="button" variant={'outline'}>Delete</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >

    )
}