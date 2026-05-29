import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.studioflows.co"),
  title: {
    default: "StudioFlows | Execution Infrastructure for Service Businesses",
    template: "%s | StudioFlows",
  },
  description:
    "StudioFlows turns scattered business signals into approved, trackable execution for service businesses.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "StudioFlows | Execution Infrastructure for Service Businesses",
    description:
      "StudioFlows turns scattered business signals into approved, trackable execution for service businesses.",
    url: "https://www.studioflows.co",
    siteName: "StudioFlows",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudioFlows | Execution Infrastructure for Service Businesses",
    description:
      "StudioFlows turns scattered business signals into approved, trackable execution for service businesses.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
