import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

// Configure the fonts using next/font/google
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"], // Adjust weights if necessary
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"], // Adjust weights if necessary
});

// Metadata for the application
export const metadata: Metadata = {
  title: "Sidekick Dashboard",
  description: "Healthcare Technology Management Dashboard",
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${roboto.variable} ${robotoMono.variable} font-sans min-h-screen bg-background antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
