import { redirect } from 'next/navigation'
import React from 'react';

import { getServerAuthSession } from "~/server/auth";

export default async function AuthLayout({
  children
} : {
  children: React.ReactNode
}) {
  const session = await getServerAuthSession()

  if (session) {
    return redirect("/dashboard")
  }

  return (
    <>
    {children}
    </>
  )
}