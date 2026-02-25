import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Syne } from "next/font/google";
import Providers from "./providers";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BugVault",
  description: "Track and manage your dev project bugs",
};



const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} bg-black`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}