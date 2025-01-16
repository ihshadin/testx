import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "@/styles/antd-overwrite.css";
import "./globals.css";
import AntdProvider from "@/lib/AntdRegistry";
import { Toaster } from "sonner";

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
        <Toaster position="top-center" expand={true} richColors />
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
