import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendTelegramMessage } from "@/lib/telegram/send-message";

interface CreateTelegramNotificationParams {
  eventType: string;
  message: string;
  userId?: string;
}

export async function createTelegramNotification({
  eventType,
  message,
  userId,
}: CreateTelegramNotificationParams) {
  /*
  /*
   * 1. Create notification record
   */
  const { data: notification, error } = await supabaseAdmin
    .from("telegram_notifications")
    .insert({
      user_id: userId ?? null,
      event_type: eventType,
      message,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create notification: ${error.message}`);
  }

  /*
   * 2. Attempt Telegram delivery
   */
  try {
    const result = await sendTelegramMessage({
      message,
    });

    /*
     * 3. Mark as sent
     */
    const { error: updateError } = await supabaseAdmin
      .from("telegram_notifications")
      .update({
        status: "sent",
        telegram_message_id: result.messageId,
        sent_at: new Date().toISOString(),
        attempts: 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", notification.id);

    if (updateError) {
      console.error(
        "Notification sent but database update failed:",
        updateError
      );
    }

    return {
      success: true,
      notificationId: notification.id,
    };
  } catch (error) {
    /*
     * 4. Record failure
     */
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Telegram error";

    await supabaseAdmin
      .from("telegram_notifications")
      .update({
        status: "failed",
        error_message: errorMessage,
        attempts: 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", notification.id);

    throw error;
  }
}
