"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const steps = [
    {
      number: 1,
      title: "Create an Account",
      description:
        "Sign up for a free account and set your IELTS learning goals.",
    },
    {
      number: 2,
      title: "Choose Skills to Practice",
      description:
        "Select the skills you want to improve: Vocabulary, Writing, Speaking, or Listening.",
    },
    {
      number: 3,
      title: "Get AI Feedback",
      description:
        "Practice and receive detailed feedback from AI to continuously improve your skills.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="w-full py-20 md:py-28 lg:py-32 overflow-hidden relative flex justify-center"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary-50/30 to-background"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50/50 px-3 py-1 text-sm text-primary-700 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
            Simple Process
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            How It Works
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed">
            A simple process to start improving your IELTS skills today.
          </p>
        </div>

        <div
          ref={ref}
          className="mx-auto grid max-w-5xl gap-10 py-12 md:grid-cols-3 flex items-end"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 relative"
              style={{
                transform: isInView ? "translateY(0)" : "translateY(50px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.5s ease-out ${index * 0.2}s`,
              }}
            >
              {/* Connecting lines between steps */}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-200 to-transparent hidden md:block"></div>
              )}

              {/* Step number with glow effect */}
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 text-xl font-bold text-white transition-transform duration-300 hover:scale-110">
                  {step.number}
                </div>
              </div>

              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-center text-muted-foreground">
                {step.description}
              </p>

              {/* Decorative dots */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 opacity-10">
                <div className="grid grid-cols-3 gap-1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-1 w-1 rounded-full bg-primary-500"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
