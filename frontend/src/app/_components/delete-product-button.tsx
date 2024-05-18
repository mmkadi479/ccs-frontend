'use client'

import { DropdownMenuItem } from "~/components/ui/dropdown-menu"
import { deleteProduct } from "~/server/actions/products"

export default function DeleteProductButton({
  id
} : {
  id: number
}) {
  return (
    <DropdownMenuItem onClick={() => deleteProduct(id)}>Delete</DropdownMenuItem>
  )
}