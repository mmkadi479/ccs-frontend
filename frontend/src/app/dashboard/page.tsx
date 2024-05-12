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
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
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
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Clients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clients.length}</div>
              {/* <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p> */}
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved Chats</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resolvedChats.length}</div>
              {/* <p className="text-xs text-muted-foreground">
                +19% from last month
              </p> */}
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Chats</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{openChats.length}</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Clients</CardTitle>
                <CardDescription>
                  Recent clients registered with your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {
                clients.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead className="hidden xl:table-column">
                          Type
                        </TableHead>
                        <TableHead className="hidden xl:table-column">
                          Status
                        </TableHead>
                        <TableHead className="hidden xl:table-column">
                          Date
                        </TableHead>
                        {/* <TableHead className="text-right">Amount</TableHead> */}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Aisha Ademola</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            aisha@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          Sale
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Approved
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                          2023-06-23
                        </TableCell>
                        {/* <TableCell className="text-right">$250.00</TableCell> */}
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Chukwuemeka Okoro</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            chuks@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          Refund
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Declined
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                          2023-06-24
                        </TableCell>
                        {/* <TableCell className="text-right">$150.00</TableCell> */}
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Nneoma Okeke</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            nneoma@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          Subscription
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Approved
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                          2023-06-25
                        </TableCell>
                        {/* <TableCell className="text-right">$350.00</TableCell> */}
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Taiwo Oladimeji</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            taiwo@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          Sale
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Approved
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                          2023-06-26
                        </TableCell>
                        {/* <TableCell className="text-right">$450.00</TableCell> */}
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Zainab Suleiman</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            zainab@example.com
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          Sale
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Approved
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                          2023-06-27
                        </TableCell>
                        {/* <TableCell className="text-right">$550.00</TableCell> */}
                      </TableRow>
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex items-center justify-center h-48">
                    No clients yet.
                  </div>
                )
              }
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent Chats</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
            {
              openChats.length > 0 ? (
                openChats.map((chat, index) => (
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