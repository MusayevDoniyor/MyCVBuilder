import { useState, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Check system preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme("system");
      applyTheme(systemTheme);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    if (
      newTheme === "dark" ||
      (newTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
    setIsOpen(false);
  };

  const getThemeIcon = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      return <Moon className="w-4 h-4" />;
    }
    return <Sun className="w-4 h-4" />;
  };

  const getThemeLabel = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      return "Qorong'i rejim";
    }
    return "Yorug' rejim";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200"
        aria-label="Tema o'zgartirish"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {getThemeIcon()}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {getThemeLabel()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={() => handleThemeChange("light")}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 ${
                theme === "light"
                  ? "text-primary-600 bg-primary-50 dark:bg-primary-900 dark:text-primary-400"
                  : "text-gray-700 dark:text-gray-200"
              }`}
              aria-label="Yorug' rejimni tanlash"
            >
              <Sun className="w-4 h-4" />
              <span>Yorug' rejim</span>
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 ${
                theme === "dark"
                  ? "text-primary-600 bg-primary-50 dark:bg-primary-900 dark:text-primary-400"
                  : "text-gray-700 dark:text-gray-200"
              }`}
              aria-label="Qorong'i rejimni tanlash"
            >
              <Moon className="w-4 h-4" />
              <span>Qorong'i rejim</span>
            </button>
            <button
              onClick={() => handleThemeChange("system")}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 ${
                theme === "system"
                  ? "text-primary-600 bg-primary-50 dark:bg-primary-900 dark:text-primary-400"
                  : "text-gray-700 dark:text-gray-200"
              }`}
              aria-label="Sistema rejimini tanlash"
            >
              <Monitor className="w-4 h-4" />
              <span>Sistema rejimi</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
