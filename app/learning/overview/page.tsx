import Overview from "@/components/pages/learning/overview";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Overview",
};

const OverviewPage = () => {
  return (
    <div>
      <Overview />
    </div>
  );
};

export default OverviewPage;
