import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Jotion",
  description: "A simple multi-page note taking app having markdown functionality",
  icons: {
    icon: [
      {
        media: "prefers-color-scheme: light",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "prefers-color-scheme: dark",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="jotion-theme"
        >
          <Toaster position="bottom-center" />
          {children}
          </ThemeProvider>
        </ConvexClientProvider>

      </body>
    </html>
  );
}
