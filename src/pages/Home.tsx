import { PersonalInfoSection } from "../components/FormSections/PersonalInfoSection";
import { AboutMeSection } from "../components/FormSections/AboutMeSection";
import { SocialsSection } from "../components/FormSections/SocialsSection";
import { SkillsSection } from "../components/FormSections/SkillsSection";
import { ProjectsSection } from "../components/FormSections/ProjectsSection";
import { WorkExperienceSection } from "../components/FormSections/WorkExperienceSection";
import { EducationSection } from "../components/FormSections/EducationSection";
import { LanguagesSection } from "../components/FormSections/LanguagesSection";
import { CertificatesSection } from "../components/FormSections/CertificatesSection";
import { CVPreview } from "../components/CVPreview/CVPreview";
import { TemplateSelector } from "../components/TemplateSelector";
import { DownloadButton } from "../components/DownloadButton";
import { SkipToContent } from "../components/Accessibility/SkipToContent";
import { ThemeToggle } from "../components/Accessibility/ThemeToggle";

import { useFormData } from "../hooks/useFormData";
import { RotateCcw, Heart, Github, Menu, X, Edit3, Eye } from "lucide-react";
import { useState } from "react";

export const Home = () => {
  const { resetData } = useFormData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"form" | "preview">("form");

  const handleReset = () => {
    if (confirm("Barcha ma'lumotlar o'chiriladi. Davom etasizmi?")) {
      resetData();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "form" ? "preview" : "form");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <SkipToContent />

      {/* Header */}
      <header
        className="bg-white shadow-lg border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="MyCVBuilder logo"
                className="w-10 h-10"
                width="40"
                height="40"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  MyCVBuilder
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Professional CV yaratish platformasi
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center gap-4"
              role="navigation"
              aria-label="Asosiy navigatsiya"
            >
              <ThemeToggle />
              <button
                onClick={toggleViewMode}
                className="btn-secondary flex items-center gap-2"
                aria-label={
                  viewMode === "form" ? "Preview ko'rish" : "Formaga qaytish"
                }
              >
                {viewMode === "form" ? (
                  <>
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Preview</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Forma</span>
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="btn-secondary flex items-center gap-2"
                aria-label="Barcha ma'lumotlarni tozalash"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Tozalash</span>
              </button>
              <DownloadButton />
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              aria-label="Menyuni ochish"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav
              className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
              role="navigation"
              aria-label="Mobil navigatsiya"
            >
              <div className="flex flex-col gap-3">
                <ThemeToggle />
                <button
                  onClick={toggleViewMode}
                  className="btn-secondary flex items-center gap-2 justify-center"
                  aria-label={
                    viewMode === "form" ? "Preview ko'rish" : "Formaga qaytish"
                  }
                >
                  {viewMode === "form" ? (
                    <>
                      <Eye className="w-4 h-4" />
                      Preview
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4" />
                      Forma
                    </>
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="btn-secondary flex items-center gap-2 justify-center"
                  aria-label="Barcha ma'lumotlarni tozalash"
                >
                  <RotateCcw className="w-4 h-4" />
                  Tozalash
                </button>
                <DownloadButton />
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        role="main"
        tabIndex={-1}
      >
        {viewMode === "form" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Form */}
            <div className="space-y-6">
              <div className="card p-6 animate-fade-in">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  CV Ma'lumotlari
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Quyidagi bo'limlarni to'ldiring va o'ng tomonda real-time
                  preview ko'rasiz
                </p>
              </div>

              <PersonalInfoSection />
              <AboutMeSection />
              <SocialsSection />
              <SkillsSection />
              <ProjectsSection />
              <WorkExperienceSection />
              <EducationSection />
              <LanguagesSection />
              <CertificatesSection />
            </div>

            {/* Right Panel - Preview */}
            <div className="space-y-6">
              <TemplateSelector />
              <CVPreview />
            </div>
          </div>
        ) : (
          /* Full Screen Preview */
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="card p-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  CV Preview
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  To'liq ko'rinishda CV'ingizni ko'ring
                </p>
              </div>
              <TemplateSelector />
            </div>
            <div className="w-full">
              <CVPreview />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700 mt-12"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img
                src="/logo.svg"
                alt="MyCVBuilder logo"
                className="w-8 h-8"
                width="32"
                height="32"
              />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                MyCVBuilder
              </h3>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Professional CV yaratish uchun eng yaxshi platforma
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>Barcha ma'lumotlar brauzeringizda saqlanadi</span>
              <span aria-hidden="true">•</span>
              <span>Real-time preview</span>
              <span aria-hidden="true">•</span>
              <span>PDF export</span>
            </div>

            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <span>Dasturchi:</span>
                <a
                  href="https://t.me/Musayev_Doniyor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary-600 dark:text-primary-400"
                >
                  Musayev Doniyor
                </a>
              </div>
              <span
                className="text-gray-300 dark:text-gray-600"
                aria-hidden="true"
              >
                |
              </span>
              <a
                href="https://github.com/doniyor-musayev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                aria-label="GitHub sahifasini ochish"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <span
                className="text-gray-300 dark:text-gray-600"
                aria-hidden="true"
              >
                |
              </span>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <span>Made with</span>
                <Heart
                  className="w-4 h-4 text-red-500 fill-current"
                  aria-hidden="true"
                />
                <span>in Uzbekistan</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
