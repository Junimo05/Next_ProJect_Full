type Product = {
    id_Pro: string,
    id_Cate: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    sold: number,
    slug: string,
    status: string
}

type User = {
    id_User: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    address: string,
    phone: string,
    city: string,
    role: string,
    status: string,
}

type Order = {
    id_Order: number,
    customerName: any,
    staffName: any,
    status: string,
    shipping_fee: number,
    total: number,
    created_at: string,
    delivery_at: string | "",
    canceled_at: string | "",
    products: Order_Product[] | []
}

type Order_Product = {
    id_Pro: string,
    Pro_cate: string,
    Pro_name: string,
    Pro_price: number,
    Pro_slug: string,
    quantity: number,
}

type Review = {
    id_Review: string,
    id_Pro: string,
    Pro_slug: string,
    Pro_name: string,
    id_Cus: string,
    customerName: any,
    productName: any,
    title: string,
    content: string,
    like: number,
    created_at: string,
    updated_at: string
}

type Category = {
    id_Cate: number,
    name: string,
    description: string,
    status: string,
    created_at: string,
    updated_at: string,
}