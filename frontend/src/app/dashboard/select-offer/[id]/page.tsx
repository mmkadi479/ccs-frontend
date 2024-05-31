import DeclineButton from "~/app/_components/decline-button"
import OffersList from "~/app/_components/offers-list"
import { getEventTiers } from "~/server/actions/events"

export default async function SelectOffersPage({
  params
} : {
  params: any
}) {
  const offers = await getEventTiers(params.id)

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h3 className="text-3xl font-bold">Select an offer</h3>
      <OffersList offers={offers} /> 
      <DeclineButton id={params.id} />
    </main>
  )
}