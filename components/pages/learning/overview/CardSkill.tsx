"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Books from "@/public/Books.svg";
import Headphones from "@/public/Headphones.svg";
import Microphone from "@/public/Microphone.svg";
import WritingHand from "@/public/WritingHand.svg";
import Link from "next/link";

interface CardSkillProps {
  title: string;
  imageSrc?: "Books" | "Headphones" | "Microphone" | "WritingHand";
  href: string;
  className?: string;
}

export default function CardSkill({
  title,
  imageSrc = "Books",
  className,
  href,
}: CardSkillProps) {
  return (
    <Link
      className={cn(
        "py-4 px-6 rounded-xl block cursor-pointer transition-transform hover:scale-105 min-h-[150px] flex items-center justify-between",
        className
      )}
      href={href}
    >
      <h3 className="text-xl font-bold text-inherit">{title}</h3>
      <div className="flex items-end gap-2">
        {imageSrc === "Books" && (
          <Image src={Books} alt="Book" width={96} height={96} />
        )}
        {imageSrc === "Headphones" && (
          <Image src={Headphones} alt="Headphones" width={96} height={96} />
        )}
        {imageSrc === "WritingHand" && (
          <Image src={WritingHand} alt="Writing" width={96} height={96} />
        )}
        {imageSrc === "Microphone" && (
          <Image src={Microphone} alt="Mic" width={96} height={96} />
        )}
      </div>
    </Link>
  );
}
