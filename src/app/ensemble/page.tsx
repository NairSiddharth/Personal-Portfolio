import Personal from "@/sections/Offscreen";

const title = "Beyond the Code - Siddharth Nair";
const description =
  "A look beyond the code: movies, books, music, and memories from Siddharth Nair's internships and life adventures.";

export const metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/moi.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/moi.jpg"] },
};

export default function PersonalPage() {
  return <Personal />;
}
