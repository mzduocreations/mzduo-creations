import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatIsFurry from "@/components/WhatIsFurry";
import GallerySection from "@/components/GallerySection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { getAllImages } from "@/models/image";
import { coverUrl } from "@/lib/media";

export const dynamic = "force-dynamic";

export default async function Home() {
  let covers: Record<string, string> = {};
  try {
    const images = await getAllImages();
    for (const img of images) {
      if (img.category && !covers[img.category]) {
        covers[img.category] = coverUrl(img.url, img.resourceType);
      }
    }
  } catch {
    covers = {};
  }

  return (
    <main>
      <Navbar />
      <Hero />
      <WhatIsFurry />
      <GallerySection initialCovers={covers} />
      <HowItWorks />
      <Footer />
    </main>
  );
}
