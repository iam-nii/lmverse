'use client';

import { ContentFormProvider } from "./[courseId]/builder/ContentFormContext";


export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentFormProvider>
      <div className="px-10">
      {children}
      </div>
    </ContentFormProvider>
  );
}