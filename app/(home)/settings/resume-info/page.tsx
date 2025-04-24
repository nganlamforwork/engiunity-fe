import { Separator } from "@/components/ui/separator";
import React from "react";
import { ResumeInfoForm } from "./ResumeInfoForm";

const Account = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold">Resume Default Information</h3>
        <p className="text-sm text-muted-foreground">
          Provide your basic default information for resumes. You can include
          details such as phone number, work email, location, job position, and
          website. All fields are optional.
        </p>
      </div>
      <Separator />
      <ResumeInfoForm />
    </div>
  );
};

export default Account;
