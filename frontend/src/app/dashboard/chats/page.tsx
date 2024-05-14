/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NFd6EITLHtK
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { 
    DropdownMenuTrigger, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuCheckboxItem, 
    DropdownMenuContent, 
    DropdownMenu 
} from "~/components/ui/dropdown-menu"
import { 
    AvatarImage, 
    AvatarFallback, 
    Avatar 
} from "~/components/ui/avatar"
import Link from "next/link"
import { getChats } from "~/server/actions/chats"

export default async function ChatsPage() {
  const chats = await getChats()
  return (
    <div className="flex flex-col h-full">
      {/* <header className="bg-gray-100 dark:bg-gray-800 px-6 py-4 border-b">
        <h1 className="text-xl font-bold">Customer Chats</h1>
      </header> */}
      <div className="flex-1 p-6 space-y-6">
        <div className="space-y-4">
          {
            chats.length > 0 ? chats.map(chat => (
              <Link href={`/dashboard/chats/${chat.id}?client_email=${chat.client.email}&client_name=${chat.client.name}`} key={chat.id}>
                <div className="grid grid-cols-[40px_1fr_100px] items-center gap-4 mb-2 bg-white dark:bg-gray-950 p-4 rounded-md shadow-sm">
                  <Avatar className="w-10 h-10 bg-gray-200 dark:bg-gray-800">
                    <AvatarImage alt="Avatar" src={chat.avatar} />
                    <AvatarFallback>{chat.client.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{chat.client.name}</h3>
                    {/* <p className="text-sm text-gray-500 dark:text-gray-400">{chat.messages[0]}</p> */}
                  </div>
                  {/* <div className="text-right text-sm text-gray-500 dark:text-gray-400">{chat.date}</div> */}
                </div>
              </Link>
            )) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No chats found</p>
            )
          }
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FilterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}