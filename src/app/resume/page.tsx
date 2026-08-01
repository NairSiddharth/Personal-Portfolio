import Resume from "@/sections/Resume";

const title = "Resume - Siddharth Nair";
const description =
  "Preview or download Siddharth Nair's resume. Software engineer with experience in Python, full-stack development, and data/AI systems.";

export const metadata = {
  title,
  description,
  openGraph: { title, description, images: ["/moi.jpg"] },
  twitter: { card: "summary_large_image", title, description, images: ["/moi.jpg"] },
};

export default function ResumePage() {
  return <Resume />;
}
