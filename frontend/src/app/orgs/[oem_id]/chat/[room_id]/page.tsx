import Link from "next/link";
import CustomerSideChat from "~/app/_components/customer-side-chat";
import { getChat, getChatInfo } from "~/server/actions/chats";

export default async function RoomChat({
  params
} : {
  params: any
}) {
  const roomInfo  = await getChatInfo(params.oem_id, params.room_id)
  const messages = await getChat(params.oem_id, params.room_id)
  const oem_id = params.oem_id

  return (
    <>
    <CustomerSideChat roomInfo={roomInfo} messages={messages} />
    </>
  )
}