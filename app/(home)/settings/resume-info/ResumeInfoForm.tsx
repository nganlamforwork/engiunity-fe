"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useGetResumeInfoQuery,
  useUpdateResumeInfoMutation,
} from "@/store/api/resumeDefaultInfoApi";

const resumeFormSchema = z.object({
  fullname: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }).optional(),
  location: z.string().optional(),
  jobTitle: z.string().optional(),
  website: z.string().optional(),
});

type ResumeFormValues = z.infer<typeof resumeFormSchema>;

export const ResumeInfoForm = () => {
  const { data: infoData, isFetching } = useGetResumeInfoQuery(null);
  const [updateInfo, { isLoading }] = useUpdateResumeInfoMutation();

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      fullname: infoData?.fullname || "",
      phoneNumber: infoData?.phoneNumber || "",
      email: infoData?.email || "",
      location: infoData?.location || "",
      jobTitle: infoData?.jobTitle || "",
      website: infoData?.website || "",
    },
  });

  useEffect(() => {
    console.log(infoData);
    if (infoData) {
      form.reset({
        fullname: infoData.fullname,
        phoneNumber: infoData.phoneNumber,
        email: infoData.email,
        location: infoData.location,
        jobTitle: infoData.jobTitle,
        website: infoData.website,
      });
    }
  }, [infoData, form]);

  const onSubmit = async (data: ResumeFormValues) => {
    try {
      await updateInfo(data).unwrap();
      toast({
        title: "Success",
        description: "Information updated successfully!",
      });
    } catch (error) {
      // Checking if the error is a type of Redux Toolkit query error
      if (error?.data) {
        // Logging the detailed error from the response
        console.error("Error details:", error.data);

        // Displaying specific error messages in the toast
        toast({
          title: "Error",
          description: error.data.message || "Failed to update information.",
          variant: "destructive",
        });
      } else {
        // General error fallback
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    }
  };

  if (isFetching) {
    return <div>Loading resume default information...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Email</FormLabel>
              <FormControl>
                <Input placeholder="Your work email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Your location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Position</FormLabel>
              <FormControl>
                <Input placeholder="Your job position" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="Your website" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Information"}
        </Button>
      </form>
    </Form>
  );
};
