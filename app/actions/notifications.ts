"use server";

import { createClient } from "@/lib/supabase/server";
import { createTelegramNotification } from "@/lib/notifications/telegram";

export async function sendTestTelegramMessage() {
  const supabase = await createClient();

  /*
   * Check authentication
   */
  const { data, error } =
    await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  const userId = data.claims.sub;

  /*
   * Create and send notification
   */
  try {
    await createTelegramNotification({
      eventType: "test_message",

      message:
        "🚀 Test message from lmverse application.",

      userId,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Failed to send Telegram notification:",
      error
    );

    return {
      success: false,
      error: "Failed to send Telegram message.",
    };
  }
}