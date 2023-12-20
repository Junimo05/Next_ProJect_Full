'use client'
import AddCategoryDialog from "@/components/Form/add_category";
import CategoryDialog from "@/components/Form/detailCategory_dialog";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react";

export default function CategoryPage() {
    const [category, setCategory] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/category');
            const data = await response.json();
            setCategory(data);
        }
        fetchData();
    }, [])

    // console.log(category);

    return (
        <div className="container mx-auto py-10">
            <div className="font-semibold text-3xl p-2 flex gap-2">
                Category
                <AddCategoryDialog />
            </div>
            <div className="flex flex-col gap-3">
                <Link href={`/pages/products/all`}>
                    <Card>
                        <CardHeader>
                            <CardTitle>All</CardTitle>
                            <CardDescription>All product</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                {category && category.map((category: any) => {
                    return (
                        <div>
                            <Card className="flex">
                                <Link className="flex-1" href={`/pages/products/${category.name}`} key={category.id_Cate}>
                                    <CardHeader>
                                        <CardTitle>{category.name}</CardTitle>
                                    </CardHeader>
                                </Link>
                                <div className="p-3 flex flex-col justify-center items-center">
                                    <CategoryDialog key={category.id_Cate}
                                        id_Cate={category.id_Cate}
                                        name={category.name}
                                        description={category.description}
                                        status={category.status}
                                        created_at={category.created_at}
                                        updated_at={category.updated_at}
                                    />
                                </div>
                            </Card>
                        </div>
                    );
                })}
            </div >
        </div >
    )
}