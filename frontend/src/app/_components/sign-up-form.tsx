"use client"
import { TabsContent } from "@radix-ui/react-tabs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { z } from 'zod'

import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { createUser } from "~/server/actions/auth"

export default function SignUpForm() {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const SignUpSchema = z.object({
        email: z.string({
            message: 'Invalid email format',
            required_error: 'Email is required',
        }).email(),
        password: z.string({
            required_error: 'Password is required',
        }).min(6, 'Password must be at least 6 characters'),
        cpassword: z.string({
            required_error: 'Password confirmation is required',
        }).min(6, 'Password must be at least 6 characters'),
        firstName: z.string({
            required_error: 'First name is required',
        }),
        lastName: z.string({
            required_error: 'Last name is required',
        }),
        role: z.enum(['client', 'org']),
        orgName: z.string({
            required_error: 'Organisation name is required',
        }).optional(),
    }).refine(data => data.password === data.cpassword, {
        message: 'Passwords do not match',
        path: ['cpassword'],
    }).refine(data => !(data.role === 'org' && !data.orgName), {
        message: 'Organisation name is required',
        path: ['orgName'],
    })

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const firstName = formData.get('firstName') as string
        const lastName = formData.get('lastName') as string
        const orgName = formData.get('orgName') as string || ''
        const cpassword = formData.get('cpassword') as string
        const role = formData.get('role') as string
        console.log('role', role)

        const parsedData = SignUpSchema.safeParse({
            email,
            password,
            firstName,
            lastName,
            orgName,
            cpassword,
            role
        })

        if (!parsedData.success) {
            console.log('errors', parsedData.error.flatten())
            setError(parsedData.error?.errors[0]?.message as string)
            console.error('Invalid form data')
            return
        }

        try {
            await createUser({ 
                email: parsedData.data.email,
                password: parsedData.data.password,
                name: `${parsedData.data.firstName} ${parsedData.data.lastName}`,
                orgName: parsedData.data.orgName,
                role: parsedData.data.role
            })
            router.push('/login')
        } catch (error) {
            setError('An error occurred. Please try again later.')
            console.error('Error creating user', error)
        }
    }

    return (
        <Tabs defaultValue="client">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client">Client</TabsTrigger>
                <TabsTrigger value="org">Organisation</TabsTrigger>
            </TabsList>
            <TabsContent value="client">
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Sign Up</CardTitle>
                        <CardDescription>
                        Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-4" onSubmit={handleSignUp}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" placeholder="Max" name="firstName" required />
                            </div>
                            <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" placeholder="Robinson" name="lastName" required />
                            </div>
                        </div>
                        <input type="text" className="hidden" name="role" value="client" />
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" name="password" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="cpassword">Confirm Password</Label>
                            <Input id="cpassword" type="password" name="cpassword" required />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <Button 
                            type="submit" 
                            className={`w-full ${loading ? 'w-full bg-gray-300 cursor-not-allowed hover:bg-gray-300 shadow-none text-gray-800 hover:text-gray-800' : ''}`}
                            disabled={loading}
                        >
                            {loading ? '...' : 'Create an account'}
                        </Button>
                        </form>
                        <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Sign in
                        </Link>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="org">
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Sign Up</CardTitle>
                        <CardDescription>
                        Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-4" onSubmit={handleSignUp}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" placeholder="Max" name="firstName" required />
                            </div>
                            <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" placeholder="Robinson" name="lastName" required />
                            </div>
                        </div>
                        <input type="text" className="hidden" name="role" value="org" />
                        <div className="grid gap-2">
                            <Label htmlFor="orgname">Organisation Name</Label>
                            <Input
                                id="orgname"
                                placeholder="Example Inc."
                                name="orgName"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" name="password" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="cpassword">Confirm Password</Label>
                            <Input id="cpassword" type="password" name="cpassword" required />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <Button 
                            type="submit" 
                            className={`w-full ${loading ? 'w-full bg-gray-300 cursor-not-allowed hover:bg-gray-300 shadow-none text-gray-800 hover:text-gray-800' : ''}`}
                            disabled={loading}
                        >
                            {loading ? '...' : 'Create an account'}
                        </Button>
                        {/* <Button variant="outline" className="w-full">
                            Sign up with GitHub
                        </Button> */}
                        </form>
                        <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Sign in
                        </Link>
                        </div>
                    </CardContent>
                </Card>
        </TabsContent>
        </Tabs>
    )
}