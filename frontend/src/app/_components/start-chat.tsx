'use client'

import { set } from "date-fns"
import { redirect, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { createRoom } from "~/server/actions/chats"

export default function StartChat({
  params,
  client
}: {
  params: any,
  client: any
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const startChat = async () => {
    setLoading(true)
    try {
      const chat = await createRoom(params.oem_id, client.email)
      router.push(`/${params.oem_id}/chat/${chat.id}?email=${client.email}`)
    } catch (error) {
      setError('An error occured. Please try again')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button className={`my-4 ${loading ? 'bg-gray-300' : '' }`} onClick={() => startChat()} disabled={loading}>
      Start Chat
    </Button>
  )
}