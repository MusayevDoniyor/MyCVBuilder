import DatePicker from "react-datepicker";
import { Calendar, X } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  showClearButton?: boolean;
}

export const CustomDatePicker = ({
  value,
  onChange,
  placeholder = "Sana tanlang...",
  disabled = false,
  className = "",
  size = "md",
  showClearButton = true,
}: CustomDatePickerProps) => {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2.5 text-base",
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      onChange(formattedDate);
    } else {
      onChange("");
    }
  };

  const handleClear = () => {
    onChange("");
  };

  const selectedDate = value ? new Date(value) : null;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          disabled={disabled}
          placeholderText={placeholder}
          dateFormat="dd/MM/yyyy"
          locale="uz"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          maxDate={new Date()}
          className={`
            w-full flex items-center justify-between
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-600
            rounded-lg
            hover:border-gray-300 dark:hover:border-gray-500
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            ${sizeClasses[size]}
            ${
              value
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-500 dark:text-gray-400"
            }
          `}
          popperClassName="z-50"
          popperPlacement="bottom-start"
        />
        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        {showClearButton && value && (
          <button
            onClick={handleClear}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            aria-label="Sanani tozalash"
          >
            <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Custom styles for the date picker */}
      <style>{`
        .react-datepicker-wrapper {
          width: 100%;
        }

        .react-datepicker__input-container {
          width: 100%;
        }

        .react-datepicker__input-container input {
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
          color: inherit;
        }

        .react-datepicker {
          font-family: inherit;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          background: white;
        }

        .dark .react-datepicker {
          background: #1f2937;
          border-color: #374151;
          color: #f9fafb;
        }

        .react-datepicker__header {
          background: #f3f4f6;
          border-bottom: 1px solid #e5e7eb;
          border-radius: 0.5rem 0.5rem 0 0;
          display: flex;
          flex-direction: column;
          gap: 0.7rem
        }

        .dark .react-datepicker__header {
          background: #374151;
          border-color: #4b5563;
        }

        .react-datepicker__current-month {
          color: #111827;
          font-weight: 600;
        }

        .dark .react-datepicker__current-month {
          color: #f9fafb;
        }

        .react-datepicker__day-name {
          color: #6b7280;
          font-weight: 500;
        }

        .dark .react-datepicker__day-name {
          color: #9ca3af;
        }

        .react-datepicker__day {
          color: #111827;
          border-radius: 0.375rem;
          margin: 0.125rem;
        }

        .dark .react-datepicker__day {
          color: #f9fafb;
        }

        .react-datepicker__day:hover {
          background: #f3f4f6;
        }

        .dark .react-datepicker__day:hover {
          background: #4b5563;
        }

        .react-datepicker__day--selected {
          background: #3b82f6 !important;
          color: white !important;
        }

        .react-datepicker__day--keyboard-selected {
          background: #dbeafe !important;
          color: #1e40af !important;
        }

        .dark .react-datepicker__day--keyboard-selected {
          background: #1e3a8a !important;
          color: #dbeafe !important;
        }

        .react-datepicker__day--disabled {
          color: #d1d5db !important;
        }

        .dark .react-datepicker__day--disabled {
          color: #4b5563 !important;
        }

        .react-datepicker__navigation {
          top: 0.20rem;
        }

        .react-datepicker__navigation-icon::before {
          border-color: #6b7280;
        }

        .dark .react-datepicker__navigation-icon::before {
          border-color: #9ca3af;
        }

        .react-datepicker__month-select,
        .react-datepicker__year-select {
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          padding: 0.25rem 0.5rem;
          color: #111827;
        }

        .dark .react-datepicker__month-select,
        .dark .react-datepicker__year-select {
          background: #374151;
          border-color: #4b5563;
          color: #f9fafb;
        }
      `}</style>
    </div>
  );
};
