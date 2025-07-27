import type { CVData } from "../../types";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  GraduationCap,
  Languages,
  Code,
  FolderOpen,
  Building,
} from "lucide-react";

interface ProfessionalTemplateProps {
  data: CVData;
}

export const ProfessionalTemplate = ({ data }: ProfessionalTemplateProps) => {
  const {
    personalInfo,
    aboutMe,
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
    <div className="max-w-4xl mx-auto bg-white text-gray-800" id="cv-preview">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-8">
        <div className="flex items-start gap-6">
          {personalInfo.profilePhoto && (
            <div className="relative">
              <img
                src={personalInfo.profilePhoto}
                alt="Profile"
                className="w-28 h-28 rounded-lg object-cover border-4 border-white shadow-lg"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
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
          </div>
        </div>
      </div>

      {/* About Me */}
      {aboutMe && (
        <div className="p-8 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-green-600 rounded-full"></div>
            <h3 className="text-xl font-bold text-gray-900">
              Professional Summary
            </h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{aboutMe}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">
              Professional Skills
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
                  className="bg-white border border-gray-200 rounded-lg p-4"
                >
                  <h4 className="font-semibold text-gray-900 mb-3 capitalize border-b border-gray-200 pb-2">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium"
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
        <div className="p-8 bg-gray-50">
          <div className="flex items-center gap-3 mb-6">
            <Building className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">
              Professional Experience
            </h3>
          </div>
          <div className="space-y-6">
            {workExperience.map((exp, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      {exp.position}
                    </h4>
                    <p className="text-green-600 font-semibold">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right text-gray-500 text-sm">
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
                        {!exp.endDate && exp.startDate && " - Present"}
                      </span>
                    </div>
                  </div>
                </div>
                {exp.responsibilities && (
                  <p className="text-gray-700 leading-relaxed">
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
            <FolderOpen className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">Key Projects</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {project.name}
                </h4>
                <p className="text-gray-700 mb-3">{project.description}</p>
                {project.techStack && (
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-semibold">Technologies:</span>{" "}
                    {project.techStack}
                  </p>
                )}
                <div className="flex gap-3">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 font-medium text-sm"
                    >
                      GitHub →
                    </a>
                  )}
                  {project.liveDemoLink && (
                    <a
                      href={project.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 font-medium text-sm"
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
        <div className="p-8 bg-gray-50">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">Education</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-1">
                  {edu.schoolName}
                </h4>
                <p className="text-green-600 font-semibold mb-2">
                  {edu.fieldOfStudy}
                </p>
                {edu.degree && (
                  <p className="text-gray-600 mb-2">{edu.degree}</p>
                )}
                <div className="flex items-center gap-1 text-gray-500 text-sm">
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
                    {!edu.endDate && edu.startDate && " - Present"}
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
              <Languages className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">Languages</h3>
            </div>
            <div className="space-y-3">
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200"
                >
                  <span className="font-semibold text-gray-900">
                    {lang.name}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
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
              <Award className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">
                Certifications
              </h3>
            </div>
            <div className="space-y-3">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border border-gray-200"
                >
                  <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                  <p className="text-green-600 font-medium">{cert.issuer}</p>
                  {cert.year && (
                    <p className="text-gray-500 text-sm">{cert.year}</p>
                  )}
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      View Certificate →
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
