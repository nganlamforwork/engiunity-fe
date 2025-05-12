import HeaderSkill from "@/components/pages/learning/HeaderSkill";
import { SpeakingTabsNavigation } from "@/components/pages/learning/practice/speaking/SpeakingNavigation";
import { SpeakingHomeTab } from "@/components/pages/learning/practice/speaking/SpeakingHomeTab";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speaking",
};

const SpeakingPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderSkill title={"Kĩ năng nói"} />
      <div>
        <SpeakingTabsNavigation />

        {/* Home Tab Content */}
        <div className="mt-6">
          <SpeakingHomeTab />
        </div>
      </div>
    </div>
  );
};

export default SpeakingPage;
