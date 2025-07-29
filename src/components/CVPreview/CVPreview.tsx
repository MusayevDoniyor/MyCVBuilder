import { useEffect } from "react";
import { useFormData } from "../../hooks/useFormData";
import { useAnalytics } from "../../hooks/useAnalytics";
import { ClassicTemplate } from "./ClassicTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { MinimalTemplate } from "./MinimalTemplate";
import { CreativeTemplate } from "./CreativeTemplate";
import { ProfessionalTemplate } from "./ProfessionalTemplate";
import { ElegantTemplate } from "./ElegantTemplate";

export const CVPreview = () => {
  const { data, template } = useFormData();
  const { trackView, trackTemplate } = useAnalytics();

  // CV ko'rishlarni kuzatish
  useEffect(() => {
    trackView();
    trackTemplate(template);
  }, [template, trackView, trackTemplate]);

  const renderTemplate = () => {
    switch (template) {
      case "classic":
        return <ClassicTemplate data={data} />;
      case "modern":
        return <ModernTemplate data={data} />;
      case "minimal":
        return <MinimalTemplate data={data} />;
      case "creative":
        return <CreativeTemplate data={data} />;
      case "professional":
        return <ProfessionalTemplate data={data} />;
      case "elegant":
        return <ElegantTemplate data={data} />;
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 border-b border-primary-200 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          CV Ko'rinishi
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Real-time preview •{" "}
          {template.charAt(0).toUpperCase() + template.slice(1)} shablon
        </p>
      </div>
      <div className="p-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">{renderTemplate()}</div>
      </div>
    </div>
  );
};
