import type { CVData } from "../types";

/**
 * JSON faylini o'qish va parse qilish
 */
export const readJSONFile = (file: File): Promise<CVData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        if (!content) {
          reject(new Error("Fayl bo'sh"));
          return;
        }

        const data = JSON.parse(content);

        // Ma'lumotlarni validate qilish
        const validatedData = validateCVData(data);
        resolve(validatedData);
      } catch (error) {
        console.error("JSON parse xatoligi:", error);
        reject(new Error("Noto'g'ri JSON format"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Faylni o'qishda xatolik yuz berdi"));
    };

    reader.readAsText(file);
  });
};

/**
 * CV ma'lumotlarini validate qilish
 */
export const validateCVData = (data: unknown): CVData => {
  // Asosiy struktura tekshirish
  if (!data || typeof data !== "object") {
    throw new Error("Noto'g'ri JSON format");
  }

  const typedData = data as Record<string, unknown>;

  // PersonalInfo validate qilish
  if (!typedData.personalInfo || typeof typedData.personalInfo !== "object") {
    throw new Error("PersonalInfo ma'lumotlari topilmadi");
  }

  const personalInfo = typedData.personalInfo as Record<string, unknown>;

  // Barcha majburiy maydonlarni tekshirish
  const requiredPersonalFields = [
    "fullName",
    "title",
    "location",
    "phone",
    "email",
  ];
  for (const field of requiredPersonalFields) {
    if (!personalInfo[field] || typeof personalInfo[field] !== "string") {
      throw new Error(`PersonalInfo.${field} maydoni majburiy`);
    }
  }

  // Array maydonlarni validate qilish
  const arrayFields = [
    "skills",
    "projects",
    "workExperience",
    "education",
    "languages",
    "certificates",
  ];
  for (const field of arrayFields) {
    if (!Array.isArray(typedData[field])) {
      typedData[field] = [];
    }
  }

  // String maydonlarni validate qilish
  if (typeof typedData.aboutMe !== "string") {
    typedData.aboutMe = "";
  }

  if (!typedData.socials || typeof typedData.socials !== "object") {
    typedData.socials = {
      linkedin: "",
      github: "",
      website: "",
      telegram: "",
    };
  }

  // Socials maydonlarini validate qilish
  const socials = typedData.socials as Record<string, unknown>;
  const socialFields = ["linkedin", "github", "website", "telegram"];
  for (const field of socialFields) {
    if (typeof socials[field] !== "string") {
      socials[field] = "";
    }
  }

  return typedData as unknown as CVData;
};

/**
 * Drag & Drop orqali fayl import qilish
 */
export const handleFileDrop = (event: DragEvent): File | null => {
  event.preventDefault();

  const files = event.dataTransfer?.files;
  if (!files || files.length === 0) {
    return null;
  }

  const file = files[0];

  // JSON fayl ekanligini tekshirish
  if (file.type !== "application/json" && !file.name.endsWith(".json")) {
    throw new Error("Faqat JSON fayllar qo'llab-quvvatlanadi");
  }

  return file;
};

/**
 * Clipboard dan JSON o'qish
 */
export const importFromClipboard = async (): Promise<CVData> => {
  try {
    // Clipboard access tekshirish
    if (!navigator.clipboard || !navigator.clipboard.readText) {
      throw new Error("Clipboard access qo'llab-quvvatlanmaydi");
    }

    const text = await navigator.clipboard.readText();

    if (!text || text.trim() === "") {
      throw new Error("Clipboard bo'sh");
    }

    const data = JSON.parse(text);
    return validateCVData(data);
  } catch (error) {
    console.error("Clipboard read xatoligi:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Clipboard dan ma'lumotlarni o'qishda xatolik yuz berdi");
  }
};
