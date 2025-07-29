import { useState, useEffect, useCallback } from "react";
import {
  getAnalyticsStats,
  trackCVView,
  trackPDFDownload,
  trackTemplateUsage,
} from "../utils/analytics";

export const useAnalytics = () => {
  const [stats, setStats] = useState(getAnalyticsStats());

  // Analytics statistikalarini yangilash
  const updateStats = useCallback(() => {
    setStats(getAnalyticsStats());
  }, []);

  // CV ko'rishlarni kuzatish
  const trackView = useCallback(() => {
    trackCVView();
    updateStats();
  }, [updateStats]);

  // PDF download larni kuzatish
  const trackDownload = useCallback(() => {
    trackPDFDownload();
    updateStats();
  }, [updateStats]);

  // Shablon ishlatishlarni kuzatish
  const trackTemplate = useCallback(
    (template: string) => {
      trackTemplateUsage(template);
      updateStats();
    },
    [updateStats]
  );

  // Har safar stats o'zgarganda yangilash
  useEffect(() => {
    updateStats();
  }, [updateStats]);

  return {
    stats,
    trackView,
    trackDownload,
    trackTemplate,
    updateStats,
  };
};
