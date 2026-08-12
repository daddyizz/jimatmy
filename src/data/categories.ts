export type CategorySlug = "gadget" | "home" | "automotive" | "gaming" | "lifestyle";

export type Category = {
  slug: CategorySlug;
  label: string;
  description: string;
};

export const categories: Category[] = [
  { slug: "gadget", label: "Gadget", description: "Elektronik, aksesori dan peranti pintar." },
  { slug: "home", label: "Home", description: "Barangan rumah dan dapur yang praktikal." },
  {
    slug: "automotive",
    label: "Automotive",
    description: "Aksesori kereta dan penjagaan kenderaan.",
  },
  { slug: "gaming", label: "Gaming", description: "Peranti dan aksesori untuk gamer." },
  {
    slug: "lifestyle",
    label: "Lifestyle",
    description: "Gaya hidup harian, kesihatan dan fitness.",
  },
];

export const categoryLabel = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.label ?? slug;
