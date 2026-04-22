import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const page = async () => {
  "use cache";
  cacheLife("hours");

  if (!BASE_URL) {
    console.error("NEXT_PUBLIC_BASE_URL is not defined!");
    // You can return a fallback UI or an error message here
    return <div>Configuration error: Base URL missing.</div>;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/events`);
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }
    const { events } = await response.json();

    return (
      <section>
        <h1 className="text-center">
          Welcome to the Dev Event you would like to grow with
        </h1>
        <p className="text-center mt-4">
          Join us for an unforgettable experience where you'll learn, connect,
          and grow as a developer. Don't miss out on this opportunity to be part
          of the ultimate Next.js development event!
        </p>
        <ExploreBtn />
        <div className="mt-20 space-y-7">
          <h3>Featured Event</h3>
          <ul className="events">
            {events &&
              events.length > 0 &&
              events.map((event: IEvent) => (
                <li key={event.title}>
                  <EventCard {...event} />
                </li>
              ))}
          </ul>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return <div>Error loading events.</div>;
  }
};

export default page;
