import { useState } from "react";
import { Download, Copy, FileText, ChevronDown, X } from "lucide-react";
import { useFormData } from "../../hooks/useFormData";
import { exportToJSON, copyToClipboard } from "../../utils/exportUtils";
import { LoadingSpinner } from "../Accessibility/LoadingSpinner";

interface ExportButtonProps {
  onSuccess: (title: string, message?: string) => void;
  onError: (title: string, message?: string) => void;
}

export const ExportButton = ({ onSuccess, onError }: ExportButtonProps) => {
  const { data } = useFormData();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async (type: "download" | "copy") => {
    setIsLoading(true);

    try {
      switch (type) {
        case "download":
          exportToJSON(data);
          onSuccess("Muvaffaqiyatli!", "CV ma'lumotlari yuklandi");
          break;
        case "copy":
          await copyToClipboard(data);
          onSuccess("Muvaffaqiyatli!", "Ma'lumotlar nusxalandi");
          break;
      }
    } catch (error) {
      console.error("Export xatoligi:", error);
      onError(
        "Xatolik!",
        error instanceof Error ? error.message : "Xatolik yuz berdi"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonContent = () => {
    if (isLoading) {
      return (
        <>
          <LoadingSpinner size="sm" ariaLabel="Amal bajarilmoqda" />
          <span>Amal bajarilmoqda...</span>
        </>
      );
    }

    return (
      <>
        <FileText className="w-4 h-4" />
        <span>Export</span>
        <ChevronDown className="w-4 h-4" />
      </>
    );
  };

  const getButtonClasses = () => {
    return "btn-secondary flex items-center gap-1 px-3 py-2 text-sm relative";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className={getButtonClasses()}
        aria-label="Export menyusini ochish"
        aria-expanded={isOpen}
      >
        {getButtonContent()}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-2">
            {/* Header */}
            <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Export
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Export Section */}
            <div className="p-2">
              <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                Export
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => handleExport("download")}
                  className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                >
                  <Download className="w-4 h-4" />
                  <span>JSON fayl yuklab olish</span>
                </button>
                <button
                  onClick={() => handleExport("copy")}
                  className="w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                >
                  <Copy className="w-4 h-4" />
                  <span>Clipboard ga nusxalash</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};
