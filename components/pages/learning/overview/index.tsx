import React from "react";
import OverviewSkills from "./OverviewSkills";
import { Skeleton } from "@/components/ui/skeleton";

const Overview = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <OverviewSkills />
      </div>
      <Skeleton className="w-full h-[250px] col-span-1 " />
    </div>
  );
};

export default Overview;
