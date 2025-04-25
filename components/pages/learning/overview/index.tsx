import React from "react";
import OverviewSkills from "./OverviewSkills";
import { Skeleton } from "@/components/ui/skeleton"

const Overview = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 p-4 rounded">
        <OverviewSkills />
      </div>
      <div className="col-span-1 p-4 rounded">
        <Skeleton className="w-full h-[250px]"/>
      </div>
    </div>
  );
};

export default Overview;
