"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await createBooking({
      eventId,
      email,
    });

    if (result.success) {
      setSubmitted(true);
      posthog.capture("event-booked", { eventId, slug, email });
    } else {
      posthog.captureException("Booking creation failed");
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-green-500">
          Thank you for booking your spot! We look forward to seeing you at the
          event.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex-col-gap-2">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
              id="email"
            />
          </div>
          <button type="submit" className="button-submit">
            Book Now
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
