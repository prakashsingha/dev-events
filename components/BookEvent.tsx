"use client";

import { useState } from "react";

const BookEvent = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend or an API
    setTimeout(() => {
      setSubmitted(true);
    }, 1000); // Simulate an API call delay
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
