'use client'
import Image from "next/image"
import Link from "next/link"
import {
  HandPlatter,
  Home,
  LifeBuoy,
  LineChart,
  Menu,
  MessageSquare,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"
import { signOut } from "next-auth/react"

import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Input } from "~/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

export default function Header() {
    const pathname = usePathname()
    const session = useSession()

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/dashboard"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <LifeBuoy className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="/dashboard"
                  className={clsx("flex items-center gap-4 px-2.5 hover:text-foreground", {
                    "text-foreground": pathname.endsWith("dashboard"),
                    "text-muted-foreground": !pathname.endsWith("dashboard")
                  })}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/chats"
                  className={clsx("flex items-center gap-4 px-2.5 hover:text-foreground", {
                    "text-foreground": pathname.includes("chats"),
                    "text-muted-foreground": !pathname.includes("chats")
                  })}
                >
                  <MessageSquare className="h-5 w-5" />
                  Chats
                </Link>
                <Link
                  href="/dashboard/products"
                  className={clsx("flex items-center gap-4 px-2.5 hover:text-foreground", {
                    "text-foreground": pathname.includes("products"),
                    "text-muted-foreground": !pathname.includes("products")
                  })}
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="/dashboard/settings"
                  className={clsx("flex items-center gap-4 px-2.5 hover:text-foreground", {
                    "text-foreground": pathname.includes("settings"),
                    "text-muted-foreground": !pathname.includes("settings")
                  })}
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="md:grow-0">
            {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            /> */}
            {(session.data as any).user.orgName}: <a className="text-blue-400 underline" href={`/orgs/${session?.data?.user.id}`} target="__blank">Your Public Link</a>
          </div>
          <div className="ml-auto"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Menu
                  width={32}
                  height={32}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() =>{
                  signOut({
                    callbackUrl: "/login"
                  })}
                }
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
    )
}