// Booking configuration.
//
// Replace BOOKING_URL with Joey's Google Calendar Appointment Schedule URL.
// To get it:
//   1. Go to Google Calendar → Create → "Appointment schedule"
//   2. Set up the schedule (e.g. "15-minute intro call", availability, etc.)
//   3. Save, then click "Open booking page" → copy the URL
//
// The booking page can be embedded directly via iframe — Google sets
// X-Frame-Options to allow embedding on any site.
//
// Example URL format:
//   https://calendar.google.com/calendar/appointments/schedules/AcZssZ.....
//
// If you want a query param appended (?embedded=true), Google handles it.

export const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ||
  "https://calendar.google.com/calendar/u/0/appointments/AcZssZ0yz14vzDesI9fMLPQdPoUbXEhMMyoEzCs1ws0=";

export const BOOKING_TITLE = "Book time with Joey";
export const BOOKING_SUBTITLE =
  "Pick a slot for a 30-minute call, whether you're buying, leasing, or just exploring.";
