"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { SidebarNavItem } from "@/types"
import { Icons } from "./ui/icons"

export interface SidebarNavProps {
    items: SidebarNavItem[]
}

export function SideBar({ items }: SidebarNavProps) {
    const pathname = usePathname()
    if (!Array.isArray(items)) {
        throw new Error("The `items` prop must be an array.");
    }
    return (
        <ul className="p-3 ml-2 mr-2 py-10 border-solid border white border-r-2 min-h-screen m-2">
            {items.map((item, index) => {
                let Icon: any;
                if (item.icon != undefined) {
                    Icon = Icons[item.icon];
                }
                return (
                    <div key={index} className={cn("pb-8")}>
                        {item.items ? (
                            <li>
                                <div className="flex items-center">
                                    <Icon className="h-4 w-4" />
                                    <h4 className="flex w-full items-center rounded-md p-2">
                                        {item.title}
                                    </h4>
                                </div>
                                <SidebarNavItems items={item.items} pathname={pathname} />
                            </li>
                        ) :
                            <li className="flex items-center">

                                <Link
                                    key={index}
                                    href={item.href}
                                    className={cn(
                                        "flex w-full items-center rounded-md p-2 hover:underline",
                                        {
                                            "bg-muted": pathname.includes(item.href)
                                        }
                                    )}
                                    target={item.external ? "_blank" : ""}
                                    rel={item.external ? "noreferrer" : ""}
                                >
                                    <Icon className="mr-2 h-4 w-4" />
                                    {item.title}
                                </Link>
                            </li>
                        }
                    </div>
                )
            }
            )}


        </ul>
    )
}

interface SidebarNavItemsProps {
    items: SidebarNavItem[]
    pathname: string | null
}

export function SidebarNavItems({
    items,
    pathname,
}: SidebarNavItemsProps) {
    return (
        <ul className="grid grid-flow-row auto-rows-max text-sm">
            {items.map((item, index) =>
                !item.disabled && item.href ? (
                    <li>
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                "flex w-full items-center rounded-md p-2 hover:underline",
                                {
                                    "bg-muted": pathname === item.href,
                                }
                            )}
                            target={item.external ? "_blank" : ""}
                            rel={item.external ? "noreferrer" : ""}
                        >
                            {item.title}
                        </Link>
                    </li>
                ) : (
                    <li className="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60">
                        {item.title}
                    </li>
                )
            )}
        </ul>
    )
}