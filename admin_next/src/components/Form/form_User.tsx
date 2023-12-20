"use client"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormLabel, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "../ui/use-toast"

export default function UserFormEdit(user: User) {
    const router = useRouter();
    const FormSchema = z.object({
        id_User: z.coerce.number(

        )
        ,
        username: z
            .string({
                required_error: "",
            }),
        first_name: z
            .string({
                required_error: "",
            }),
        last_name: z
            .string({
                required_error: "",
            }),
        address:
            z.string()
        ,
        city: z
            .string(),
        phone: z
            .string()
        ,
        email: z
            .string()
        ,
        role: z
            .string()
        ,
        status: z
            .string()
        ,
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: user,
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("Access", data);
        let url = process.env.NEXT_PUBLIC_API_URL + `/user/changeinfo/${data.id_User}`;
        const userString: any = sessionStorage.getItem("users");
        const user: any = JSON.parse(userString);
        const infoData = {
            // first_name: data.first_name,
            // last_name: data.last_name,
            // address: data.address,
            // city: data.city,
            // phone: data.phone,
            // email: data.email,
            role: data.role,
            status: data.status,
        }

        // console.log(infoData)

        axios.patch(url, infoData, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    toast({
                        title: "Thông Báo",
                        description: "Thành công",
                        duration: 1000,
                    })
                }
                setTimeout(() => {
                    router.back();
                }, 2000)
            })
            .catch(error => {
                toast({
                    title: "Thông Báo",
                    description: "Bạn không có quyền hạn làm việc này hoặc lỗi không xác định",
                    duration: 1000,
                })
            })
        // router.back();
    }

    async function DeleteUser(id: any) {
        const userString: any = sessionStorage.getItem("users");
        const user: any = JSON.parse(userString);
        // console.log(user.token);
        axios.delete(process.env.NEXT_PUBLIC_API_URL + `/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => {
                // console.log(response.status);
                if (response.status === 200) {
                    toast({
                        title: "Thông Báo",
                        description: "Thành công",
                        duration: 1000,
                    })
                }
                setTimeout(() => {
                    router.back();
                }, 2000)
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

        window.location.reload();

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onReset={() => onReset()} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="id_User"
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
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder="" {...field} disabled />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <Input placeholder="" {...field} disabled />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <Input placeholder="" {...field} disabled />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <Input placeholder="" {...field} disabled />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <Input placeholder="" {...field} disabled />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="" {...field} disabled />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <Input placeholder="" {...field} disabled />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="customer">Customer</SelectItem>
                                    <SelectItem value="staff">Staff</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
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
                                    {/* <SelectItem value="deleted">Deleted</SelectItem> */}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="min-w-max flex gap-3">
                    <Button type="submit" variant={"outline"}>Submit</Button>
                    <Button type="reset" variant={"outline"}>Reset</Button>
                    <Button type="button" onClick={() => DeleteUser(user.id_User)} variant={"outline"}>Delete</Button>
                </div>
            </form>
        </Form>
    )
}