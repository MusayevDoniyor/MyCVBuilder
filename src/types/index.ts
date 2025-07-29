export interface PersonalInfo {
  fullName: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  profilePhoto?: string;
}

export interface Socials {
  linkedin: string;
  github: string;
  website: string;
  telegram: string;
}

export interface Skill {
  name: string;
  category:
    | "programming"
    | "frontend"
    | "backend"
    | "mobile"
    | "database"
    | "devops"
    | "design"
    | "others";
}

export interface Project {
  name: string;
  description: string;
  techStack: string;
  githubLink: string;
  liveDemoLink: string;
}

export interface WorkExperience {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

export interface Education {
  schoolName: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  degree: string;
}

export interface Language {
  name: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Fluent";
}

export interface Certificate {
  name: string;
  year: string;
  issuer: string;
  link?: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  aboutMe: string;
  socials: Socials;
  skills: Skill[];
  projects: Project[];
  workExperience: WorkExperience[];
  education: Education[];
  languages: Language[];
  certificates: Certificate[];
}

export type TemplateType =
  | "classic"
  | "modern"
  | "minimal"
  | "creative"
  | "professional"
  | "elegant";
