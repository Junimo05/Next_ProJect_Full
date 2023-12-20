"use client"
import { DataTable } from "@/components/DataTable/data-table";
import { columns } from "./column";
import { useEffect, useState } from "react";

export default function Order() {
    const [order, setOrder] = useState<any>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/order');
            const data = await response.json();
            setOrder(data);
            // console.log(data);
        }
        fetchData();
    }, [])

    // console.log(order)
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={order} />
        </div>
    )

}
