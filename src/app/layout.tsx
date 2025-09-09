import type { Metadata, Viewport } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";
import UserContextProvider from "@/provider/CurrentUser";
import TransitionLayout from "@/Components/Transition-Layout";
import { Toaster } from "sonner";

const comfortaa = Comfortaa({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "60секунд",
  description: "Унших, ярих чадвараа хөгжүүлэх апп.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

// ✅ themeColor-оо энд гаргана
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="60секунд" />
      </head>
      <body className={`${comfortaa.className} antialiased`}>
        <TransitionLayout>
          <UserContextProvider>{children}</UserContextProvider>
        </TransitionLayout>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
