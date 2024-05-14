'use client'
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"

// import { login } from "~/server/actions/auth"
import { signIn } from 'next-auth/react'

import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { useState } from "react"
import { getOrCreateClient } from "~/server/actions/clients"
import { createRoom } from "~/server/actions/chats"

export default function ClientLoginForm() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const productId = searchParams.get('product')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    setLoading(true)

    try {
      await getOrCreateClient(name, email)
      if (productId) {
        console.log('doing this...')
        
        const room = await createRoom(Number(params.oem_id), email, Number(productId))
        router.push(`/orgs/${params.oem_id}/chat/${room.id}?email=${email}`)
        return
      }
      router.push(`/orgs/${params.oem_id}/chat?email=${email}`)
    } catch (error) {
      setError('An error occured. Please try again')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        {/* <CardTitle className="text-2xl">Login</CardTitle> */}
        <CardDescription>
          Enter your name and email address below to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="name"
              name="name"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className={`w-full ${loading ? 'bg-gray-300' : ''}`} disabled={loading}>
            Continue {loading && "..."}
          </Button>
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </form>
      </CardContent>
    </Card>
  )
}
