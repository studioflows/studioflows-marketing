import { NextRequest, NextResponse } from "next/server";

function resolveSfpScoreIntakeUrl(): string {
  const configured =
    process.env.SFP_SCORE_INTAKE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SFP_SCORE_INTAKE_URL?.trim();

  if (configured) {
    return configured;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3011/api/public/real-estate-media/score";
  }

  return "https://consulting.studioflows.co/api/public/real-estate-media/score";
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (body.consent !== true) {
    return NextResponse.json({ error: "Consent required" }, { status: 400 });
  }

  const intakeUrl = resolveSfpScoreIntakeUrl();

  try {
    const upstream = await fetch(intakeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = (await upstream.json().catch(() => ({}))) as Record<string, unknown>;

    if (!upstream.ok) {
      const isDev = process.env.NODE_ENV === "development";
      const message =
        typeof result.error === "string"
          ? result.error
          : upstream.status === 404
            ? isDev
              ? "Score intake is not running locally. Start studioflows-platform on port 3011."
              : "Score intake is not available yet. Try again later."
            : "Unable to submit your score right now. Try again in a moment.";

      return NextResponse.json({ error: message }, { status: upstream.status });
    }

    return NextResponse.json(result, { status: upstream.status });
  } catch {
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        error: isDev
          ? "Score service is offline. Start studioflows-platform on port 3011, then try again."
          : "Unable to reach the score service right now. Try again in a moment.",
      },
      { status: 502 }
    );
  }
}
