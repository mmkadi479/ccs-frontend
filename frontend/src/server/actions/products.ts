'use server'

import { env } from "~/env"
import { getServerAuthSession } from "../auth"
import { revalidatePath, revalidateTag } from "next/cache"
import { DATA_TAGS } from "~/lib/constants"

const BASE_URL = env.API_URL

export interface Product {
  id?: number
  name: string 
  description: string 
  price: string
  status: 'ACTIVE' | 'INACTIVE'
}

export async function getProduct(productId: number, client_side: boolean = false, orgId?: number) {
  if (client_side) {
    const res = await fetch(`${BASE_URL}${orgId}/products/${productId}`, {
      next: { tags: [DATA_TAGS.products] },
    })

    if (res.status === 404) {
      return null
    }

    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }

    const product: Product = await res.json()

    return product
  }

  const session = await getServerAuthSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${BASE_URL}${session.user.id}/products/${productId}`, {
    next: { tags: [DATA_TAGS.products] },
  })

  if (res.status === 404) {
    return null
  }

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  const product: Product = await res.json()

  return product
}

export async function getProducts(client_side: boolean = false, orgId?: number) {
  if (client_side) {
    const res = await fetch(`${BASE_URL}${orgId}/products`, {
      next: { tags: [DATA_TAGS.products] },
    })

    if (res.status === 404) {
      return []
    }

    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }

    const products: any[] = await res.json()

    return products.filter((product) => product.status === 'ACTIVE')
  }

  const session = await getServerAuthSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${BASE_URL}${session.user.id}/products`, {
    next: { tags: [DATA_TAGS.products] },
  })

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

  const res = await fetch(`${BASE_URL}${session.user.id}/products?status=ACTIVE`, {
    next: { tags: [DATA_TAGS.active_products] },
  })

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

  const res = await fetch(`${BASE_URL}${session.user.id}/products?status=INACTIVE`, {
    next: { tags: [DATA_TAGS.inactive_products] },
  })

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

  revalidatePath(`/${session.user.id}/dashboard/products`)
  revalidatePath(`/${session.user.id}`)
  revalidateTag(DATA_TAGS.products)
  revalidateTag(DATA_TAGS.active_products)
  revalidateTag(DATA_TAGS.inactive_products)

  const addedProduct: any = await res.json()

  return addedProduct
}

export async function editProduct(product: Product, id: number) {
  const session = await getServerAuthSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${BASE_URL}${session.user.id}/products/${id}`, {
    method: 'PUT',
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

  revalidatePath(`/${session.user.id}/dashboard/products`)
  revalidatePath(`/${session.user.id}`)
  revalidateTag(DATA_TAGS.products)
  revalidateTag(DATA_TAGS.active_products)
  revalidateTag(DATA_TAGS.inactive_products)

  const editedProduct: any = await res.json()

  return editedProduct
}

export async function deleteProduct(id: number) {
  const session = await getServerAuthSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${BASE_URL}${session.user.id}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  if (!res.ok) {
    throw new Error('Failed to add product')
  }

  revalidatePath(`/${session.user.id}/dashboard/products`)
  revalidatePath(`/${session.user.id}`)
  revalidateTag(DATA_TAGS.products)
  revalidateTag(DATA_TAGS.active_products)
  revalidateTag(DATA_TAGS.inactive_products)
}