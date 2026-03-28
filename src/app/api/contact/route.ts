import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  employees: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { name, email, company, phone, employees, message } = parsed.data;

    // Log the enquiry — in production this would send an email
    console.log("[contact] New enquiry:", {
      name,
      email,
      company,
      phone,
      employees,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Thank you for your enquiry. We will get back to you within 1 business day." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json({ error: "Failed to process enquiry" }, { status: 500 });
  }
}
