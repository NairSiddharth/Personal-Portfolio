import Projects from "@/sections/Projects";
import projectsData from "@/data/projects.json";

const title = "Projects - Siddharth Nair";
const description =
  "A showcase of Siddharth Nair's technical projects: full-stack apps, machine learning models, and data pipelines built with Python, TypeScript, and modern web frameworks.";

export const metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/moi.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/moi.jpg"] },
};

const projectsJsonLd = projectsData.map((project) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: project.name,
  description: project.detailed_description || project.description,
  codeRepository: project.html_url,
  author: { "@type": "Person", name: "Siddharth Nair" },
  keywords: project.tags.join(", "),
  dateCreated: project.year,
  ...(project.live_url ? { url: project.live_url } : {}),
}));

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <Projects />
    </>
  );
}
