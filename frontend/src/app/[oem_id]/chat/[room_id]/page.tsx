import CustomerSideChat from "~/app/_components/customer-side-chat";
import { getChat } from "~/server/actions/chats";

export default async function RoomChat({
  params
} : {
  params: any
}) {
  const messages = await getChat(params.oem_id, params.room_id)

  return (
    <CustomerSideChat messages={messages} />
  )
}