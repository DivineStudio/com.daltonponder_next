"use client";

import { useState } from "react";
import { PRICING_TIERS, SOW_EXAMPLES } from "@/config/pricing";

export function PricingSection() {
  const [is24Months, setIs24Months] = useState(false);

  return (
    <section className="section bg-background">
      <div className="container">
        {/* Section Header + Toggle */}
        <div className="text-center mb-12">
          <h2 className="font-mono text-2xl md:text-3xl font-bold mb-4">Transparent Pricing, Zero Surprises</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto mb-8">
            High-ticket, bespoke Web Development. $0 upfront build strategy with long-term managed hosting and infrastructure contracts.
          </p>

          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!is24Months ? "text-accent" : "text-muted"}`}>
              18-Month Term
            </span>
            <button
              onClick={() => setIs24Months(!is24Months)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-accent transition-colors focus:ring-2 focus:ring-accent focus:outline-none cursor-pointer"
              aria-checked={is24Months}
              role="switch"
            >
              <span className="sr-only">Toggle Term</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-card transition-transform ${is24Months ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>
            <span className={`text-sm font-medium flex items-center gap-2 ${is24Months ? "text-accent" : "text-muted"}`}>
              24-Month Term <span className="text-success text-xs font-bold dark:bg-emerald-900/20 px-2 py-0.5 rounded-sm">Save 10-20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12 items-stretch">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`bento-card flex flex-col relative h-full ${
                tier.isPopular ? "border-accent shadow-[0_4px_24px_rgba(64,121,140,0.15)] md:scale-105 z-10 border-2" : "border-card-border"
              }`}
            >
              <h3 className="font-mono text-xl font-bold mb-2">{tier.name}</h3>
              <p className="text-sm text-muted mb-6 min-h-[40px]">{tier.target}</p>

              <div className="mb-6 flex items-baseline border-b border-card-border pb-6">
                <span className="text-4xl font-bold">${is24Months ? tier.pricing.monthly24 : tier.pricing.monthly18}</span>
                <span className="text-sm text-muted ml-2">/ mo</span>
              </div>
              
              <ul className="mb-8 space-y-4 grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-success shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6 border-t border-card-border">
                {tier.includedDevTime !== "0 Hours/month" ? (
                  <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{tier.includedDevTime} Dedicated Dev Time</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-medium text-muted">
                     <span className="w-5 h-0.5 bg-muted shrink-0 opacity-50"></span>
                     <span>Pay-as-you-go Dev Time</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bespoke Add-Ons Section */}
        <div className="mt-20 max-w-5xl mx-auto">
          <h3 className="font-mono text-2xl md:text-3xl font-bold mb-3">Bespoke Add-Ons</h3>
          <p className="text-muted text-base mb-8 max-w-2xl">
            Need custom functionality? We handle bespoke features through flat-rate Statements of Work (SOWs) that never inflate your monthly tier.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SOW_EXAMPLES.map((sow) => (
              <div key={sow.name} className="bento-card flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h4 className="font-mono font-semibold text-base">{sow.name}</h4>
                  <span className="text-accent font-bold text-lg whitespace-nowrap">${sow.price.toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted">{sow.description}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted mt-6 text-center italic">
            These are example engagements. Every SOW is scoped and priced to your specific requirements.
          </p>
        </div>
        
        {/* Ownership & Buyout */}
        <div className="mt-16 bento-card bg-secondary/10 border-none p-8 md:p-10 rounded-2xl max-w-4xl mx-auto text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <h4 className="font-mono text-2xl font-bold mb-4 text-primary relative z-10">Ownership & Buyout</h4>
          <div className="space-y-4 relative z-10">
            <p className="text-base md:text-lg text-foreground">
              Clients gain <strong className="font-semibold text-accent">full IP and database ownership</strong> upon contract completion.
            </p>
            <p className="text-sm md:text-base text-muted">
              <strong className="text-foreground font-medium">Early Buyout Clause:</strong> Clients can pay the remaining contract balance at any time for an immediate, full codebase and database transfer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
