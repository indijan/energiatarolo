"use client";

import { EligibilityWizard } from "../components/EligibilityWizard";
import {
  ContactSection,
  FAQSection,
  FooterSection,
  HeroSection,
  UsesOfFundsSection,
} from "../components/Sections";

export default function Page() {
  const handleScrollToWizard = () => {
    const element = document.getElementById("eligibility");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleScrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="circuit-bg min-h-screen">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-10">
        <HeroSection onCTAClick={handleScrollToWizard} />
        <UsesOfFundsSection />
        <EligibilityWizard onCompleteScroll={handleScrollToContact} />
        <ContactSection />
        <FAQSection />
        <FooterSection />
      </div>
    </div>
  );
}
