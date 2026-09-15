import { NextResponse } from "next/server";

type Lead = {
  service?: unknown;
  timing?: unknown;
  payment?: unknown;
  name?: unknown;
  phone?: unknown;
};

const asText = (value: unknown, max = 200) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/**
 * Receives a request from the treatment cost calculator.
 *
 * TODO (clinic): forward the lead to the destination the clinic actually uses
 * — CRM, Telegram bot or email. Set the credentials as environment variables
 * and send them from here; the response contract below must stay the same.
 */
export async function POST(request: Request) {
  let payload: Lead;

  try {
    payload = (await request.json()) as Lead;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const lead = {
    service: asText(payload.service),
    timing: asText(payload.timing),
    payment: asText(payload.payment),
    name: asText(payload.name, 80),
    phone: asText(payload.phone, 32),
    receivedAt: new Date().toISOString(),
  };

  const digits = lead.phone.replace(/\D/g, "");
  if (lead.name.length < 2 || digits.length !== 11) {
    return NextResponse.json({ ok: false, error: "invalid_lead" }, { status: 422 });
  }

  console.info("[lead] new request from the cost calculator", lead);

  return NextResponse.json({ ok: true });
}
