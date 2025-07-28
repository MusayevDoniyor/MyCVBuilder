import { useState, useEffect } from "react";
import { useFormData } from "../../hooks/useFormData";
import { AddButton } from "../AddButton";
import { EditButton } from "../EditButton";
import { Award, X } from "lucide-react";
import type { CVData } from "../../types";

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
    certificate: CVData["certificates"][0];
  } | null>(null);

  const handleCancel = () => {
    setShowForm(false);
    setEditingCertificate(null);
    setNewCertificate({
      name: "",
      year: "",
      issuer: "",
      link: "",
    });
  };

  const handleUpdateCertificate = () => {
    if (editingCertificate && editingCertificate.certificate) {
      updateCertificate(editingCertificate.index, {
        name: newCertificate.name,
        year: newCertificate.year,
        issuer: newCertificate.issuer,
        link: newCertificate.link || "",
      });
      setShowForm(false);
      setEditingCertificate(null);
      setNewCertificate({
        name: "",
        year: "",
        issuer: "",
        link: "",
      });
    }
  };

  // Load certificate data when editing
  useEffect(() => {
    if (editingCertificate) {
      setNewCertificate({
        name: editingCertificate.certificate.name,
        year: editingCertificate.certificate.year,
        issuer: editingCertificate.certificate.issuer,
        link: editingCertificate.certificate.link || "",
      });
    }
  }, [editingCertificate]);

  return (
    <div className="card p-3 sm:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Sertifikatlar
          </h3>
        </div>

        <AddButton
          onClick={() => setShowForm(true)}
          className="w-auto text-sm py-2 px-3 min-h-10"
        >
          Qo'shish
        </AddButton>
      </div>

      {/* Add/Edit certificate form */}
      {showForm && (
        <div className="mb-6 p-2 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex flex-col gap-2 mb-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">
              {editingCertificate
                ? "Sertifikatni tahrirlash"
                : "Yangi sertifikat qo'shish"}
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
                Sertifikat nomi *
              </label>
              <input
                type="text"
                value={newCertificate.name}
                onChange={(e) =>
                  setNewCertificate({ ...newCertificate, name: e.target.value })
                }
                placeholder="Masalan: React Developer"
                className="form-input w-full text-sm"
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
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
                  placeholder="Masalan: Coursera"
                  className="form-input w-full text-sm"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Yil *
                </label>
                <input
                  type="text"
                  value={newCertificate.year}
                  onChange={(e) =>
                    setNewCertificate({
                      ...newCertificate,
                      year: e.target.value,
                    })
                  }
                  placeholder="2024"
                  className="form-input w-full text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Havola
              </label>
              <input
                type="url"
                value={newCertificate.link}
                onChange={(e) =>
                  setNewCertificate({ ...newCertificate, link: e.target.value })
                }
                placeholder="https://..."
                className="form-input w-full text-sm"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <button
                className="btn-primary w-full text-sm py-2 px-3 min-h-10"
                onClick={
                  editingCertificate
                    ? handleUpdateCertificate
                    : () => {
                        if (
                          newCertificate.name.trim() &&
                          newCertificate.issuer.trim()
                        ) {
                          addCertificate({ ...newCertificate });
                          setNewCertificate({
                            name: "",
                            year: "",
                            issuer: "",
                            link: "",
                          });
                          setShowForm(false);
                        }
                      }
                }
              >
                {editingCertificate ? "Yangilash" : "Qo'shish"}
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

      {/* Certificate list */}
      <div className="flex flex-col gap-2">
        {data.certificates.map((cert, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-2 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto"
          >
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-800 dark:text-gray-100 break-words">
                {cert.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 break-words">
                {cert.issuer}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex flex-wrap gap-2">
                <span>{cert.year}</span>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600 dark:text-blue-400 break-all"
                  >
                    Sertifikat havolasi
                  </a>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              <EditButton
                onClick={() => {
                  setEditingCertificate({ index: idx, certificate: cert });
                  setShowForm(true);
                }}
                size="sm"
                className="w-8 h-8"
              />
              <button
                onClick={() => removeCertificate(idx)}
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
