import { useState, useEffect } from "react";
import { GraduationCap, X, Calendar } from "lucide-react";
import { useFormData } from "../../hooks/useFormData";
import { AddButton } from "../AddButton";
import { EditButton } from "../EditButton";

export const EducationSection = () => {
  const { data, addEducation, updateEducation, removeEducation } =
    useFormData();
  const [showForm, setShowForm] = useState(false);
  const [newEducation, setNewEducation] = useState({
    schoolName: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    degree: "",
  });
  const [editingEducation, setEditingEducation] = useState<{
    index: number;
    education: typeof newEducation;
  } | null>(null);

  const handleCancel = () => {
    setNewEducation({
      schoolName: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      degree: "",
    });
    setShowForm(false);
    setEditingEducation(null);
  };

  const handleUpdateEducation = () => {
    if (
      editingEducation &&
      newEducation.schoolName.trim() &&
      newEducation.fieldOfStudy.trim()
    ) {
      updateEducation(editingEducation.index, { ...newEducation });
      setNewEducation({
        schoolName: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        degree: "",
      });
      setShowForm(false);
      setEditingEducation(null);
    }
  };

  // Load education data when editing
  useEffect(() => {
    if (editingEducation) {
      setNewEducation(editingEducation.education);
    }
  }, [editingEducation]);

  return (
    <div className="card p-3 sm:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Ta'lim
          </h3>
        </div>
        <AddButton
          onClick={() => setShowForm(true)}
          className="w-auto text-sm py-2 px-3 min-h-10"
        >
          Qo'shish
        </AddButton>
      </div>

      {/* Add/Edit education form */}
      {showForm && (
        <div className="mb-6 p-2 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex flex-col gap-2 mb-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">
              {editingEducation
                ? "Ta'limni tahrirlash"
                : "Yangi ta'lim qo'shish"}
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
                O'quv yurti *
              </label>
              <input
                type="text"
                value={newEducation.schoolName}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    schoolName: e.target.value,
                  })
                }
                placeholder="Masalan: TATU"
                className="form-input w-full text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Yo'nalish *
              </label>
              <input
                type="text"
                value={newEducation.fieldOfStudy}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    fieldOfStudy: e.target.value,
                  })
                }
                placeholder="Masalan: Dasturlash"
                className="form-input w-full text-sm"
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Boshlanish sanasi
                </label>
                <input
                  type="month"
                  value={newEducation.startDate}
                  onChange={(e) =>
                    setNewEducation({
                      ...newEducation,
                      startDate: e.target.value,
                    })
                  }
                  className="form-input w-full text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tugash sanasi
                </label>
                <input
                  type="month"
                  value={newEducation.endDate}
                  onChange={(e) =>
                    setNewEducation({
                      ...newEducation,
                      endDate: e.target.value,
                    })
                  }
                  className="form-input w-full text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Daraja
              </label>
              <input
                type="text"
                value={newEducation.degree}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, degree: e.target.value })
                }
                placeholder="Masalan: Bakalavr"
                className="form-input w-full text-sm"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <button
                className="btn-primary w-full text-sm py-2 px-3 min-h-10"
                onClick={
                  editingEducation
                    ? handleUpdateEducation
                    : () => {
                        if (
                          newEducation.schoolName.trim() &&
                          newEducation.fieldOfStudy.trim()
                        ) {
                          addEducation({ ...newEducation });
                          setNewEducation({
                            schoolName: "",
                            fieldOfStudy: "",
                            startDate: "",
                            endDate: "",
                            degree: "",
                          });
                          setShowForm(false);
                        }
                      }
                }
              >
                {editingEducation ? "Yangilash" : "Qo'shish"}
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

      {/* Education list */}
      <div className="flex flex-col gap-2">
        {data.education.map((edu, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-2 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto"
          >
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-800 dark:text-gray-100 break-words">
                {edu.schoolName}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 break-words">
                {edu.fieldOfStudy}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex flex-wrap gap-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {edu.startDate} - {edu.endDate}
                </span>
                {edu.degree && <span>{edu.degree}</span>}
              </div>
            </div>
            <div className="flex gap-1">
              <EditButton
                onClick={() => {
                  setEditingEducation({ index: idx, education: edu });
                  setShowForm(true);
                }}
                size="sm"
                className="w-8 h-8"
              />
              <button
                onClick={() => removeEducation(idx)}
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
