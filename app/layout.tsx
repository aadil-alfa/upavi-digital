import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: "UPAVI",

  title: {
    default: "UPAVI | Malayali Association, CUAP",
    template: "%s | UPAVI",
  },

  description:
    "Discover UPAVI, the Malayali Association of the Central University of Andhra Pradesh. Explore our culture, events, student community, celebrations, and activities.",

  keywords: [
    "UPAVI",
    "UPAVI CUAP",
    "Malayali Association",
    "Central University of Andhra Pradesh",
    "Kerala Students Association",
    "Malayali Students",
    "UPAVI Events",
    "Onam Celebration",
    "Student Community",
  ],

  icons: {
    icon: "/image/Upavi%20black.png",
    shortcut: "/image/Upavi%20black.png",
    apple: "/image/Upavi%20black.png",
  },

  category: "education",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "UPAVI | Malayali Association, CUAP",
    description:
      "Discover UPAVI, the Malayali Association of the Central University of Andhra Pradesh.",
    siteName: "UPAVI",
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "UPAVI | Malayali Association, CUAP",
    description:
      "Discover UPAVI, the Malayali Association of the Central University of Andhra Pradesh.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClasses =
    inter.variable + " " + spaceGrotesk.variable + " scroll-smooth";

  return (
    <html lang="en" className={fontClasses}>
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased selection:bg-emerald-200 selection:text-emerald-950">
        {children}
      </body>
    </html>
  );
}