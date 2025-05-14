"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, X, ArrowRight } from "lucide-react";

export function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const plans = [
    {
      name: "Basic",
      description: "For beginners",
      price: "Free",
      period: "",
      features: [
        { name: "Basic vocabulary learning", included: true },
        { name: "5 writing assessments per month", included: true },
        { name: "10 minutes of speaking practice daily", included: true },
        { name: "Advanced vocabulary tools", included: false },
        { name: "Unlimited writing assessments", included: false },
      ],
      popular: false,
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
    },
    {
      name: "Standard",
      description: "For serious learners",
      price: "$14.99",
      period: "/month",
      features: [
        { name: "All Basic features", included: true },
        { name: "Advanced vocabulary learning", included: true },
        { name: "Unlimited writing assessments", included: true },
        { name: "30 minutes of speaking practice daily", included: true },
        { name: "Full Word Expansion tool", included: true },
      ],
      popular: true,
      buttonText: "Get Started",
      buttonVariant: "default" as const,
    },
    {
      name: "Premium",
      description: "For high score seekers",
      price: "$29.99",
      period: "/month",
      features: [
        { name: "All Standard features", included: true },
        { name: "In-depth writing analysis", included: true },
        { name: "Unlimited speaking practice", included: true },
        { name: "1-on-1 consultation with IELTS teacher", included: true },
        { name: "Personalized study path", included: true },
      ],
      popular: false,
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
    },
  ];

  return (
    <section
      id="pricing"
      className="w-full py-20 md:py-28 lg:py-32 bg-background overflow-hidden relative flex justify-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary-50/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50/50 px-3 py-1 text-sm text-primary-700 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
            Simple Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Transparent Pricing, No Hidden Fees
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed">
            Choose a plan that fits your learning needs.
          </p>
        </div>

        <div
          ref={ref}
          className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3"
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-xl border bg-white p-8 shadow-sm relative transition-all duration-500 hover:shadow-xl ${
                plan.popular
                  ? "md:scale-105 md:shadow-md border-primary-300"
                  : "border-primary-100"
              }`}
              style={{
                transform: isInView ? "translateY(0)" : "translateY(50px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.5s ease-out ${index * 0.2}s`,
              }}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-fit rounded-full bg-primary-500 px-4 py-1 text-xs font-medium text-white shadow-md">
                  Most Popular
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground mt-1">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="mb-8 space-y-4 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3"
                    style={{
                      transform: isInView
                        ? "translateX(0)"
                        : "translateX(-20px)",
                      opacity: isInView ? 1 : 0,
                      transition: `all 0.3s ease-out ${
                        index * 0.2 + featureIndex * 0.1 + 0.3
                      }s`,
                    }}
                  >
                    {feature.included ? (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-100">
                        <CheckCircle className="h-3.5 w-3.5 text-primary-600" />
                      </div>
                    ) : (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
                        <X className="h-3.5 w-3.5 text-gray-400" />
                      </div>
                    )}
                    <span
                      className={
                        feature.included ? "" : "text-muted-foreground"
                      }
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                variant={plan.buttonVariant}
                className={`w-full group relative overflow-hidden ${
                  plan.buttonVariant === "default"
                    ? "bg-primary-500 hover:bg-primary-600"
                    : "border-primary-200 hover:bg-primary-50 hover:text-primary-600"
                }`}
              >
                {plan.buttonVariant === "default" && (
                  <span className="absolute inset-0 w-full h-full bg-gradient-shine bg-[length:200%_100%] animate-background-shine opacity-0 group-hover:opacity-100 transition-opacity"></span>
                )}
                <span className="relative z-10 flex items-center justify-center gap-1">
                  {plan.buttonText}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
