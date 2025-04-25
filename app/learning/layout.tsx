import React from "react";
import { AppSidebar } from "@/components/app-bar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/pages/learning/Header";

const LearningLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header>
          <Header />
        </header>
        <div className="w-full mx-auto max-w-7xl py-4 px-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LearningLayout;
