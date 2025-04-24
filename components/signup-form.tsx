"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { SignUpSchema } from "@/form-schemas/SignUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useSignUpMutation } from "@/store/api/usersApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cfpassword: "",
    },
  });

  const [signUp, { isLoading, error }] = useSignUpMutation();
  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    try {
      const { cfpassword, ...userData } = values;

      const result = await signUp(userData).unwrap();
      toast.success("Sign up successful!");
      form.reset();

      router.push("/log-in");
    } catch (err) {
      toast.error("Signup failed. Please try again.");
    }
  };
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-6 h-screen", // Split into two columns, full screen height
        className
      )}
      {...props}
    >
      {/* Left column with background image and logo */}
      <div className="relative w-full h-full">
        <Image
          src="/landscape-placeholder.svg"
          alt="Background Thumbnail"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute top-4 left-4">
          <Link href="/">
            <Image
              src="/placeholder-logo.webp" // Replace with your logo path
              alt="Logo"
              width={100}
              height={60}
              priority
            />
          </Link>
        </div>
      </div>

      {/* Right column with signup form */}
      <div className="mx-6 flex  flex-col justify-center">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2  gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cfpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing up..." : "Sign up"}
                </Button>
                <Button variant="outline" className="w-full">
                  Sign up with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/log-in" className="underline underline-offset-4">
                  Log In
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </div>
    </div>
  );
}
