import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryImages from "@/components/CategoryImages";
import { getCategory, CATEGORY_SLUGS } from "@/lib/categories";

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <main>
      <Navbar />
      <section className="pt-28 pb-10">
        <div className="section">
          <Link href="/" className="text-sm font-semibold text-coral hover:underline">
            ← Back to home
          </Link>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-plum sm:text-5xl">
            {category.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-plum/70">
            {category.description}
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="section">
          <CategoryImages slug={category.slug} title={category.title} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
