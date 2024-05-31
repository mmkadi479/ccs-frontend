import { getServerAuthSession } from "~/server/auth"
import Header from "../_components/header"
import SideNav from "../_components/side-nav"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
    children
} : {
    children: React.ReactNode
}) {
  const session = await getServerAuthSession()
  if (!session?.user) redirect('/login')
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        {children}
      </div>
    </div>
  )
}
