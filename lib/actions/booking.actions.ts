"use server";

import Booking from "@/database/booking.model";
import connectDB from "../mongodb";

export const createBooking = async ({
  eventId,
  email,
}: {
  eventId: string;
  email: string;
}) => {
  try {
    await connectDB();
    const bookingDoc = await Booking.create({ eventId, email });
    const booking = JSON.parse(JSON.stringify(bookingDoc));

    return {
      success: true,
      message: "Booking created successfully!",
      data: booking,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to create booking. ${JSON.stringify(error)}`,
      data: null,
    };
  }
};
