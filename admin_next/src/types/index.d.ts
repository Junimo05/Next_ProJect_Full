import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/ui/icons"

export type NavItem = {
    title: string
    href: string
    disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
    title: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
} & (
        | {
            href: string
            items?: never
        }
        | {
            href?: string
            items: NavLink[]
        }
    )

export type SideBarConfig = {
    sidebarNav: SidebarNavItem[]
}



