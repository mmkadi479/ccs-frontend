'use server'

import { env } from "~/env"
import { getServerAuthSession } from "../auth"
import { revalidatePath } from "next/cache"

const BASE_URL = env.API_URL

export async function createRoom(orgId: number, email: string) {
  const res = await fetch(`${BASE_URL}${orgId}/complaint-rooms?clientEmail=${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error('Failed to create room')
  }

  const room = await res.json()

  return room

}

export async function getChats() {
  const session = await getServerAuthSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${BASE_URL}${session.user.id}/complaint-rooms`)

  if (res.status === 404) {
    return []
  }

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  const chats: any[] = await res.json()

  return chats
}

export async function getOpenChats() {
  const session = await getServerAuthSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${BASE_URL}${session.user.id}/complaint-rooms?status=OPEN`)

  if (res.status === 404) {
    return []
  }

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  const chats: any[] = await res.json()

  return chats
}

export async function getClosedChats() {
  const session = await getServerAuthSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${BASE_URL}${session.user.id}/complaint-rooms?status=CLOSED`)

  if (res.status === 404) {
    return []
  }

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  const chats: any[] = await res.json()

  return chats
}

export async function getClientChats(orgId: number, email: string) {
  const res = await fetch(`${BASE_URL}complaint-rooms?clientEmail=${email}&orgId=${orgId}`)

  if (res.status === 404) {
    return []
  }

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  const chats: any[] = await res.json()

  return chats
}

export async function getChat(orgId: number, chatId: number) {
  const res = await fetch(`${BASE_URL}${Number(orgId)}/complaint-rooms/${Number(chatId)}`)

  if (res.status === 404) {
    return []
  }

  if (!res.ok) {
    throw new Error('Failed to fetch chat')
  }

  const chat: any[] = await res.json()

  return chat
}

export async function sendChat(roomId: number, message: string, orgId: number, clientEmail?: string) {
  console.log('url', `${BASE_URL}${orgId}/complaint-rooms/${roomId}?${!!clientEmail ? `clientEmail=${clientEmail}` : `orgId=${orgId}`}`);
  
  const res = await fetch(`${BASE_URL}${orgId}/complaint-rooms/${roomId}?${!!clientEmail ? `clientEmail=${clientEmail}` : `orgId=${orgId}`}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: message
  })

  if (!res.ok) {
    throw new Error('Failed to send message')
  }

  const chat: any = await res.json()

  revalidatePath(`/${orgId}/chat/${roomId}`)
  revalidatePath(`/dashboard/chats/${roomId}`)

  return chat
}