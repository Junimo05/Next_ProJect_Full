'use client'
import ProductFormEdit from "@/components/Form/form_Product";
import { useSearchParams } from "next/navigation";

export default function Product() {
    const searchParams = useSearchParams()
    const result = searchParams.get('data')
    // console.log(result)
    if (!result) {
        return (
            <div className="container mx-auto py-10 text-center align-middle">
                Can not get data
            </div>
        )
    }

    const product = JSON.parse(result);

    // console.log(product);

    return (
        <section className="container mx-auto py-10">
            <div className="border-solid border-2 border-white py-10 px-10">
                <ProductFormEdit
                    id_Pro={product.id_Pro}
                    id_Cate={product.id_Cate}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    quantity={product.quantity}
                    sold={product.sold}
                    slug={product.slug}
                    status={product.status} />
            </div>
        </section>
    )
}