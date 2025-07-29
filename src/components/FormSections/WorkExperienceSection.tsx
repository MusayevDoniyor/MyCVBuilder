import { useState, useEffect } from "react";
import { useFormData } from "../../hooks/useFormData";
import { AddButton } from "../AddButton";
import { EditButton } from "../EditButton";
import { CustomDatePicker } from "../UI/CustomDatePicker";
import { Briefcase, X } from "lucide-react";
import type { CVData } from "../../types";

export const WorkExperienceSection = () => {
  const {
    data,
    addWorkExperience,
    removeWorkExperience,
    updateWorkExperience,
  } = useFormData();
  const [showForm, setShowForm] = useState(false);
  const [newExperience, setNewExperience] = useState({
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
  });
  const [editingExperience, setEditingExperience] = useState<{
    index: number;
    experience: CVData["workExperience"][0];
  } | null>(null);

  const handleCancel = () => {
    setNewExperience({
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
    });
    setShowForm(false);
    setEditingExperience(null);
  };

  const handleUpdateExperience = () => {
    if (
      editingExperience &&
      newExperience.position.trim() &&
      newExperience.company.trim()
    ) {
      updateWorkExperience(editingExperience.index, { ...newExperience });
      setNewExperience({
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
      });
      setShowForm(false);
      setEditingExperience(null);
    }
  };

  // Load experience data when editing
  useEffect(() => {
    if (editingExperience) {
      setNewExperience(editingExperience.experience);
    }
  }, [editingExperience]);

  return (
    <div className="card p-3 sm:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Ish tajribasi
          </h3>
        </div>
        <AddButton
          onClick={() => setShowForm(true)}
          className="w-auto text-sm py-2 px-3 min-h-10"
        >
          Qo'shish
        </AddButton>
      </div>

      {/* Add/Edit experience form */}
      {showForm && (
        <div className="mb-6 p-2 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex flex-col gap-2 mb-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">
              {editingExperience
                ? "Tajribani tahrirlash"
                : "Yangi tajriba qo'shish"}
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
                Lavozim *
              </label>
              <input
                type="text"
                value={newExperience.position}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    position: e.target.value,
                  })
                }
                placeholder="Masalan: Frontend Developer"
                className="form-input w-full text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kompaniya *
              </label>
              <input
                type="text"
                value={newExperience.company}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    company: e.target.value,
                  })
                }
                placeholder="Masalan: IT Park"
                className="form-input w-full text-sm"
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Boshlanish sanasi
                </label>
                <CustomDatePicker
                  value={newExperience.startDate}
                  onChange={(date) =>
                    setNewExperience({
                      ...newExperience,
                      startDate: date,
                    })
                  }
                  placeholder="Boshlanish sanasi"
                  className="w-full"
                  size="sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tugash sanasi
                </label>
                <CustomDatePicker
                  value={newExperience.endDate}
                  onChange={(date) =>
                    setNewExperience({
                      ...newExperience,
                      endDate: date,
                    })
                  }
                  placeholder="Tugash sanasi (ixtiyoriy)"
                  className="w-full"
                  size="sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vazifalar
              </label>
              <textarea
                value={newExperience.responsibilities}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    responsibilities: e.target.value,
                  })
                }
                placeholder="Ishdagi asosiy vazifalar..."
                className="form-textarea w-full text-sm h-20"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <button
                className="btn-primary w-full text-sm py-2 px-3 min-h-10"
                onClick={
                  editingExperience
                    ? handleUpdateExperience
                    : () => {
                        if (
                          newExperience.position.trim() &&
                          newExperience.company.trim()
                        ) {
                          addWorkExperience({ ...newExperience });
                          setNewExperience({
                            position: "",
                            company: "",
                            startDate: "",
                            endDate: "",
                            responsibilities: "",
                          });
                          setShowForm(false);
                        }
                      }
                }
              >
                {editingExperience ? "Yangilash" : "Qo'shish"}
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

      {/* Experience list */}
      <div className="flex flex-col gap-2">
        {data.workExperience.map((exp, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-2 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto"
          >
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-800 dark:text-gray-100 break-words">
                {exp.position}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 break-words">
                {exp.company}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex flex-wrap gap-2">
                <span className="flex items-center gap-1">
                  {/* <Calendar className="w-4 h-4" /> */}
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              {exp.responsibilities && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 break-words">
                  {exp.responsibilities}
                </div>
              )}
            </div>
            <div className="flex gap-1">
              <EditButton
                onClick={() => {
                  setEditingExperience({ index: idx, experience: exp });
                  setShowForm(true);
                }}
                size="sm"
                className="w-8 h-8"
              />
              <button
                onClick={() => removeWorkExperience(idx)}
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
