import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AnimKart Marketplace OS",
  description:
    "Animal health commerce, supplier operations, inventory, shipping and veterinary consultation platform."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
