import { useState, useEffect } from "react";
import { useFormData } from "../../hooks/useFormData";
import { AddButton } from "../AddButton";
import { EditButton } from "../EditButton";
import { GraduationCap, X, Calendar } from "lucide-react";

export const EducationSection = () => {
  const { data, addEducation, removeEducation, updateEducation } =
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
    education: any;
  } | null>(null);

  const handleAddEducation = () => {
    if (newEducation.schoolName.trim() && newEducation.fieldOfStudy.trim()) {
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
  };

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
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Ta'lim
          </h3>
        </div>
        <AddButton onClick={() => setShowForm(true)}>Qo'shish</AddButton>
      </div>

      {/* Add/Edit education form */}
      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">
              {editingEducation
                ? "Ta'limni tahrirlash"
                : "Yangi ta'lim qo'shish"}
            </h4>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingEducation(null);
                setNewEducation({
                  schoolName: "",
                  fieldOfStudy: "",
                  startDate: "",
                  endDate: "",
                  degree: "",
                });
              }}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg
                className="w-5 h-5"
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
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  O'quv yurti nomi *
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
                  className="form-input"
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
                  placeholder="Masalan: Kompyuter injiniringi"
                  className="form-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Boshlash sanasi
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <input
                    type="month"
                    value={newEducation.startDate}
                    onChange={(e) =>
                      setNewEducation({
                        ...newEducation,
                        startDate: e.target.value,
                      })
                    }
                    className="form-input pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tugash sanasi
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <input
                    type="month"
                    value={newEducation.endDate}
                    onChange={(e) =>
                      setNewEducation({
                        ...newEducation,
                        endDate: e.target.value,
                      })
                    }
                    className="form-input pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Daraja/Sertifikat
              </label>
              <input
                type="text"
                value={newEducation.degree}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, degree: e.target.value })
                }
                placeholder="Masalan: Bakalavr, Magistr, Sertifikat..."
                className="form-input"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={
                  editingEducation ? handleUpdateEducation : handleAddEducation
                }
                disabled={
                  !newEducation.schoolName.trim() ||
                  !newEducation.fieldOfStudy.trim()
                }
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingEducation ? "Yangilash" : "Qo'shish"}
              </button>
              <button onClick={handleCancel} className="btn-secondary">
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Education list */}
      <div className="space-y-4">
        {data.education.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Hali ta'lim ma'lumoti qo'shilmagan
          </p>
        ) : (
          data.education.map((education, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm dark:hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                    {education.schoolName}
                  </h4>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">
                    {education.fieldOfStudy}
                  </p>
                  {education.degree && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {education.degree}
                    </p>
                  )}
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {education.startDate &&
                      new Date(education.startDate).toLocaleDateString(
                        "uz-UZ",
                        {
                          year: "numeric",
                          month: "long",
                        }
                      )}
                    {education.endDate && education.startDate && " - "}
                    {education.endDate &&
                      new Date(education.endDate).toLocaleDateString("uz-UZ", {
                        year: "numeric",
                        month: "long",
                      })}
                    {!education.endDate &&
                      education.startDate &&
                      " - Hozirgacha"}
                  </p>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <EditButton
                    onClick={() => {
                      setEditingEducation({ index, education });
                      setShowForm(true);
                    }}
                    size="sm"
                  />
                  <button
                    onClick={() => removeEducation(index)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
