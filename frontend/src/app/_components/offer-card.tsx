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
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { declineEvent, getEventTiers, selectTier } from "~/server/actions/events"
import { useParams } from "next/navigation"

export default function OfferCard({
  offer,
  loading,
  setLoading
} : {
  offer: any,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>
}) {
  const session = useSession()
  const params = useParams()
  const user = session?.data?.user
  const eventSizes = ['Small', 'Medium', 'Large']

  const [eventTiers, setEventTiers] = useState<any[]>([])

  const handleAccept = async () => {
    setLoading(true)
    try {
      await selectTier(params.id as any, offer.id)
    } catch (error) {
      alert('Failed to accept offer')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{offer.type}</CardTitle>
        <CardDescription>₦{offer.price.toLocaleString()}</CardDescription>
      </CardHeader>
      <CardFooter className="space-x-4">
        <Button className="w-full bg-green-400 cursor-pointer" variant="default" onClick={handleAccept}>
          Accept
        </Button>
      </CardFooter>
    </Card>
  )
}