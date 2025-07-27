import { useState, useEffect } from "react";
import { useFormData } from "../../hooks/useFormData";
import { AddButton } from "../AddButton";
import { EditButton } from "../EditButton";
import { Briefcase, X, Calendar } from "lucide-react";

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
    experience: any;
  } | null>(null);

  const handleAddExperience = () => {
    if (newExperience.position.trim() && newExperience.company.trim()) {
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
  };

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
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Ish tajribasi
          </h3>
        </div>
        <AddButton onClick={() => setShowForm(true)}>Qo'shish</AddButton>
      </div>

      {/* Add/Edit experience form */}
      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">
              {editingExperience
                ? "Tajribani tahrirlash"
                : "Yangi tajriba qo'shish"}
            </h4>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingExperience(null);
                setNewExperience({
                  position: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  responsibilities: "",
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
                  placeholder="Masalan: Senior Developer"
                  className="form-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Kompaniya nomi *
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
                  placeholder="Masalan: Google Inc."
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
                    value={newExperience.startDate}
                    onChange={(e) =>
                      setNewExperience({
                        ...newExperience,
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
                    value={newExperience.endDate}
                    onChange={(e) =>
                      setNewExperience({
                        ...newExperience,
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
                Vazifalar va natijalar
              </label>
              <textarea
                value={newExperience.responsibilities}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    responsibilities: e.target.value,
                  })
                }
                placeholder="Asosiy vazifalar, natijalar va erishilgan yutuqlar..."
                className="form-textarea h-24"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={
                  editingExperience
                    ? handleUpdateExperience
                    : handleAddExperience
                }
                disabled={
                  !newExperience.position.trim() ||
                  !newExperience.company.trim()
                }
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingExperience ? "Yangilash" : "Qo'shish"}
              </button>
              <button onClick={handleCancel} className="btn-secondary">
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Experience list */}
      <div className="space-y-4">
        {data.workExperience.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Hali ish tajribasi qo'shilmagan
          </p>
        ) : (
          data.workExperience.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm dark:hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                    {experience.position}
                  </h4>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">
                    {experience.company}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {experience.startDate &&
                      new Date(experience.startDate).toLocaleDateString(
                        "uz-UZ",
                        {
                          year: "numeric",
                          month: "long",
                        }
                      )}
                    {experience.endDate && experience.startDate && " - "}
                    {experience.endDate &&
                      new Date(experience.endDate).toLocaleDateString("uz-UZ", {
                        year: "numeric",
                        month: "long",
                      })}
                    {!experience.endDate &&
                      experience.startDate &&
                      " - Hozirgacha"}
                  </p>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <EditButton
                    onClick={() => {
                      setEditingExperience({ index, experience });
                      setShowForm(true);
                    }}
                    size="sm"
                  />
                  <button
                    onClick={() => removeWorkExperience(index)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {experience.responsibilities && (
                <p className="text-gray-600 dark:text-gray-300 text-sm whitespace-pre-line">
                  {experience.responsibilities}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
