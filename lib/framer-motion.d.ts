import type React from "react";
declare module "framer-motion" {
  export function useInView(
    ref: React.RefObject<Element>,
    options?: {
      once?: boolean;
      amount?: number | "some" | "all";
      root?: React.RefObject<Element>;
      margin?: string;
      rootMargin?: string;
      threshold?: number | number[];
    }
  ): boolean;
}
