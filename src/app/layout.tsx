import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CLATians – Best CLAT Coaching | AILET | MH-CET | CUET Preparation",
  description: "CLATians – Your trusted institute for CLAT, AILET, MH-CET, and CUET law entrance preparation. Expert guidance by NLU Alumni. 5000+ success stories.",
  keywords: "CLAT coaching, AILET preparation, law entrance exam, NLU, CLATians Patna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
