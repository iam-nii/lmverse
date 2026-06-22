'use client';

import { ContentFormProvider } from "./ContentFormContext";


export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentFormProvider>
      {children}
    </ContentFormProvider>
  );
}