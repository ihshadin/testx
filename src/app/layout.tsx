import AntdProvider from "@/lib/Antd/AntdRegistry";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Testx Dashboard",
  description: "A awesome website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={archivo.className}>
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
