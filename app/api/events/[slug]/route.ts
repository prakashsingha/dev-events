import Event, { IEvent } from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse> {
  try {
    await connectDB();
    const { slug } = await params;
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { message: "Invalid slug parameter." },
        { status: 400 },
      );
    }
    const sanitizedSlug = slug.trim().toLowerCase();

    const event: IEvent | null = await Event.findOne({
      slug: sanitizedSlug,
    }).lean();

    if (!event) {
      return NextResponse.json(
        { message: "Event not found." },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        message: "Event retrieved successfully.",
        event,
      },
      { status: 200 },
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching event by slug:", error);
    }

    if (error instanceof Error) {
      if (error.message.includes("MONGODB_URI")) {
        return NextResponse.json(
          {
            message:
              "Database connection error. Please check your MongoDB URI.",
            error: error.message,
          },
          { status: 500 },
        );
      }
    }
    return NextResponse.json(
      {
        message: "An error occurred while processing the request.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
