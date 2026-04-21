import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const formData = await request.formData();
    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      return NextResponse.json(
        {
          message: "Invalid form data.",
          error: error instanceof Error ? error.message : String(error),
        },
        { status: 400 },
      );
    }

    const createdEvent = await Event.create(event);
    return NextResponse.json(
      {
        message: "Event created successfully.",
        event: createdEvent,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      {
        message: "An error occurred while processing the request.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
