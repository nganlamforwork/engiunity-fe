"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "framer-motion";

export function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const testimonials = [
    {
      content:
        "I improved my Writing score from 6.0 to 7.5 in just 2 months using this platform. The detailed AI feedback helped me understand my mistakes and how to fix them.",
      name: "Alex Johnson",
      title: "IELTS 7.5",
      stars: 5,
    },
    {
      content:
        "The Speaking simulation with AI is incredibly useful. I can practice anytime and get instant feedback on my pronunciation and grammar.",
      name: "Sarah Chen",
      title: "IELTS 8.0",
      stars: 5,
    },
    {
      content:
        "Learning vocabulary through articles helps me remember words in context. This has improved both my Reading and Writing skills.",
      name: "Michael Lee",
      title: "IELTS 7.0",
      stars: 4,
    },
    {
      content:
        "I've tried many IELTS platforms, but this is the best. The AI technology truly understands my weaknesses and helps me improve effectively.",
      name: "Emma Rodriguez",
      title: "IELTS 7.5",
      stars: 5,
    },
    {
      content:
        "From someone who didn't know where to start, this platform gave me a clear learning path. I achieved my target score after just 3 months of study.",
      name: "David Kim",
      title: "IELTS 6.5",
      stars: 5,
    },
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("left");
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const getVisibleTestimonials = () => {
    // For mobile: show 1, tablet: show 2, desktop: show 3
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    if (isMobile) {
      return [testimonials[currentIndex]];
    } else if (isTablet) {
      return [
        testimonials[currentIndex],
        testimonials[(currentIndex + 1) % testimonials.length],
      ];
    } else {
      return [
        testimonials[currentIndex],
        testimonials[(currentIndex + 1) % testimonials.length],
        testimonials[(currentIndex + 2) % testimonials.length],
      ];
    }
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="w-full py-20 md:py-28 lg:py-32 overflow-hidden relative flex justify-center"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary-50/30 to-background"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-primary-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div
          className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto"
          style={{
            transform: isInView ? "translateY(0)" : "translateY(50px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.7s ease-out",
          }}
        >
          <div className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50/50 px-3 py-1 text-sm text-primary-700 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
            Success Stories
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            What Our Students Say
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed">
            Thousands of students have improved their IELTS scores with our
            platform.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl py-12">
          <div className="flex overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${direction === "right" ? "-" : ""}${
                  isAnimating ? "100" : "0"
                }%)`,
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {getVisibleTestimonials().map((testimonial, index) => (
                <div
                  key={index}
                  className="group flex flex-col justify-between rounded-xl border border-primary-100 bg-white p-6 shadow-sm h-full transition-all duration-300 hover:shadow-lg hover:border-primary-300"
                >
                  {/* Stars */}
                  <div className="flex mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.stars
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="space-y-3">
                    <p className="text-muted-foreground italic">
                      "{testimonial.content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-4 mt-4 border-t border-primary-50">
                    <div className="rounded-full bg-primary-100 p-1 overflow-hidden">
                      <Image
                        src="/diverse-avatars.png"
                        width={40}
                        height={40}
                        alt="Avatar"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-xs text-primary-600 font-medium">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10 overflow-hidden">
                    <div className="rotate-45 transform origin-top-left">
                      <div className="h-10 w-40 bg-primary-500 -translate-x-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-md md:-translate-x-0 z-10 hover:bg-primary-50 hover:text-primary-600 border-primary-200"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-md md:translate-x-0 z-10 hover:bg-primary-50 hover:text-primary-600 border-primary-200"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary-500"
                    : "bg-primary-200"
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? "right" : "left");
                  setCurrentIndex(index);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
