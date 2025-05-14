"use client";

import { useRef } from "react";
import {
  BookText,
  PenTool,
  Mic,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: <BookText className="h-8 w-8 text-primary-500" />,
      title: "Vocabulary Learning",
      description:
        "Learn vocabulary through real articles with AI suggestions.",
      color: "from-sky-100/20 to-sky-300/20",
      delay: 0,
    },
    {
      icon: <PenTool className="h-8 w-8 text-primary-500" />,
      title: "Writing Assessment",
      description:
        "AI analyzes and scores your essays with detailed improvement suggestions.",
      color: "from-sky-100/20 to-sky-300/20",
      delay: 0.1,
    },
    {
      icon: <Mic className="h-8 w-8 text-primary-500" />,
      title: "Speaking Practice",
      description:
        "Practice speaking skills with AI, get instant feedback on pronunciation and grammar.",
      color: "from-sky-100/20 to-sky-300/20",
      delay: 0.2,
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary-500" />,
      title: "Word Expansion",
      description:
        "Expand your vocabulary with synonyms, antonyms, and related words suggestions.",
      color: "from-sky-100/20 to-sky-300/20",
      delay: 0.3,
    },
  ];

  return (
    <section
      id="features"
      className="w-full py-20 md:py-28 lg:py-32 bg-background overflow-hidden relative mx-auto flex justify-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden ">
        <div className="absolute top-40 right-0 w-72 h-72 bg-primary-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-50/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10 w-full">
        <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50/50 px-3 py-1 text-sm text-primary-700 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
            Key Features
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Learn IELTS Smarter with AI
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed">
            Our platform provides cutting-edge AI tools to help you improve all
            the skills needed for the IELTS exam.
          </p>
        </div>

        <div
          ref={ref}
          className="mx-auto grid max-w-6xl items-start gap-8 py-12 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col items-center space-y-4 rounded-xl p-6 transition-all duration-300 hover:shadow-lg relative overflow-hidden"
              style={{
                transform: isInView ? "translateY(0)" : "translateY(50px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.5s ease-out ${feature.delay}s`,
              }}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>

              {/* Icon with glow effect */}
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 group-hover:bg-primary-100 transition-colors duration-300">
                <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {feature.icon}
              </div>

              <h3 className="relative z-10 text-xl font-bold">
                {feature.title}
              </h3>
              <p className="relative z-10 text-center text-muted-foreground">
                {feature.description}
              </p>

              <div className="relative z-10 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary-600 font-medium flex items-center gap-1"
                >
                  Learn more{" "}
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
