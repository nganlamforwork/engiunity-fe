"use client";
import { Card, CardContent } from "@/components/ui/card";
import { RootState, useAppSelector } from "@/store";
import CardSkill from "./CardSkill";
import React from "react";
import { routes } from "@/utils/routes";

const OverviewSkills = () => {
  const username = useAppSelector((state: RootState) => state.auth.user?.name);
  return (
    <div>
      <h1 className="font-semibold text-2xl">
        Chào mừng bạn quay trở lại, {username}!
      </h1>
      <div className="grid grid-cols-2 gap-6 mt-4">
        <CardSkill
          title="Kĩ năng đọc"
          imageSrc="Books"
          className="bg-palette-green text-palette-green-foreground"
          href={routes.pages.learning.practice.reading.value}
        />
        <CardSkill
          title="Kĩ năng nghe"
          imageSrc="Headphones"
          className="bg-palette-blue text-palette-blue-foreground"
          href={routes.pages.learning.practice.listening.value}
        />
        <CardSkill
          title="Kĩ năng viết"
          imageSrc="WritingHand"
          className="bg-palette-orange text-palette-orange-foreground"
          href={routes.pages.learning.practice.writing.value}
        />
        <CardSkill
          title="Kĩ năng nói"
          imageSrc="Microphone"
          className="bg-palette-pink text-palette-pink-foreground"
          href={routes.pages.learning.practice.speaking.value}
        />
      </div>
    </div>
  );
};

export default OverviewSkills;
