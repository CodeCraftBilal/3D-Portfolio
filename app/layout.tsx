import type { Metadata, Viewport } from "next";
import "@fontsource/geist/latin-400.css";
import "@fontsource/geist/latin-500.css";
import "@fontsource/geist/latin-600.css";
import "@fontsource/geist/latin-700.css";
import "@fontsource/geist-mono/latin-400.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000"),
  ),
  title: "Bilal Khan — Developer & Creative Thinker",
  description:
    "Step inside Bilal Khan’s interactive developer workspace. Explore React Native and full-stack projects, skills, experience, and the person behind the code.",
  applicationName: "Bilal’s Developer Room",
  keywords: [
    "Bilal Khan",
    "React Native developer",
    "Next.js",
    "TypeScript",
    "full-stack developer",
    "Pakistan",
    "3D portfolio",
  ],
  authors: [{ name: "M. Bilal Khan" }],
  openGraph: {
    title: "A little space. A lot of ideas. — Bilal Khan",
    description:
      "A developer workspace with a story to tell. Explore my projects, toolkit, and journey.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bilal Khan — Developer & Creative Thinker",
    description: "Step inside my interactive developer workspace.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ed",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
