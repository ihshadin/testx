import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-176px)]">{children}</main>
      <Footer />
    </>
  );
};

export default layout;
