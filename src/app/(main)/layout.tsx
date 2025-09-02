import type { Metadata } from "next";
import MainHeader from "../(main)/home/components/MainHeader";

export const metadata: Metadata = {
  title: "60секунд",
  description: "Унших, ярих чадвараа хөгжүүлэх апп.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function SideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MainHeader />
      {children}
    </div>
  );
}
