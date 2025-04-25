import React from "react";
import { Hero } from "../../components/pages/home/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enginuity",
};
const HomePage = () => {
  return (
    <div className="container mx-auto">
      <Hero />
    </div>
  );
};

export default HomePage;
