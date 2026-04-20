"use client";

import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

const Navbar = () => {
  const handleNavClick = (label: string) => {
    posthog.capture("nav_link_clicked", { label });
  };

  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="logo" width={32} height={32} />
          <p className="text-lg font-bold">Dev Events</p>
        </Link>

        <ul className="nav-links">
          <li>
            <a href="#home" onClick={() => handleNavClick("Home")}>Home</a>
          </li>
          <li>
            <a href="#events" onClick={() => handleNavClick("Events")}>Events</a>
          </li>
          <li>
            <a href="#speakers" onClick={() => handleNavClick("Speakers")}>Speakers</a>
          </li>
          <li>
            <a href="#schedule" onClick={() => handleNavClick("Schedule")}>Schedule</a>
          </li>
          <li>
            <a href="#create-event" onClick={() => handleNavClick("Create Event")}>Create Event</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
