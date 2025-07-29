// Analytics tracking uchun utility funksiyalar

export interface AnalyticsData {
  cvViews: number;
  pdfDownloads: number;
  templateUsage: Record<string, number>;
  lastUpdated: string;
}

const ANALYTICS_KEY = "cv-builder-analytics";

/**
 * Analytics ma'lumotlarini o'qish
 */
export const getAnalytics = (): AnalyticsData => {
  try {
    const stored = localStorage.getItem(ANALYTICS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Analytics o'qishda xatolik:", error);
  }

  // Default analytics data
  return {
    cvViews: 0,
    pdfDownloads: 0,
    templateUsage: {},
    lastUpdated: new Date().toISOString(),
  };
};

/**
 * Analytics ma'lumotlarini saqlash
 */
export const saveAnalytics = (data: AnalyticsData): void => {
  try {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Analytics saqlashda xatolik:", error);
  }
};

/**
 * CV ko'rishlarni kuzatish
 */
export const trackCVView = (): void => {
  const analytics = getAnalytics();
  analytics.cvViews += 1;
  analytics.lastUpdated = new Date().toISOString();
  saveAnalytics(analytics);
};

/**
 * PDF download larni kuzatish
 */
export const trackPDFDownload = (): void => {
  const analytics = getAnalytics();
  analytics.pdfDownloads += 1;
  analytics.lastUpdated = new Date().toISOString();
  saveAnalytics(analytics);
};

/**
 * Shablon ishlatishlarni kuzatish
 */
export const trackTemplateUsage = (template: string): void => {
  const analytics = getAnalytics();
  analytics.templateUsage[template] =
    (analytics.templateUsage[template] || 0) + 1;
  analytics.lastUpdated = new Date().toISOString();
  saveAnalytics(analytics);
};

/**
 * Eng ko'p ishlatilgan shablonni olish
 */
export const getMostUsedTemplate = (): string | null => {
  const analytics = getAnalytics();
  const templates = analytics.templateUsage;

  if (Object.keys(templates).length === 0) {
    return null;
  }

  return Object.entries(templates).reduce((a, b) =>
    templates[a[0]] > templates[b[0]] ? a : b
  )[0];
};

/**
 * Analytics statistikalarini olish
 */
export const getAnalyticsStats = () => {
  const analytics = getAnalytics();
  const mostUsedTemplate = getMostUsedTemplate();

  return {
    totalViews: analytics.cvViews,
    totalDownloads: analytics.pdfDownloads,
    mostUsedTemplate,
    templateUsage: analytics.templateUsage,
    lastUpdated: analytics.lastUpdated,
  };
};

/**
 * Analytics ma'lumotlarini tozalash
 */
export const clearAnalytics = (): void => {
  try {
    localStorage.removeItem(ANALYTICS_KEY);
  } catch (error) {
    console.error("Analytics tozalashda xatolik:", error);
  }
};
