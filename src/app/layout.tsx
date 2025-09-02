import type { Metadata } from "next";
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
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${comfortaa.className} antialiased`}>
        <TransitionLayout>
          <UserContextProvider>{children}</UserContextProvider>
        </TransitionLayout>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
