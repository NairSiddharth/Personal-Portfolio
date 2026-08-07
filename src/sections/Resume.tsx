"use client";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const RESUME_URL = "/Siddharth_Nair_Resume.pdf";
const MAX_PAGE_WIDTH = 800;

export default function Resume() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState(MAX_PAGE_WIDTH);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setPageWidth(Math.min(containerRef.current.clientWidth, MAX_PAGE_WIDTH));
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = RESUME_URL;
    link.download = "Siddharth_Nair_Resume.pdf";
    link.click();
  };

  return (
    <section id="resume" className="space-y-6 py-12 px-6 max-w-4xl mx-auto">
      <h2 className="font-bold text-3xl text-center">Resume</h2>
      <p className="font-body text-base text-center">
        Preview my resume below or download a copy.
      </p>

      <div
        ref={containerRef}
        className="w-full border rounded-lg overflow-hidden bg-muted/20 flex flex-col items-center py-4"
      >
        <Document
          file={RESUME_URL}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={
            <div className="py-24 text-center text-muted-foreground">Loading resume...</div>
          }
          error={
            <div className="py-24 text-center text-muted-foreground">
              Couldn't load the preview — use the download button below.
            </div>
          }
        >
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              width={pageWidth}
              className="mb-4 shadow-md last:mb-0"
            />
          ))}
        </Document>
      </div>

      <div className="flex justify-center mt-2">
        <Button
          onClick={handleDownload}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <ArrowDown className="w-4 h-4" />
          Download Resume
        </Button>
      </div>
    </section>
  );
}
