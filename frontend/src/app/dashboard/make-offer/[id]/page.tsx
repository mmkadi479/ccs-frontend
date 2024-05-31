import MakeAnOfferForm from "~/app/_components/make-offer-form";

export default function MakeOfferPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <h3 className="text-3xl font-bold">Make an offer for this event</h3>
        <MakeAnOfferForm />
    </main>
  )
}