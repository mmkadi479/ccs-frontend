import { AvatarImage, AvatarFallback, Avatar } from "~/components/ui/avatar"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { getChat } from "~/server/actions/chats"
import { getServerSession } from "next-auth"
import { getServerAuthSession } from "~/server/auth"
import OrgSendMessage from "~/app/_components/org-send-message"

export default async function Component({
  params,
  searchParams
} : {
  params: any,
  searchParams: any
}) {
  const session = await getServerAuthSession()

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  if (!params.id) {
    return {
      notFound: true
    }
  }

  // console.log('params', params);
  // console.log('session', session);

  const client_name = searchParams.client_name
  const client_email = searchParams.client_email
  // console.log('client_name', client_name);   

  const messages = await getChat(session?.user.id as number, parseInt(params.id))

  console.log('messages', messages);


  return (
    <div className="flex h-screen w-full flex-col">
      <header className="flex items-center gap-4 border-b bg-gray-100/40 px-6 py-3 dark:bg-gray-800/40">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage alt="Customer Avatar" src="/placeholder-avatar.jpg" />
            <AvatarFallback>{client_name[0]}</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 text-sm">
            <div className="font-medium">{client_name}</div>
            <div className="text-gray-500 dark:text-gray-400">Customer</div>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4">
        <div className="grid gap-4">
          {
            messages.map((message, index) => (
              <div key={index} className={`grid gap-2 ${message.client != null ? 'justify-end' : ''}`}>
                <div className={`rounded-lg ${message.client != null ? 'bg-gray-100' : 'bg-blue-500'} p-4 text-sm`}>
                  <p>{message.message}</p>
                </div>
              </div>
            ))
          }
        </div>
      </main>
      <footer className="flex items-center gap-2 border-t bg-gray-100/40 px-6 py-3 dark:bg-gray-800/40">
        <OrgSendMessage orgId={session.user.id} roomId={params.id} />
      </footer>
    </div>
  )
}