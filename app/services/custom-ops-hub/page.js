import CustomOpsHubClient from "./CustomOpsHubClient";

export const metadata = {
  title: "Custom Ops Hub Consulting for Growing Businesses | StudioFlows",
  description:
    "StudioFlows designs custom ops hub systems for businesses with operational bottlenecks. Complete a guided qualification experience and book a strategic call.",
  alternates: {
    canonical: "/services/custom-ops-hub",
  },
  openGraph: {
    title: "Custom Ops Hub Consulting for Growing Businesses | StudioFlows",
    description:
      "A guided StudioFlows qualification experience for businesses that need tighter execution control, clearer workflows, and faster operational outcomes.",
    url: "/services/custom-ops-hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Ops Hub Consulting for Growing Businesses | StudioFlows",
    description:
      "Take the StudioFlows qualification experience and map your custom operations hub path.",
  },
};

export default function CustomOpsHubPage() {
  return <CustomOpsHubClient />;
}
