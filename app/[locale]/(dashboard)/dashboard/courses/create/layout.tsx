import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publish Course ",
  description: "Create and publish your course LmVerse.",
};

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="px-10">{children}</div>;
}
