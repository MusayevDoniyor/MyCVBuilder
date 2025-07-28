import type { CVData } from "../types";

/**
 * CV ma'lumotlarini JSON formatda export qilish
 */
export const exportToJSON = (data: CVData, filename?: string): void => {
  try {
    // JSON string yaratish
    const jsonString = JSON.stringify(data, null, 2);

    // Blob yaratish
    const blob = new Blob([jsonString], { type: "application/json" });

    // Download link yaratish
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download =
      filename || `cv-${new Date().toISOString().slice(0, 10)}.json`;

    // Download qilish
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // URL ni tozalash
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("JSON export xatoligi:", error);
    throw new Error("JSON export qilishda xatolik yuz berdi");
  }
};

/**
 * CV ma'lumotlarini JSON formatda copy qilish (clipboard)
 */
export const copyToClipboard = async (data: CVData): Promise<void> => {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    await navigator.clipboard.writeText(jsonString);
  } catch (error) {
    console.error("Clipboard copy xatoligi:", error);
    throw new Error("Ma'lumotlarni nusxalashda xatolik yuz berdi");
  }
};

/**
 * CV ma'lumotlarini JSON formatda share qilish (clipboard orqali)
 */
export const shareData = async (data: CVData): Promise<void> => {
  try {
    // Faqat clipboard ga nusxalash
    await copyToClipboard(data);
  } catch (error) {
    console.error("Share xatoligi:", error);
    throw new Error("Ma'lumotlarni nusxalashda xatolik yuz berdi");
  }
};
