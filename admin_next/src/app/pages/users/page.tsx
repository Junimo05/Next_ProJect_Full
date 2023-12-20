'use client'

import { DataTable } from "@/components/DataTable/data-table"
import { columns } from "./column"
import { useEffect, useState } from "react"

export default function UserPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/user/all`);
            const data = await response.json();
            // console.log(order);
            setUsers(data);
        };
        fetchData();
    }, [])

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={users} />
        </div>
    )
}