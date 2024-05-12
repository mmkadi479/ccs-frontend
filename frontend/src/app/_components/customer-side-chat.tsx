'use client'
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { useParams, useSearchParams } from "next/navigation"
import { useState } from "react"
import { sendChat } from "~/server/actions/chats"

export default function CustomerSideChat({
  messages
} : {
  messages: any[]
}) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const params = useParams()
  const sendMessage = async() => {
    setLoading(true)
    try {
      console.log('client email', searchParams.get('email'));
      
      await sendChat((params as any).room_id, message, (params as any).oem_id, searchParams.get('email') || undefined)
      setMessage('')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <header className="flex items-center justify-between bg-gray-900 px-4 py-3 text-white shadow-md">
        <div className="flex items-center">
          <TextIcon className="mr-2 h-6 w-6" />
          <h1 className="text-lg font-medium">Customer Support</h1>
        </div>
        <div className="flex items-center">
          <MountainIcon className="mr-2 h-6 w-6" />
          <span className="text-sm">Acme Inc</span>
        </div>
      </header>
      <main className="flex-1 bg-gray-100 dark:bg-gray-800 p-4">
        <div className="h-[500px] overflow-y-auto rounded-lg bg-white p-4 shadow-md dark:bg-gray-950">
          <div className="flex flex-col gap-4">
            {
              messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-3 ${message.client != null ? 'justify-end' : ''}`}>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[70%]">
                    <p className="text-sm">
                      {message.message}
                    </p>
                  </div>
                </div>
              ))
            }
            {/* <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage alt="Customer Avatar" src="/placeholder-avatar.jpg" />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[70%]">
                <p className="text-sm">
                  Hello, how can I assist you today? I'm here to help with any questions or issues you may have.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-gray-900 text-white rounded-lg p-3 max-w-[70%]">
                <p className="text-sm">
                Hi there, I'm having an issue with my order.
                </p>
              </div>
              <Avatar className="h-10 w-10">
                <AvatarImage alt="Customer Avatar" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div> */}
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 dark:bg-gray-800 px-4 py-3 shadow-md">
        <form className="flex items-center gap-2">
          <Input
            className="flex-1 rounded-lg bg-white px-4 py-2 text-sm shadow-sm dark:bg-gray-950 dark:text-gray-300"
            placeholder="Type your message..."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button 
            type="submit" 
            className={`${loading ? 'bg-grey-300' : ''}`} 
            onClick={(e) => {
              e.preventDefault()
              sendMessage()
            }} 
            variant="default" 
            disabled={loading}
          >
            Send {loading && 'ing...'}
          </Button>
        </form>
      </footer>
    </>
  )
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function TextIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  )
}