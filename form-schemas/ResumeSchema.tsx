import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));
export const requiredString = z.string().trim().or(z.literal(""));
export const optionalDate = z.date().optional();

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
  fullname: requiredString,
  jobTitle: requiredString,
  location: requiredString,
  phoneNumber: optionalString,
  email: requiredString,
  website: optionalString,
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workExperience: z.array(
    z.object({
      position: optionalString,
      company: optionalString,
      startDate: optionalString,
      endDate: optionalString,
      workFormat: optionalString,
      description: optionalString,
    })
  ),
});
export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

export const educationSchema = z.object({
  education: z.array(
    z.object({
      school: optionalString,
      degree: optionalString,
      startDate: optionalString,
      endDate: optionalString,
    })
  ),
});
export type EducationValues = z.infer<typeof educationSchema>;

export const skillSchema = z.object({
  skill: z.array(
    z.object({
      skillGroup: optionalString,
      skillList: optionalString,
    })
  ),
});
export type SkillValues = z.infer<typeof skillSchema>;

export const summarySchema = z.object({
  summary: optionalString,
});
export type SummaryValues = z.infer<typeof summarySchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...summarySchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
  colorHex: optionalString,
});
export type ResumeValues = z.infer<typeof resumeSchema> & { id?: string };
