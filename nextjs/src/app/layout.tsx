import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jobs R Us",
  description: "Search thousands of internships, part-time jobs, and full-time careers",
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
