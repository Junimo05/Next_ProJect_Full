'use client'

import { DataTable } from "@/components/DataTable/data-table"
import { columns } from "./column"
import { useEffect, useState } from "react"

export default function ReviewPage() {
    const [reviews, setReviews] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/review`);
            const data = await response.json();
            // console.log(data);
            setReviews(data);
        };
        fetchData();
    }, [])

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={reviews} />
        </div>
    )
}