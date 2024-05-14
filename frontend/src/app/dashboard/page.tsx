import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
  Package
} from "lucide-react"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "~/components/ui/avatar"
import { getServerSession } from "next-auth"
import { getClients } from "~/server/actions/clients"
import { getProducts } from "~/server/actions/products"
import { getClosedChats, getOpenChats } from "~/server/actions/chats"

export default async function Dashboard() {
  // const session = await getServerSession()
  const clients = await getClients()
  const products = await getProducts()
  const resolvedChats = await getClosedChats()
  const openChats = await getOpenChats()
  // console.log('session', session);
  
  // if (!session) return null

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      {/* <p>{session?.user.name}</p> */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <Card x-chunk="dashboard-01-chunk-0" className="flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              {/* <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p> */}
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2" className="flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved Chats</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resolvedChats.length}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3" className="flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Chats</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{openChats.length}</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8">
          <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Recent Chats</CardTitle>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/dashboard/chats">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="grid gap-8">
            {
              openChats.length > 0 ? (
                openChats.slice(0, 10).map((chat, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={chat.client.avatar}
                        alt={chat.client.name}
                      />
                      <AvatarFallback>
                        {chat.client.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{chat.client.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {chat.client.email}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-48">
                  No chats yet.
                </div>
              )
            }
            </CardContent>
          </Card>
        </div>
      </main>
  )
}
