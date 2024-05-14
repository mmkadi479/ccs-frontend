'use server'

import { redirect } from 'next/navigation'
import { env } from '~/env'

const BASE_URL = env.API_URL

export interface User {
  id?: number
  name: string
  email: string
  password: string
  role: string
  orgName?: string
  orgId?: number
}

export const createUser = async (user: User) =>  {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  if (!response.ok) {
    throw new Error('Error creating user')
  }
  
  redirect('/login')
}

export const getUserByEmail = async (email: string) => {
  const response = await fetch(`${BASE_URL}?email=${email}`, {
    method: 'GET'
  })

  if (!response.ok) {
    throw new Error('Error logging in')
  }

  const users = await response.json()

  console.log('user: ', users);  

  if (users.length === 0) {
    throw new Error('invalid_email')
  }

  const user = users[0]

  return user
}