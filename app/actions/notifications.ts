"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { createTelegramNotification } from "@/lib/notifications/telegram";

export async function sendTestTelegramMessage(
  _prevState: {
    success: boolean;
    error?: string;
  },
  formData: FormData
) {
  console.log("🚀 sendTestTelegramMessage called");

  const firstName = formData.get("firstName")?.toString() ?? "";
  const lastName = formData.get("lastName")?.toString() ?? "";
  const phone = formData.get("phone")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const comments = formData.get("comments")?.toString() ?? "";

  if (!firstName || !lastName || !phone || !email) {
    return {
      success: false,
      error: "Please fill in all required fields.",
    };
  }

  try {
    const { data } = await supabaseAdmin.auth.getClaims();

    const userId = data?.claims?.sub ?? null;

    const telegramMessage = `
📩 New consultation request

👤 Name: ${firstName} ${lastName}
📞 Phone: ${phone}
📧 Email: ${email}

💬 Message:
${comments || "No additional comments"}
`.trim();

    await createTelegramNotification({
      eventType: "consultation_request",
      message: telegramMessage,
      userId: userId ?? undefined,
    });

    console.log("✅ Telegram notification created");

    return {
      success: true,
      error: undefined,
    };
  } catch (error) {
    console.error("❌ Telegram notification failed:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to send consultation request.",
    };
  }
}
