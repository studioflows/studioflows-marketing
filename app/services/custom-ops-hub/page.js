import CustomOpsHubClient from "./CustomOpsHubClient";

export const metadata = {
  title: "OPS Drag Audit Qualifier | StudioFlows",
  description:
    "Complete the 90-second StudioFlows qualifier to pre-vet fit, urgency, and implementation readiness before OPS Drag Audit slots are offered.",
  alternates: {
    canonical: "/services/custom-ops-hub",
  },
  openGraph: {
    title: "OPS Drag Audit Qualifier | StudioFlows",
    description:
      "Pre-qualify for a StudioFlows OPS Drag Audit with a 90-second challenger-style assessment.",
    url: "/services/custom-ops-hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OPS Drag Audit Qualifier | StudioFlows",
    description:
      "Take the StudioFlows qualifier and see if your team is ready for an OPS Drag Audit slot.",
  },
};

export default function CustomOpsHubPage() {
  return <CustomOpsHubClient />;
}
