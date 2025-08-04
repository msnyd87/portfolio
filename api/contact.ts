// api/contact.ts
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const { name, email, message } = await req.json();

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return new NextResponse(
      JSON.stringify({ error: "Missing RESEND_API_KEY" }),
      { status: 500 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: "youremail@example.com", // <-- REPLACE THIS WITH YOUR EMAIL
      subject: `New message from ${name}`,
      html: `<p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    return new NextResponse(
      JSON.stringify({ error: "Email failed", detail: errorData }),
      { status: 500 },
    );
  }

  return new NextResponse(JSON.stringify({ success: true }));
}
