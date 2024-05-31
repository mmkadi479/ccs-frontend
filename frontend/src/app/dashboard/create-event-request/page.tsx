import CreateEventRequestForm from "~/app/_components/create-event-request-form";

export default async function CreateEventRequestPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h3 className="text-3xl font-bold">Create Event Request</h3>
      <CreateEventRequestForm />
    </main>
  )
}