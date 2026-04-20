export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events = [
  {
    title: "Next.js Conference 2024",
    image: "/images/event1.png",
    slug: "nextjs-conference-2024",
    location: "San Francisco, CA",
    date: "2026-09-15",
    time: "09:00 AM - 05:00 PM",
  },
  {
    title: "React Summit 2024",
    image: "/images/event2.png",
    slug: "react-summit-2024",
    location: "Amsterdam, Netherlands",
    date: "2026-10-10",
    time: "10:00 AM - 06:00 PM",
  },
];
