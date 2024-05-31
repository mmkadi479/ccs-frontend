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
import { getUserByEmail } from "~/server/actions/auth"
import { getAdminEvents, getClientEventRequests } from "~/server/actions/events"
import CreateEventRequestForm from "../_components/create-event-request-form"
import EventCard from "../_components/event-card"

export default async function Dashboard() {
  const session = await getServerSession()
  const user = await getUserByEmail(session?.user.email || '')
  const clients = await getClients()
  const products = await getProducts()
  const resolvedChats = await getClosedChats()
  const openChats = await getOpenChats()
  const eventRequests = user.role == 'client' ? await getClientEventRequests() : await getAdminEvents()
  const approvedEventRequests = eventRequests.filter((eventRequest: any) => eventRequest.status === 'APPROVED')
  const declinedEventRequests = eventRequests.filter((eventRequest: any) => eventRequest.status === 'REJECTED')
  // console.log('session', session);
  
  // if (!session) return null

  if (user.role == 'client') {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Link href="/dashboard/create-event-request" className="text-white px-8 py-4 rounded-md shadow-lg w-fit bg-black hover:bg-slate-600 text-sm">Create a Request</Link>
        {eventRequests.length === 0 ? 
          <div className="text-center">
            <p className="text-2xl font-bold">No requests yet.</p>
            <Link href="/dashboard/create-event-request" className="text-blue-300 underline text-sm">Create a Request</Link>
          </div> : 
          eventRequests.map((eventRequest: any, index: any) => (
            <EventCard event={eventRequest} />
          ))
        }
      </main>
    )
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <Card x-chunk="dashboard-01-chunk-0" className="flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Event Requests
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{eventRequests.length}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2" className="flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accepted Offers</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedEventRequests.length}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2" className="flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Declined Offers</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{declinedEventRequests.length}</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8">
          <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Requests</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid gap-8">
            {eventRequests.length === 0 ? 
              <div className="text-center">
                <p className="text-2xl font-bold">No requests yet.</p>
                <Link href="/dashboard/create-event-request" className="text-blue-300 underline text-sm">Create a Request</Link>
              </div> : 
              eventRequests.map((eventRequest: any, index: any) => (
                <EventCard event={eventRequest} />
              ))
            }
            </CardContent>
          </Card>
        </div>
    </main>
  )
}
