import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Suspense } from "react";

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
              {children}
            </ThemeProvider>
          </Suspense>
        </NuqsAdapter>
      </body>
    </html>
  );
}
