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

interface ModernTemplateProps {
  data: CVData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
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
      className="max-w-4xl mx-auto bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
      id="cv-preview"
    >
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <div className="flex items-start gap-6">
          {personalInfo.profilePhoto && (
            <div className="relative">
              <img
                src={personalInfo.profilePhoto}
                alt="Profile"
                className="w-32 h-32 rounded-2xl object-cover shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 font-display text-gray-900 dark:text-gray-100">
              {personalInfo.fullName || "To'liq ism"}
            </h1>
            <h2 className="text-xl font-medium mb-4 text-gray-600 dark:text-gray-400">
              {personalInfo.title || "Lavozim"}
            </h2>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span>{personalInfo.email || "email@example.com"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span>{personalInfo.phone || "+998 90 123 45 67"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span>{personalInfo.location || "Manzil"}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
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
                  className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
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
                  className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-full hover:bg-green-100 dark:hover:bg-green-900/30 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Website</span>
                </a>
              )}
              {socials.telegram && (
                <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              O'zim haqida
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {aboutMe}
          </p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Ko'nikmalar
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
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
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-100 dark:border-gray-600"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 capitalize">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full font-medium border border-gray-200 dark:border-gray-600"
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
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
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-100 dark:border-gray-600"
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
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
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow"
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
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm"
                    >
                      GitHub →
                    </a>
                  )}
                  {project.liveDemoLink && (
                    <a
                      href={project.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium text-sm"
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
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
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-100 dark:border-gray-600"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Languages */}
        {languages.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
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
                  className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-100 dark:border-gray-600"
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
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
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-100 dark:border-gray-600"
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
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
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
