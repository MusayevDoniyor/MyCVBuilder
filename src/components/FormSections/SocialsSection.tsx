import { useFormData } from "../../hooks/useFormData";
import { Share2, Linkedin, Github, Globe, MessageCircle } from "lucide-react";

export const SocialsSection = () => {
  const { data, updateSocials } = useFormData();

  const handleInputChange = (
    field: keyof typeof data.socials,
    value: string
  ) => {
    updateSocials({ [field]: value });
  };

  return (
    <div className="card p-3 sm:p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Ijtimoiy tarmoqlar
        </h3>
      </div>

      <div className="space-y-4">
        {/* LinkedIn */}
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            LinkedIn
          </label>
          <div className="relative">
            <Linkedin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
            <input
              type="url"
              value={data.socials.linkedin}
              onChange={(e) => handleInputChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="form-input pl-12 w-full text-sm"
            />
          </div>
        </div>

        {/* GitHub */}
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            GitHub
          </label>
          <div className="relative">
            <Github className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
            <input
              type="url"
              value={data.socials.github}
              onChange={(e) => handleInputChange("github", e.target.value)}
              placeholder="https://github.com/username"
              className="form-input pl-12 w-full text-sm"
            />
          </div>
        </div>

        {/* Website */}
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            Website
          </label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
            <input
              type="url"
              value={data.socials.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              placeholder="https://mycvbuilder.uz"
              className="form-input pl-12 w-full text-sm"
            />
          </div>
        </div>

        {/* Telegram */}
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            Telegram username
          </label>
          <div className="relative">
            <MessageCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
            <input
              type="text"
              value={data.socials.telegram}
              onChange={(e) => handleInputChange("telegram", e.target.value)}
              placeholder="@username yoki +998901234567"
              className="form-input pl-12 w-full text-sm"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Telegram username (@username) yoki telefon raqamini kiriting
          </p>
        </div>
      </div>

      <div className="mt-4 p-2 sm:p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
        <p className="text-sm text-primary-700 dark:text-primary-300">
          💡 Ijtimoiy tarmoq havolalari CV'ingizda professional ko'rinishda
          ko'rsatiladi
        </p>
      </div>
    </div>
  );
};
