import { useState } from "react";
import { useFormData } from "../../hooks/useFormData";
import { AddButton } from "../AddButton";
import { X, Globe } from "lucide-react";
import { EditButton } from "../EditButton";
import { CustomSelect, type SelectOption } from "../UI/CustomSelect";
import type { Language } from "../../types";

export const LanguagesSection = () => {
  const { data, addLanguage, removeLanguage, updateLanguage } = useFormData();
  const [newLanguage, setNewLanguage] = useState<Language>({
    name: "",
    proficiency: "Intermediate",
  });
  const [showForm, setShowForm] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<{
    index: number;
    language: Language;
  } | null>(null);

  const proficiencyOptions: SelectOption[] = [
    { value: "Beginner", label: "Boshlang'ich" },
    { value: "Intermediate", label: "O'rta" },
    { value: "Advanced", label: "Yuqori" },
    { value: "Fluent", label: "Erkin" },
  ];

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

  const handleCancel = () => {
    setShowForm(false);
    setEditingLanguage(null);
    setNewLanguage({ name: "", proficiency: "Intermediate" });
  };

  const handleUpdateLanguage = () => {
    if (editingLanguage && editingLanguage.language) {
      updateLanguage(editingLanguage.index, {
        name: newLanguage.name,
        proficiency: newLanguage.proficiency,
      });
      setShowForm(false);
      setEditingLanguage(null);
      setNewLanguage({ name: "", proficiency: "Intermediate" });
    }
  };

  return (
    <div className="card p-3 sm:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Tillar
          </h3>
        </div>
        <AddButton
          onClick={() => setShowForm(true)}
          className="w-auto text-sm py-2 px-3 min-h-10"
        >
          Qo'shish
        </AddButton>
      </div>

      {/* Add/Edit language form */}
      {showForm && (
        <div className="mb-6 p-2 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex flex-col gap-2 mb-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">
              {editingLanguage ? "Tilni tahrirlash" : "Yangi til qo'shish"}
            </h4>
            <button
              className="ml-auto text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm"
              onClick={handleCancel}
              aria-label="Bekor qilish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Til nomi *
              </label>
              <input
                type="text"
                value={newLanguage.name}
                onChange={(e) =>
                  setNewLanguage({ ...newLanguage, name: e.target.value })
                }
                placeholder="Masalan: Ingliz tili"
                className="form-input w-full text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Daraja *
              </label>
              <CustomSelect
                options={proficiencyOptions}
                value={newLanguage.proficiency}
                onChange={(value) =>
                  setNewLanguage({
                    ...newLanguage,
                    proficiency: value as Language["proficiency"],
                  })
                }
                placeholder="Daraja tanlang"
                className="w-full"
                size="sm"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <button
                className="btn-primary w-full text-sm py-2 px-3 min-h-10"
                onClick={
                  editingLanguage
                    ? handleUpdateLanguage
                    : () => {
                        if (
                          newLanguage.name.trim() &&
                          newLanguage.proficiency.trim()
                        ) {
                          addLanguage({ ...newLanguage });
                          setNewLanguage({
                            name: "",
                            proficiency: "Intermediate",
                          });
                          setShowForm(false);
                        }
                      }
                }
              >
                {editingLanguage ? "Yangilash" : "Qo'shish"}
              </button>
              <button
                className="btn-secondary w-full text-sm py-2 px-3 min-h-10"
                onClick={handleCancel}
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language list */}
      <div className="flex flex-col gap-2">
        {data.languages.map((lang, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-2 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto"
          >
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-800 dark:text-gray-100 break-words">
                {lang.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 break-words">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getProficiencyColor(
                    lang.proficiency
                  )}`}
                >
                  {lang.proficiency}
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              <EditButton
                onClick={() => {
                  setEditingLanguage({ index: idx, language: lang });
                  setShowForm(true);
                }}
                size="sm"
                className="w-8 h-8"
              />
              <button
                onClick={() => removeLanguage(idx)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 w-8 h-8"
                aria-label="O'chirish"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
