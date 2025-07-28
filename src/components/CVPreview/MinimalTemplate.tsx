import type { CVData } from "../../types";
import { Mail, Phone, MapPin } from "lucide-react";

interface MinimalTemplateProps {
  data: CVData;
}

export const MinimalTemplate = ({ data }: MinimalTemplateProps) => {
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

  return (
    <div
      className="max-w-4xl mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-8"
      id="cv-preview"
    >
      {/* Header */}
      <div className="text-center border-b-2 border-black dark:border-gray-300 pb-6 mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {personalInfo.fullName || "To'liq ism"}
        </h1>
        <h2 className="text-xl font-medium mb-4">
          {personalInfo.title || "Lavozim"}
        </h2>

        {/* Contact Info */}
        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            <span className="text-gray-700 dark:text-gray-300">
              {personalInfo.email || "email@example.com"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span className="text-gray-700 dark:text-gray-300">
              {personalInfo.phone || "+998 90 123 45 67"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="text-gray-700 dark:text-gray-300">
              {personalInfo.location || "Manzil"}
            </span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-3">
          {socials.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-gray-100 hover:underline"
            >
              LinkedIn
            </a>
          )}
          {socials.github && (
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-gray-100 hover:underline"
            >
              GitHub
            </a>
          )}
          {socials.website && (
            <a
              href={socials.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-gray-100 hover:underline"
            >
              Website
            </a>
          )}
          {socials.telegram && (
            <span className="text-black dark:text-gray-100">
              {socials.telegram}
            </span>
          )}
        </div>
      </div>

      {/* About Me */}
      {aboutMe && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-3 border-b border-black dark:border-gray-300 pb-1">
            O'ZIM HAQIDA
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed break-words whitespace-pre-line overflow-hidden">
            {aboutMe}
          </p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-3 border-b border-black dark:border-gray-300 pb-1">
            KO'NIKMALAR
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 border border-black dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 border-b border-black dark:border-gray-300 pb-1">
            ISH TAJRIBASI
          </h3>
          <div className="space-y-6">
            {workExperience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">
                    {exp.position}
                  </h4>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
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
                <p className="font-medium mb-2 text-gray-800 dark:text-gray-200">
                  {exp.company}
                </p>
                {exp.responsibilities && (
                  <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">
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
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 border-b border-black dark:border-gray-300 pb-1">
            LOYIHALAR
          </h3>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index}>
                <h4 className="font-bold mb-1 text-gray-900 dark:text-gray-100">
                  {project.name}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  {project.description}
                </p>
                {project.techStack && (
                  <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">
                    <span className="font-medium">Texnologiyalar:</span>{" "}
                    {project.techStack}
                  </p>
                )}
                <div className="flex gap-4 text-xs">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black dark:text-gray-100 hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveDemoLink && (
                    <a
                      href={project.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black dark:text-gray-100 hover:underline"
                    >
                      Live Demo
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
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 border-b border-black dark:border-gray-300 pb-1">
            TA'LIM
          </h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">
                    {edu.schoolName}
                  </h4>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
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
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {edu.fieldOfStudy}
                </p>
                {edu.degree && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {edu.degree}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-3 border-b border-black dark:border-gray-300 pb-1">
            TILLAR
          </h3>
          <div className="flex flex-wrap gap-4">
            {languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-medium">{lang.name}</span>
                <span className="text-sm border border-black dark:border-gray-600 px-2 py-1">
                  {lang.proficiency}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificates */}
      {certificates.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 border-b border-black dark:border-gray-300 pb-1">
            SERTIFIKATLAR
          </h3>
          <div className="space-y-3">
            {certificates.map((cert, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{cert.name}</h4>
                  <p className="text-sm">{cert.issuer}</p>
                  {cert.year && (
                    <p className="text-gray-600 text-xs">{cert.year} yil</p>
                  )}
                </div>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline text-sm"
                  >
                    Ko'rish
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
