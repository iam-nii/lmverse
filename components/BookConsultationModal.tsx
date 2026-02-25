"use client";

import { useState } from "react";
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

type Props = {
    open: boolean;
    onClose: () => void;
    levelTitle?: string;
};

export default function BookConsultationModal({ open, onClose, levelTitle }: Props) {
    const [agreed, setAgreed] = useState(false);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        comments: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: wire to backend
        console.log("Consultation request:", { ...form, levelTitle });
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
                        Sign up for a free online lesson
                    </DialogTitle>
                    <DialogDescription className="text-center text-sm text-muted-foreground">
                        Fill out the form below and our manager will contact you soon to
                        answer all your questions and help you choose the optimal training
                        program.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
                    {/* First name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                            First name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-secondary/40 transition"
                        />
                    </div>

                    {/* Last name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                            Last name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-secondary/40 transition"
                        />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                            Phone number <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-secondary/40 transition"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-secondary/40 transition"
                        />
                    </div>

                    {/* Comments */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Comments</label>
                        <textarea
                            name="comments"
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
                            By clicking the &quot;Submit&quot; button, I consent to the
                            processing of my personal data, in accordance with Federal Law No.
                            152-FZ &quot;On Personal Data&quot;, on the terms and for the
                            purposes specified in the Consent to the processing of personal
                            data *
                        </span>
                    </label>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={!agreed}
                        className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-full font-semibold text-sm py-3 flex items-center justify-center gap-1 disabled:opacity-50"
                    >
                        Send <ChevronRight className="w-4 h-4" />
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
