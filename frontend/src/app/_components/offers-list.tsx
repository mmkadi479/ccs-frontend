'use client'

import Link from "next/link"
import OfferCard from "./offer-card"
import { useState } from "react"

export default function OffersList({
  offers
} : {
  offers: any[]
}) {
  const [loading, setLoading] = useState(false)
  if (offers.length === 0) {
    return (
      <div className="text-center">
        <p className="text-2xl font-bold">No requests yet.</p>
        <Link href="/dashboard/create-event-request" className="text-blue-300 underline text-sm">Create a Request</Link>
      </div>
    )
  }
  return (
    <div className="grid grid-flow-row gap-4">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} loading={loading} setLoading={setLoading} />
      ))}
    </div>
  )
}