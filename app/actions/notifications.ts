"use server";

import { createTelegramNotification } from "@/lib/notifications/telegram";
import { createClient } from "@/lib/supabase/server";

export async function sendTestTelegramMessage({
  email,
  message,
}: {
  email: string;
  message: string;
}) {
  console.log("🚀 SERVER ACTION CALLED");

  if (!email || !message) {
    return {
      success: false,
      error: "Email and message are required.",
    };
  }

  try {
    const supabase = await createClient();

    // 1. Authenticate the user
    console.log("🔐 Checking authentication...");

    const { data, error } = await supabase.auth.getClaims();

    if (error || !data?.claims) {
      console.log("❌ Unauthorized");

      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const userId = data.claims.sub;

    console.log("✅ Authenticated:", userId);

    // 2. Create and send Telegram notification
    console.log("📨 Creating Telegram notification...");

    await createTelegramNotification({
      eventType: "consultation_request",
      message: `New consultation request from ${email}:\n\n${message}`,
      userId,
    });

    console.log("✅ Telegram notification created");

    return {
      success: true,
      error: undefined,
    };
  } catch (error) {
    console.error("❌ Telegram notification failed:", error);

    console.log("✅ SERVER ACTION FINISHED");

    return {
      success: true,
      error: undefined,
    };
  }
}
