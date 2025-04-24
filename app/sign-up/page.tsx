import { SignupForm } from "@/components/signup-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up",
};
const SignUp = () => (
  <div>
    <SignupForm />
  </div>
);

export default SignUp;
