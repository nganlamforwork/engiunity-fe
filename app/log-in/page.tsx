import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Log In",
};
const LogIn = () => (
  <div>
    <LoginForm />
  </div>
);

export default LogIn;
