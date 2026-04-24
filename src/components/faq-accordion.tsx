"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How does SPS work?",
    answer:
      "One integrated loop across four stages. First, our intelligence layer researches your product, audience, competitors, and ads-manager data to surface the angles most likely to convert. Our AI creative engine then produces high-volume statics, video, and UGC against those angles. Campaigns launch on Meta and TikTok inside structured testing frameworks with daily optimization. Each week we iterate — winners get re-hooked, underperformers get replaced. Research → creative → media → learnings → better creative. That's the loop.",
  },
  {
    question: "What kind of brands do you work with?",
    answer:
      "Ecommerce brands doing between €20K and €1M+ per month in revenue, spending at least €10K/month on paid media. Categories include health, beauty, skincare, grooming, supplements, wellness, fashion, jewelry & accessories, home & living, pets, kids & baby, fitness & sports, tech & gadgets, and food. If you sell physical products online, we can help.",
  },
  {
    question: "How is SPS different from a traditional agency?",
    answer:
      "Two things: who you talk to, and how fast you get help. Traditional agencies put account managers, strategists, and producers between you and execution — layers of hand-offs before anything reaches your account. At SPS every stage of the engine is run by a specialist operator paired with a dedicated AI agent: human judgment on top, AI speed and volume underneath. You talk directly to the operator doing the work — no middle layer. Support isn't a ticket queue, it's a specialist walking you through briefings and decisions, usually within hours.",
  },
  {
    question: "What does pricing look like?",
    answer:
      "Credit-based packages from a €29 one-time trial up to €1,500/month for our Elite tier, with top-up credits and add-ons available any time. Every package includes research and one revision per creative. No long-term lock-ins — upgrade, downgrade, or cancel at any point. Media buying is priced separately. See the pricing page for the full breakdown.",
  },
  {
    question: "How fast can you launch?",
    answer:
      "From kickoff to first creative batch is typically 5 days. First campaign launch follows shortly after. Within 2 weeks we're already iterating on early performance data.",
  },
  {
    question: "What platforms do you run ads on?",
    answer:
      "Meta (Facebook + Instagram) and TikTok are our primary platforms — that's where our creative production is engineered to perform best for DTC ecommerce. Snapchat and Pinterest are available as secondary platforms depending on your audience.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-white/5">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="group">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between py-6 text-left transition-opacity duration-300"
            >
              <span
                className={`text-lg font-semibold transition-colors duration-300 md:text-xl ${
                  isOpen ? "text-ink" : "text-ink-dim group-hover:text-ink"
                }`}
              >
                {faq.question}
              </span>
              <ChevronDown
                className={`ml-4 h-5 w-5 shrink-0 text-ink-dim transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-brand-bright" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl text-[15px] leading-relaxed text-ink-dim/80 md:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
