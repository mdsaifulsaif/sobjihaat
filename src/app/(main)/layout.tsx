import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="min-h-full flex flex-col">{children}</div>
    </section>
  );
}
