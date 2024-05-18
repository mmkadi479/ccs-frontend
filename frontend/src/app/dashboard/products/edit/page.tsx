import { notFound } from "next/navigation"
import EditProductForm from "~/app/_components/edit-product-form"
import { getProduct } from "~/server/actions/products"

export default async function EditProduct({
    searchParams
} : {
    searchParams: any
}) {
    const id = searchParams.id
    const product = await getProduct(id)

    if (!product) {
        return notFound()
    }

    return (
        <EditProductForm product={product} />
    )
}