"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { sendTestTelegramMessage } from "@/app/actions/notifications";

const initialState = {
  success: false,
  error: undefined,
};

export default function BookConsultationButton({
  agreed,
}: {
  agreed: boolean;
}) {
  const [state, formAction, isPending] = useActionState(
    sendTestTelegramMessage,
    initialState
  );

  return (
    <>
      <Button
        type="submit"
        formAction={formAction}
        disabled={!agreed || isPending}
        className="w-full rounded-full font-semibold text-sm py-3 flex items-center justify-center gap-1"
      >
        {isPending ? (
          "Sending..."
        ) : (
          <span className="flex items-center">
            Send <ChevronRight className="w-4 h-4" />
          </span>
        )}
      </Button>

      {state.error && (
        <p className="mt-2 text-sm text-red-500">{state.error}</p>
      )}

      {state.success && (
        <p className="mt-2 text-sm text-green-500">
          Message sent successfully!
        </p>
      )}
    </>
  );
}
