import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "ACME Store",
  description: "Monorepo eCommerce starter"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
