import Link from "next/link";
import { redirect } from "next/navigation";
import ClientLoginForm from "~/app/_components/client-form";
import CustomerSideChat from "~/app/_components/customer-side-chat";
import StartChat from "~/app/_components/start-chat";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { createRoom, getClientChats } from "~/server/actions/chats";
import { getClient } from "~/server/actions/clients";

export default async function ChatWithOEM({
  params,
  searchParams
} : {
  params: any, 
  searchParams: any
}) {

  const email = searchParams['email']

  if (email) {
    const client = await getClient(email)
    const chats: any[] = await getClientChats(params.oem_id, client.email)

    return (
      <div className="p-16 w-full h-full">
        <p>{client.name}</p>
        <p>{client.email}</p>
        <StartChat params={params} client={client} />
      {
        chats.length > 0 ? chats.map(chat => (
          <Link href={`/${params.oem_id}/chat/${chat.id}?email=${client.email}`} key={chat.id}>
            <div className="grid grid-cols-[40px_1fr_100px] items-center gap-4 bg-white dark:bg-gray-950 p-4 rounded-md shadow-sm">
              <Avatar className="w-10 h-10 bg-gray-200 dark:bg-gray-800">
                <AvatarImage alt="Avatar" src={chat.avatar} />
                <AvatarFallback>{chat.client.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">ID: {chat.id}</h3>
                {/* <p className="text-sm text-gray-500 dark:text-gray-400">{chat.messages[0]}</p> */}
              </div>
              {/* <div className="text-right text-sm text-gray-500 dark:text-gray-400">{chat.date}</div> */}
            </div>
          </Link>
        )) : (
          <div className="flex flex-1 justify-center items-center">
            <p className="text-center text-gray-500 dark:text-gray-400">No chats found</p>
          </div>
        )
      }
      </div>
    )
  }
  
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
        <ClientLoginForm />
    </div>
  )
}