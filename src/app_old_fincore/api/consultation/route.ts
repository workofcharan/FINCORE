import { NextRequest, NextResponse } from "next/server";
import { consultationSchema } from "@/lib/validations/consultation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check honeypot first for spam detection
    if (body.honeypot && body.honeypot.trim() !== "") {
      return NextResponse.json(
        { error: "Invalid submission request." },
        { status: 400 }
      );
    }

    // Validate payload with Zod
    const validationResult = consultationSchema.safeParse(body);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });

      return NextResponse.json(
        {
          success: false,
          message: "Please correct the errors in the consultation form.",
          errors: fieldErrors,
        },
        { status: 422 }
      );
    }

    const data = validationResult.data;

    // Generate unique inquiry reference code
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `FIN-${datePart}-${randomPart}`;

    // Log the validated inquiry (safe from sensitive credentials)
    console.log(`[FINCORE Enquiry Received] Reference: ${referenceId}`, {
      referenceId,
      timestamp: new Date().toISOString(),
      clientType: data.clientType,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      businessName: data.businessName || "N/A",
      serviceRequired: data.serviceRequired,
      preferredContact: data.preferredContact,
    });

    // If Supabase environment variables are configured in the future, insert record
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    let storedInDatabase = false;
    if (supabaseUrl && supabaseKey) {
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/consultation_enquiries`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            reference_id: referenceId,
            client_type: data.clientType,
            full_name: data.fullName,
            email: data.email,
            phone: data.phone,
            business_name: data.businessName || null,
            service_required: data.serviceRequired,
            description: data.description,
            preferred_contact: data.preferredContact,
            consent_given: data.consentGiven,
            created_at: new Date().toISOString(),
          }),
        });

        if (res.ok) {
          storedInDatabase = true;
        }
      } catch (dbError) {
        console.error("[FINCORE Database Log Error]", dbError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        referenceId,
        storedInDatabase,
        message:
          "Thank you for contacting FINCORE. Your consultation request has been received. Our compliance advisory team will review your requirements and reach out through your preferred contact method.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[FINCORE API Error]", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}
