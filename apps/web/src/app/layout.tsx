import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VYORA — Connect Beyond Borders",
  description:
    "Discover communities, share ideas, and connect across languages with VYORA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
