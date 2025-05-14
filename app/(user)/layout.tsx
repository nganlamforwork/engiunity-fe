import Header from "@/components/common/Header";
import { Footer } from "@/components/pages/home/footer";
import React from "react";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
