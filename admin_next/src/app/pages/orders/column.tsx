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
import Link from "next/link"
import moment from "moment"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react"

export const columns: ColumnDef<Order>[] = [
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
        accessorKey: "id_Order",
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
            return <div className="text-center font-medium">{row.getValue("id_Order")}</div>
        },
        sortingFn: (
            rowA: any,
            rowB: any,
            ID
        ) => {
            const numA = parseInt(rowA.getValue("id_Order"));
            const numB = parseInt(rowB.getValue("id_Order"));
            return numA < numB ? 1 : numA > numB ? -1 : 0;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        enableSorting: true,
        sortDescFirst: true,
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting()}
                    className="text-center"
                >
                    Create At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const context = row.getValue("created_at") as string
            // console.log(context)
            const cellOut = moment(context).format('hh:mm:ss DD/MM/YYYY');
            return <div className="text-center font-medium">{cellOut}</div>
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "customerName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-center"
                >
                    Customer Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
        accessorKey: "staffName",
        header: () => <div className="text-center">Staff Name</div>,
        cell: ({ row }) => {
            const context = row.getValue("staffName") as any
            const cellOut = context.username;
            return <div className="text-center font-medium">{cellOut}</div>
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "Total",
        accessorFn: row => `${row.total}`,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-center"
                >
                    Total
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const context = parseInt(row.getValue("Total"))
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            })

            const cellOut = formatter.format(context);
            return <div className="text-center font-medium">{cellOut}</div>
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-center"
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue("status") as string

            const cellOut = status
            return <div className="text-center font-medium">{cellOut}</div>
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const order = row.original

            const [customer, setCustomer] = useState<User>();

            const [staff, setStaff] = useState<Product>();

            useEffect(() => {
                const fetchUser = async () => {
                    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/user/${order.customerName.id_User}`);
                    const data = await response.json();
                    // console.log(data);
                    setCustomer(data);
                }
                const fetchProduct = async () => {
                    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/user/${order.staffName.id_User}`);
                    const data = await response.json();
                    // console.log(data);
                    setStaff(data);
                }

                fetchProduct();
                fetchUser();
            }, []);

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
                                pathname: `/pages/orders/${order.id_Order}`,
                                query: {
                                    data: JSON.stringify(order)
                                }
                            }}>
                                View Order
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={{
                                pathname: `/pages/users/${order.customerName.username}`,
                                query: {
                                    data: JSON.stringify(customer)
                                }
                            }}>
                                View Customer
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={{
                                pathname: `/pages/users/${order.staffName.username}`,
                                query: {
                                    data: JSON.stringify(staff)
                                }
                            }}>
                                View Staff
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]