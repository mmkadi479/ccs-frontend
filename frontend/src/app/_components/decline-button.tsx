'use client'

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { declineEvent } from "~/server/actions/events"

export default function DeclineButton({
  id
} : {
  id: number
}) {
  const [declineLoading, setDeclineLoading] = useState(false)

  const handleDecline = async () => {
    setDeclineLoading(true)
    try {
      await declineEvent(id)
    } catch (error) {
      alert('Failed to decline event')
      console.error(error)
    } finally {
      setDeclineLoading(false)
    }
  }

  return (
    <Button variant="destructive" className="w-full" onClick={handleDecline} disabled={declineLoading}>
      { declineLoading ? 'Declining...' : 'Decline'}
    </Button>
  )
}