import HeaderSkill from "@/components/pages/learning/HeaderSkill";
import { SpeakingTabsNavigation } from "@/components/pages/learning/practice/speaking/SpeakingNavigation";
import { SpeakingHomeTab } from "@/components/pages/learning/practice/speaking/SpeakingHomeTab";
import { Metadata } from "next";
import SpeakingHistory from "@/components/pages/learning/practice/speaking/SpeakingHistory";

export const metadata: Metadata = {
  title: "Speaking History",
};

const SpeakingPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderSkill title={"Kĩ năng nói"} />
      <div>
        <SpeakingTabsNavigation />

        <div className="mt-6">
          <SpeakingHistory />
        </div>
      </div>
    </div>
  );
};

export default SpeakingPage;
