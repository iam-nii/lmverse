import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import Navbar from "@/components/Navbar";

const UsersLayout: NextLayoutIntlayer = async ({ children, params }) => {
    const { locale } = await params;

    return (
        <IntlayerClientProvider locale={locale}>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 container mx-auto px-4 py-8">
                    {children}
                </main>
            </div>
        </IntlayerClientProvider>
    );
};

export default UsersLayout;
