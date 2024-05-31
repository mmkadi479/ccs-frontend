"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
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
import { createEventRequest } from "~/server/actions/events"
import { TEventRequestSize } from "~/server/types"

const formSchema = z.object({
  no_guests: z
    .string()
    .refine(value => !isNaN(Number(value)), { message: "Please enter a valid number of guests" })
    .transform(value => Number(value)),
  date: z.string({
    message: "Please enter a date",
  }),
  no_drinks: z
    .string()
    .refine(value => !isNaN(Number(value)), { message: "Please enter a valid number of drinks" })
    .transform(value => Number(value)),
  location: z.string({
    message: "Please enter a location",
  }),
  theme: z.string({
    message: "Please enter a theme",
  }),
  size: z.enum([TEventRequestSize.SMALL.toString(), TEventRequestSize.MEDIUM.toString(), TEventRequestSize.LARGE.toString()], {
    message: "Please select a size",
  }),
})

export default function CreateEventRequestForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      no_guests: 0,
      date: "",
      no_drinks: 0,
      location: "",
      theme: "",
      size: "SMALL",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true)
    console.log(values)
    let submitSize;
    switch (values.size) {
      case "SMALL":
        submitSize = 0;
        break;
      case "MEDIUM":
        submitSize = 1;
        break;
      case "LARGE":
        submitSize = 2;
        break;
      default:
        submitSize = 0;
    }
    try {
      await createEventRequest({ 
        ...values, 
        size: submitSize
      })

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
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <FormControl>
                <Input placeholder="Enter the theme" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter the location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input placeholder="Enter the date" type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="no_guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No Guests</FormLabel>
              <FormControl>
                <Input placeholder="Enter the number of guests" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="no_drinks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No Drinks</FormLabel>
              <FormControl>
                <Input placeholder="Enter the number of drinks" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <Controller
                  name="size"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the size of the event" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventSizeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
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
