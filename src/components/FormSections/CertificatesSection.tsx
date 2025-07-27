import { useState, useEffect } from "react";
import { useFormData } from "../../hooks/useFormData";
import { AddButton } from "../AddButton";
import { EditButton } from "../EditButton";
import { Award, X, ExternalLink } from "lucide-react";

export const CertificatesSection = () => {
  const { data, addCertificate, removeCertificate, updateCertificate } =
    useFormData();
  const [showForm, setShowForm] = useState(false);
  const [newCertificate, setNewCertificate] = useState({
    name: "",
    year: "",
    issuer: "",
    link: "",
  });
  const [editingCertificate, setEditingCertificate] = useState<{
    index: number;
    certificate: any;
  } | null>(null);

  const handleAddCertificate = () => {
    if (newCertificate.name.trim() && newCertificate.issuer.trim()) {
      addCertificate({ ...newCertificate });
      setNewCertificate({
        name: "",
        year: "",
        issuer: "",
        link: "",
      });
      setShowForm(false);
    }
  };

  const handleCancel = () => {
    setNewCertificate({
      name: "",
      year: "",
      issuer: "",
      link: "",
    });
    setShowForm(false);
    setEditingCertificate(null);
  };

  const handleUpdateCertificate = () => {
    if (
      editingCertificate &&
      newCertificate.name.trim() &&
      newCertificate.issuer.trim()
    ) {
      updateCertificate(editingCertificate.index, { ...newCertificate });
      setNewCertificate({
        name: "",
        year: "",
        issuer: "",
        link: "",
      });
      setShowForm(false);
      setEditingCertificate(null);
    }
  };

  // Load certificate data when editing
  useEffect(() => {
    if (editingCertificate) {
      setNewCertificate(editingCertificate.certificate);
    }
  }, [editingCertificate]);

  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Sertifikatlar va yutuqlar
          </h3>
        </div>
        <AddButton onClick={() => setShowForm(true)}>Qo'shish</AddButton>
      </div>

      {/* Add/Edit certificate form */}
      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">
              {editingCertificate
                ? "Sertifikatni tahrirlash"
                : "Yangi sertifikat qo'shish"}
            </h4>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingCertificate(null);
                setNewCertificate({
                  name: "",
                  year: "",
                  issuer: "",
                  link: "",
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
                  Sertifikat nomi *
                </label>
                <input
                  type="text"
                  value={newCertificate.name}
                  onChange={(e) =>
                    setNewCertificate({
                      ...newCertificate,
                      name: e.target.value,
                    })
                  }
                  placeholder="Masalan: AWS Certified Developer"
                  className="form-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Beruvchi tashkilot *
                </label>
                <input
                  type="text"
                  value={newCertificate.issuer}
                  onChange={(e) =>
                    setNewCertificate({
                      ...newCertificate,
                      issuer: e.target.value,
                    })
                  }
                  placeholder="Masalan: Amazon Web Services"
                  className="form-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Yil
                </label>
                <input
                  type="number"
                  value={newCertificate.year}
                  onChange={(e) =>
                    setNewCertificate({
                      ...newCertificate,
                      year: e.target.value,
                    })
                  }
                  placeholder="2024"
                  min="1900"
                  max="2030"
                  className="form-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Havola (ixtiyoriy)
                </label>
                <input
                  type="url"
                  value={newCertificate.link}
                  onChange={(e) =>
                    setNewCertificate({
                      ...newCertificate,
                      link: e.target.value,
                    })
                  }
                  placeholder="https://example.com/certificate"
                  className="form-input"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={
                  editingCertificate
                    ? handleUpdateCertificate
                    : handleAddCertificate
                }
                disabled={
                  !newCertificate.name.trim() || !newCertificate.issuer.trim()
                }
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingCertificate ? "Yangilash" : "Qo'shish"}
              </button>
              <button onClick={handleCancel} className="btn-secondary">
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificates list */}
      <div className="space-y-4">
        {data.certificates.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Hali sertifikat qo'shilmagan
          </p>
        ) : (
          data.certificates.map((certificate, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm dark:hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                    {certificate.name}
                  </h4>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">
                    {certificate.issuer}
                  </p>
                  {certificate.year && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {certificate.year} yil
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <EditButton
                    onClick={() => {
                      setEditingCertificate({ index, certificate });
                      setShowForm(true);
                    }}
                    size="sm"
                  />
                  <button
                    onClick={() => removeCertificate(index)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {certificate.link && (
                <a
                  href={certificate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                >
                  <ExternalLink className="w-3 h-3" />
                  Sertifikatni ko'rish
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
