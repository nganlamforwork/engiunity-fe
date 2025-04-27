
import Header from "@/components/pages/exercise/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing Exercise",
};
export default function TestPage({ params }: { params: { id: string } }) {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
    </div>
  );
}
