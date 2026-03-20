import Footer from "@/components/footer";
import TargetCursorWrapper from "@/components/target-cursor-wrapper";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster position="top-center" richColors={true} />
      <Header />
      <main className="flex-1">{children}</main>
      <TargetCursorWrapper />
      <Footer />
    </>
  );
}
