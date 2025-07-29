import { useState } from "react";
import { useFormData } from "../../hooks/useFormData";
import { AddButton } from "../AddButton";
import { EditButton } from "../EditButton";
import { CustomSelect, type SelectOption } from "../UI/CustomSelect";
import {
  Code,
  X,
  Sparkles,
  Database,
  Globe,
  Smartphone,
  Server,
  Shield,
  Palette,
} from "lucide-react";
import type { Skill } from "../../types";

export const SkillsSection = () => {
  const { data, addSkill, removeSkill, updateSkill } = useFormData();
  const [newSkill, setNewSkill] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    | "programming"
    | "frontend"
    | "backend"
    | "mobile"
    | "database"
    | "devops"
    | "design"
    | "others"
  >("programming");
  const [editingSkill, setEditingSkill] = useState<{
    index: number;
    name: string;
    category: Skill["category"];
  } | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddSkill();
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill({ name: newSkill.trim(), category: selectedCategory });
      setNewSkill("");
    }
  };

  const handleEditSkill = (skill: Skill, index: number) => {
    setEditingSkill({
      index,
      name: skill.name,
      category: skill.category,
    });
  };

  const handleSaveEdit = () => {
    if (editingSkill && editingSkill.name.trim()) {
      updateSkill(editingSkill.index, {
        name: editingSkill.name.trim(),
        category: editingSkill.category,
      });
      setEditingSkill(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingSkill(null);
  };

  const categories = [
    {
      id: "programming",
      name: "Dasturlash tillari",
      icon: <Code className="w-4 h-4" />,
    },
    { id: "frontend", name: "Frontend", icon: <Globe className="w-4 h-4" /> },
    { id: "backend", name: "Backend", icon: <Server className="w-4 h-4" /> },
    { id: "mobile", name: "Mobile", icon: <Smartphone className="w-4 h-4" /> },
    {
      id: "database",
      name: "Database",
      icon: <Database className="w-4 h-4" />,
    },
    { id: "devops", name: "DevOps", icon: <Shield className="w-4 h-4" /> },
    { id: "design", name: "Design", icon: <Palette className="w-4 h-4" /> },
    { id: "others", name: "Boshqalar", icon: <Sparkles className="w-4 h-4" /> },
  ];

  const categoryOptions: SelectOption[] = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  return (
    <div className="card p-3 sm:p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Ko'nikmalar
          </h3>
        </div>

        <AddButton
          onClick={handleAddSkill}
          disabled={!newSkill.trim()}
          className="w-auto text-sm py-2 px-3 min-h-10"
        >
          Ko'nikma qo'shish
        </AddButton>
      </div>

      {/* Add new skill */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-2 sm:p-4 rounded-lg border border-primary-200 dark:border-gray-600 mb-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Masalan: React, Node.js, Docker, Figma..."
              className="form-input w-full text-sm flex-1"
              onKeyDown={handleKeyDown}
            />
            <CustomSelect
              options={categoryOptions}
              value={selectedCategory}
              onChange={(value) =>
                setSelectedCategory(value as Skill["category"])
              }
              placeholder="Kategoriya tanlang"
              className="w-full sm:w-48"
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Skills by category */}
      <div className="space-y-6">
        {categories.map((category) => {
          const categorySkills = data.skills.filter(
            (skill) => skill.category === category.id
          );
          if (categorySkills.length === 0) return null;

          return (
            <div key={category.id} className="animate-slide-up">
              <div className="flex items-center gap-2 mb-3">
                {category.icon}
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  {category.name}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({categorySkills.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, index) => {
                  const globalIndex = data.skills.findIndex(
                    (s) =>
                      s.name === skill.name && s.category === skill.category
                  );
                  const isEditing = editingSkill?.index === globalIndex;

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-sm dark:hover:shadow-md transition-all duration-200 group"
                    >
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={editingSkill.name}
                            onChange={(e) =>
                              setEditingSkill({
                                ...editingSkill,
                                name: e.target.value,
                              })
                            }
                            className="flex-1 form-input text-sm"
                            autoFocus
                          />
                          <CustomSelect
                            options={categoryOptions}
                            value={editingSkill.category}
                            onChange={(value) =>
                              setEditingSkill({
                                ...editingSkill,
                                category: value as Skill["category"],
                              })
                            }
                            placeholder="Kategoriya"
                            className="w-32"
                            size="sm"
                          />
                          <div className="flex items-center gap-1">
                            <button
                              onClick={handleSaveEdit}
                              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 p-1"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="font-medium text-gray-800 dark:text-gray-100 flex-1">
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-1">
                            <EditButton
                              onClick={() =>
                                handleEditSkill(skill, globalIndex)
                              }
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-all duration-200"
                            />
                            <button
                              onClick={() => removeSkill(globalIndex)}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 opacity-0 group-hover:opacity-100 transition-all duration-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {data.skills.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Code className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          <p>Hali ko'nikma qo'shilmagan</p>
          <p className="text-sm">
            Yuqoridagi forma orqali ko'nikmalaringizni qo'shing
          </p>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 Ko'nikmalaringizni kategoriyalarga ajratib qo'shing. Bu CV'ingizda
          professional ko'rinishda ko'rsatiladi.
        </p>
      </div>
    </div>
  );
};
