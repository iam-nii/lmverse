const TELEGRAM_API =
  "https://api.telegram.org";

interface SendTelegramMessageParams {
  message: string;
  chatId?: string;
}

interface TelegramResponse {
  ok: boolean;
  result?: {
    message_id: number;
  };
  description?: string;
}

export async function sendTelegramMessage({
  message,
  chatId,
}: SendTelegramMessageParams) {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  const targetChatId =
    chatId ?? process.env.TELEGRAM_CHAT_ID;

  if (!token) {
    throw new Error(
      "TELEGRAM_BOT_TOKEN is not configured."
    );
  }

  if (!targetChatId) {
    throw new Error(
      "TELEGRAM_CHAT_ID is not configured."
    );
  }

  const response = await fetch(
    `${TELEGRAM_API}/bot${token}/sendMessage`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        chat_id: targetChatId,
        text: message,
      }),

      // Don't cache Telegram API requests.
      cache: "no-store",
    }
  );

  const data =
    (await response.json()) as TelegramResponse;

  if (!response.ok || !data.ok) {
    throw new Error(
      data.description ??
        "Telegram API request failed."
    );
  }

  return {
    messageId: data.result?.message_id,
  };
}