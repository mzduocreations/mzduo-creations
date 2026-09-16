export type CategorySlug =
  | "furry-artwork"
  | "pfps"
  | "reference-sheets"
  | "discord-banners"
  | "fursuits"
  | "anime-artwork";

export interface Category {
  slug: CategorySlug;
  title: string;
  description: string;
  accent: string; 
  cover?: string;
}

export const DEFAULT_COVER =
  "https://res.cloudinary.com/hqrvak6u/image/upload/f_auto,q_auto,w_600/mzduo/defaults/cover.jpg";

export const CATEGORIES: Category[] = [
  {
    slug: "anime-artwork",
    title: "Anime Artwork",
    description:
      "Anime artwork transforms original characters and imaginative ideas into expressive, detailed illustrations inspired by anime aesthetics. Each artwork focuses on character personality, visual style, emotions, outfits, and creative composition, creating a polished piece that works beautifully for personal characters, avatars, stories, collections, and online profiles.",
    accent: "plum",
  },
  {
    slug: "furry-artwork",
    title: "Furry Artwork",
    description:
      "Furry artwork brings imaginative animal characters to life with expressive personalities, unique designs, and creative details. From cute and playful characters to powerful and adventurous personalities, each artwork is designed to capture the character's identity and make their personality stand out through polished, expressive, and visually appealing artwork.",
    accent: "coral",
    cover:
      "https://res.cloudinary.com/hqrvak6u/image/upload/e_art:athena,f_auto,q_auto,w_600/mzduo/defaults/cover.jpg",
  },
  {
    slug: "fursuits",
    title: "Fursuits",
    description:
      "Fursuits bring your furry character from artwork into the real world through carefully crafted costumes. Each suit can showcase the character's colors, markings, personality, and signature features while providing a fun and immersive way to express your character at conventions, events, photoshoots, or everyday furry activities.",
    accent: "lilac",
    cover:
      "https://res.cloudinary.com/hqrvak6u/image/upload/e_art:audrey,f_auto,q_auto,w_600/mzduo/defaults/cover.jpg",
  },
  {
    slug: "pfps",
    title: "PFPs (Profile Pictures)",
    description:
      "Furry PFPs are custom profile pictures designed to showcase your furry character in a fun, expressive, and eye catching way. Each piece focuses on the character's face, personality, colors, and unique features, making it perfect for Discord, social media, gaming profiles, and online communities.",
    accent: "peach",
    cover:
      "https://res.cloudinary.com/hqrvak6u/image/upload/c_thumb,g_auto,h_600,w_600,f_auto,q_auto/mzduo/defaults/cover.jpg",
  },
  {
    slug: "discord-banners",
    title: "Discord Banners",
    description:
      "Furry Discord banners are custom designed visuals made to give your profile or server a unique personality. They combine your character, colors, themes, and creative elements into a stylish composition that looks great across Discord profiles, servers, and online communities.",
    accent: "slate",
    cover:
      "https://res.cloudinary.com/hqrvak6u/image/upload/e_art:eucalyptus,f_auto,q_auto,w_600/mzduo/defaults/cover.jpg",
  },
  {
    slug: "reference-sheets",
    title: "Reference Sheets",
    description:
      "Furry reference sheets provide a complete visual guide to a character's design, including colors, markings, outfits, expressions, and important details. They make it easier to understand and recreate a character consistently while giving artists and creators everything they need in one organized and polished reference.",
    accent: "teal",
    cover:
      "https://res.cloudinary.com/hqrvak6u/image/upload/e_art:zorro,f_auto,q_auto,w_600/mzduo/defaults/cover.jpg",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);
