'use client'
import OrderFormEdit from "@/components/Form/form_Order";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderPage() {
    const searchParams = useSearchParams()
    const result = searchParams.get('data')
    const [order, setOrder] = useState<Order>();
    if (!result) {
        return (
            <div className="container mx-auto py-10 text-center align-middle">
                Can not get data
            </div>
        )
    }

    useEffect(() => {
        let order: Order = JSON.parse(result);
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/order-product/getbyorder/${order.id_Order}`);
            const data = await response.json();
            // console.log(data[0]);
            const products = data[0].Order_Product.map((product: any) => ({
                id_Pro: product.product.id_Pro,
                Pro_name: product.product.name,
                Pro_price: product.product.price,
                Pro_slug: product.product.slug,
                quantity: product.quantity,

            }));

            // console.log(products);
            order.products = products;
            // console.log(order);
            setOrder(order);
        };
        fetchData();
    }, [])

    // console.log(order);
    return (
        <section className="container mx-auto py-10">
            <div className="border-solid border-2 border-white py-10 px-10">
                {order &&
                    <OrderFormEdit
                        id_Order={order.id_Order}
                        customerName={order.customerName.username}
                        staffName={order.staffName.username}
                        shipping_fee={order.shipping_fee}
                        total={order.total}
                        products={order.products}
                        created_at={order.created_at}
                        delivery_at={order.delivery_at}
                        canceled_at={order.canceled_at}
                        status={order.status}
                    />
                }
                {!order &&
                    <div>Order không tồn tại</div>
                }
            </div>
        </section>
    )
}