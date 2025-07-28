import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, X, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToasterProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

const getToastIcon = (type: ToastType) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "error":
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    case "warning":
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    case "info":
      return <Info className="w-5 h-5 text-blue-500" />;
    default:
      return <Info className="w-5 h-5 text-gray-500" />;
  }
};

const getToastClasses = (type: ToastType) => {
  const baseClasses =
    "flex items-start gap-3 p-4 rounded-lg shadow-lg border max-w-sm";

  switch (type) {
    case "success":
      return `${baseClasses} bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800`;
    case "error":
      return `${baseClasses} bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800`;
    case "warning":
      return `${baseClasses} bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800`;
    case "info":
      return `${baseClasses} bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800`;
    default:
      return `${baseClasses} bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800`;
  }
};

export const Toaster = ({ toasts, removeToast }: ToasterProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem = ({ toast, onRemove }: ToastItemProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Toast ko'rinishini animatsiya bilan ko'rsatish
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Avtomatik o'chirish
    if (toast.duration !== 0) {
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onRemove(toast.id), 300);
      }, toast.duration || 5000);

      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div
      className={`${getToastClasses(toast.type)} transition-all duration-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      }`}
      role="alert"
      aria-live="assertive"
    >
      {getToastIcon(toast.type)}

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {toast.title}
        </h4>
        {toast.message && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {toast.message}
          </p>
        )}
      </div>

      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onRemove(toast.id), 300);
        }}
        className="flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
        aria-label="Xabar yopish"
      >
        <X className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  );
};
