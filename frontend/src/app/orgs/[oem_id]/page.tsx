import { MessageCircleQuestion } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { z } from 'zod'
import { Button } from '~/components/ui/button'

import { 
  Card,
  CardHeader,
  CardDescription, 
  CardTitle,
  CardContent,
  CardFooter
} from "~/components/ui/card"
import { getOrg } from '~/server/actions/orgs'
import { getProducts } from '~/server/actions/products'

const Page = async ({
  params,
  searchParams
} : {
  params: any,
  searchParams: any
}) => {

  // validate params
  const ParamsSchema = z.object({
    oem_id: z.string()
  })

  const parsedParams = ParamsSchema.safeParse(params)

  if (!parsedParams.success) {
    return (
      notFound()
    )
  }

  const { oem_id } = parsedParams.data

  const orgId = parseInt(oem_id)

  const org = await getOrg(orgId)

  const client_email = searchParams['email']

  if (!org) {
    return (
      notFound()
    )
  }

  const products = await getProducts(true, orgId)

  return (
    <div className="p-16 space-y-8">
      <h1 className='text-2xl font-bold'>Products from {org.orgName}</h1>
      <div className='flex flex-wrap gap-4'>
      {
        products.length > 0 ? products.map(product => (
          <Card key={product.id} className="mb-4 w-[350px] flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{Number(product.price).toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{product.description}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/orgs/${orgId}/chat?product=${product.id}${client_email ? `&email=${client_email}` : ''}`}>
                <Button variant="link" className='p-0 text-slate-300'>
                  <MessageCircleQuestion size={32} />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )) : (
          <div className="flex justify-center items-center">
            <p className="text-center text-gray-500 dark:text-gray-400">No products found</p>
          </div>
        )
      }
      </div>
    </div>
  )
}

export default Page