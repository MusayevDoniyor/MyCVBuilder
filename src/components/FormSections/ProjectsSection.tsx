import { useState, useEffect } from "react";
import { useFormData } from "../../hooks/useFormData";
import { AddButton } from "../AddButton";
import { EditButton } from "../EditButton";
import { FolderOpen, X } from "lucide-react";
import type { CVData } from "../../types";

export const ProjectsSection = () => {
  const { data, addProject, removeProject, updateProject } = useFormData();
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveDemoLink: "",
  });
  const [editingProject, setEditingProject] = useState<{
    index: number;
    project: CVData["projects"][0];
  } | null>(null);

  const handleCancel = () => {
    setNewProject({
      name: "",
      description: "",
      techStack: "",
      githubLink: "",
      liveDemoLink: "",
    });
    setShowForm(false);
    setEditingProject(null);
  };

  const handleUpdateProject = () => {
    if (
      editingProject &&
      newProject.name.trim() &&
      newProject.description.trim()
    ) {
      updateProject(editingProject.index, { ...newProject });
      setNewProject({
        name: "",
        description: "",
        techStack: "",
        githubLink: "",
        liveDemoLink: "",
      });
      setShowForm(false);
      setEditingProject(null);
    }
  };

  // Load project data when editing
  useEffect(() => {
    if (editingProject) {
      setNewProject(editingProject.project);
    }
  }, [editingProject]);

  return (
    <div className="card p-3 sm:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Loyihalar
          </h3>
        </div>

        <AddButton
          onClick={() => setShowForm(true)}
          className="w-auto text-sm py-2 px-3 min-h-10"
        >
          Qo'shish
        </AddButton>
      </div>

      {/* Add/Edit project form */}
      {showForm && (
        <div className="mb-6 p-2 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex flex-col gap-2 mb-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">
              {editingProject ? "Loyihani tahrirlash" : "Yangi loyiha qo'shish"}
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
                Loyiha nomi *
              </label>
              <input
                type="text"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({ ...newProject, name: e.target.value })
                }
                placeholder="Masalan: MyCVBuilder"
                className="form-input w-full text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tavsif *
              </label>
              <textarea
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                placeholder="Loyiha haqida qisqacha ma'lumot..."
                className="form-textarea w-full text-sm h-20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Texnologiyalar
              </label>
              <input
                type="text"
                value={newProject.techStack}
                onChange={(e) =>
                  setNewProject({ ...newProject, techStack: e.target.value })
                }
                placeholder="React, Node.js, PostgreSQL..."
                className="form-input w-full text-sm"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GitHub havolasi
                </label>
                <input
                  type="url"
                  value={newProject.githubLink}
                  onChange={(e) =>
                    setNewProject({ ...newProject, githubLink: e.target.value })
                  }
                  placeholder="https://github.com/username/project"
                  className="form-input w-full text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Live Demo havolasi
                </label>
                <input
                  type="url"
                  value={newProject.liveDemoLink}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      liveDemoLink: e.target.value,
                    })
                  }
                  placeholder="https://mycvbuilder.uz/"
                  className="form-input w-full text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <button
                className="btn-primary w-full text-sm py-2 px-3 min-h-10"
                onClick={
                  editingProject
                    ? handleUpdateProject
                    : () => {
                        if (
                          newProject.name.trim() &&
                          newProject.description.trim()
                        ) {
                          addProject({ ...newProject });
                          setNewProject({
                            name: "",
                            description: "",
                            techStack: "",
                            githubLink: "",
                            liveDemoLink: "",
                          });
                          setShowForm(false);
                        }
                      }
                }
              >
                {editingProject ? "Yangilash" : "Qo'shish"}
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

      {/* Project list */}
      <div className="flex flex-col gap-2">
        {data.projects.map((proj, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-2 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto"
          >
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-800 dark:text-gray-100 break-words">
                {proj.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 break-words">
                {proj.description}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex flex-wrap gap-2">
                {proj.techStack && <span>{proj.techStack}</span>}
                {proj.githubLink && (
                  <a
                    href={proj.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600 dark:text-blue-400 break-all"
                  >
                    GitHub
                  </a>
                )}
                {proj.liveDemoLink && (
                  <a
                    href={proj.liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-green-600 dark:text-green-400 break-all"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              <EditButton
                onClick={() => {
                  setEditingProject({ index: idx, project: proj });
                  setShowForm(true);
                }}
                size="sm"
                className="w-8 h-8"
              />
              <button
                onClick={() => removeProject(idx)}
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
