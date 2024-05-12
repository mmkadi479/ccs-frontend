'use client'
import Link from "next/link"
import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  HandPlatter,
  Users2,
  MessageSquare,
  LifeBuoy
} from "lucide-react"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "~/components/ui/tooltip"
import clsx from "clsx"
import { usePathname } from "next/navigation"

export default function SideNav() {
    const pathname = usePathname()

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <LifeBuoy className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className={clsx("flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8", {
                    "bg-accent text-accent-foreground": pathname.endsWith("dashboard"),
                    "text-muted-foreground": !pathname.endsWith("dashboard")
                })}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/chats"
                className={clsx("flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8", {
                    "bg-accent text-accent-foreground": pathname.includes("chats"),
                    "text-muted-foreground": !pathname.includes("chats")
                })}
              >
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Chats</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Chats</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/products"
                className={clsx("flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8", {
                    "bg-accent text-accent-foreground": pathname.includes("products"),
                    "text-muted-foreground": !pathname.includes("products")
                })}
              >
                <Package className="h-5 w-5" />
                <span className="sr-only">Products</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className={clsx("flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8", {
                    "bg-accent text-accent-foreground": pathname.includes("analytics"),
                    "text-muted-foreground": !pathname.includes("analytics")
                })}
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip> */}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/settings"
                className={clsx("flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8", {
                    "bg-accent text-accent-foreground": pathname.includes("settings"),
                    "text-muted-foreground": !pathname.includes("settings")
                })}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    )
}