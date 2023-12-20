"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import Link from "next/link"
import moment from "moment"
import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<Review>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <div className="text-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="translate-y-[2px] "
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
        enableGlobalFilter: false,
    },
    {
        accessorKey: "id_Review",
        enableHiding: false,
        enableGlobalFilter: false,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-center"
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="text-center font-medium">{row.getValue("id_Review")}</div>
        },
        sortingFn: (
            rowA: any,
            rowB: any,
            ID
        ) => {
            const numA = parseInt(rowA.getValue("id_Review"));
            const numB = parseInt(rowB.getValue("id_Review"));
            return numA < numB ? 1 : numA > numB ? -1 : 0;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "title",
        header: () => <div className="text-center">Title</div>,
        cell: ({ row }) => {
            const context = row.getValue("title") as string

            const cellOut = context
            return <div className="text-center font-medium">{cellOut}</div>
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "content",
        header: () => <div className="text-center">Content</div>,
        cell: ({ row }) => {
            const context = row.getValue("content") as string

            const cellOut = context
            return <div className="text-center font-medium">{cellOut}</div>
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "customerName",
        header: () => <div className="text-center">Customer Username</div>,
        cell: ({ row }) => {
            const context = row.getValue("customerName") as any

            const cellOut = context.username
            return <div className="text-center font-medium">{cellOut}</div>
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "productName",
        header: () => <div className="text-center">Product Name</div>,
        cell: ({ row }) => {
            const context = row.getValue("productName") as any

            const cellOut = context.name
            return <div className="text-center font-medium">{cellOut}</div>
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "like",
        header: () => <div className="text-center">Like</div>,
        cell: ({ row }) => {
            const context = row.getValue("like") as string

            const cellOut = context
            return <div className="text-center font-medium">{cellOut}</div>
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "created_at",
        header: () => <div className="text-center">Create At</div>,
        cell: ({ row }) => {
            const context = row.getValue("created_at") as string
            const cellOut = moment(context).format('hh:mm:ss DD/MM/YYYY');
            return <div className="text-center font-medium">{cellOut}</div>
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "updated_at",
        header: () => <div className="text-center">Update At</div>,
        cell: ({ row }) => {
            const context = row.getValue("updated_at") as string
            if (!context) return <div className="text-center font-medium">Not Have</div>
            const cellOut = moment(context).format('hh:mm:ss DD/MM/YYYY');
            return <div className="text-center font-medium">{cellOut}</div>
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const review = row.original;

            const [user, setUser] = useState<User>();

            const [product, setProduct] = useState<Product>();

            useEffect(() => {
                const fetchUser = async () => {
                    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/user/${review.id_Cus}`);
                    const data = await response.json();
                    // console.log(data);
                    setUser(data);
                }
                const fetchProduct = async () => {
                    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/product/${review.id_Pro}`);
                    const data = await response.json();
                    // console.log(data);
                    setProduct(data);
                }

                fetchProduct();
                fetchUser();
            }, []);
            // console.log(user)
            // console.log(product)
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} className="h-8 w-8 p-0">
                            <span className="sr-only">OpenMenu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={{
                                pathname: `/pages/users/${review.customerName.username}`,
                                query: {
                                    data: JSON.stringify(user)
                                }
                            }}>
                                View User
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={{
                                pathname: `/pages/products/all/${review.productName.name}`,
                                query: {
                                    data: JSON.stringify(product)
                                }
                            }}>
                                View Product
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]