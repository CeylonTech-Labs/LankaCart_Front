import type { Metadata } from "next";
import { Toaster } from "@/store/toast-store";
import "./globals.css";

export const metadata: Metadata = {
  title: "LankaCart",
  description: "A Sri Lankan multi-vendor e-commerce marketplace"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
