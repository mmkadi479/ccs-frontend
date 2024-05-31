'use client'

import { BellRing, Check } from "lucide-react"
 
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { declineEvent, getEventTiers } from "~/server/actions/events"
import DeclineButton from "./decline-button"

export default function EventCard({
  event
} : {
  event: any
}) {
  const session = useSession()
  const user = session?.data?.user
  const eventSizes = ['Small', 'Medium', 'Large']

  const [eventTiers, setEventTiers] = useState<any[]>([])

  useEffect(() => {
    getEventTiers(event.id).then((tiers) => {
      setEventTiers(tiers)
      console.log('tiers', tiers)
    })
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.theme}</CardTitle>
        <CardDescription>{event.status}</CardDescription>
      </CardHeader>
      {/* <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Location
            </p>
            <p className="text-sm text-muted-foreground">
              {event.location}
            </p>
          </div>
        </div>
      </CardContent> */}
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {new Date(event.date).toDateString()}
            </p>
            <p className="text-sm text-muted-foreground">Guests: {event.no_guests}</p>
            <p className="text-sm text-muted-foreground">Drinks: {event.no_drinks}</p>
            <p className="text-sm text-muted-foreground">Size: {eventSizes[event.size]}</p>
            <p className="text-sm text-muted-foreground">
              {event.location}
            </p>

            <p className="my-2">Offers:</p>
            <div className="flex gap-3 flex-wrap">
            {
              eventTiers.length > 0 && eventTiers.map((tier) => (
                <p className="text-sm text-muted-foreground">{tier.type} - ₦{tier.price.toLocaleString()}</p>
              ))
            }
            </div>

            {event.status === 'APPROVED' && <p className="text-sm text-muted-foreground">Selected Tier: {event.selectedTier.type}</p>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="space-x-4">
        {
          event.status === 'PENDING' ? (
            <>
            <Button className="w-full" asChild>
              {
                user?.role == 'client' ?
                (eventTiers.length === 0 ? <Link href={`/dashboard/event-requests/${event.id}`}>View Offers</Link> : <Link href={`/dashboard/select-offer/${event.id}`}>Select Offer</Link>) :
                (eventTiers.length === 0 ? <Link href={`/dashboard/make-offer/${event.id}`}>Make Offer</Link> : null)
              }
            </Button>
            <DeclineButton id={event.id} />
            </>
          ) : (
            <p className={`${event.status == 'APPROVED' ? 'text-green-400' : 'text-red-400'} text-lg font-semibold`}>{event.status == 'APPROVED' ? 'Accepted' : 'Declined'}</p>
          )
        }
      </CardFooter>
    </Card>
  )
}