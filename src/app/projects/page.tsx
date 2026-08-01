import Projects from "@/sections/Projects";

const title = "Projects - Siddharth Nair";
const description =
  "A showcase of Siddharth Nair's technical projects: full-stack apps, machine learning models, and data pipelines built with Python, TypeScript, and modern web frameworks.";

export const metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/moi.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/moi.jpg"] },
};

export default function ProjectsPage() {
  return <Projects />;
}
