"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  BarChart,
  BookOpen,
  Headphones,
  PenTool,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSkill, setActiveSkill] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    {
      name: "Reading",
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-blue-500",
      score: 7.5,
    },
    {
      name: "Listening",
      icon: <Headphones className="h-5 w-5" />,
      color: "bg-green-500",
      score: 8.0,
    },
    {
      name: "Writing",
      icon: <PenTool className="h-5 w-5" />,
      color: "bg-purple-500",
      score: 7.0,
    },
    {
      name: "Speaking",
      icon: <BarChart className="h-5 w-5" />,
      color: "bg-amber-500",
      score: 7.5,
    },
  ];

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setMousePosition({ x, y });
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }

    // Auto-rotate through skills
    const interval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % skills.length);
    }, 3000);

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
      clearInterval(interval);
    };
  }, [skills.length]);

  const calculateTransform = (factor: number) => {
    const moveX = (mousePosition.x - 0.5) * factor;
    const moveY = (mousePosition.y - 0.5) * factor;
    return `translate(${moveX}px, ${moveY}px)`;
  };

  return (
    <section
      ref={heroRef}
      className="w-full pt-32 pb-20 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40 overflow-hidden relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary-50/50 to-background"></div>
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl"
          style={{ transform: calculateTransform(-15) }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl"
          style={{ transform: calculateTransform(-10) }}
        ></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div
            className={cn(
              "flex flex-col justify-center space-y-6 transition-all duration-700 transform",
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-20 opacity-0"
            )}
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm text-primary-700 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
              AI-Powered IELTS Preparation
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Master IELTS with the{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-700">
                  Power of AI
                </span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Our intelligent platform helps you improve vocabulary, writing,
                speaking, and other skills with advanced AI technology.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-gradient-shine bg-[length:200%_100%] animate-background-shine opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative z-10 flex items-center gap-1">
                  Get Started Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="transition-all duration-300 hover:bg-primary-50 border-primary-200"
              >
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background overflow-hidden"
                  >
                    <Image
                      src="/diverse-avatars.png"
                      width={32}
                      height={32}
                      alt={`User ${i}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">2,000+</span>{" "}
                students improved their IELTS score
              </div>
            </div>
          </div>

          <div
            className={cn(
              "transition-all duration-700 transform relative",
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            )}
          >
            {/* Interactive IELTS Score Visualization */}
            <div className="relative max-w-[500px] mx-auto">
              {/* Main circular progress visualization */}
              <div className="relative bg-white rounded-2xl shadow-xl border border-primary-100 p-8 overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 bg-primary-50 rounded-bl-full opacity-50"></div>
                {/* Circular progress chart */}
                <div className="relative w-64 h-64 mx-auto mb-6 mt-8">
                  {/* Background circles */}
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#f0f0f0"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />

                    {/* Animated progress circles for each skill */}
                    {skills.map((skill, index) => {
                      const normalizedScore = (skill.score / 9) * 100;
                      const circumference = 2 * Math.PI * 45;
                      const offset =
                        circumference - (normalizedScore / 100) * circumference;
                      const rotation = index * 90;

                      return (
                        <circle
                          key={skill.name}
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={skill.color.replace("bg-", "var(--")}
                          strokeWidth="8"
                          strokeDasharray={circumference}
                          strokeDashoffset={isVisible ? offset : circumference}
                          strokeLinecap="round"
                          style={{
                            transition: "stroke-dashoffset 1.5s ease-in-out",
                            transformOrigin: "center",
                            transform: `rotate(${rotation}deg)`,
                            opacity: activeSkill === index ? 1 : 0.3,
                          }}
                        />
                      );
                    })}

                    {/* Center content */}
                    <foreignObject x="25" y="25" width="50" height="50">
                      <div className="h-full w-full flex flex-col items-center justify-center bg-white rounded-full shadow-inner border border-gray-100">
                        <span className="text-2xl font-bold text-primary-600">
                          7.5
                        </span>
                      </div>
                    </foreignObject>
                  </svg>

                  {/* Skill indicators positioned around the circle */}
                  {skills.map((skill, index) => {
                    const angle = (index * Math.PI) / 2; // 90 degrees apart
                    const x = 50 + 60 * Math.cos(angle);
                    const y = 50 + 60 * Math.sin(angle);

                    return (
                      <div
                        key={skill.name}
                        className={`absolute flex items-center justify-center rounded-full p-1 transition-all duration-300 ${
                          activeSkill === index ? "scale-125" : "scale-100"
                        }`}
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div
                          className={`${
                            skill.color
                          } text-white rounded-full w-10 h-10 flex items-center justify-center ${
                            activeSkill === index
                              ? "ring-4 ring-primary-100"
                              : ""
                          }`}
                        >
                          {skill.icon}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Active skill details */}
                <div className="bg-gray-50 rounded-xl p-4 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`${skills[activeSkill].color} p-2 rounded-md text-white`}
                    >
                      {skills[activeSkill].icon}
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {skills[activeSkill].name}
                      </h4>
                      <div className="text-sm text-gray-500">
                        Current Score: {skills[activeSkill].score}/9.0
                      </div>
                    </div>
                  </div>

                  <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-full ${skills[activeSkill].color}`}
                      style={{
                        width: `${(skills[activeSkill].score / 9) * 100}%`,
                        transition: "width 1s ease-out",
                      }}
                    ></div>
                  </div>

                  <div className="mt-3 text-xs flex justify-between">
                    <span>Starting: 5.5</span>
                    <span className="font-medium text-primary-600">
                      +{(skills[activeSkill].score - 5.5).toFixed(1)}{" "}
                      improvement
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating UI elements */}
              <div
                className="absolute top-10 -left-10 bg-white rounded-lg shadow-lg p-3 animate-float z-10"
                style={{
                  animationDelay: "0s",
                  transform: calculateTransform(-25),
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 text-sm font-bold">
                      A+
                    </span>
                  </div>
                  <div className="text-xs">
                    <p className="font-medium">Writing Score</p>
                    <p className="text-primary-600 font-bold">7.5/9.0</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-10 -left-10 bg-white rounded-lg shadow-lg p-3 animate-float z-10"
                style={{
                  animationDelay: "1.5s",
                  transform: calculateTransform(-15),
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 text-sm font-bold">
                      🎯
                    </span>
                  </div>
                  <div className="text-xs">
                    <p className="font-medium">Speaking Accuracy</p>
                    <p className="text-primary-600 font-bold">92%</p>
                  </div>
                </div>
              </div>

              {/* New floating element */}
              <div
                className="absolute top-1/2 -right-12 bg-white rounded-lg shadow-lg p-3 animate-float z-10"
                style={{
                  animationDelay: "2.5s",
                  transform: calculateTransform(-20),
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-xs">
                    <p className="font-medium">Target Achieved</p>
                    <p className="text-green-600 font-bold">In 8 weeks</p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div
                className="absolute -top-6 -left-6 w-12 h-12 rounded-full border border-primary-200 animate-bounce-subtle"
                style={{
                  animationDelay: "0.5s",
                  transform: calculateTransform(-5),
                }}
              ></div>
              <div
                className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-primary-100 animate-bounce-subtle"
                style={{
                  animationDelay: "1s",
                  transform: calculateTransform(-8),
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
