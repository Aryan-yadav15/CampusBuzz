// app/event/[id]/page.tsx
import { getEventById, getRelatedEventsByCategory } from "@/lib/actions/event.actions";
import Collection from "@/components/shared/Collection";
import EventDetailsClient from "./EventDeatilsClient";

export const dynamic = "force-dynamic"; // Ensure this page uses server-side rendering

const EventDetails = async ({ params: { id }, searchParams }: any) => {
  // Fetch event details (server-side)
  const event = await getEventById(id);

  // Fetch related events (server-side)
  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <EventDetailsClient event={event} />
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>
        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventDetails;
