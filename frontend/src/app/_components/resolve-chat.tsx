'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { resolveChat } from "~/server/actions/chats"

const ResolveChat = ({
  room
} : {
  room: any
}) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const resolve = async() => {
    setLoading(true)
    try {
      await resolveChat(room)
      router.refresh()
    } catch (error) {
      alert('An error occured. Please try again')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      onClick={resolve}
      disabled={loading}
      className={`${loading ? 'bg-slate-300 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Resolving...' : 'Resolve'}
    </Button>
  )
}

export default ResolveChat