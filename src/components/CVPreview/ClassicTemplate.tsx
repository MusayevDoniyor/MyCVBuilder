import type { CVData } from "../../types";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  MessageCircle,
  Calendar,
  Award,
  GraduationCap,
  Languages,
  Code,
  FolderOpen,
  Briefcase,
} from "lucide-react";

interface ClassicTemplateProps {
  data: CVData;
}

export const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
  const {
    personalInfo,
    aboutMe,
    socials,
    skills,
    projects,
    workExperience,
    education,
    languages,
    certificates,
  } = data;

  const getSkillsByCategory = (category: string) => {
    return skills.filter((skill) => skill.category === category);
  };

  return (
    <div
      className="max-w-4xl mx-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      id="cv-preview"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
        <div className="flex items-start gap-6">
          {personalInfo.profilePhoto && (
            <div className="relative">
              <img
                src={personalInfo.profilePhoto}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 font-display">
              {personalInfo.fullName || "To'liq ism"}
            </h1>
            <h2 className="text-xl font-medium mb-4 opacity-90">
              {personalInfo.title || "Lavozim"}
            </h2>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{personalInfo.email || "email@example.com"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{personalInfo.phone || "+998 90 123 45 67"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo.location || "Manzil"}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              )}
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">GitHub</span>
                </a>
              )}
              {socials.website && (
                <a
                  href={socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Website</span>
                </a>
              )}
              {socials.telegram && (
                <div className="flex items-center gap-1 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{socials.telegram}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About Me */}
      {aboutMe && (
        <div className="p-3 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              O'zim haqida
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed break-words whitespace-pre-line overflow-hidden">
            {aboutMe}
          </p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Ko'nikmalar
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "programming",
              "frontend",
              "backend",
              "mobile",
              "database",
              "devops",
              "design",
              "others",
            ].map((category) => {
              const categorySkills = getSkillsByCategory(category);
              if (categorySkills.length === 0) return null;

              return (
                <div
                  key={category}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 capitalize border-b border-gray-200 dark:border-gray-600 pb-2">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="p-8 bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Ish tajribasi
            </h3>
          </div>
          <div className="space-y-6">
            {workExperience.map((exp, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {exp.position}
                    </h4>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right text-gray-500 dark:text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {exp.startDate &&
                          new Date(exp.startDate).toLocaleDateString("uz-UZ", {
                            year: "numeric",
                            month: "short",
                          })}
                        {exp.endDate && exp.startDate && " - "}
                        {exp.endDate &&
                          new Date(exp.endDate).toLocaleDateString("uz-UZ", {
                            year: "numeric",
                            month: "short",
                          })}
                        {!exp.endDate && exp.startDate && " - Hozirgacha"}
                      </span>
                    </div>
                  </div>
                </div>
                {exp.responsibilities && (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {exp.responsibilities}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <FolderOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Loyihalar
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {project.name}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {project.description}
                </p>
                {project.techStack && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span className="font-semibold">Texnologiyalar:</span>{" "}
                    {project.techStack}
                  </p>
                )}
                <div className="flex gap-3">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm"
                    >
                      GitHub →
                    </a>
                  )}
                  {project.liveDemoLink && (
                    <a
                      href={project.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium text-sm"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="p-8 bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Ta'lim
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6"
              >
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {edu.schoolName}
                </h4>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                  {edu.fieldOfStudy}
                </p>
                {edu.degree && (
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {edu.degree}
                  </p>
                )}
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {edu.startDate &&
                      new Date(edu.startDate).toLocaleDateString("uz-UZ", {
                        year: "numeric",
                        month: "short",
                      })}
                    {edu.endDate && edu.startDate && " - "}
                    {edu.endDate &&
                      new Date(edu.endDate).toLocaleDateString("uz-UZ", {
                        year: "numeric",
                        month: "short",
                      })}
                    {!edu.endDate && edu.startDate && " - Hozirgacha"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages & Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Languages className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Tillar
              </h3>
            </div>
            <div className="space-y-3">
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {lang.name}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Sertifikatlar
              </h3>
            </div>
            <div className="space-y-3">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    {cert.name}
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {cert.issuer}
                  </p>
                  {cert.year && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {cert.year} yil
                    </p>
                  )}
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                    >
                      Ko'rish →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
