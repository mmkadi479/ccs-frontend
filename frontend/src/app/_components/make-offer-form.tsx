"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { createEventPackageTier, createEventRequest } from "~/server/actions/events"
import { TEventRequestSize } from "~/server/types"

const formSchema = z.object({
  bronze_price: z
    .string({
      invalid_type_error: 'Please enter a valid price for bronze'
    })
    .refine(value => !isNaN(Number(value)), { message: "Please enter a valid price for bronze" })
    .transform(value => Number(value)),
  silver_price: z
    .string({
      invalid_type_error: 'Please enter a valid price for silver'
    })
    .refine(value => !isNaN(Number(value)), { message: "Please enter a valid price for silver" })
    .transform(value => Number(value)),
  gold_price: z
    .string({
      invalid_type_error: 'Please enter a valid price for gold'
    })
    .refine(value => !isNaN(Number(value)), { message: "Please enter a valid price for gold" })
    .transform(value => Number(value)),
  platinum_price: z
    .string({
      invalid_type_error: 'Please enter a valid price for platinum'
    })
    .refine(value => !isNaN(Number(value)), { message: "Please enter a valid price for platinum" })
    .transform(value => Number(value)),
})

export default function MakeAnOfferForm() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bronze_price: 0,
      silver_price: 0,
      gold_price: 0,
      platinum_price: 0,
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true)
    console.log(values)

    try {
      // await createEventRequest({ 
      //   ...values, 
      //   size: submitSize
      // })
      const createBronze = await createEventPackageTier({
        type: 0,
        price: values.bronze_price
      }, params.id as any)

      const createSilver = await createEventPackageTier({
        type: 1,
        price: values.silver_price
      }, params.id as any)

      const createGold = await createEventPackageTier({
        type: 2,
        price: values.gold_price
      }, params.id as any)

      const createPlatinum = await createEventPackageTier({
        type: 3,
        price: values.platinum_price
      }, params.id as any)

      await Promise.all([createBronze, createSilver, createGold, createPlatinum])

      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const eventSizeOptions = [
    { label: "Small", value: 0 },
    { label: "Medium", value: 1 },
    { label: "Large", value: 2 },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="bronze_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bronze</FormLabel>
              <FormControl>
                <Input placeholder="Enter price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="silver_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Silver</FormLabel>
              <FormControl>
                <Input placeholder="Enter price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />

        <FormField
          control={form.control}
          name="gold_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gold</FormLabel>
              <FormControl>
                <Input placeholder="Enter price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />

        <FormField
          control={form.control}
          name="platinum_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platinum</FormLabel>
              <FormControl>
                <Input placeholder="Enter price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <Button type="submit" disabled={loading}>{loading ? '...' : 'Submit'}</Button>
      </form>
    </Form>
  )
}
