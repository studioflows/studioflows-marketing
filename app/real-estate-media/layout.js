import { IBM_Plex_Mono } from "next/font/google";

export const metadata = {
  title: "Real Estate Media | Media Ops Score",
  description:
    "For founder-led real estate media studios. Photo, drone, reels, floor plans, 24–48h turnarounds. See what still routes to you after booking.",
};

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export default function RealEstateMediaLayout({ children }) {
  return <div className={`${ibmPlexMono.variable} font-mono`}>{children}</div>;
}
