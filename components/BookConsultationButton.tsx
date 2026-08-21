import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { sendTestTelegramMessage } from "@/app/actions/notifications";

export default function BookConsultationButton({agreed}: { agreed: boolean }) {
    const [isPending, startTransition] = useTransition();
    const t = useTranslations("book_consultation_modal");

    function handleSend() {
        startTransition(async () => {
            const result = await sendTestTelegramMessage();

            if (!result.success) {
                console.error(result.error);
                return
            }

            console.log("Telegram message send!");
        })
    }
    return (
        <Button
            type="button"
            onClick={handleSend}
            disabled={!agreed || isPending}
            // className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-full font-semibold text-sm py-3 flex items-center justify-center gap-1 disabled:opacity-50"
            className="w-full rounded-full font-semibold text-sm py-3 flex items-center justify-center gap-1"
        >
            {isPending ? "Sending..." : <span className="flex items-center">Send <ChevronRight className="w-4 h-4" /></span>}
        </Button>
    )
}