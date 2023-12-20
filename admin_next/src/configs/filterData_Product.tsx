import { Icons } from "@/components/ui/icons"

export const labels = [
    {
        value: "bug",
        label: "Bug",
    },
    {
        value: "feature",
        label: "Feature",
    },
    {
        value: "documentation",
        label: "Documentation",
    },
]

export const statuses = [
    {
        value: "active",
        label: "Active",
        icon: Icons.shieldCheck,
    },
    {
        value: "inactive",
        label: "Inactive",
        icon: Icons.shieldCross,
    },
]



export const roles = [
    {
        value: "admin",
        label: "Admin",
        icon: Icons.admin,
    },
    {
        value: "staff",
        label: "Staff",
        icon: Icons.admin
    },
    {
        value: "customer",
        label: "Customer",
        icon: Icons.user,
    },
]

export const priorities = [
    {
        label: "Low",
        value: "low",
        icon: Icons.arrowDown,
    },
    {
        label: "Medium",
        value: "medium",
        icon: Icons.arrowRight,
    },
    {
        label: "High",
        value: "high",
        icon: Icons.arrowUp,
    },
]