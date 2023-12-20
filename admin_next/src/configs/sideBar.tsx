import { Icons } from "@/components/ui/icons"
import { SideBarConfig } from "@/types"
export const sideBar: SideBarConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/pages/dashboard",
      icon: "dashboard"
    },
    {
      title: "Products",
      href: "/pages/products",
      icon: "product",
    },
    {
      title: "Users",
      href: "/pages/users",
      icon: "user"
    },
    {
      title: "Orders",
      href: "/pages/orders",
      icon: "orders"
    },
    {
      title: "Reviews",
      href: "/pages/reviews",
      icon: "reviews"
    },
    // {
    //   title: "Hot",
    //   href: "/pages/hot",
    //   icon: "hot"
    // },
    {
      title: "Settings",
      href: "/pages/settings",
      icon: "settings"
    },
  ],
}