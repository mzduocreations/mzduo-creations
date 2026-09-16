import type { Metadata } from "next";
import { Poppins, Baloo_2 } from "next/font/google";
import "./globals.css";
import ScrollReveal from "@/components/ScrollReveal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "MZDUO creations | Furry & Anime Art Portfolio",
  description:
    "MZDUO creations custom furry artwork, PFPs, reference sheets, Discord banners, fursuits and anime artwork. Bringing anthropomorphic characters to life.",
  icons: {
    icon: "/assets/logo.jpeg",
    apple: "/assets/logo.jpeg",
  },
  openGraph: {
    title: "MZDUO creations",
    description: "Custom furry & anime art portfolio.",
    images: ["/assets/logo.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${baloo.variable}`}>
      <body className="font-sans antialiased">
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
