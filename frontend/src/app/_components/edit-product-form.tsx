'use client'
import Image from "next/image"
import {
  ChevronLeft,
  PlusCircle,
  Upload,
} from "lucide-react"

// import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { Textarea } from "~/components/ui/textarea"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "~/components/ui/toggle-group"
import { useRouter, useSearchParams } from "next/navigation"
import { Product, editProduct } from "~/server/actions/products"
import { useState } from "react"

export default function EditProductForm({
  product
} : {
  product: Product
}) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        try {
          const form = event.currentTarget as HTMLFormElement
          const formData = new FormData(form)
          const name = formData.get('name') as string
          const description = formData.get('description') as string
          const price = formData.get('price') as string
          const status = formData.get('status') as any
          const editedProduct = { name, description, price, status }
          console.log(editedProduct)
          await editProduct(editedProduct, product.id as number)
          router.push('/dashboard/products')
        } catch (error) {
          setError('An error occured. Please try again')
          console.error(error)
        } finally {
          setLoading(false)
        }
    }

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <form className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4" onSubmit={handleSubmit}>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => router.back()}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm" onClick={() => router.back()}>
                  Discard
                </Button>
                <Button size="sm" type="submit">Save Product</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Enter the product name and a description.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          placeholder="Product name..."
                          name="name"
                          value={product.name}
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="numver"
                          className="w-full"
                          placeholder="Product name..."
                          name="price"
                          value={product.price}
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                          className="min-h-32 resize-none"
                          name="description"
                          value={product.description}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select name="status" defaultValue={product.status} required>
                          <SelectTrigger id="status" aria-label="Select status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {/* <SelectItem value="draft">Draft</SelectItem> */}
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="INACTIVE">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm" className="disabled:bg-gray-300" disabled={loading}>Save Product</Button>
            </div>
            {error && (
              <div className="grid gap-2 p-4 text-center text-red-700 bg-red-100 rounded-md">
                <span>{error}</span>
              </div>
            )}
          </form>
          
        </main>
    )
}