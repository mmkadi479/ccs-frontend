'use client'

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { sendChat } from "~/server/actions/chats"

export default function OrgSendMessage({
  roomId,
  orgId
} : {
  roomId: number,
  orgId: number
}) {

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const sendMessage = async() => {
    // Send message
    setLoading(true)
    try {
      await sendChat(roomId, message, orgId)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
    <Input className="flex-1" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." type="text" />
    <Button 
      onClick={sendMessage}
      disabled={loading}
      className={`${loading ? 'bg-blue-300' : ''}`}
    >
      Send
    </Button>
    </>
  )
}