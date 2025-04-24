import { ResumeValues } from "@/form-schemas/ResumeSchema";
import { IResume } from "@/types/resume";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapToResumeValues(data: IResume): ResumeValues {
  return {
    id: data.id,
    title: data.title ?? "", // Fallback to an empty string if not provided
    description: data.description ?? "",
    colorHex: data.colorHex,
    fullname: data.fullname ?? "",
    jobTitle: data.jobTitle ?? "",
    location: data.location ?? "",
    phoneNumber: data.phoneNumber ?? "",
    email: data.email ?? "",
    website: data.website ?? "",
    summary: data.summary ?? "",
    workExperience: (data.workExperience ?? []).map((experience) => ({
      position: experience.position ?? "",
      company: experience.company ?? "",
      startDate: experience.startDate ?? "",
      endDate: experience.endDate ?? "",
      workFormat: experience.workFormat ?? "",
      description: experience.description ?? "",
    })),
    education: (data.education ?? []).map((edu) => ({
      school: edu.school ?? "",
      degree: edu.degree ?? "",
      startDate: edu.startDate ?? "",
      endDate: edu.endDate ?? "",
    })),
    skill: (data.skill ?? []).map((skill) => ({
      skillGroup: skill.skillGroup ?? "",
      skillList: skill.skillList ?? "",
    })),
  };
}
