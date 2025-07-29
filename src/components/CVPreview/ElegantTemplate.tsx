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
} from "lucide-react";

interface ElegantTemplateProps {
  data: CVData;
}

export const ElegantTemplate = ({ data }: ElegantTemplateProps) => {
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
    <div className="max-w-4xl mx-auto bg-white text-gray-800" id="cv-preview">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white p-8">
        <div className="absolute inset-0 bg-black opacity-5"></div>
        <div className="relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-3 font-display tracking-wide">
              {personalInfo.fullName || "To'liq ism"}
            </h1>
            <h2 className="text-2xl font-light mb-6 opacity-90">
              {personalInfo.title || "Lavozim"}
            </h2>

            {/* Contact Info */}
            <div className="flex justify-center items-center gap-6 text-sm">
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
            <div className="flex justify-center gap-4 mt-6">
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-white bg-opacity-20 px-4 py-2 rounded-full hover:bg-opacity-30 transition-all"
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
                  className="flex items-center gap-1 bg-white bg-opacity-20 px-4 py-2 rounded-full hover:bg-opacity-30 transition-all"
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
                  className="flex items-center gap-1 bg-white bg-opacity-20 px-4 py-2 rounded-full hover:bg-opacity-30 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Website</span>
                </a>
              )}
              {socials.telegram && (
                <div className="flex items-center gap-1 bg-white bg-opacity-20 px-4 py-2 rounded-full">
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
        <div className="p-3 sm:p-6 md:p-8 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-900">About Me</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg break-words whitespace-pre-line overflow-hidden">
            {aboutMe}
          </p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Expertise</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-4 text-white">
                    <h4 className="font-semibold text-lg capitalize">
                      {category}
                    </h4>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-rose-50 text-rose-700 text-sm rounded-full font-medium border border-rose-200"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
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
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Professional Journey
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          <div className="space-y-8">
            {workExperience.map((exp, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      {exp.position}
                    </h4>
                    <p className="text-rose-600 font-semibold text-lg">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
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
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Featured Projects
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {project.name}
                </h4>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {project.description}
                </p>
                {project.techStack && (
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">Technologies:</span>{" "}
                    {project.techStack}
                  </p>
                )}
                <div className="flex gap-4">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-600 hover:text-rose-800 font-medium text-sm flex items-center gap-1"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {project.liveDemoLink && (
                    <a
                      href={project.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-600 hover:text-rose-800 font-medium text-sm flex items-center gap-1"
                    >
                      <Globe className="w-4 h-4" />
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
        <div className="p-8 bg-gray-50">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Education</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {edu.schoolName}
                </h4>
                <p className="text-rose-600 font-semibold text-lg mb-2">
                  {edu.fieldOfStudy}
                </p>
                {edu.degree && (
                  <p className="text-gray-600 mb-3">{edu.degree}</p>
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
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Languages
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto rounded-full"></div>
            </div>
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
                >
                  <span className="font-semibold text-gray-900">
                    {lang.name}
                  </span>
                  <span className="px-4 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
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
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Certifications
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto rounded-full"></div>
            </div>
            <div className="space-y-4">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
                >
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {cert.name}
                  </h4>
                  <p className="text-rose-600 font-medium mb-1">
                    {cert.issuer}
                  </p>
                  {cert.year && (
                    <p className="text-gray-500 text-sm mb-2">{cert.year}</p>
                  )}
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-600 hover:text-rose-800 text-sm"
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
