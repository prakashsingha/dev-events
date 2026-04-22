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

    let tags = JSON.parse(event.tags as string);
    if (!Array.isArray(tags)) {
      return NextResponse.json(
        {
          message: "Tags must be an array.",
        },
        { status: 400 },
      );
    }
    let agenda = JSON.parse(event.agenda as string);
    if (!Array.isArray(agenda)) {
      return NextResponse.json(
        {
          message: "Agenda must be an array.",
        },
        { status: 400 },
      );
    }

    const createdEvent = await Event.create({
      ...event,
      tags: tags,
      agenda: agenda,
    });
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

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json(
      {
        message: "Events retrieved successfully.",
        events,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json(
      {
        message: "An error occurred while processing the request.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
