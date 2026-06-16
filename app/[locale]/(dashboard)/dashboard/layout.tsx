export default async function UsersLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
