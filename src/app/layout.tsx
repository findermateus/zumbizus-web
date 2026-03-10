import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Suspense } from "react";
import TargetCursorWrapper from "@/components/target-cursor-wrapper";

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
      <body className="antialiased min-h-screen flex flex-col">
        <NuqsAdapter>
          <Suspense fallback={<></>}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              forcedTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <main className="flex-1">{children}</main>
              <TargetCursorWrapper />
              <Footer />
            </ThemeProvider>
          </Suspense>
        </NuqsAdapter>
      </body>
    </html>
  );
}
