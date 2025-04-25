import Header from "@/components/common/Header";
import React from "react";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      {children}
    </div>
  );
};

export default HomeLayout;
