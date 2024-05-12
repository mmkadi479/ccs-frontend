import SessionProvider from './SessionProvider'
import { getServerSession } from "next-auth"
import { TooltipProvider } from "~/components/ui/tooltip"

export default async function Providers({
    children
} : {
    children: React.ReactNode
}) {
    const session = await getServerSession()

    return (
        <SessionProvider session={session}>
            <TooltipProvider>
                {children}
            </TooltipProvider>
        </SessionProvider>
    )
}