
import Navbar from "@/components/Navbar";

export default async function UsersLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
};


