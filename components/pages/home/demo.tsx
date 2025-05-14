"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

export function Demo() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const isLeftInView = useInView(leftRef, { once: true, amount: 0.2 });
  const isRightInView = useInView(rightRef, { once: true, amount: 0.2 });

  const features = [
    "Detailed IELTS writing analysis",
    "Pronunciation and fluency assessment in speaking",
    "Context-appropriate advanced vocabulary suggestions",
    "Interactive exercises tailored to your level",
  ];

  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-background overflow-hidden relative flex justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary-50/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div
            ref={leftRef}
            className="flex flex-col justify-center space-y-6"
            style={{
              transform: isLeftInView ? "translateX(0)" : "translateX(-50px)",
              opacity: isLeftInView ? 1 : 0,
              transition: "all 0.7s ease-out",
            }}
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm text-primary-700 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
              Real Experience
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                See How AI Works
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Our platform uses advanced AI to analyze essays, improve
                pronunciation, and expand your vocabulary.
              </p>
            </div>

            <ul className="grid gap-3">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3"
                  style={{
                    transform: isLeftInView
                      ? "translateX(0)"
                      : "translateX(-30px)",
                    opacity: isLeftInView ? 1 : 0,
                    transition: `all 0.5s ease-out ${index * 0.1 + 0.3}s`,
                  }}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100">
                    <CheckCircle className="h-4 w-4 text-primary-600" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div
              style={{
                transform: isLeftInView ? "translateY(0)" : "translateY(20px)",
                opacity: isLeftInView ? 1 : 0,
                transition: "all 0.5s ease-out 0.7s",
              }}
            >
              <Button size="lg" className="group relative overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-gradient-shine bg-[length:200%_100%] animate-background-shine opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative z-10 flex items-center gap-1">
                  Try for Free
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
          </div>

          <div
            ref={rightRef}
            className="relative"
            style={{
              transform: isRightInView ? "translateX(0)" : "translateX(50px)",
              opacity: isRightInView ? 1 : 0,
              transition: "all 0.7s ease-out",
            }}
          >
            {/* Main image with glow effect */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-300 to-primary-600 rounded-xl blur-md opacity-50 group-hover:opacity-80 transition duration-300"></div>
              <div className="relative rounded-xl overflow-hidden border border-primary-200 shadow-xl">
                <Image
                  src="/placeholder.svg?key=a40c9"
                  width={600}
                  height={500}
                  alt="IELTS writing assessment AI interface"
                  className="w-full aspect-video object-cover"
                />

                {/* UI overlay elements to make it look like a real app */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                          <span className="text-white font-bold">AI</span>
                        </div>
                        <h3 className="font-bold text-gray-800">
                          Writing Assessment
                        </h3>
                      </div>
                      <div className="text-sm font-medium text-primary-600">
                        Score: 7.5/9.0
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      Your essay demonstrates good coherence and cohesion.
                      Consider using more academic vocabulary and complex
                      sentence structures to improve your score.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating UI elements */}
            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-3 animate-float">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-700 text-sm font-bold">✓</span>
                </div>
                <div className="text-xs">
                  <p className="font-medium">Grammar Check</p>
                  <p className="text-primary-600 font-bold">98% Accurate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
