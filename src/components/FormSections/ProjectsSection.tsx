import { useState, useEffect } from "react";
import { useFormData } from "../../hooks/useFormData";
import { AddButton } from "../AddButton";
import { EditButton } from "../EditButton";
import { FolderOpen, X, ExternalLink, Github } from "lucide-react";

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
    project: any;
  } | null>(null);

  const handleAddProject = () => {
    if (newProject.name.trim() && newProject.description.trim()) {
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
  };

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
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Loyihalar
          </h3>
        </div>
        <AddButton onClick={() => setShowForm(true)}>Qo'shish</AddButton>
      </div>

      {/* Add/Edit project form */}
      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">
              {editingProject ? "Loyihani tahrirlash" : "Yangi loyiha qo'shish"}
            </h4>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingProject(null);
                setNewProject({
                  name: "",
                  description: "",
                  techStack: "",
                  githubLink: "",
                  liveDemoLink: "",
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
                placeholder="Masalan: E-commerce Platform"
                className="form-input"
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
                className="form-textarea h-20"
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
                className="form-input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
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
                  className="form-input"
                />
              </div>

              <div>
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
                  placeholder="https://project-demo.com"
                  className="form-input"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={
                  editingProject ? handleUpdateProject : handleAddProject
                }
                disabled={
                  !newProject.name.trim() || !newProject.description.trim()
                }
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingProject ? "Yangilash" : "Qo'shish"}
              </button>
              <button onClick={handleCancel} className="btn-secondary">
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects list */}
      <div className="space-y-4">
        {data.projects.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Hali loyiha qo'shilmagan
          </p>
        ) : (
          data.projects.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm dark:hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                  {project.name}
                </h4>
                <div className="flex items-center gap-1">
                  <EditButton
                    onClick={() => {
                      setEditingProject({ index, project });
                      setShowForm(true);
                    }}
                  >
                    Tahrirlash
                  </EditButton>
                  <button
                    onClick={() => removeProject(index)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                {project.description}
              </p>

              {project.techStack && (
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">
                  <span className="font-medium">Texnologiyalar:</span>{" "}
                  {project.techStack}
                </p>
              )}

              <div className="flex gap-2">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                  >
                    <Github className="w-3 h-3" />
                    GitHub
                  </a>
                )}
                {project.liveDemoLink && (
                  <a
                    href={project.liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-sm"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Demo
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
