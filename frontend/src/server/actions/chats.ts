'use server'

import { env } from "~/env"
import { getServerAuthSession } from "../auth"
import { revalidatePath, revalidateTag } from "next/cache"
import { DATA_TAGS } from "~/lib/constants"

const BASE_URL = env.API_URL

export async function createRoom(orgId: number, email: string, productId?: number) {
  if (productId) {
    const res = await fetch(`${BASE_URL}${orgId}/complaint-rooms?clientEmail=${email}&productId=${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      throw new Error('Failed to create room')
    }

    revalidatePath(`/dashboard/chats`)
    revalidatePath(`/${orgId}/chats`)
    revalidateTag(DATA_TAGS.complaint_rooms)
    revalidateTag(DATA_TAGS.client_complaint_rooms)
    revalidateTag(DATA_TAGS.open_chats)
    revalidateTag(DATA_TAGS.closed_chats)

    const room = await res.json()

    return room
  }
  const res = await fetch(`${BASE_URL}${orgId}/complaint-rooms?clientEmail=${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error('Failed to create room')
  }

  revalidatePath(`/dashboard/chats`)
  revalidatePath(`/${orgId}/chats`)
  revalidateTag(DATA_TAGS.complaint_rooms)
  revalidateTag(DATA_TAGS.client_complaint_rooms)
  revalidateTag(DATA_TAGS.open_chats)
  revalidateTag(DATA_TAGS.closed_chats)

  const room = await res.json()

  return room

}

export async function resolveChat(room: any) {
  const session = await getServerAuthSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const orgId = session.user.id

  room.status = 'CLOSED'

  const res = await fetch(`${BASE_URL}${orgId}/complaint-rooms`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(room)
  })

  if (!res.ok) {
    throw new Error('Failed to create room')
  }

  revalidatePath(`/dashboard/chats`)
  revalidatePath(`/${orgId}/chats`)
  revalidateTag(DATA_TAGS.complaint_rooms)
  revalidateTag(DATA_TAGS.client_complaint_rooms)
  revalidateTag(DATA_TAGS.open_chats)
  revalidateTag(DATA_TAGS.closed_chats)

  const updated_room = await res.json()

  return updated_room

}

export async function getChats() {
  const session = await getServerAuthSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${BASE_URL}${session.user.id}/complaint-rooms`, {
    next: { tags: [DATA_TAGS.complaint_rooms] }
  })

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

  const res = await fetch(`${BASE_URL}${session.user.id}/complaint-rooms?status=OPEN`, {
    next: { tags: [DATA_TAGS.open_chats] }
  })

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

  const res = await fetch(`${BASE_URL}${session.user.id}/complaint-rooms?status=CLOSED`, {
    next: { tags: [DATA_TAGS.closed_chats] }
  })

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
  const res = await fetch(`${BASE_URL}complaint-rooms?clientEmail=${email}&orgId=${orgId}`, {
    next: { tags: [DATA_TAGS.client_complaint_rooms]}
  })

  if (res.status === 404) {
    return []
  }

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  const chats: any[] = await res.json()

  return chats
}

export async function getChatInfo(orgId: number, chatId: number) {
  const res = await fetch(`${BASE_URL}${Number(orgId)}/complaint-rooms/${Number(chatId)}/info`, {
    next: { tags: [DATA_TAGS.complaint_room]}
  })

  if (res.status === 404) {
    return []
  }

  if (!res.ok) {
    throw new Error('Failed to fetch chat')
  }

  const chat: any = await res.json()

  return chat
}

export async function getChat(orgId: number, chatId: number) {
  const res = await fetch(`${BASE_URL}${Number(orgId)}/complaint-rooms/${Number(chatId)}`, {
    next: { tags: [DATA_TAGS.chats]}
  })

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
  revalidatePath(`/dashboard/chats`)
  revalidatePath(`/dashboard/chats/${roomId}`)
  revalidateTag(DATA_TAGS.chats)

  return chat
}