"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import Image from "next/image";

import { logo } from "@/constants/images";
import { soure_gummy } from "@/constants/fonts";
import { useTranslations } from "next-intl";

import BookConsultationButton from "./BookConsultationButton";

type Props = {
  open: boolean;
  onClose: () => void;
  initialMessage?: string;
};

export default function BookConsultationModal({
  open,
  onClose,
  initialMessage,
}: Props) {
  const t = useTranslations("book_consultation_modal");

  const [agreed, setAgreed] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    comments: "",
  });

  // Track whether the modal was previously open.
  // This allows us to initialize the form only when
  // the modal changes from closed -> open.
  const previousOpen = useRef(false);

  const formHandler = useEffectEvent((prevForm: typeof form) => {
    let defaultComment = "";

    if (initialMessage) {
      // Matches:
      // A1, A2, A1-A2
      // B1, B2, B1-B2
      // C1, C2, C1-C2
      // Starter
      const isLevel = /^(?:[A-C][1-2](?:-[A-C][1-2])?|Starter)$/i.test(
        initialMessage
      );

      if (isLevel) {
        defaultComment = t("messages.levelConsultation", {
          level: initialMessage,
        });
      } else {
        defaultComment = t("messages.genericRequest", {
          message: initialMessage,
        });
      }
    }

    setForm((prev) => ({
      ...prev,
      comments: defaultComment,
    }));

    // Reset consent every time the modal opens
    setAgreed(false);
  });

  useEffect(() => {
    if (open && !previousOpen.current) {
      formHandler(form);
    }

    previousOpen.current = open;
  }, [open, initialMessage, t]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-sm sm:max-w-md w-full rounded-2xl p-6 border-[2px] border-blue-300">
        {/* Logo header */}
        <DialogHeader className="items-center gap-2 mb-1">
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="logo"
              width={36}
              height={36}
              className="w-9 h-9"
            />

            <span
              className={`text-xl font-bold text-primary ${soure_gummy.className}`}
            >
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

        <form className="flex flex-col gap-4 mt-2">
          {/* First name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              {t("form.firstName.label")}{" "}
              <span className="text-red-500">*</span>
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
            <label className="text-sm font-medium">
              {t("form.comments.label")}
            </label>

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
                name="consent"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="sr-only"
                required
              />

              <div
                className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
                  agreed
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
          <BookConsultationButton agreed={agreed} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
