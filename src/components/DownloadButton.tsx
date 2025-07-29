import { useState } from "react";
import { Download, CheckCircle, AlertCircle } from "lucide-react";
import { LoadingSpinner } from "./Accessibility/LoadingSpinner";
import { useAnalytics } from "../hooks/useAnalytics";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const DownloadButton = () => {
  const { trackDownload } = useAnalytics();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleDownload = async () => {
    setIsLoading(true);
    setStatus("idle");

    try {
      const cvPreview = document.getElementById("cv-preview");
      if (!cvPreview) {
        throw new Error("CV preview element topilmadi");
      }

      // Scroll to top for better PDF capture
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Wait a bit for scroll to complete and any animations to finish
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Temporarily hide any elements that shouldn't be in PDF
      const elementsToHide = cvPreview.querySelectorAll(
        '.no-print, [data-no-pdf="true"]'
      );
      const originalDisplays: string[] = [];

      elementsToHide.forEach((el) => {
        const htmlEl = el as HTMLElement;
        originalDisplays.push(htmlEl.style.display);
        htmlEl.style.display = "none";
      });

      // Convert HTML to canvas with high quality settings
      const canvas = await html2canvas(cvPreview, {
        scale: 3, // Even higher scale for better quality
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        width: cvPreview.scrollWidth,
        height: cvPreview.scrollHeight,
        backgroundColor: "#ffffff", // Ensure white background
        logging: false, // Disable logging for production
        imageTimeout: 15000, // 15 seconds timeout for images
        removeContainer: true, // Remove temporary container
        foreignObjectRendering: false, // Better compatibility
        ignoreElements: (element) => {
          // Ignore elements that shouldn't be in PDF
          const htmlEl = element as HTMLElement;
          return (
            element.classList.contains("no-print") ||
            htmlEl.style.display === "none" ||
            element.getAttribute("data-no-pdf") === "true"
          );
        },
        onclone: (clonedDoc) => {
          // Ensure fonts are loaded in cloned document
          const clonedElement = clonedDoc.getElementById("cv-preview");
          if (clonedElement) {
            // Force font loading
            clonedElement.style.fontFamily = "Inter, system-ui, sans-serif";
            clonedElement.style.fontSize = "14px";
          }
        },
      });

      // Restore hidden elements
      elementsToHide.forEach((el, index) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.display = originalDisplays[index];
      });

      // Calculate PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF with proper styling
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
        precision: 16,
      });

      let heightLeft = imgHeight;
      let position = 0; // Top of the page

      // Add first page
      pdf.addImage(
        canvas,
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );
      heightLeft -= pageHeight;

      // Add additional pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          canvas,
          "JPEG",
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );
        heightLeft -= pageHeight;
      }

      // Save the PDF with timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      pdf.save(`my-cv-${timestamp}.pdf`);

      // Track PDF download
      trackDownload();

      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("PDF yaratishda xatolik:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonContent = () => {
    if (isLoading) {
      return (
        <>
          <LoadingSpinner size="sm" ariaLabel="PDF yaratilmoqda" />
          <span>PDF yaratilmoqda...</span>
        </>
      );
    }

    if (status === "success") {
      return (
        <>
          <CheckCircle className="w-4 h-4" />
          <span>Muvaffaqiyatli yuklandi!</span>
        </>
      );
    }

    if (status === "error") {
      return (
        <>
          <AlertCircle className="w-4 h-4" />
          <span>Xatolik yuz berdi</span>
        </>
      );
    }

    return (
      <>
        <Download className="w-4 h-4" />
        <span>PDF yuklab olish</span>
      </>
    );
  };

  const getButtonClasses = () => {
    const baseClasses =
      "btn-primary flex items-center gap-1 px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed";

    if (status === "success") {
      return `${baseClasses} bg-green-600 hover:bg-green-700 focus:ring-green-500`;
    }

    if (status === "error") {
      return `${baseClasses} bg-red-600 hover:bg-red-700 focus:ring-red-500`;
    }

    return baseClasses;
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={getButtonClasses()}
      aria-label="CV ni PDF formatda yuklab olish"
      aria-describedby="download-description"
    >
      {getButtonContent()}
    </button>
  );
};
