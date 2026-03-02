import type {Metadata} from "next";
import {ThemeProvider} from "@/components/theme-provider";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import {NuqsAdapter} from "nuqs/adapters/next";

export const metadata: Metadata = {
    title: "Zumbizus",
    description: "Web Page para o jogo Zumbizus",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
        <body className="antialiased">
        <NuqsAdapter>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Header/>
                {children}
                <Footer/>
            </ThemeProvider>
        </NuqsAdapter>
        </body>
        </html>
    );
}