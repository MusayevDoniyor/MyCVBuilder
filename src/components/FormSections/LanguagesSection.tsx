import { useState } from "react";
import { useFormData } from "../../hooks/useFormData";
import { AddButton } from "../AddButton";
import { Languages, X } from "lucide-react";

export const LanguagesSection = () => {
  const { data, addLanguage, removeLanguage } = useFormData();
  const [newLanguage, setNewLanguage] = useState({
    name: "",
    proficiency: "Intermediate" as const,
  });

  const handleAddLanguage = () => {
    if (newLanguage.name.trim()) {
      addLanguage({ ...newLanguage });
      setNewLanguage({
        name: "",
        proficiency: "Intermediate",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddLanguage();
    }
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case "Beginner":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Advanced":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Fluent":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Languages className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Tillar
        </h3>
      </div>

      {/* Add new language */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newLanguage.name}
          onChange={(e) =>
            setNewLanguage({ ...newLanguage, name: e.target.value })
          }
          onKeyPress={handleKeyPress}
          placeholder="Masalan: Ingliz tili"
          className="form-input flex-1"
        />
        <select
          value={newLanguage.proficiency}
          onChange={(e) =>
            setNewLanguage({
              ...newLanguage,
              proficiency: e.target.value as any,
            })
          }
          className="form-input w-40"
        >
          <option value="Beginner">Boshlang'ich</option>
          <option value="Intermediate">O'rta</option>
          <option value="Advanced">Yuqori</option>
          <option value="Fluent">Erkin</option>
        </select>
        <AddButton
          onClick={handleAddLanguage}
          disabled={!newLanguage.name.trim()}
        >
          Qo'shish
        </AddButton>
      </div>

      {/* Languages list */}
      <div className="space-y-3">
        {data.languages.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Hali til qo'shilmagan
          </p>
        ) : (
          data.languages.map((language, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {language.name}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getProficiencyColor(
                    language.proficiency
                  )}`}
                >
                  {language.proficiency}
                </span>
              </div>
              <button
                onClick={() => removeLanguage(index)}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
