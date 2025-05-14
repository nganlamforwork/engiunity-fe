"use client";

import Image from "next/image";

import BannerDashLine from "@/public/practice-banner-dash-line.svg";
import BannerBook from "@/public/practice-banner-book.svg";

interface HeaderSkillProps {
  title: string;
  description?: string;
  topElements?: React.ReactNode;
}

export default function HeaderSkill({
  title,
  description,
  topElements,
}: HeaderSkillProps) {
  return (
    <div className="relative flex py-4 px-8  w-full items-center rounded-lg bg-brand-accent text-palette-blue-foreground  md:rounded-card ">
      <div className="flex flex-col gap-2 items-start">
        {topElements}
        <h1 className="text-3xl font-extrabold  text-brand-accent-foreground">
          {title}
        </h1>
        {description && <p>{description}</p>}
      </div>
      <Image
        src={BannerDashLine}
        alt="practice-banner-dash-line"
        width={500}
        height={112}
        className="absolute right-0 top-2 h-14 md:h-28"
      />
      <Image
        src={BannerBook}
        alt="practice-banner-book"
        width={250}
        height={400}
        className="z-10 ml-auto h-24 md:-mr-6 md:h-40"
      />
    </div>
  );
}
