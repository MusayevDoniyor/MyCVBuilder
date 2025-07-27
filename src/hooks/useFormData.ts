import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CVData, TemplateType } from "../types";

interface CVStore {
  data: CVData;
  template: TemplateType;
  updatePersonalInfo: (info: Partial<CVData["personalInfo"]>) => void;
  updateAboutMe: (aboutMe: string) => void;
  updateSocials: (socials: Partial<CVData["socials"]>) => void;
  addSkill: (skill: CVData["skills"][0]) => void;
  updateSkill: (index: number, skill: CVData["skills"][0]) => void;
  removeSkill: (index: number) => void;
  addProject: (project: CVData["projects"][0]) => void;
  updateProject: (index: number, project: CVData["projects"][0]) => void;
  removeProject: (index: number) => void;
  addWorkExperience: (experience: CVData["workExperience"][0]) => void;
  updateWorkExperience: (
    index: number,
    experience: CVData["workExperience"][0]
  ) => void;
  removeWorkExperience: (index: number) => void;
  addEducation: (education: CVData["education"][0]) => void;
  updateEducation: (index: number, education: CVData["education"][0]) => void;
  removeEducation: (index: number) => void;
  addLanguage: (language: CVData["languages"][0]) => void;
  removeLanguage: (index: number) => void;
  addCertificate: (certificate: CVData["certificates"][0]) => void;
  updateCertificate: (
    index: number,
    certificate: CVData["certificates"][0]
  ) => void;
  removeCertificate: (index: number) => void;
  setTemplate: (template: TemplateType) => void;
  resetData: () => void;
}

const initialData: CVData = {
  personalInfo: {
    fullName: "",
    title: "",
    location: "",
    phone: "",
    email: "",
    profilePhoto: "",
  },
  aboutMe: "",
  socials: {
    linkedin: "",
    github: "",
    website: "",
    telegram: "",
  },
  skills: [],
  projects: [],
  workExperience: [],
  education: [],
  languages: [],
  certificates: [],
};

export const useFormData = create<CVStore>()(
  persist(
    (set) => ({
      data: initialData,
      template: "classic",

      updatePersonalInfo: (info) =>
        set((state) => ({
          data: {
            ...state.data,
            personalInfo: { ...state.data.personalInfo, ...info },
          },
        })),

      updateAboutMe: (aboutMe) =>
        set((state) => ({
          data: { ...state.data, aboutMe },
        })),

      updateSocials: (socials) =>
        set((state) => ({
          data: {
            ...state.data,
            socials: { ...state.data.socials, ...socials },
          },
        })),

      addSkill: (skill) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: [...state.data.skills, skill],
          },
        })),

      removeSkill: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((_, i) => i !== index),
          },
        })),

      updateSkill: (index, skill) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.map((s, i) => (i === index ? skill : s)),
          },
        })),

      addProject: (project) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: [...state.data.projects, project],
          },
        })),

      removeProject: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.filter((_, i) => i !== index),
          },
        })),

      updateProject: (index, project) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((p, i) =>
              i === index ? project : p
            ),
          },
        })),

      addWorkExperience: (experience) =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: [...state.data.workExperience, experience],
          },
        })),

      removeWorkExperience: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: state.data.workExperience.filter(
              (_, i) => i !== index
            ),
          },
        })),

      updateWorkExperience: (index, experience) =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: state.data.workExperience.map((e, i) =>
              i === index ? experience : e
            ),
          },
        })),

      addEducation: (education) =>
        set((state) => ({
          data: {
            ...state.data,
            education: [...state.data.education, education],
          },
        })),

      removeEducation: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((_, i) => i !== index),
          },
        })),

      updateEducation: (index, education) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((e, i) =>
              i === index ? education : e
            ),
          },
        })),

      addLanguage: (language) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: [...state.data.languages, language],
          },
        })),

      removeLanguage: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: state.data.languages.filter((_, i) => i !== index),
          },
        })),

      addCertificate: (certificate) =>
        set((state) => ({
          data: {
            ...state.data,
            certificates: [...state.data.certificates, certificate],
          },
        })),

      removeCertificate: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            certificates: state.data.certificates.filter((_, i) => i !== index),
          },
        })),

      updateCertificate: (index, certificate) =>
        set((state) => ({
          data: {
            ...state.data,
            certificates: state.data.certificates.map((c, i) =>
              i === index ? certificate : c
            ),
          },
        })),

      setTemplate: (template) => set({ template }),

      resetData: () => set({ data: initialData }),
    }),
    {
      name: "cv-builder-storage",
    }
  )
);
