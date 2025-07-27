import { useFormData } from "../hooks/useFormData";
import { Palette, Sparkles, Briefcase, Crown, Zap, Star } from "lucide-react";

export const TemplateSelector = () => {
  const { template, setTemplate } = useFormData();

  const templates = [
    {
      id: "classic",
      name: "Classic",
      description: "Oddiy, professional dizayn",
      icon: <Briefcase className="w-6 h-6" />,
      preview:
        "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300 dark:from-blue-900 dark:to-blue-800 dark:border-blue-600",
      color:
        "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20",
    },
    {
      id: "modern",
      name: "Modern",
      description: "Card-based zamonaviy dizayn",
      icon: <Zap className="w-6 h-6" />,
      preview:
        "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 dark:from-gray-700 dark:to-gray-600 dark:border-gray-500",
      color:
        "border-gray-500 bg-gray-50 dark:border-gray-400 dark:bg-gray-700/20",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Qora-oq, oddiy dizayn",
      icon: <Star className="w-6 h-6" />,
      preview:
        "bg-gradient-to-br from-white to-gray-50 border-gray-400 dark:from-gray-800 dark:to-gray-700 dark:border-gray-600",
      color:
        "border-gray-700 bg-gray-50 dark:border-gray-300 dark:bg-gray-700/20",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Rangli va zamonaviy",
      icon: <Sparkles className="w-6 h-6" />,
      preview:
        "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300 dark:from-purple-900 dark:to-pink-900 dark:border-purple-600",
      color:
        "border-purple-500 bg-purple-50 dark:border-purple-400 dark:bg-purple-900/20",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Biznes uchun mos",
      icon: <Crown className="w-6 h-6" />,
      preview:
        "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 dark:from-green-900 dark:to-emerald-900 dark:border-green-600",
      color:
        "border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/20",
    },
    {
      id: "elegant",
      name: "Elegant",
      description: "Nafis va chiroyli",
      icon: <Palette className="w-6 h-6" />,
      preview:
        "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-300 dark:from-rose-900 dark:to-pink-900 dark:border-rose-600",
      color:
        "border-rose-500 bg-rose-50 dark:border-rose-400 dark:bg-rose-900/20",
    },
  ];

  return (
    <div className="card p-6 animate-fade-in">
      <div className="section-title">
        <Palette className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <span>Shablon tanlash</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id as any)}
            className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              template === t.id
                ? `${t.color} shadow-lg`
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <div
              className={`w-full h-20 rounded-lg mb-3 border ${t.preview} flex items-center justify-center`}
            >
              {t.icon}
            </div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
              {t.name}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {t.description}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
        <p className="text-sm text-primary-700 dark:text-primary-300">
          🎨 Har bir shablon CV'ingizni turli uslubda ko'rsatadi. O'zingizga
          yoqqanini tanlang!
        </p>
      </div>
    </div>
  );
};
