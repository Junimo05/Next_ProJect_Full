'use client'
import { columns } from "./column";

import { DataTable } from "@/components/DataTable/data-table";
import AddProductDialog from "@/components/Form/add_product";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//     title: 'Products',
// }

export default function ProductCategory() {
    const query = useSearchParams();
    const pathname = usePathname();
    const [products, setProducts] = useState<any>(null);
    let category = query.get('category')

    // console.log(category)
    useEffect(() => {
        const pathSegments = pathname.split("/");
        category = pathSegments[pathSegments.length - 1]; //Category is last
        // console.log(category)
        if (category === 'all') category = '/product';
        else category = `/product/categorys/${category}`
        const fetchData = async () => {
            if (category != null) {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + category);
                const data = await response.json();
                if (category === '/product') setProducts(data);
                else setProducts(data.products)
                // console.log(data);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="container mx-auto py-10">
            <AddProductDialog />
            {products
                &&
                <DataTable columns={columns} data={products} />}
            {!products && <div>Something Error</div>}
        </div>
    )
}
