import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { logo } from "@/constants/images";
import { soure_gummy } from "@/constants/fonts";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
    open: boolean;
    onClose: () => void;
    initialMessage?: string;
};

export default function BookConsultationModal({ open, onClose, initialMessage }: Props) {
    const t = useTranslations("book_consultation_modal");
    const [agreed, setAgreed] = useState(false);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        comments: "",
    });

    useEffect(() => {
        if (open) {
            let defaultComment = "";
            if (initialMessage) {
                // If it's a level tag like "A1-A2" or "Starter"
                const isLevel = /^[A-C][1-2]|Starter/i.test(initialMessage);
                if (isLevel) {
                    defaultComment = t("messages.levelConsultation", { level: initialMessage });
                } else {
                    // Otherwise just use the button text or custom message
                    defaultComment = t("messages.genericRequest", { message: initialMessage });
                }
            }
            setForm((prev) => ({
                ...prev,
                comments: defaultComment,
            }));
        }
    }, [open, initialMessage, t]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: wire to backend
        console.log("Consultation request:", { ...form, initialMessage });
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-sm sm:max-w-md w-full rounded-2xl p-6 border-[2px] border-blue-300">
                {/* Logo header */}
                <DialogHeader className="items-center gap-2 mb-1">
                    <div className="flex items-center gap-2">
                        <Image src={logo} alt="logo" width={36} height={36} className="w-9 h-9" />
                        <span className={`text-xl font-bold text-primary ${soure_gummy.className}`}>
                            Lmverse
                        </span>
                    </div>
                    <DialogTitle className="text-center text-xl font-bold leading-snug">
                        {t("title")}
                    </DialogTitle>
                    <DialogDescription className="text-center text-sm text-muted-foreground">
                        {t("description")}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
                    {/* First name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                            {t("form.firstName.label")} <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="firstName"
                            placeholder={t("form.firstName.placeholder")}
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-secondary/40 transition"
                        />
                    </div>

                    {/* Last name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                            {t("form.lastName.label")} <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="lastName"
                            placeholder={t("form.lastName.placeholder")}
                            value={form.lastName}
                            onChange={handleChange}
                            required
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-secondary/40 transition"
                        />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                            {t("form.phone.label")} <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="phone"
                            type="tel"
                            placeholder={t("form.phone.placeholder")}
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-secondary/40 transition"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                            {t("form.email.label")} <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder={t("form.email.placeholder")}
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-secondary/40 transition"
                        />
                    </div>

                    {/* Comments */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">{t("form.comments.label")}</label>
                        <textarea
                            name="comments"
                            placeholder={t("form.comments.placeholder")}
                            value={form.comments}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-secondary/40 transition resize-none"
                        />
                    </div>

                    {/* Consent checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer">
                        <div className="relative mt-0.5 flex-shrink-0">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="sr-only"
                                required
                            />
                            <div
                                className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${agreed
                                    ? "bg-secondary border-secondary"
                                    : "bg-white border-border dark:bg-slate-700"
                                    }`}
                            >
                                {agreed && (
                                    <svg
                                        className="w-3 h-3 text-white"
                                        fill="none"
                                        viewBox="0 0 12 10"
                                    >
                                        <path
                                            d="M1 5l3.5 3.5L11 1"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>
                        <span className="text-xs text-muted-foreground leading-relaxed">
                            {t("form.consent")}
                        </span>
                    </label>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={!agreed}
                        className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-full font-semibold text-sm py-3 flex items-center justify-center gap-1 disabled:opacity-50"
                    >
                        {t("form.submit")} <ChevronRight className="w-4 h-4" />
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

