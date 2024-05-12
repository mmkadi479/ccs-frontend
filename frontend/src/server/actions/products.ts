'use server'

import { env } from "~/env"
import { getServerAuthSession } from "../auth"

const BASE_URL = env.API_URL

export interface Product {
  name: string 
  description: string 
  price: string
  status: string
}

export async function getProducts() {
  const session = await getServerAuthSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${BASE_URL}${session.user.id}/products`)

  if (res.status === 404) {
    return []
  }

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  const products: any[] = await res.json()

  return products
}

export async function getActiveProducts() {
  const session = await getServerAuthSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${BASE_URL}${session.user.id}/products?status=ACTIVE`)

  if (res.status === 404) {
    return []
  }

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  const products: any[] = await res.json()

  return products
}

export async function getInActiveProducts() {
  const session = await getServerAuthSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${BASE_URL}${session.user.id}/products?status=INACTIVE`)

  if (res.status === 404) {
    return []
  }

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  const products: any[] = await res.json()

  return products
}

export async function addProduct(product: Product) {
  const session = await getServerAuthSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${BASE_URL}${session.user.id}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': product.name,
      'description': product.description,
      'price': product.price,
      'status': product.status
    })
  })

  if (!res.ok) {
    throw new Error('Failed to add product')
  }

  const addedProduct: any = await res.json()

  return addedProduct
}