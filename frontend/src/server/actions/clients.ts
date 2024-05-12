'use server'

import { env } from "~/env"
import { getServerAuthSession } from "../auth"

const BASE_URL = env.API_URL

export async function getOrCreateClient(name: string, email: string) {
  const res = await fetch(`${BASE_URL}clients/${email}`)  

  if (res.status === 404) {
    return createClient(name, email)
  }

  if (!res.ok) {
    throw new Error('Failed to fetch client')
  }  

  console.log('Checking client', res.status);
  

  const client: any = await res.json()

  if (client) {
    return client
  }
}

export async function createClient(name: string, email: string) {
  console.log('Creating client');
  
  const res = await fetch(`${BASE_URL}clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email
    })
  })

  if (!res.ok) {
    throw new Error('Failed to create client')
  }

  const client = await res.json()

  return client
}

export async function getClient(email: string) {
  const res = await fetch(`${BASE_URL}clients/${email}`)  
  
  if (!res.ok) {
    throw new Error('Failed to fetch client')
  }  

  console.log('Checking client', res.status);
  

  const client: any = await res.json()

  return client
}

export async function getClients() {
  const session = await getServerAuthSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${BASE_URL}${session.user.id}/clients`)

  console.log('Failed to fetch clients', res.status);

  if (res.status === 404) {
    return []
  }
  
  if (!res.ok) {    
    throw new Error('Failed to fetch clients')
  }

  const clients: any[] = await res.json()

  return clients
}