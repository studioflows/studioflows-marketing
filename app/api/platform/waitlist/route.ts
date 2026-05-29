import { NextRequest, NextResponse } from "next/server";

import { createMarketingSupabaseServerClient } from "@/lib/supabase-server";

type WaitlistBody = {
  consent?: boolean;
  full_name?: string;
  work_email?: string;
  company_name?: string;
  vertical_mold?: string;
};

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as WaitlistBody | null;

  if (!body?.consent) {
    return NextResponse.json({ error: "Consent required" }, { status: 400 });
  }

  const fullName = body.full_name?.trim();
  const workEmail = body.work_email?.trim().toLowerCase();

  if (!fullName) {
    return NextResponse.json({ error: "Full name is required" }, { status: 400 });
  }

  if (!workEmail || !workEmail.includes("@")) {
    return NextResponse.json({ error: "Valid work email is required" }, { status: 400 });
  }

  const supabase = createMarketingSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Waitlist not configured" }, { status: 503 });
  }

  const row = {
    full_name: fullName,
    work_email: workEmail,
    company_name: body.company_name?.trim() || null,
    vertical_mold: body.vertical_mold?.trim() || null,
    source_page: "platform",
    metadata: {
      submitted_at: new Date().toISOString(),
    },
  };

  const { error } = await supabase.from("platform_waitlist_leads").insert(row);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, status: "waitlist" });
}
