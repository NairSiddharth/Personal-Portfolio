import Experience from "@/sections/Experience";

const title = "Experience - Siddharth Nair";
const description =
  "Siddharth Nair's professional experience, including four software engineering internships at JPMorgan Chase building AI-powered infrastructure, data pipelines, and backend services.";

export const metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/moi.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/moi.jpg"] },
};

export default function ExperiencePage() {
  return <Experience />;
}
