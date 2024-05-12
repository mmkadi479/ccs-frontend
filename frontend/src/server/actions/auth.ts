'use server'

import { env } from '~/env'

const BASE_URL = env.API_URL

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