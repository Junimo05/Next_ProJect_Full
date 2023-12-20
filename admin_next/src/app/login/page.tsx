'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormEvent } from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {
    const router = useRouter();
    const FormSchema = z.object({
        username: z.string().min(1, 'Username is required'),
        password: z
            .string(),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        // console.log(data);
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/login', {
                method: "POST",
                headers: {
                    Accept: 'application.json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast({
                    title: "Thông Báo",
                    description: "Thành công",
                    duration: 1000,
                })
                const user = await response.json();
                // console.log(user)
                sessionStorage.setItem("users", JSON.stringify(user));
                router.push('/')
            } else {
                toast({
                    title: "Thông Báo",
                    description: "Kiểm tra lại thông tin đăng nhập",
                    duration: 1000,
                })
            }
        }
        fetchData();

    };

    return (
        <div className="w-52 h-52 py-44 mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                    <div className='space-y-2'>
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='Enter your password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button variant={"outline"} className='w-full mt-6' type='submit'>
                        Đăng Nhập
                    </Button>
                </form>
            </Form>
        </div>
    )
}