export type PricingTier = {
  id: string;
  name: string;
  target: string;
  isPopular?: boolean;
  pricing: {
    monthly18: number;
    monthly24: number;
  };
  features: string[];
  includedDevTime: string;
};

export type SOWExample = {
  name: string;
  price: number;
  description: string;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "essential-edge",
    name: "Essential Edge",
    target: "Standard local service businesses.",
    pricing: {
      monthly18: 249,
      monthly24: 199,
    },
    features: [
      "Base Cloud Hosting",
      "Global CDN",
      "Daily Backups (Coolify pg_dump to S3)",
      "Uptime Monitoring"
    ],
    includedDevTime: "0 Hours/month",
  },
  {
    id: "digital-fortress",
    name: "Digital Fortress",
    target: "High-revenue businesses requiring active threat mitigation.",
    isPopular: true,
    pricing: {
      monthly18: 399,
      monthly24: 349,
    },
    features: [
      "Base Cloud Hosting",
      "Global CDN",
      "Daily Backups (Coolify pg_dump to S3)",
      "Uptime Monitoring",
      "Cloudflare Pro WAF",
      "Continuous Data Protection (WAL archiving for PITR)"
    ],
    includedDevTime: "2 Hours/month",
  },
  {
    id: "nexus-authority",
    name: "Nexus Authority",
    target: "Scaling companies running heavy ad spend requiring a fractional CTO.",
    pricing: {
      monthly18: 999,
      monthly24: 899,
    },
    features: [
      "Base Cloud Hosting",
      "Global CDN",
      "Daily Backups (Coolify pg_dump to S3)",
      "Uptime Monitoring",
      "Cloudflare Pro WAF",
      "Continuous Data Protection (WAL archiving for PITR)",
      "SigNoz/OpenTelemetry APM Reporting",
      "Priority SLA Response"
    ],
    includedDevTime: "6 Hours/month",
  }
];

export const CONTRACT_TERMS = {
  buyoutClause: "Clients can pay the remaining contract balance at any time for an immediate codebase/database transfer.",
  ownership: "Clients gain full IP and database ownership upon contract completion.",
};

export const SOW_EXAMPLES: SOWExample[] = [
  {
    name: "React-based HVAC Quoting Calculator",
    price: 1200,
    description: "Interactive calculator with dynamic pricing logic, PDF export, and CRM integration hooks."
  },
  {
    name: "Custom Booking & Scheduling System",
    price: 2500,
    description: "Calendar-driven appointment scheduler with automated email confirmations and admin dashboard."
  },
  {
    name: "E-Commerce Product Catalog Integration",
    price: 1800,
    description: "Headless commerce catalog with Square or Stripe integration, cart, and checkout flow."
  },
  {
    name: "Client Portal & Dashboard",
    price: 3500,
    description: "Authenticated client portal with project status tracking, invoicing, and document uploads."
  }
];
