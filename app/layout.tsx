import type { Metadata } from "next";
import "./globals.css";
import { SearchInputProvider } from "./context/searchInputs";

export const metadata: Metadata = {
  title: "LOK Land Dashboard",
  description: "Dashboard for monitoring land development points",
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
