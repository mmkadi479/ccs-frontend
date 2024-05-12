import Header from "../_components/header"
import SideNav from "../_components/side-nav"

export default function DashboardLayout({
    children
} : {
    children: React.ReactNode
}) {
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
