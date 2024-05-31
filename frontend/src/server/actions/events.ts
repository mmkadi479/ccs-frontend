'use server'

import { env } from "~/env"
import { getServerAuthSession } from "../auth"

const BASE_URL = env.API_URL

import { TEventPackageTierType, TEventRequestSize, TEventRequestStatus } from "../types"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

interface ICreateEventRequest {
  no_guests: number
  date: string
  no_drinks: number
  location: string
  theme: string
  size: TEventRequestSize
}

interface ICreateEventPackageTier {
  type: TEventPackageTierType
  price: number
}

export async function getAdminEvents() {
  const response = await fetch(`${BASE_URL}event-requests`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }

  const eventRequests: any[] = await response.json()

  return eventRequests.reverse()
}

export async function getClientEventRequests() {
  const session = await getServerAuthSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const clientId = session.user.id

  const response = await fetch(`${BASE_URL}event-requests?userId=${clientId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  console.log('response', response);
  
  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }

  const eventRequests: any[] = await response.json()

  return eventRequests.reverse()
}

export async function createEventRequest(data: ICreateEventRequest) {
  const session = await getServerAuthSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const userId = session.user.id

  const response = await fetch(`${BASE_URL}event-requests?userId=${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, status: TEventRequestStatus.PENDING }),
  })

  if (!response.ok) {
    throw new Error('Failed to create event request')
  }

  return response.json()
}

export async function createEventPackageTier(data: ICreateEventPackageTier, eventRequestId: number) {
  const response = await fetch(`${BASE_URL}event-requests/${eventRequestId}/tiers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create event package tier')
  }

  return response.json()
}

export async function getEventTiers(eventRequestId: number) {
  const response = await fetch(`${BASE_URL}event-requests/${eventRequestId}/tiers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch event tiers')
  }

  return response.json()
}

export async function selectTier(eventRequestId: number, tierId: number) {
  const response = await fetch(`${BASE_URL}event-requests/${eventRequestId}/select-tier?tierId=${tierId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to select tier')
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')

  return response.json()

}

export async function declineEvent(eventId: number) {
  const response = await fetch(`${BASE_URL}event-requests/${eventId}/decline-event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to decline event')
  }

  revalidatePath('/dashboard')

  return response.json()
}

// export async function approveEvent(eventId: number) {
//   const response = await fetch(`${BASE_URL}event-requests/${eventId}/approve`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })

//   if (!response.ok) {
//     throw new Error('Failed to approve event')
//   }

//   return response.json()
// }