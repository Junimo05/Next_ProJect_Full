"use client"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormLabel, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { toast } from "../ui/use-toast"
import axios from "axios"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"

export default function ProductFormEdit(product: any) {
    const router = useRouter();
    const [cateList, setcateList] = useState([]);
    const [images, setImages] = useState<any>();
    let imgs: any = useRef();
    // console.log("Product Form Edit", product);

    useEffect(() => {
        const fetchImage = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/product/images/${product.id_Pro}`);
            const data = await response.json();
            // console.log(data)
            imgs = data;
            // console.log(images)
            setImages(imgs);
        }
        fetchImage();
    }, [])
    const FormSchema = z.object({
        id_Pro: z.any()
        ,
        id_Cate: z
            .any({
                required_error: "Please select an category",
            }),
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
                required_error: "Quantity is required",
                invalid_type_error: "Quantity must be number",
            }),
        sold:
            z.coerce.number({
                required_error: "Quantity is required",
                invalid_type_error: "Quantity must be number",
            }),
        slug: z
            .string({
                required_error: "Please enter slug"
            }),
        status: z
            .string()
        ,
        image: z.any()
        ,
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: product,
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        // console.log("Access", data);
        let url = process.env.NEXT_PUBLIC_API_URL + `/product/${data.id_Pro}`;
        // console.log(url)
        const infoData = {
            id_Cate: data.id_Cate,
            name: data.name,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            sold: data.sold,
            slug: data.slug,
            status: data.status,
        }

        axios.patch(url, infoData)
            .then(response => {
                if (data.image) {
                    const formData = new FormData();
                    // Append images to FormData
                    Array.from(data.image).forEach((image: any, index: number) => {
                        formData.append('file', image);
                    });
                    axios.post(`http://localhost:8080/product/uploadImage/${data.id_Pro}`,
                        formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                        .then(response => {
                            // console.log(response.status)
                            if (response.status === 201) {
                                toast({
                                    title: "Thông Báo",
                                    description: "Thành công",
                                    duration: 1000,
                                })
                            }
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                        })
                        .catch(error => {
                            // console.log(error);
                            toast({
                                title: "Thông Báo",
                                description: "Lỗi ảnh",
                                duration: 1000,
                            })
                        })
                } else {
                    if (response.status === 201) {
                        toast({
                            title: "Thông Báo",
                            description: "Thành công",
                            duration: 1000,
                        })
                    }
                    setTimeout(() => {
                        router.back();
                    }, 2000);
                }
            })
            .catch(error => {
                toast({
                    title: "Thông Báo",
                    description: "Kiểm tra lại thông tin cập nhật",
                    duration: 1000,
                })
            });
    }

    function onReset() {
        form.reset();
        //console.log("reseted");
    }

    function DeleteProduct(id: any) {
        let url = process.env.NEXT_PUBLIC_API_URL + `/product/${id}`;
        axios.delete(url, id)
            .then(res => {
                if (res.status === 200) {
                    toast({
                        title: "Thông Báo",
                        description: "Thành công",
                        duration: 1000,
                    })
                    router.back();
                }
            })
            .catch(error => {
                toast({
                    title: "Thông Báo",
                    description: "Lỗi không xác định",
                    duration: 1000,
                })
            })
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/category');
            const data = await response.json();
            setcateList(data);
            // console.log(data);
        };
        fetchData();
    }, [])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onReset={() => onReset()} className="w-full space-y-6">
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
                    name="id_Cate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                </FormControl>
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
                            <Input placeholder="Enter quantity" {...field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="sold"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sold</FormLabel>
                            <Input placeholder="Enter sold" {...field} disabled />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <h1 className="px-auto py-2">Images</h1>
                <ScrollArea className="h-40 w-full">
                    {images &&
                        images.map((image: string, index: any) => {
                            return (
                                <>
                                    <a className="p-4" href={image} key={index}>
                                        Image - {index + 1}
                                    </a>
                                    <br />
                                    <Separator />
                                </>
                            )
                        })

                    }
                </ScrollArea>

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Input Images</FormLabel>
                            <Input
                                accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                                multiple
                                type="file"
                                onChange={(e) =>
                                    field.onChange(e.target.files ? e.target.files : null)
                                }
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="min-w-max flex gap-3">
                    <Button variant={'outline'} type="submit">Submit</Button>
                    <Button variant={'outline'} type="reset">Reset</Button>
                    <Button variant={'outline'} type="button" onClick={() => DeleteProduct(product.id_Pro)} >Delete</Button>
                </div>
            </form>
        </Form>
    )
}


