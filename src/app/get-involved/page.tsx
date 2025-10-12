import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Involved - NMTSA",
  description:
    "Join NMTSA's mission to transform lives through music therapy. Explore volunteer opportunities, internships, and employment positions with our team in Phoenix, Arizona.",
};

import GetInvolvedPage from "@/components/GetInvolvedPage";

export default function GetInvolved() {
  return <GetInvolvedPage />;
}
