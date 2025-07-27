interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  ariaLabel?: string;
}

export const LoadingSpinner = ({
  size = "md",
  text = "Yuklanmoqda...",
  ariaLabel = "Yuklanmoqda",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-3"
      role="status"
      aria-label={ariaLabel}
    >
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-primary-600`}
        aria-hidden="true"
      />
      {text && <span className="text-sm text-gray-600 sr-only">{text}</span>}
    </div>
  );
};
