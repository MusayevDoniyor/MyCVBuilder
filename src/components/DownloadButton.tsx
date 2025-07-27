import { useState } from "react";
import { Download, CheckCircle, AlertCircle } from "lucide-react";
import { LoadingSpinner } from "./Accessibility/LoadingSpinner";

export const DownloadButton = () => {
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

      // Wait a bit for scroll to complete
      await new Promise((resolve) => setTimeout(resolve, 500));

      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: [10, 10, 10, 10],
        filename: "my-cv.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          scrollY: 0,
          scrollX: 0,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      await html2pdf().set(opt).from(cvPreview).save();

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
    let baseClasses =
      "btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

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
