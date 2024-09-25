import type { Metadata } from "next";
import { geistMono, geistSans } from "../app/fonts/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arena já",
  description: "O Sistema de Agendamento Ideal para Sua Arena.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
