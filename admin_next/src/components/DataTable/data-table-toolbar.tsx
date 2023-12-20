"use client"

import { Icons } from "../ui/icons"
import { Table } from "@tanstack/react-table"

import { Button } from "../ui/button"
import { DataTableViewOptions } from "./data-table-view-options"

import { roles } from "@/configs/filterData_Product"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Delete } from "@/lib/data/delete/Delete"
import { usePathname, useSearchParams } from "next/navigation"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    const isSelected = table.getFilteredSelectedRowModel().rows.length > 0
    const pathname = usePathname();
    const pathSegments = pathname.split("/");
    let lastParams = pathSegments[pathSegments.length - 1];
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex flex-1 items-center space-x-2">
                {/* {table.getColumn("status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={statuses}
                    />
                )} */}
                {(lastParams === "users") &&
                    table.getColumn("role") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("role")}
                            title="Role"
                            options={roles}
                        />
                    )
                }

                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Icons.crossCircle className="ml-2 h-4 w-4" />
                    </Button>
                )}
                <DataTableViewOptions table={table} />
                {/* {isSelected && (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button
                                variant={"outline"}
                                className="h-8 border-dashed"
                            >
                                Action
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem>
                                <Button
                                    variant={'ghost'}
                                    onClick={() => table.getSelectedRowModel().flatRows.map((item) => {
                                        console.log(item.original);
                                    })}
                                >
                                    Print Console
                                </Button>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Button
                                    variant={'ghost'}
                                    onClick={() => {
                                        const model = table.getSelectedRowModel();
                                        const data = model.flatRows.map((item) => item.original);
                                        console.log("predel:", data);
                                        Delete(data, lastParams);
                                    }}
                                >
                                    Delete
                                </Button>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>

                )} */}
            </div>
        </div>
    )
}