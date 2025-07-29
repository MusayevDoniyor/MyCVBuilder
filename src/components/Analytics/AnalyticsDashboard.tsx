import { useState } from "react";
import {
  BarChart3,
  Eye,
  Download,
  Palette,
  Calendar,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useAnalytics } from "../../hooks/useAnalytics";
import { clearAnalytics } from "../../utils/analytics";

export const AnalyticsDashboard = () => {
  const { stats, updateStats } = useAnalytics();
  const [isOpen, setIsOpen] = useState(false);

  const handleClearAnalytics = () => {
    if (confirm("Barcha statistikalar o'chiriladi. Davom etasizmi?")) {
      clearAnalytics();
      updateStats();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTemplateDisplayName = (template: string) => {
    const templateNames: Record<string, string> = {
      classic: "Classic",
      modern: "Modern",
      minimal: "Minimal",
      creative: "Creative",
      professional: "Professional",
      elegant: "Elegant",
    };
    return templateNames[template] || template;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary flex items-center gap-1 px-3 py-2 text-sm"
        aria-label="Analytics dashboard ochish"
      >
        <BarChart3 className="w-4 h-4" />
        <span className="hidden xl:inline">Analytics</span>
      </button>

      {/* Analytics Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Analytics Dashboard
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <span className="sr-only">Yopish</span>
                <span className="text-2xl">×</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center gap-3">
                    <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        CV Ko'rishlar
                      </p>
                      <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                        {stats.totalViews}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-4 rounded-lg border border-green-200 dark:border-green-700">
                  <div className="flex items-center gap-3">
                    <Download className="w-8 h-8 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                        PDF Download
                      </p>
                      <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                        {stats.totalDownloads}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center gap-3">
                    <Palette className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                        Eng ko'p ishlatilgan
                      </p>
                      <p className="text-lg font-bold text-purple-800 dark:text-purple-200">
                        {stats.mostUsedTemplate
                          ? getTemplateDisplayName(stats.mostUsedTemplate)
                          : "Yo'q"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Usage */}
              {Object.keys(stats.templateUsage).length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Shablon ishlatishlari
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(stats.templateUsage)
                      .sort(([, a], [, b]) => b - a)
                      .map(([template, count]) => (
                        <div
                          key={template}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-700 dark:text-gray-300">
                            {getTemplateDisplayName(template)}
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">
                            {count} marta
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Last Updated */}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Oxirgi yangilanish: {formatDate(stats.lastUpdated)}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={updateStats}
                  className="btn-secondary flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Yangilash
                </button>
                <button
                  onClick={handleClearAnalytics}
                  className="btn-secondary flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Tozalash
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
