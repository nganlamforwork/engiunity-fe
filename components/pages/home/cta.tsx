"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export function Cta() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="w-full py-20 md:py-28 lg:py-32 overflow-hidden relative flex justify-center"
      style={{
        transform: isInView ? "translateY(0)" : "translateY(50px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.7s ease-out",
      }}
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-900"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        {/* Animated circles */}
        <div
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-3/4 left-1/3 w-6 h-6 bg-white/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-8 h-8 bg-white/10 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-white/20 rounded-full animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-white mr-2"></span>
            Ready to Improve?
          </div>

          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Ready to Boost Your IELTS Score?
          </h2>

          <p className="mx-auto max-w-[700px] text-white/80 md:text-xl/relaxed">
            Sign up today and start your journey to IELTS success with AI
            assistance.
          </p>

          <div
            className="w-full max-w-md space-y-4 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            style={{
              transform: isInView ? "translateY(0)" : "translateY(30px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.5s ease-out 0.3s",
            }}
          >
            <form className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/20 border-white/20 text-white placeholder:text-white/60 h-12 transition-all duration-300 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              <Button
                type="submit"
                className="w-full h-12 bg-white text-primary-700 hover:bg-white/90 transition-all duration-300 group"
              >
                <span className="flex items-center gap-1">
                  Get Started Free
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </form>
            <p className="text-xs text-white/70">
              By signing up, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-2 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
