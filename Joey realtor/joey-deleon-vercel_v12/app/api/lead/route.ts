import { NextResponse } from "next/server";

// On static export builds, this route is skipped (no serverless runtime).
// On Vercel, this becomes a real serverless function.
export const dynamic = "force-static";

/**
 * Placeholder lead route. v1 simply console.logs the submission and
 * returns 200. v2 will:
 *   1) Persist to Supabase (table: `leads`)
 *   2) Send a Resend notification to joeydln@powerreteam.com
 *   3) Optionally push to a CRM / RealScout contact API
 *
 * NOTE: Because next.config.mjs uses `output: 'export'`, this route is
 * NOT included in the static preview build. It exists for local
 * `next dev` and for the v2 server build (output: 'standalone').
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // eslint-disable-next-line no-console
    console.log("[lead] new submission", {
      at: new Date().toISOString(),
      ...body,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[lead] failed to parse submission", err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
