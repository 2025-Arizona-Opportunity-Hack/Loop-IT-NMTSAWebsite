import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loop IT - NMTSA Website",
  description: "National Model Transportation Student Association Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
